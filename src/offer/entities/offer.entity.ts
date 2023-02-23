import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Offer {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  user: UserEntity;
}
