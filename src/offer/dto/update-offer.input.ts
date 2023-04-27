import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateOfferInput } from './create-offer.input';

@InputType()
export class UpdateOfferInput extends PartialType(CreateOfferInput) {
  @Field(() => Int)
  id: number;
  @Field(() => Int, { nullable: true })
  likedId: number;
}
