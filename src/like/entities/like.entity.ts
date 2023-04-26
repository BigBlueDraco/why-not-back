import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Offer } from 'src/offer/entities/offer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('likes')
export class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  givenId: number;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.likes, { onDelete: 'CASCADE' })
  @JoinColumn()
  given: Offer;

  @Field()
  @Column()
  receivedId: number;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.liked, { onDelete: 'CASCADE' })
  @JoinColumn()
  received: Offer;
}
