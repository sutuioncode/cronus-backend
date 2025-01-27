import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import * as request from 'supertest';
import { databaseTestModule } from '../src/database.module';
import { TaskModule } from '../src/task/task.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        databaseTestModule,
        TaskModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST) should create a task with description and attachments', async () => {
    const task: CreateTaskDto = {
      title: 'New Task',
      description: 'E2E test task description',
      tags: ['urgent', 'backend'],
    }

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .expect(201);

    expect(response.body.title).toBe(task.title);
    expect(response.body.description.content).toBe(task.description);
    expect(response.body.tags).toStrictEqual(task.tags);
  });

  it('/tasks/:id (GET) should retrieve a task with description and attachments', async () => {
    const task = {
      title: 'Fetch Task',
      description: 'Retrieve task description',
      tags: ['low-priority'],
    } as CreateTaskDto

    const createResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .expect(201);

    const taskId = createResponse.body.id;

    console.log(createResponse.body)

    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', taskId);
    expect(getResponse.body.title).toBe(task.title);
    expect(getResponse.body.description.content).toBe(task.description);
    expect(getResponse.body.tags).toStrictEqual(task.tags);
  });
});
