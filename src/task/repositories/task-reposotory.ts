import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";

export class TaskRepository extends Repository<Task>{
    getTask(id: number): Promise<Task> {
        return this.findOne({
            where: { id: id }
        })
    }
}