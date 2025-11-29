import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Create a new user'})
    @ApiResponse({status: 201, type: User, description: 'User created successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request data.'})
    @ApiResponse({status: 409, description: 'User with this email already exists.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({status: 200, type: [User], description: 'Users retrieved successfully.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Retrieve user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiResponse({status: 200, type: User, description: 'User retrieved successfully.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Update user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiResponse({status: 200, type: User, description: 'User updated successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request data.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 409, description: 'User with this email already exists.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiResponse({status: 200, description: 'User deleted successfully.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @ApiOperation({ summary: 'Add role to user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiParam({ name: 'roleValue', type: 'string', description: 'Role value (e.g., "ADMIN", "USER")' })
    @ApiResponse({status: 200, type: User, description: 'Role added to user successfully.'})
    @ApiResponse({status: 404, description: 'User or role not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Post(':id/roles/:roleValue')
    addRole(@Param('id', ParseIntPipe) id: number, @Param('roleValue') roleValue: string) {
        return this.userService.addRoleToUser(id, roleValue);
    }

    @ApiOperation({ summary: 'Remove role from user by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiParam({ name: 'roleValue', type: 'string', description: 'Role value (e.g., "ADMIN", "USER")' })
    @ApiResponse({status: 200, type: User, description: 'Role removed from user successfully.'})
    @ApiResponse({status: 404, description: 'User or role not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Delete(':id/roles/:roleValue')
    removeRole(@Param('id', ParseIntPipe) id: number, @Param('roleValue') roleValue: string) {
        return this.userService.removeRoleFromUser(id, roleValue);
    }

    @ApiOperation({ summary: 'Get user roles by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User id' })
    @ApiResponse({status: 200, description: 'User roles retrieved successfully.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @Get(':id/roles')
    getUserRoles(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserRoles(id);
    }
}
