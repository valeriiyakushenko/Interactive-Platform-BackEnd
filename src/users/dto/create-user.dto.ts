import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'John', description: 'First name of the user.'})
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({example: 'Doe', description: 'Last name of the user.'})
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @ApiProperty({example: 'johndoe@example.com', description: 'Email of the user.'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'password123', description: 'Password of the user (minimum 6 characters).'})
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    readonly password: string;
}