import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');
    }

    if (!input.password) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    const jwt = this.getAccessToken({ user });
    return jwt;
  }

  getAccessToken({ user }): String {
    this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: '1h',
      },
    );
    return;
  }

  setRefreshToken(user, res) {
    const refreshToken = this.jwtService.signAsync(
      {
        email: user.email,
      },
      {
        expiresIn: '2d',
      },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    return refreshToken;
  }
}
