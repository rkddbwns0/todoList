import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from 'dto/user.dto';
import { Response } from 'express';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      await this.authService.setRefreshToken(loginDto, res);
      const jwt = await this.authService.login(loginDto);
      console.log(jwt);
      return res.status(200).send(jwt);
    } catch (error) {
      console.error(error);
    }
  }
}