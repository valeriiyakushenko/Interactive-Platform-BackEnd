import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiProperty({ example: 1, description: 'Comment ID' })
    readonly id: number;

    @ApiProperty({ example: 1, description: 'Project ID' })
    readonly project_id: number;

    @ApiProperty({ example: 1, description: 'User ID' })
    readonly user_id: number;

    @ApiProperty({ example: 'Great project!', description: 'Comment content' })
    readonly content: string;

    @ApiProperty({ example: true, description: 'Whether the comment is approved' })
    readonly is_approved: boolean;

    @ApiProperty({ example: '2023-01-01T12:00:00.000Z', description: 'Creation date' })
    readonly createdAt: Date;

    @ApiProperty({ example: '2023-01-01T12:00:00.000Z', description: 'Update date' })
    readonly updatedAt: Date;
}