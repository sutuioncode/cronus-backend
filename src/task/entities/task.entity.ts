import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Attachment } from './attachment.entity';
import { TaskDescription } from './task-description.entity';
import { User } from './user.entity';
import { AutoMap } from "@automapper/classes";

@Entity()
export class Task {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  
  @AutoMap()
  @Column()
  title: string;
  
  // @Column({ type: "enum", enum: ["High", "Medium", "Low"], default: "Medium" })
  // priority: "High" | "Medium" | "Low";
  
  @AutoMap(() => [String])
  @Column("simple-array", { nullable: true })
  tags: string[];
  
  @Column({ default: false })
  isCompleted: boolean;
  
  @OneToOne(() => TaskDescription, { cascade: true })
  @JoinColumn()
  description: TaskDescription;

  @OneToMany(() => Attachment, attachment => attachment.task, { cascade: true })
  attachments: Attachment[];

  @ManyToMany(() => User, user => user.tasks)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
