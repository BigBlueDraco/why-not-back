import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field(() => Int)
  givenId: number;

  @Field(() => Int)
  receivedId: number;
}
