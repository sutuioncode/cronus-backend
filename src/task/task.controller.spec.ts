import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';
import { TaskRepository } from './repositories/task-reposotory';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { databaseTestModule } from '../database.module';
describe('TaskController', () => {
  let controller: TaskController;
  let app: NestApplication
  let taskRepository: TaskRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports:[databaseTestModule, TaskRepository],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    const token = getRepositoryToken(User)

    taskRepository = module.get<TaskRepository>(token)

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create task', async () => {
    const taskDto = {}


    const response = await request(app.getHttpServer())
      .post('/tasks/crate')
      .send(taskDto)
      .expect(201);


    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...taskDto
    });

    const task = await taskRepository.getTask(response.body.id)

    expect(taskDto).toStrictEqual(task)
  })
});
