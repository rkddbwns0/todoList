import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import {
  CreateTodoDto,
  DeleteTodoDto,
  SelectTodoDto,
  SuccessTodoDto,
  UpdateTodoDto,
} from 'dto/todo.dto';
import { Response } from 'express';
import { TodoService } from 'services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('select')
  async selectTodo(@Body() selectTodoDto: SelectTodoDto, @Res() res: Response) {
    try {
      console.log(selectTodoDto);
      const result = await this.todoService.selectTodo(selectTodoDto);
      console.log(result);
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

  @Put('update')
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoService.updateTodo(updateTodoDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('success')
  async successTodo(@Body() successTodoDto: SuccessTodoDto) {
    try {
      return await this.todoService.successTodo(successTodoDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('delete')
  async deleteTodoDto(@Body() deleteTodoDto: DeleteTodoDto) {
    try {
      return await this.todoService.deleteTodo(deleteTodoDto);
    } catch (error) {
      console.error(error);
    }
  }
}
