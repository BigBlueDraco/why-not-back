import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Offer } from 'src/offer/entities/offer.entity';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => [Offer], { nullable: true })
  offers: Offer[];
}
