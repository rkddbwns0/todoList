import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LogoutDto } from 'dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(input: LoginDto) {
    const user = await this.validateServiceUser(input.email, input.password);
    const access_token = await this.aceessJwtLoginService(user);
    const refresh_token = await this.refreshJwtLoginService(user);

    const storageData = { email: user.email, name: user.name };

    await this.currentUserRefreshToken(input.email, refresh_token);

    return { access_token, refresh_token, storageData };
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

  async logout(tokenInfo: any) {
    const decodeRefreshToekn = this.jwtService.verify(tokenInfo.refresh_token, {
      secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
    });

    const userId = decodeRefreshToekn.email;

    const user = await this.userRepository.findOne({
      where: { email: userId },
    });

    user.refresh_token = null;
    this.userRepository.save(user);
  }
}
