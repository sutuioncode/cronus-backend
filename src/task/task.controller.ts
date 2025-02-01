import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTaskItemDto, ListTasksDto } from './dto/list-tasks.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('list')
  async findAll(): Promise<ListTasksDto> {
    return ({
      tasks: await this.taskService.findAll()
        .then((list) => list.map(({ tags, title, id, description: { content } }) => ({ tags, title, id, description: content })))
    })
  }

  @Get(':id')
  findOne(@Param() params: any) {
    const { id } = params;
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
