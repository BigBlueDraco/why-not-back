import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType()
export class SignupUserInput {
  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  password: string;
}
