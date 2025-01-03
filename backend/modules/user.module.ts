import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'controllers/user.controller';
import { UserEntity } from 'entity/user.entity';
import { UserService } from 'services/user.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
