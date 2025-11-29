import { HttpException, HttpStatus, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService) {}

    async createUser(dto: CreateUserDto){
        try {
            const existingUser = await this.getUserByEmail(dto.email);
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
            const hashPassword =  await bcrypt.hash(dto.password, 5);
            return await this.userRepository.create({...dto, password: hashPassword});
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.findAll({
                include: {all: true},
                attributes: { exclude: ['password'] }
            });
            return users;
        } catch (e) {
            throw new HttpException({message: 'Failed to retrieve users'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findByPk(id, {
                include: {all: true},
                attributes: { exclude: ['password'] }
            });
            
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            
            return user;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new HttpException({message: 'Failed to retrieve user'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {email}, 
                include: {all: true}
            });
            return user;
        } catch (e) {
            throw new HttpException({message: 'Failed to find user by email'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findByPk(id);
            
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            if (dto.email && dto.email !== user.email) {
                const existingUser = await this.getUserByEmail(dto.email);
                if (existingUser) {
                    throw new ConflictException('User with this email already exists');
                }
            }

            await user.update(dto);
            await user.reload({ include: {all: true}, attributes: { exclude: ['password'] } });
            
            return user;
        } catch (e) {
            if (e instanceof NotFoundException || e instanceof ConflictException) {
                throw e;
            }
            throw new HttpException({message: 'Failed to update user', error: e.message}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.userRepository.findByPk(id);
            
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            await user.destroy();
            
            return { message: `User with ID ${id} has been deleted successfully` };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new HttpException({message: 'Failed to delete user', error: e.message}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addRoleToUser(userId: number, roleValue: string) {
        try {
            const user = await this.userRepository.findByPk(userId);
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            const role = await this.rolesService.getRoleByValue(roleValue);
            if (!role) {
                throw new NotFoundException(`Role with value '${roleValue}' not found`);
            }

            await user.$add('roles', role.id);
            await user.reload({ 
                include: { all: true }, 
                attributes: { exclude: ['password'] } 
            });

            return user;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new HttpException({
                message: 'Failed to add role to user',
                error: e.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeRoleFromUser(userId: number, roleValue: string) {
        try {
            const user = await this.userRepository.findByPk(userId);
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            const role = await this.rolesService.getRoleByValue(roleValue);
            if (!role) {
                throw new NotFoundException(`Role with value '${roleValue}' not found`);
            }

            await user.$remove('roles', role.id);
            await user.reload({ 
                include: { all: true }, 
                attributes: { exclude: ['password'] } 
            });

            return user;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new HttpException({
                message: 'Failed to remove role from user',
                error: e.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserRoles(userId: number) {
        try {
            const user = await this.userRepository.findByPk(userId, {
                include: ['roles'],
                attributes: ['id', 'first_name', 'last_name', 'email']
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            return {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                },
                roles: user.roles
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new HttpException({
                message: 'Failed to get user roles',
                error: e.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
