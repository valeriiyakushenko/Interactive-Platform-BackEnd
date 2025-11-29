import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
    @ApiProperty({
        example: 'ADMIN',
        description: 'Role value to assign to user'
    })
    @IsString()
    @IsNotEmpty()
    readonly roleValue: string;
}