import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectFile } from './project-files.model';
import { ProjectFilesController } from './project-files.controller';
import { ProjectFilesService } from './project-files.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ProjectFilesController],
    providers: [ProjectFilesService],
    imports: [
        SequelizeModule.forFeature([ProjectFile]),
        AuthModule
    ],
    exports: [ProjectFilesService]
})
export class ProjectFilesModule {}