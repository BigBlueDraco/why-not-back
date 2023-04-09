import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
export class OfferResponse {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  userId: number;
  @Field(() => UserEntity)
  user: UserEntity;
}
