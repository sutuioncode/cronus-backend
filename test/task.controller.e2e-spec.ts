import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import * as request from 'supertest';
import { databaseTestModule } from '../src/database.module';
import { TaskModule } from '../src/task/task.module';
import { testTasks } from './tasks';
import { Repository } from 'typeorm';
import { Task } from '../src/task/entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { automapperModule } from '../src/automapper.module';
import { GetTaskMappingProfile } from '../src/task/mapping-profile/get-task.mapping';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        databaseTestModule,
        TaskModule,
        automapperModule,
      ],providers:[GetTaskMappingProfile]
    }).compile();

    app = moduleFixture.createNestApplication();
    taskRepository = app.get<Repository<Task>>(getRepositoryToken(Task))
    await app.init();
  });

  afterEach(async () => {
    await taskRepository.clear()
  })

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST) should create a task with description and attachments', async () => {
    const task = testTasks[2]

    const response = await request(app.getHttpServer())
      .post('/tasks/create')
      .send(task)
      .expect(201);

    expect(response.body.title).toBe(task.title);
    expect(response.body.description).toBe(task.description);
    expect(response.body.tags).toStrictEqual(task.tags);
  });

  it('/tasks/:id (GET) should retrieve a task with description and attachments', async () => {
    const task = testTasks[0]

    const createResponse = await request(app.getHttpServer())
      .post('/tasks/create')
      .send(task)
      .expect(201);

    const taskId = createResponse.body.id;


    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', taskId);
    expect(getResponse.body.title).toBe(task.title);
    expect(getResponse.body.description).toBe(task.description);
    expect(getResponse.body.tags).toStrictEqual(task.tags);
  });

  it('/tasks/list (GET) should retrieve a list of  tasks with description and attachments', async () => {

    for (const task of testTasks) {
      await request(app.getHttpServer())
        .post('/tasks/create')
        .send(task)
        .expect(201);
    }


    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/list`)
      .expect(200);

    expect(getResponse.body?.length).toEqual(testTasks.length)

    expect(getResponse.body).toMatchObject(testTasks)
  });


});
