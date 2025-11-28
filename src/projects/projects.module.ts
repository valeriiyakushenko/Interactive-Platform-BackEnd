import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { UserProjects } from './user-projects.model';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
      SequelizeModule.forFeature([Project, UserProjects])
    ],
})
export class ProjectsModule {}
