import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) { }
  create({ description, tags, title }: CreateTaskDto) {
    return this.repository.save({
      title, description: { content: description }, tags
    })
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
