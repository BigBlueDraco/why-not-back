import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity, UserEntitySecure } from '../entities/user.entity';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';
import { UsersService } from '../services/users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntitySecure> {
    return await this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(updateUserInput);
  }
  @Mutation(() => Number)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.usersService.removeUser(id);
  }

  @Query(() => UserEntitySecure)
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Args('id') id: number): Promise<UserEntitySecure> {
    return await this.usersService.getOneUser(id);
  }
  @Query(() => [UserEntitySecure])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserEntitySecure[]> {
    return await this.usersService.getAllUsers();
  }
}
