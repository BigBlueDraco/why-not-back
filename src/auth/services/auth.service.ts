import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from '../dto/signup-user.input';
import { hash } from 'bcrypt';
import { SingupResponse } from '../dto/singip-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  //   Почисти цю функцію і зроби типи більш правильними
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneUserByEmail(email);
    if (user && user?.password === password) {
      //Зроби більш безпечним
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: UserEntity): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign({
        username: user.email,
        sub: user.id,
      }),
      user,
    };
  }
  async singnup(singnupUserInput: SignupUserInput): Promise<SingupResponse> {
    const { email, password } = singnupUserInput;
    const user = await this.usersService.getOneUserByEmail(email);
    if (user) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await this.usersService.createUser({
      ...singnupUserInput,
      password: hashedPassword,
    });
    return {
      access_token: this.jwtService.sign({
        username: newUser.email,
        sub: newUser.id,
      }),
      user: newUser,
    };
  }
}
