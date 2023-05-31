import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ToDoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;
}
