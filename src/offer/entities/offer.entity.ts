import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  Like,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('offer')
export class Offer {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  description: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.offers)
  @JoinColumn()
  user: UserEntity;

  @Field(() => [Offer], { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.liked)
  @JoinColumn()
  liked: Offer[];
  @Field(() => [Offer], { nullable: true })
  @ManyToOne(() => Offer, (offer) => offer.matches)
  @JoinColumn()
  matches: Offer[];
}
