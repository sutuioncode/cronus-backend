import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { testTasks } from '../../test/tasks';
import { databaseTestModule } from '../database.module';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/task-reposotory';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { GetTaskMappingProfile } from './mapping-profile/get-task.mapping';
import { automapperModule } from '../../src/automapper.module';
describe('TaskController', () => {
  let controller: TaskController;
  let app: NestApplication
  let taskRepository: TaskRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [databaseTestModule, automapperModule, TaskRepository, TypeOrmModule.forFeature([Task])],
      providers: [TaskService, GetTaskMappingProfile],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    const token = getRepositoryToken(Task)

    taskRepository = module.get<TaskRepository>(token)

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create task', async () => {
    const taskDto = testTasks[0]


    const response = await request(app.getHttpServer())
      .post('/tasks/create')
      .send(taskDto)
      .expect(201);

    expect(response.body.id).toEqual(expect.any(Number))
    expect(response.body.title).toEqual(taskDto.title)
    expect(response.body.description).toEqual(taskDto.description)
    expect(response.body.tags).toEqual(taskDto.tags)

  })
});
