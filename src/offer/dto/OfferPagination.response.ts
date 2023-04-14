import { Field, ObjectType } from '@nestjs/graphql';
import { Offer } from '../entities/offer.entity';
import { Pagination } from 'src/pagination/paginationType';

@ObjectType()
export class OfferPagination {
  @Field(() => [Offer])
  items: Offer[];

  @Field(() => Pagination)
  pagination: Pagination;
}
