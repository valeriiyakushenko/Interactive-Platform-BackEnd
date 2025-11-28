import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from 'src/users/users.model';
import { Project } from 'src/projects/projects.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Comment, User, Project])
  ],
  exports: [CommentsService]
})
export class CommentsModule {}