import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'datetime' })
  create_at: Date;

  @OneToMany((type) => TodoEntity, (todo) => todo.user)
  todo: TodoEntity[];
}
