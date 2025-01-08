import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import {
  CreateTodoDto,
  DeleteTodoDto,
  PinTodoDto,
  SelectTodoDto,
  SuccessTodoDto,
} from 'dto/todo.dto';
import { Response } from 'express';
import { TodoService } from 'services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('select')
  async selectTodo(@Body() selectTodoDto: SelectTodoDto, @Res() res: Response) {
    try {
      const result = await this.todoService.selectTodo(selectTodoDto);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('create')
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    try {
      await this.todoService.createTodo(createTodoDto);
      res.status(200).json({ message: '작성 성공' });
    } catch (error) {
      console.error(error);
    }
  }

  @Put('success')
  async successTodo(
    @Body() successTodoDto: SuccessTodoDto,
    @Res() res: Response,
  ) {
    try {
      await this.todoService.successTodo(successTodoDto);
      res.status(200).json({ message: '변경 완료' });
    } catch (error) {
      console.error(error);
    }
  }

  @Put('pin')
  async PinTodoDto(@Body() pinTodoDto: PinTodoDto, @Res() res: Response) {
    try {
      await this.todoService.pinTodo(pinTodoDto);
      res.status(200).json({ message: '고정 성공' });
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('delete')
  async deleteTodoDto(
    @Body() deleteTodoDto: DeleteTodoDto,
    @Res() res: Response,
  ) {
    try {
      await this.todoService.deleteTodo(deleteTodoDto);
      res.status(200).json({ message: '삭제 성공' });
    } catch (error) {
      console.error(error);
    }
  }
}
