import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateOfferInput } from '../dto/create-offer.input';
import { OfferResponse } from '../dto/offer.response';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    context: any,
    createOfferInput: CreateOfferInput,
  ): Promise<OfferResponse> {
    const { id: userId } = await this.usersService.userFromContext(context);
    const offer = await this.offerRepository.save({
      ...userId,
      ...createOfferInput,
    });
    return offer;
  }

  async findAll(): Promise<Offer[]> {
    return await this.offerRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<any> {
    return await this.offerRepository.findOneBy({ id });
  }

  async update(id: number, updateOfferInput: UpdateOfferInput): Promise<any> {
    const res = await this.offerRepository.update(id, { ...updateOfferInput });
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.offerRepository.delete({ id });
  }
  async getUser(userId: number): Promise<UserEntity> {
    return await this.usersService.getOneUser(userId);
  }
}
