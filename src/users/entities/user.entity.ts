import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Offer } from 'src/offer/entities/offer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
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
  @Unique(['email'])
  email: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Offer])
  @OneToMany(() => Offer, (offers) => offers.user)
  @JoinColumn()
  offers: Offer[];
}
