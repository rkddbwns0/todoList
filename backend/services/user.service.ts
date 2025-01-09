import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LogoutDto } from 'dto/user.dto';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }

  async duplicateEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }

    return user;
  }

  async createUser(input: CreateUserDto) {
    try {
      let user = await this.userRepository.findOne({
        where: { email: input.email },
      });

      if (!user) {
        const create_user = await this.userRepository.create({
          ...input,
          create_at: new Date(),
        });
        await this.userRepository.save(create_user);
        return { message: '회원가입 성공' };
      }
    } catch (error) {
      return { message: '회원가입 실패', error: error };
    }
  }
}
