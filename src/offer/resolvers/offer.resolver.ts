import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OfferService } from '../services/offer.service';
import { Offer } from '../entities/offer.entity';
import { CreateOfferInput } from '../dto/create-offer.input';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OfferResponse } from '../dto/offer.response';
import { UserResponse } from 'src/users/dto/get-user.response';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  createOffer(@Args('createOfferInput') createOfferInput: CreateOfferInput) {
    return this.offerService.create({
      ...createOfferInput,
    });
  }

  @Query(() => [Offer], { name: 'getAllOffers' })
  findAll(): Promise<Offer[]> {
    return this.offerService.findAll();
  }

  @ResolveField((returns) => UserResponse)
  user(@Parent() offer: OfferResponse): Promise<UserResponse> {
    return this.offerService.getUser(offer.userId);
  }

  @Query(() => Offer, { name: 'getUserById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.findOne(id);
  }

  @Mutation(() => Offer)
  updateOffer(@Args('updateOfferInput') updateOfferInput: UpdateOfferInput) {
    return this.offerService.update(updateOfferInput.id, updateOfferInput);
  }

  @Mutation(() => Offer)
  removeOffer(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.remove(id);
  }
}
