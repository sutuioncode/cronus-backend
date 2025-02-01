import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseTestModule } from '../../src/database.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/task-reposotory';
import { TaskService } from './task.service';
import { testTasks } from '../../test/tasks';


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

  it('should create a task', async () => {
    const task = testTasks[3]

    const response = await service.create(task)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('isCompleted', false)
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
    expect(response).toHaveProperty('title', task.title)
    expect(response).toHaveProperty('description.content', task.description)
    expect(response).toHaveProperty('tags', task.tags)
  })

  it('should return a task by ID', async () => {
    const task = testTasks[0]

    const { id } = await service.create(task)
    const response = await service.findOne(id)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('isCompleted', false)
    expect(response).toHaveProperty('createdAt')
    expect(response).toHaveProperty('updatedAt')
    expect(response).toHaveProperty('title', task.title)
    expect(response).toHaveProperty('description.content', task.description)
    expect(response).toHaveProperty('tags', task.tags)
  })

  it('should retrieve a list of tasks with description and attachments', async () => {

    for (const task of testTasks) {
      await service.create(task)
    }

    const tasks = await service.findAll()

    expect(tasks.length).toEqual(testTasks.length)

    expect(testTasks).toStrictEqual(tasks.map(({ title, tags, description: { content } }) => ({ title, tags, description: content })))
  });
});
