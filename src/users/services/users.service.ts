import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { OfferService } from 'src/offer/services/offer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => OfferService))
    private readonly offerService: OfferService,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.save({ ...userInput });
  }

  async getOneUser(id: number): Promise<any> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        offers: true,
      },
    });
  }
  async getOneUserByEmail(email: string): Promise<any> {
    const users = await this.getAllUsers();
    const user = users.find((elem) => elem.email === email);
    return await user;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['offers'] });
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
  async findOffersForUser(id) {
    const offers = await this.offerService.findAll();
    console.log(offers);
    return await this.offerService.findAll();
  }
  async userFromContext(context: any): Promise<any> {
    const req = context.req;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [, token] = authHeader.split(' ');
    if (!token) {
      return null;
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return await this.getOneUser(decoded.sub);
    } catch (err) {
      return null;
    }
  }
}
