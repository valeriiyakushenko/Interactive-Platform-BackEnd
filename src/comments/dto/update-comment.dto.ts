import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
    @ApiProperty({ example: 'Обновленный комментарий', description: 'Содержимое комментария', required: false })
    readonly content?: string;

    @ApiProperty({ example: true, description: 'Одобрен ли комментарий', required: false })
    readonly is_approved?: boolean;
}