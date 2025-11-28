import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { User } from 'src/users/users.model';
import { Project } from 'src/projects/projects.model';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async create(dto: CreateCommentDto) {
        const comment = await this.commentRepository.create(dto);
        return comment;
    }

    async getAll() {
        const comments = await this.commentRepository.findAll({
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Project, attributes: ['id', 'title'] }
            ]
        });
        return comments;
    }

    async getByProjectId(projectId: number) {
        const comments = await this.commentRepository.findAll({
            where: { project_id: projectId },
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Project, attributes: ['id', 'title'] }
            ]
        });
        return comments;
    }

    async getById(id: number) {
        const comment = await this.commentRepository.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Project, attributes: ['id', 'title'] }
            ]
        });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    async update(id: number, dto: Partial<CommentDto>) {
        const comment = await this.getById(id);
        await comment.update(dto);
        return comment;
    }

    async delete(id: number) {
        const comment = await this.getById(id);
        await comment.destroy();
        return { message: 'Comment deleted successfully' };
    }
}