import { UseGuards, Headers } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../dto/get-user.response';
import { JwtService } from '@nestjs/jwt';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
  @Query(() => [UserResponse])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Context() context): Promise<UserResponse[]> {
    return await this.usersService.getAllUsers();
  }
  @Query(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Context() context): Promise<UserResponse> {
    const req = context.req;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    return await this.usersService.getOneUser(decoded.sub);
  }
}
