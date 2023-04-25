import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../dto/get-user.response';

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

  // @ResolveField((returns) => [OfferResponse])
  // @UseGuards(JwtAuthGuard)
  // async offers(): Promise<Offer[]> {
  //   console.log('1');
  //   return await this.usersService.findOffersForUser(1);
  // }
}
