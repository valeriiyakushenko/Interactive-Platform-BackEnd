import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';
import { Project } from './projects/projects.model';
import { UserProjects } from './projects/user-projects.model';
import { ProjectFilesModule } from './project-files/project-files.module';
import { ProjectFile } from './project-files/project-files.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Project, Comment, UserProjects, ProjectFile],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProjectsModule,
        CommentsModule,
        ProjectFilesModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}