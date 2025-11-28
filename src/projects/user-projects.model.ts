import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Project } from './projects.model';

@Table({tableName: 'user_projects', createdAt: false, updatedAt: false})
export class UserProjects extends Model<UserProjects> {

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    userId: string;
    
    @ForeignKey(() => Project)
    @Column({type:DataType.INTEGER})
    projectId: string;
}