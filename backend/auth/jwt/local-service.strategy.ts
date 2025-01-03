import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { LoginDto } from 'dto/user.dto';
import { Strategy } from 'passport-local';
import { AuthService } from 'services/auth.service';

@Injectable()
export class LoacalServiceSrategy extends PassportStrategy(
  Strategy,
  'local-service',
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateServiceUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
