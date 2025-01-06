import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoDto,
  DeleteTodoDto,
  SelectTodoDto,
  SuccessTodoDto,
  UpdateTodoDto,
} from 'dto/todo.dto';
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

  async selectTodo(input: SelectTodoDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      console.log('유저 정보가 없습니다.');
    } else {
      try {
        const result = await this.todoRepository.find({
          where: { user },
        });
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async createTodo(input: CreateTodoDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      console.log('유저 정보가 없습니다.');
    } else {
      try {
        const todoData = { user, ...input, create_at: new Date() };
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

  async deleteTodo(input: DeleteTodoDto) {
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

  async successTodo(input: SuccessTodoDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      console.log('유저 정보가 없잖아');
    }

    const findTodoData = await this.todoRepository.findOne({
      where: {
        user: user,
        no: input.no,
      },
    });

    if (!findTodoData) {
      console.log('해당 데이터가 없습니다.');
    }

    await this.todoRepository.update(findTodoData, { isDone: true });
  }
}
