import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.createUser(userDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new UnauthorizedException({ message: 'User not found.' });

    const hash = user.getDataValue('password');
    if (!hash || typeof hash !== 'string') {
      throw new UnauthorizedException({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(userDto.password, hash);
    if (!isPasswordValid) throw new UnauthorizedException({ message: 'Invalid password.' });

    return user;
  }
}
