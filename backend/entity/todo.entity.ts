import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  descript: string;

  @Column({ type: 'datetime' })
  create_at: Date;

  @Column({ type: 'datetime', default: null })
  update_at: Date;

  @ManyToOne((type) => UserEntity, (user) => user.todo)
  @JoinColumn({ name: 'userId', referencedColumnName: 'email' })
  user: UserEntity;
}
