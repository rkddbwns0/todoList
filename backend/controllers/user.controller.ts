import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'dto/user.dto';
import { Response } from 'express';
import { UserService } from 'services/user.service';
import { LocalServiceAuthGuard } from 'auth/jwt/local-service.guard';
import { AuthService } from 'services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      await this.userService.duplicateEmail(createUserDto.email);

      const hashPassword = await this.userService.hashPassword(
        createUserDto.password,
      );

      createUserDto.password = hashPassword;

      await this.userService.createUser(createUserDto);
      return res.status(200).json({ message: '회원가입에 성공하였습니다' });
    } catch (error) {
      return res.status(400).json({
        message: '회원가입에 실패하였습니다. 입력 정보를 다시 확인해 주세요.',
      });
    }
  }

  @UseGuards(LocalServiceAuthGuard)
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }
}
