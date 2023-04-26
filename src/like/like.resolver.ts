import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/services/offer.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(
    private readonly likeService: LikeService,
    private readonly offerService: OfferService,
  ) {}

  @Mutation(() => Like, { name: 'CreateLike' })
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likeService.create(createLikeInput);
  }

  @Query(() => [Like], { name: 'getAllLikes' })
  async findAll() {
    return await this.likeService.findAll();
  }

  @Query(() => Like, { name: 'like' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.findOne(id);
  }

  @Mutation(() => Like)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
    return this.likeService.update(updateLikeInput.id, updateLikeInput);
  }

  @Mutation(() => Like)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.remove(id);
  }
  @ResolveField((returns) => Offer)
  async given(@Parent() like: Like) {
    return await this.offerService.findOne(like.givenId);
  }
  @ResolveField((returns) => Offer)
  async received(@Parent() like: Like) {
    return await this.offerService.findOne(like.receivedId);
  }
}
