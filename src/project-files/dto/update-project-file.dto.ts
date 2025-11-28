import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { FileType } from '../project-files.model';

export class UpdateProjectFileDto {
    @ApiProperty({ example: 'Demo Video Updated', description: 'File name', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'Updated project demo description', description: 'File description', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'https://example.com/video-updated.mp4', description: 'File URL', required: false })
    @IsUrl()
    @IsOptional()
    url?: string;

    @ApiProperty({ example: 'video', description: 'File type', enum: FileType, required: false })
    @IsEnum(FileType)
    @IsOptional()
    fileType?: FileType;
}