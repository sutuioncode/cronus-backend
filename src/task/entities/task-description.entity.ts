import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TaskDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;
}


