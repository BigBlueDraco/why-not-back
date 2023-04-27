import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from '../dto/create-user.input';
import { UserResponse } from '../dto/get-user.response';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserResponse> {
    return await this.usersService.updateUser(updateUserInput);
  }
  @Mutation(() => Number)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.usersService.removeUser(id);
  }

  @Query(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Args('id') id: number): Promise<UserResponse> {
    return await this.usersService.getOneUser(id);
  }
  @Query(() => [UserResponse], { name: 'getAllUsers' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context() context): Promise<UserResponse[]> {
    return await this.usersService.getAllUsers();
  }
  @Query(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Context() context): Promise<UserResponse> {
    return await this.usersService.userFromContext(context);
  }
}
