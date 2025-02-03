import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { TaskDescription } from './entities/task-description.entity';
import { Task } from './entities/task.entity';
import { UserTaskRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskDescription, Attachment, User, UserTaskRole])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
