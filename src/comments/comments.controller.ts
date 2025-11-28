import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './comments.model';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Create comment' })
    @ApiResponse({ status: 201, type: Comment })
    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentsService.create(dto);
    }

    @ApiOperation({ summary: 'Get all comments' })
    @ApiResponse({ status: 200, type: [Comment] })
    @Get()
    getAll() {
        return this.commentsService.getAll();
    }

    @ApiOperation({ summary: 'Get comments by project id' })
    @ApiResponse({ status: 200, type: [Comment] })
    @Get('project/:projectId')
    getByProjectId(@Param('projectId') projectId: string) {
        return this.commentsService.getByProjectId(+projectId);
    }

    @ApiOperation({ summary: 'Get comment by id' })
    @ApiResponse({ status: 200, type: Comment })
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.commentsService.getById(+id);
    }

    @ApiOperation({ summary: 'Update comment' })
    @ApiResponse({ status: 200, type: Comment })
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CommentDto>) {
        return this.commentsService.update(+id, dto);
    }

    @ApiOperation({ summary: 'Delete comment' })
    @ApiResponse({ status: 200 })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.commentsService.delete(+id);
    }
}