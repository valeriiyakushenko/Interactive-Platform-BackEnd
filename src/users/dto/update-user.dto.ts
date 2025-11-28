import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail, IsDateString, IsPhoneNumber, IsUrl } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({example: 'John', description: 'First name of the user.', required: false})
    @IsOptional()
    @IsString()
    readonly first_name?: string;

    @ApiProperty({example: 'Doe', description: 'Last name of the user.', required: false})
    @IsOptional()
    @IsString()
    readonly last_name?: string;

    @ApiProperty({example: '1990-01-01', description: 'Date of birth of the user.', required: false})
    @IsOptional()
    @IsDateString()
    readonly date_of_birth?: Date;

    @ApiProperty({example: 'Male', description: 'Gender of the user (Male or Female).', required: false})
    @IsOptional()
    @IsString()
    readonly gender?: string;

    @ApiProperty({example: '+123456789', description: 'Phone number of the user.', required: false})
    @IsOptional()
    @IsString()
    readonly phone?: string;

    @ApiProperty({example: 'johndoe@example.com', description: 'Email of the user.', required: false})
    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @ApiProperty({example: 'http://server.com/image.png', description: 'Image link of the user.', required: false})
    @IsOptional()
    @IsUrl()
    readonly image_url?: string;
}