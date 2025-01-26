import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseTestModule } from '../src/database.module';
import * as request from 'supertest';
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
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'New Task',
        description: { content: 'E2E test task description' },
        attachments: [
          { filename: 'file1.txt', mimetype: 'text/plain', path: '/uploads/file1.txt', size: 1234 },
        ],
        users: [],
        tags: ['urgent', 'backend'],
      })
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
        description: { content: 'Retrieve task description' },
        attachments: [
          { filename: 'file2.txt', mimetype: 'text/plain', path: '/uploads/file2.txt', size: 5678 },
        ],
        users: [],
        tags: ['low-priority'],
      })
      .expect(201);

    const taskId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', taskId);
    expect(getResponse.body.title).toBe('Fetch Task');
    expect(getResponse.body.description.content).toBe('Retrieve task description');
    expect(getResponse.body.attachments).toHaveLength(1);
    expect(getResponse.body.attachments[0].filename).toBe('file2.txt');
  });
});
