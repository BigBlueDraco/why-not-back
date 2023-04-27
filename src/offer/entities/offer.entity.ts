import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Grade } from 'src/grade/entities/grade.entity';
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

  @Field(() => [Grade], { nullable: true })
  @OneToMany(() => Grade, (grade) => grade.received)
  @JoinColumn()
  graded: Grade[];

  @Field(() => [Grade], { nullable: true })
  @OneToMany(() => Grade, (grade) => grade.given)
  @JoinColumn()
  grades: Grade[];

  @Field(() => [Offer], { nullable: true })
  @OneToMany(() => Offer, (offer) => offer.matches)
  @JoinColumn()
  matches: Offer[];
}
