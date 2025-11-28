import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectRepository: typeof Project) {}

    async create(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto);
        return project;
    }

    async getAll() {
        const projects = await this.projectRepository.findAll();
        return projects;
    }

    async getById(id: number) {
        const project = await this.projectRepository.findByPk(id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }

    async update(id: number, dto: ProjectDto) {
        const project = await this.getById(id);
        await project.update(dto);
        return project;
    }

    async delete(id: number) {
        const project = await this.getById(id);
        await project.destroy();
        return { message: 'Project deleted successfully' };
    }
}
