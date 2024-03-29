import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponse } from 'src/users/dto/get-user.response';
import { OfferPagination } from '../dto/OfferPagination.response';
import { CreateOfferInput } from '../dto/create-offer.input';
import { OfferResponse } from '../dto/offer.response';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { Offer } from '../entities/offer.entity';
import { OfferService } from '../services/offer.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Mutation(() => Offer)
  @UseGuards(JwtAuthGuard)
  async createOffer(
    @Args('createOfferInput') createOfferInput: CreateOfferInput,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Context() context,
  ) {
    return await this.offerService.create(
      context,
      {
        ...createOfferInput,
      },
      file,
    );
  }

  @Query(() => OfferPagination, { name: 'getAllOffers' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('page', { nullable: true }) page: number,
    @Args('limit', { nullable: true }) limit: number,
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

  @Query(() => OfferPagination, { name: 'getOffersForUser' })
  @UseGuards(JwtAuthGuard)
  async findOffersWithotCurrentUserOffers(
    @Context() context,
    @Args('page', { nullable: true }) page: number,
    @Args('limit', { nullable: true }) limit: number,
  ): Promise<OfferPagination> {
    return this.offerService.findOffersWithotCurrentUserOffers(
      context,
      page,
      limit,
    );
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
