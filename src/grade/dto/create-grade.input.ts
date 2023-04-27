import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGradeInput {
  @Field(() => Int)
  givenId: number;

  @Field(() => Int)
  receivedId: number;
}
