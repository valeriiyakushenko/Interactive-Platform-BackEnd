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
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Retrieve user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiResponse({status: 200, type: User, description: 'User retrieved successfully.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiResponse({status: 200, type: User, description: 'User updated successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request data.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 409, description: 'User with this email already exists.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiResponse({status: 200, description: 'User deleted successfully.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 500, description: 'Internal server error.'})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
