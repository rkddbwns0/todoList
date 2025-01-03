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
}
