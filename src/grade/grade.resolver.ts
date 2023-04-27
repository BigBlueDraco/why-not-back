import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GradeService } from './grade.service';
import { Grade } from './entities/grade.entity';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/services/offer.service';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(
    private readonly likeService: GradeService,
    private readonly offerService: OfferService,
  ) {}

  @Mutation(() => Grade, { name: 'CreateLike' })
  createLike(@Args('createLikeInput') createLikeInput: CreateGradeInput) {
    return this.likeService.create(createLikeInput);
  }

  @Query(() => [Grade], { name: 'getAllLikes' })
  async findAll() {
    return await this.likeService.findAll();
  }

  @Query(() => Grade, { name: 'like' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.findOne(id);
  }

  @Mutation(() => Grade)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateGradeInput) {
    return this.likeService.update(updateLikeInput.id, updateLikeInput);
  }

  @Mutation(() => Grade)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.remove(id);
  }
  @ResolveField((returns) => Offer)
  async given(@Parent() like: Grade) {
    return await this.offerService.findOne(like.givenId);
  }
  @ResolveField((returns) => Offer)
  async received(@Parent() like: Grade) {
    return await this.offerService.findOne(like.receivedId);
  }
}
