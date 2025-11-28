import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectFile } from './project-files.model';
import { CreateProjectFileDto } from './dto/create-project-file.dto';
import { UpdateProjectFileDto } from './dto/update-project-file.dto';

@Injectable()
export class ProjectFilesService {
    constructor(
        @InjectModel(ProjectFile) private projectFileRepository: typeof ProjectFile
    ) {}

    async create(dto: CreateProjectFileDto): Promise<ProjectFile> {
        const projectFile = await this.projectFileRepository.create(dto);
        return projectFile;
    }

    async findByProjectId(projectId: number): Promise<ProjectFile[]> {
        const projectFiles = await this.projectFileRepository.findAll({
            where: { projectId }
        });
        return projectFiles;
    }

    async findById(id: number): Promise<ProjectFile> {
        const projectFile = await this.projectFileRepository.findByPk(id);
        if (!projectFile) {
            throw new NotFoundException(`Project file with ID ${id} not found`);
        }
        return projectFile;
    }

    async update(id: number, dto: UpdateProjectFileDto): Promise<ProjectFile> {
        const projectFile = await this.findById(id);
        await projectFile.update(dto);
        return projectFile;
    }

    async delete(id: number): Promise<void> {
        const projectFile = await this.findById(id);
        await projectFile.destroy();
    }

    async deleteByProjectId(projectId: number): Promise<void> {
        await this.projectFileRepository.destroy({
            where: { projectId }
        });
    }
}