import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Admin role'})
    readonly value: string;

    @ApiProperty({example: 'Admin role', description: 'Admin role description.'})
    readonly description: string;
}