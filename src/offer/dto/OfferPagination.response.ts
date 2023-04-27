import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/pagination/paginationType';
import { Offer } from '../entities/offer.entity';

@ObjectType()
export class OfferPagination {
  @Field(() => [Offer])
  items: Offer[];

  @Field(() => Pagination)
  pagination: Pagination;
}
