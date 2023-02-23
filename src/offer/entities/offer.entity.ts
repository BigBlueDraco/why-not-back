import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('offer')
export class Offer {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  description: string;
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.offers)
  user: UserEntity;
}
