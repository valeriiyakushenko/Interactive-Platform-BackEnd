import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { FileType } from '../project-files.model';

export class CreateProjectFileDto {
    @ApiProperty({ example: 1, description: 'Project ID' })
    @IsNumber()
    @IsNotEmpty()
    projectId: number;

    @ApiProperty({ example: 'Demo Video', description: 'File name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Project demo description', description: 'File description', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'https://example.com/video.mp4', description: 'File URL' })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ example: 'video', description: 'File type', enum: FileType })
    @IsEnum(FileType)
    @IsNotEmpty()
    fileType: FileType;
}