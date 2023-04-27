import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/services/offer.service';
import { CreateGradeInput } from './dto/create-grade.input';
import { Grade } from './entities/grade.entity';
import { GradeService } from './grade.service';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(
    private readonly gradeService: GradeService,
    private readonly offerService: OfferService,
  ) {}

  @Mutation(() => Grade, { name: 'CreateGrade' })
  createLike(@Args('createGradeInput') createGradeInput: CreateGradeInput) {
    return this.gradeService.create(createGradeInput);
  }
  @Mutation(() => Grade)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.gradeService.remove(id);
  }

  @ResolveField((returns) => Offer)
  async given(@Parent() grade: Grade) {
    return await this.offerService.findOne(grade.givenId);
  }
  @ResolveField((returns) => Offer)
  async received(@Parent() grade: Grade) {
    return await this.offerService.findOne(grade.receivedId);
  }
}
