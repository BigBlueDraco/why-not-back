import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferResolver } from './resolvers/offer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), UsersModule],
  providers: [OfferResolver, OfferService],
})
export class OfferModule {}
