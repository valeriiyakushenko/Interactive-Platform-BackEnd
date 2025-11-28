import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectFilesService } from './project-files.service';
import { CreateProjectFileDto } from './dto/create-project-file.dto';
import { UpdateProjectFileDto } from './dto/update-project-file.dto';
import { ProjectFileDto } from './dto/project-file.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Project Files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('project-files')
export class ProjectFilesController {
    constructor(private readonly projectFilesService: ProjectFilesService) {}

    @ApiOperation({ summary: 'Create a new project file link' })
    @ApiResponse({ 
        status: 201, 
        description: 'Project file link created successfully', 
        type: ProjectFileDto 
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post()
    async create(@Body() createProjectFileDto: CreateProjectFileDto) {
        return this.projectFilesService.create(createProjectFileDto);
    }

    @ApiOperation({ summary: 'Get all project files by project ID' })
    @ApiParam({ name: 'projectId', type: 'number', description: 'Project ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Project files retrieved successfully', 
        type: [ProjectFileDto] 
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get('project/:projectId')
    async findByProjectId(@Param('projectId') projectId: string) {
        return this.projectFilesService.findByProjectId(+projectId);
    }

    @ApiOperation({ summary: 'Get project file by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Project file ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Project file retrieved successfully', 
        type: ProjectFileDto 
    })
    @ApiResponse({ status: 404, description: 'Project file not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.projectFilesService.findById(+id);
    }

    @ApiOperation({ summary: 'Update project file' })
    @ApiParam({ name: 'id', type: 'number', description: 'Project file ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Project file updated successfully', 
        type: ProjectFileDto 
    })
    @ApiResponse({ status: 404, description: 'Project file not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectFileDto: UpdateProjectFileDto) {
        return this.projectFilesService.update(+id, updateProjectFileDto);
    }

    @ApiOperation({ summary: 'Delete project file' })
    @ApiParam({ name: 'id', type: 'number', description: 'Project file ID' })
    @ApiResponse({ status: 200, description: 'Project file deleted successfully' })
    @ApiResponse({ status: 404, description: 'Project file not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.projectFilesService.delete(+id);
        return { message: 'Project file deleted successfully' };
    }

    @ApiOperation({ summary: 'Delete all project files by project ID' })
    @ApiParam({ name: 'projectId', type: 'number', description: 'Project ID' })
    @ApiResponse({ status: 200, description: 'All project files deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Delete('project/:projectId')
    async deleteByProjectId(@Param('projectId') projectId: string) {
        await this.projectFilesService.deleteByProjectId(+projectId);
        return { message: 'All project files deleted successfully' };
    }
}