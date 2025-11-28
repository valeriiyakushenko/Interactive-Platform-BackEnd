import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Project } from 'src/projects/projects.model';
import { UserProjects } from 'src/projects/user-projects.model';

export interface UserCreationAttrs {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 'John', description: 'First name of the user.'})
    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @ApiProperty({example: 'Doe', description: 'Last name of the user.'})
    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;

    @ApiProperty({example: '2000-01-01', description: 'Date of birth of the user.'})
    @Column({ type: DataType.DATE, allowNull: true })
    date_of_birth: Date;

    @ApiProperty({example: 'Male', description: 'Gender of the user (Male or Female).'})
    @Column({ type: DataType.STRING, allowNull: true })
    gender: string;

    @ApiProperty({example: '+123456789', description: 'Phone number of the user.'})
    @Column({ type: DataType.STRING, allowNull: true })
    phone: string;

    @ApiProperty({example: 'johndoe@example.com', description: 'Email of the user.'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({example: 'password123', description: 'Password of the user.'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({example: 'http://server.com/image.png', description: 'Image link of the user.'})
    @Column({ type: DataType.STRING, allowNull: true })
    image_url: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @BelongsToMany(() => Project, () => UserProjects)
    projects: Project[];
}