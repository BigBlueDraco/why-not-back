import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOfferInput {
  @Field()
  title: string;
  @Field()
  description: string;
}
