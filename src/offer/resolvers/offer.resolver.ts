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
import { OfferPagination } from '../dto/OfferPagination.response';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  async createOffer(
    @Args('createOfferInput') createOfferInput: CreateOfferInput,
    @Context() context,
  ) {
    return await this.offerService.create(context, {
      ...createOfferInput,
    });
  }

  @Query(() => OfferPagination, { name: 'getAllOffers' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('page') page: number = 1,
    @Args('limit') limit: number = 10,
  ): Promise<OfferPagination> {
    const data = await this.offerService.findAll(page, limit);
    return data;
  }

  @Query(() => Offer, { name: 'getOfferById' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.offerService.findOne(id);
  }
  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  async updateOffer(
    @Args('updateOfferInput') updateOfferInput: UpdateOfferInput,
  ): Promise<Offer> {
    return await this.offerService.update(
      updateOfferInput.id,
      updateOfferInput,
    );
  }

  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  async removeOffer(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.remove(id);
  }

  @ResolveField((returns) => UserResponse, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async user(@Parent() offer: OfferResponse): Promise<UserResponse> {
    return await this.offerService.getUser(offer.userId);
  }

  // @ResolveField((returns) => [Offer])
  // @UseGuards(JwtAuthGuard)
  // async matches(): Promise<Offer[]> {
  //   return await this.offerService.findAll();
  // }
  // @ResolveField((returns) => [Offer])
  // @UseGuards(JwtAuthGuard)
  // async liked(): Promise<Offer[]> {
  //   return await this.offerService.findAll();
  // }
}
