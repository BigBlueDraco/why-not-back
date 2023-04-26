import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Like } from 'src/like/entities/like.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('offers')
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
  @Column()
  @Field()
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.offers, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.received)
  @JoinColumn()
  liked: Like[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.given)
  @JoinColumn()
  likes: Like[];

  @Field(() => [Offer], { nullable: true })
  @OneToMany(() => Offer, (offer) => offer.matches)
  @JoinColumn()
  matches: Offer[];
}
