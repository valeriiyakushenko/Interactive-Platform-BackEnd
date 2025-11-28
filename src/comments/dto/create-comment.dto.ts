import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ example: 1, description: 'Project ID' })
    readonly project_id: number;

    @ApiProperty({ example: 1, description: 'User ID' })
    readonly user_id: number;

    @ApiProperty({ example: 'Great project!', description: 'Comment content' })
    readonly content: string;

    @ApiProperty({ example: true, description: 'Whether the comment is approved', required: false })
    readonly is_approved?: boolean;
}