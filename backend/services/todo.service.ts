import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteTodoDto, UpdateTodoDto } from 'dto/todo.dto';
import { TodoEntity } from 'entity/todo.entity';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo({ email, title, descript }) {
    let user = await this.userRepository.findOne({ where: { email: email } });

    console.log(email, title, descript, user);

    if (!user) {
      console.log('유저 정보가 없습니다.');
    } else {
      try {
        const todoData = { user, title, descript, create_at: new Date() };
        const createData = await this.todoRepository.create(todoData);

        return await this.todoRepository.save(createData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async updateTodo(input: UpdateTodoDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    const todoData = {
      user,
      ...input,
      update_at: new Date(),
    };

    if (!user) {
      console.log('유저 정보를 찾을 수 없습니다.');
      return;
    } else {
      try {
        const result = await this.todoRepository.save(todoData);

        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async deleteTodoDto(input: DeleteTodoDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    console.log(user);

    const todoData = {
      no: input.no,
      user,
    };

    try {
      return await this.todoRepository.delete(todoData);
    } catch (error) {
      console.error(error);
    }
  }
}
