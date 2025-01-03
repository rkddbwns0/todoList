import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtServiceStrategy } from 'auth/jwt/jwt-service.strategy';
import { LoacalServiceSrategy } from 'auth/jwt/local-service.strategy';
import { AuthController } from 'controllers/auth.controller';
import { UserEntity } from 'entity/user.entity';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_TOKEN_SECRET'),
          global: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LoacalServiceSrategy,
    JwtServiceStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
