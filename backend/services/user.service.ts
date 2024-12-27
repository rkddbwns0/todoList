import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'dto/user.dto';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(input: CreateUserDto) {
    let user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      const create_user = await this.userRepository.create({
        ...input,
        create_at: new Date(),
      });
      return await this.userRepository.save(create_user);
    }
  }
}
