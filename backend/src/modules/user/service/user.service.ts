import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'database/constant';
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

  async updateUser(id: string, properties: Partial<User>) {
    try {
      let result = await this.userRepository.save({
        ...properties,
        id: id,
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: string) {
    try {
      return this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findGoogleUser(email: string, password: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          email,
          password,
          provider: Provider.google,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
