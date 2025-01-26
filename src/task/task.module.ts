import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskDescription } from './entities/task-description.entity';
import { Attachment } from './entities/attachment.entity';
import { User } from './entities/user.entity';
import { UserTaskRole } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskDescription, Attachment, User, UserTaskRole])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
