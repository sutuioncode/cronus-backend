import { databaseTestModule } from '../../src/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repositories/task-reposotory';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [databaseTestModule, TypeOrmModule.forFeature([Task]), TaskRepository, Task],
      providers: [TaskRepository, TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const task: CreateTaskDto = {
      description: 'Basic task description',
      title: 'simple task',
      tags: ['task', 'bigTask'],
    }

    const response = service.create(task)

    expect(response).toHaveProperty('title', task.title)
    expect(response).toHaveProperty('description.content', task.description)
    expect(response).toHaveProperty('tags', task.tags)
  })
});
