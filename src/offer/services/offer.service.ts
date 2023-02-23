import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
  ) {}
  async create({ createOfferInput, userId }): Promise<Offer> {
    const user = await this.usersService.getOneUser(userId);
    const offer = await this.offerRepository.save({
      ...createOfferInput,
      user,
    });
    this.usersService.updateUser({ ...user, ...offer });
    return offer;
  }

  findAll() {
    return `This action returns all offer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferInput: UpdateOfferInput) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
