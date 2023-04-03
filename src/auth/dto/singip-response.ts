import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
export class SingupResponse {
  @Field()
  access_token: string;
  @Field()
  user: UserEntity;
}
