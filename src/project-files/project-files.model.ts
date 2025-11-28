import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from 'src/projects/projects.model';

export enum FileType {
    VIDEO = 'video',
    FILE = 'file',
    IMAGE = 'image'
}

interface ProjectFileCreationAttrs {
    projectId: number;
    name: string;
    url: string;
    fileType: FileType;
}

@Table({ tableName: 'project_files' })
export class ProjectFile extends Model<ProjectFile, ProjectFileCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Project ID' })
    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    projectId: number;

    @ApiProperty({ example: 'Demo Video', description: 'File name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Project demo description', description: 'File description' })
    @Column({ type: DataType.TEXT, allowNull: true })
    description: string;

    @ApiProperty({ example: 'https://example.com/video.mp4', description: 'File URL' })
    @Column({ type: DataType.STRING, allowNull: false })
    url: string;

    @ApiProperty({ example: 'video', description: 'File type', enum: FileType })
    @Column({ type: DataType.ENUM(...Object.values(FileType)), allowNull: false })
    fileType: FileType;

    @BelongsTo(() => Project)
    project: Project;
}