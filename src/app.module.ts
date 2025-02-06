import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from './database.module';
import { automapperModule } from './automapper.module';
import { TaskModule } from './task/task.module';
import { GetTaskMappingProfile } from './task/mapping-profile/get-task.mapping';

@Module({
  imports: [TaskModule, databaseModule, automapperModule],
  controllers: [AppController],
  providers: [AppService, GetTaskMappingProfile],
})
export class AppModule { }
