import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({example: 'Сastle', description: 'Project title'})
    readonly title: string;
    
    @ApiProperty({ example: true, description: 'Is published?' })
    readonly is_published: boolean;
}