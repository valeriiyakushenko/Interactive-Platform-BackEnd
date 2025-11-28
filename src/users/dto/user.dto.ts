import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty({example: 'John', description: 'First name of the user.'})
    readonly first_name: string;

    @ApiProperty({example: 'Doe', description: 'Last name of the user.'})
    readonly last_name: string;

    @ApiProperty({example: '1990-01-01', description: 'Date of birth of the user.'})
    readonly date_of_birth: Date;

    @ApiProperty({example: 'Male', description: 'Gender of the user (Male or Female).'})
    readonly gender: string;

    @ApiProperty({example: '+123456789', description: 'Phone number of the user.'})
    readonly phone: string;

    @ApiProperty({example: 'johndoe@example.com', description: 'Email of the user.'})
    readonly email: string;

    @ApiProperty({example: 'password123', description: 'Password of the user.'})
    readonly password: string;

    @ApiProperty({example: 'http://server.com/image.png', description: 'Image link of the user.'})
    readonly image_url: string;
}