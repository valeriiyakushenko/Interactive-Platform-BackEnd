import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../project-files.model';

export class ProjectFileDto {
    @ApiProperty({ example: 1, description: 'File ID' })
    id: number;

    @ApiProperty({ example: 1, description: 'Project ID' })
    projectId: number;

    @ApiProperty({ example: 'Demo Video', description: 'File name' })
    name: string;

    @ApiProperty({ example: 'Project demo description', description: 'File description' })
    description: string;

    @ApiProperty({ example: 'https://example.com/video.mp4', description: 'File URL' })
    url: string;

    @ApiProperty({ example: 'video', description: 'File type', enum: FileType })
    fileType: FileType;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Creation date' })
    createdAt: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Last update date' })
    updatedAt: Date;
}