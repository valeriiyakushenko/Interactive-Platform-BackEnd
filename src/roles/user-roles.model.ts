import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ForeignKey(() => Role)
    @Column({type:DataType.INTEGER})
    roleId: string;
    
    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    userId: string;
}