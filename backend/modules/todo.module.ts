import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'controllers/todo.controller';
import { TodoEntity } from 'entity/todo.entity';
import { UserEntity } from 'entity/user.entity';
import { TodoService } from 'services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
