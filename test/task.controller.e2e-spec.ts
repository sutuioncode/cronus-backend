import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseTestModule } from '../src/database.module';
import * as request from 'supertest';
import { TaskModule } from '../src/task/task.module';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

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
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'New Task',
        description: 'E2E test task description',
        tags: ['urgent', 'backend'],
      } as CreateTaskDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Task');
    expect(response.body.description.content).toBe('E2E test task description');
    expect(response.body.attachments).toHaveLength(1);
    expect(response.body.attachments[0].filename).toBe('file1.txt');
  });

  it('/tasks/:id (GET) should retrieve a task with description and attachments', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Fetch Task',
        description: 'Retrieve task description',
        tags: ['low-priority'],
      } as CreateTaskDto)
      .expect(201);

    const taskId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', taskId);
    expect(getResponse.body.title).toBe('Fetch Task');
    expect(getResponse.body.description.content).toBe('Retrieve task description');
  });
});
