import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  CreateTodoDto,
  DeleteTodoDto,
  SelectTodoDto,
  UpdateTodoDto,
} from 'dto/todo.dto';
import { TodoService } from 'services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('select')
  async selectTodo(@Body() selectTodoDto: SelectTodoDto) {
    try {
      return await this.todoService.selectTodo(selectTodoDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('create')
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.createTodo(createTodoDto);
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

  @Delete('delete')
  async deleteTodoDto(@Body() deleteTodoDto: DeleteTodoDto) {
    try {
      return await this.todoService.deleteTodoDto(deleteTodoDto);
    } catch (error) {
      console.error(error);
    }
  }
}
