import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  first_name: string;
  @Field({ nullable: true })
  last_name: string;
  @Field()
  password: string;
}
