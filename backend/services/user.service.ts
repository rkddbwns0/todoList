import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entity/user.entity';
import { response } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({ name, email, password }) {
    let user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      const create_user = await this.userRepository.create({
        name,
        email,
        password,
        create_at: new Date(),
      });
      return await this.userRepository.save(create_user);
    }
  }
}
