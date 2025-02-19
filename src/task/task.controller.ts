import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateTaskDto, CreateTaskResponseDto } from './dto/create-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { MapInterceptor } from '@automapper/nestjs';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  @UseInterceptors(MapInterceptor(Task, CreateTaskResponseDto))
  async create(@Body() createTaskDto: any) {
    return await this.taskService.create(createTaskDto)
  }

  @Get('list')
  @UseInterceptors(MapInterceptor(Task, CreateTaskResponseDto, { isArray: true, }))
  async findAll() {
    return await this.taskService.findAll()
    
  }
  
  @Get(':id')
  @UseInterceptors(MapInterceptor(Task, CreateTaskResponseDto))
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
