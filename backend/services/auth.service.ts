import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    const user = await this.validateServiceUser(input.email, input.password);
    const access_token = await this.aceessJwtLoginService(user);
    const refresh_token = await this.refreshJwtLoginService(user);

    await this.currentUserRefreshToken(input.email, refresh_token);

    return { access_token, refresh_token };
  }

  async validateServiceUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new ForbiddenException('등록되지 않은 사용자입니다.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }

  async aceessJwtLoginService(user: UserEntity) {
    const payload = {
      email: user.email,
      name: user.name,
    };

    const access_token = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    return access_token;
  }

  async refreshJwtLoginService(user: UserEntity) {
    const payload = {
      email: user.email,
      name: user.name,
    };

    const refresh_token = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return refresh_token;
  }

  async currentUserRefreshToken(email: string, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    const now = new Date();
    const refreshTokenExp = new Date(now.getTime() + 604800000);

    const update = await this.userRepository.update(
      { email: email },
      {
        refresh_token: hashRefreshToken,
        refresh_token_exp: refreshTokenExp,
      },
    );

    return update;
  }
}
