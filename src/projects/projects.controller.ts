import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @ApiOperation({ summary: 'Create project' })
    @ApiResponse({ status: 201, type: Project })
    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectsService.create(dto);
    }

    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    getAll() {
        return this.projectsService.getAll();
    }

    @ApiOperation({ summary: 'Get project by id' })
    @ApiResponse({ status: 200, type: Project })
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.projectsService.getById(+id);
    }

    @ApiOperation({ summary: 'Update project' })
    @ApiResponse({ status: 200, type: Project })
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: ProjectDto) {
        return this.projectsService.update(+id, dto);
    }

    @ApiOperation({ summary: 'Delete project' })
    @ApiResponse({ status: 200 })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.projectsService.delete(+id);
    }
}
