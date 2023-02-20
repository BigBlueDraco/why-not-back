import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.createUser({ ...userInput });
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getAllUsers();
  }
  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }
  async updateUser(UpdateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update(
      { id: UpdateUserInput.id },
      { ...UpdateUserInput },
    );
    return await this.getOneUser(UpdateUserInput.id);
  }
}
