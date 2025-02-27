import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(
  Strategy,
  'jwt-service',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_TOKEN_SECRET'),
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.token;
        },
      ]),
    });
  }

  async validate(payload: any) {
    console.log(this.validate);
    return {
      email: payload.email,
      name: payload.name,
    };
  }
}
