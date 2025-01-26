import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";


@Entity()
export class UserTaskRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Task)
  task: Task;

  @Column()
  role: string;
}
