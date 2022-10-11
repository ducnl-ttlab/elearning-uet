import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

// This should be a real class/interface representing a user entity
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
