import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user.input';
import { SignupUserInput } from '../dto/signup-user.input';
import { SingupResponse } from '../dto/singip-response';
import { GqlAuthGuard } from '../gql-auth.guard';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SingupResponse)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.singnup(signupUserInput);
  }
}
