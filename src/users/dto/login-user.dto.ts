import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @ApiProperty({example: 'johndoe@example.com', description: 'Email of the user.'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'password123', description: 'Password of the user.'})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}