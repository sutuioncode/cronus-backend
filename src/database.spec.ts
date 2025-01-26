import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { databaseTestModule } from './database.module';
import { Task } from './task/entities/task.entity';
import { TaskRepository } from './task/repositories/task-reposotory';
import { TaskService } from './task/task.service';

describe('TaskService', () => {
    let service: TaskService;
    let repository: TaskRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                databaseTestModule,
                TypeOrmModule.forFeature([Task]),
            ],
            providers: [TaskService, TaskRepository],
        }).compile();

        service = module.get<TaskService>(TaskService);
        repository = module.get<TaskRepository>(getRepositoryToken(Task));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    it('should create a task', async () => {
        const task = repository.create({ title: 'Test Task', description: { content: 'Task description' }, });
        await repository.save(task);

        const foundTask = await service.findOne(task.id);
        expect(foundTask).toBeDefined();
        expect(foundTask.title).toBe('Test Task');
    });
});
