import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferResolver } from './offer.resolver';

@Module({
  providers: [OfferResolver, OfferService]
})
export class OfferModule {}
