import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'dto/user.dto';
import { Response } from 'express';
import { UserService } from 'services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      await this.userService.createUser(createUserDto);
      return res.status(200).json({ message: '회원가입에 성공하였습니다!' });
    } catch (error) {
      return res.status(400).json({
        message: '회원가입에 실패하였습니다. 입력 정보를 다시 확인해 주세요.',
      });
    }
  }
}
