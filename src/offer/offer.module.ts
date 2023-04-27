import { Module, forwardRef } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferResolver } from './resolvers/offer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { UsersModule } from 'src/users/users.module';
import { GradeModule } from 'src/grade/grade.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), forwardRef(() => UsersModule)],
  providers: [OfferResolver, OfferService],
  exports: [OfferService],
})
export class OfferModule {}
