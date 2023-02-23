import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';

@Injectable()
export class OfferService {
  create(createOfferInput: CreateOfferInput) {
    return 'This action adds a new offer';
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
