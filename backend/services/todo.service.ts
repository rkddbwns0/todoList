import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoDto,
  DeleteTodoDto,
  PinTodoDto,
  SelectTodoDto,
  SuccessTodoDto,
} from 'dto/todo.dto';
import { TodoEntity } from 'entity/todo.entity';
import { UserEntity } from 'entity/user.entity';
import { In, Like, Raw, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async selectTodo(input: SelectTodoDto) {
    const today = new Date();
    const formatToday = today.toISOString().split('T')[0];
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      console.log('유저 정보가 없습니다.');
    } else {
      try {
        const result = await this.todoRepository.find({
          where: {
            user,
            create_at: Raw((alias) => `${alias} Like '${formatToday}%'`),
          },
          order: { pin: 'DESC', isDone: 'DESC', create_at: 'ASC' },
        });
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

  async deleteTodo(input: DeleteTodoDto) {
    console.log(input);
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

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

    const findTodoData = await this.todoRepository.find({
      where: {
        user: user,
        no: input.no,
      },
    });

    if (!findTodoData) {
      console.log('해당 데이터가 없습니다.');
    }

    await this.todoRepository.update({ no: input.no }, { isDone: true });
  }

  async pinTodo(input: PinTodoDto) {
    try {
      let user = await this.userRepository.findOne({
        where: { email: input.email },
      });

      const findData = await this.todoRepository.findOne({
        where: { user: user, no: input.no },
      });

      if (findData.pin === false) {
        await this.todoRepository.update(findData.no, { pin: true });
      } else {
        await this.todoRepository.update(findData.no, { pin: false });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
