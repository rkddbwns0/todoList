import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'dto/user.dto';
import { UserService } from 'services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
