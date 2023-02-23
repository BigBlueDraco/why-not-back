import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.save({ ...userInput });
  }

  async getOneUser(id: number): Promise<any> {
    return await this.userRepository.findOneBy({ id });
  }
  async getOneUserByEmail(email: string): Promise<any> {
    const users = await this.getAllUsers();
    const user = users.find((elem) => elem.email === email);
    return await user;
  }
  async getAllUsers(): Promise<any[]> {
    return await this.userRepository.find();
  }
  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }
  async updateUser(UpdateUserInput: UpdateUserInput): Promise<UserEntity> {
    console.log(UpdateUserInput);
    await this.userRepository.update(
      { id: UpdateUserInput.id },
      { ...UpdateUserInput },
    );
    return await this.getOneUser(UpdateUserInput.id);
  }
}
