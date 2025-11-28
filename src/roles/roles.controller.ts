import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Create a new role'})
    @ApiResponse({status: 200, type: Role, description: 'Role created successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request.'})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({ summary: 'Retrieve all roles' })
    @ApiResponse({status: 200, type: [Role], description: 'Roles retrieved successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request.'})
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @ApiOperation({ summary: 'Retrieve role by value' })
    @ApiResponse({status: 200, type: [Role], description: 'Roles retrieved successfully.'})
    @ApiResponse({status: 400, description: 'Invalid request.'})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

}
