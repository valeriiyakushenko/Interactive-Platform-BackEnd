import { ApiProperty } from "@nestjs/swagger";

export class ProjectDto {
    @ApiProperty({example: 'Сastle', description: 'Project title'})
    readonly title: string;
    
    @ApiProperty({example: 'Sand castle', description: 'Project description'})
    readonly description: string;
    
    @ApiProperty({ example: 'Some text', description: 'Project content' })
    readonly content: string;
    
    @ApiProperty({ example: true, description: 'Is published?' })
    readonly is_published: boolean;
}