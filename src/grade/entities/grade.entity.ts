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
@Entity('grades')
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  givenId: number;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.grades, { onDelete: 'CASCADE' })
  @JoinColumn()
  given: Offer;

  @Field()
  @Column()
  receivedId: number;

  @Field(() => Offer)
  @ManyToOne(() => Offer, (offer) => offer.graded, { onDelete: 'CASCADE' })
  @JoinColumn()
  received: Offer;

  @Field(() => String)
  @Column()
  grade: string;
}
