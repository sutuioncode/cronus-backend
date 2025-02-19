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
    return this.repository.find({
      relations: {
        description: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id
      },
      relations: {
        description: true
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
