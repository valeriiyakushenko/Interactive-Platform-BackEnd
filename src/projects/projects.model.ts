import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserProjects } from './user-projects.model';
import { ProjectFile } from 'src/project-files/project-files.model';

interface ProjectCreationAttrs {
    title: string;
    is_published: boolean;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {

    @ApiProperty({example: 'Сastle', description: 'Project title'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({example: 'Sand castle', description: 'Project description'})
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ApiProperty({ example: 'Some text', description: 'Project content' })
    @Column({ type: DataType.STRING, allowNull: true })
    content: string;

    @ApiProperty({ example: true, description: 'Is published?' })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    is_published: boolean;

    @BelongsToMany(() => User, () => UserProjects)
    users: User[];

    @HasMany(() => ProjectFile)
    files: ProjectFile[];
}