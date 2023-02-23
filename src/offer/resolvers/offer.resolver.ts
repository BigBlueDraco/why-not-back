import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OfferService } from '../services/offer.service';
import { Offer } from '../entities/offer.entity';
import { CreateOfferInput } from '../dto/create-offer.input';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  createOffer(
    @Args('createOfferInput') createOfferInput: CreateOfferInput,
    @Args('userId') userId: number,
  ) {
    return this.offerService.create({
      createOfferInput,
      userId: userId,
    });
  }

  @Query(() => [Offer], { name: 'offer' })
  findAll() {
    return this.offerService.findAll();
  }

  @Query(() => Offer, { name: 'offer' })
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
