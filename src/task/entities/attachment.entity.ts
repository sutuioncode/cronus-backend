import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  size: number;

  @ManyToOne(() => Task, task => task.attachments)
  task: Task;
}