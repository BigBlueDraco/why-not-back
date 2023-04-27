import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Offer } from './entities/offer.entity';
import { OfferResolver } from './resolvers/offer.resolver';
import { OfferService } from './services/offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), forwardRef(() => UsersModule)],
  providers: [OfferResolver, OfferService],
  exports: [OfferService],
})
export class OfferModule {}
