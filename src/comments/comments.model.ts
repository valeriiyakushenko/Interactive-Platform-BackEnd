import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from 'src/projects/projects.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
    project_id: number;
    user_id: number;
    content: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Project ID' })
    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    project_id: number;

    @ApiProperty({ example: 1, description: 'User ID' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id: number;

    @ApiProperty({ example: 'Great project!', description: 'Comment content' })
    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @ApiProperty({ example: true, description: 'Whether the comment is approved' })
    @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
    is_approved: boolean;

    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => User)
    user: User;
}