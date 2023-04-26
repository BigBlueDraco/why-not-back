import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateOfferInput } from '../dto/create-offer.input';
import { OfferResponse } from '../dto/offer.response';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { Offer } from '../entities/offer.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { OfferPagination } from '../dto/OfferPagination.response';
import { Pagination } from 'src/pagination/paginationType';
import { log } from 'console';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  async create(
    context: any,
    createOfferInput: CreateOfferInput,
  ): Promise<OfferResponse> {
    const user = await this.usersService.userFromContext(context);

    const offer = await this.offerRepository.save({
      userId: user.id,
      ...createOfferInput,
    });
    return offer;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<OfferPagination> {
    const { meta, items } = await paginate(
      this.offerRepository,
      { page, limit },
      {
        relations: {
          user: true,
          liked: true,
        },
      },
    );
    return {
      items: items,
      pagination: {
        totalItems: meta.totalItems,
        itemCount: meta.itemCount,
        itemsPerPage: meta.itemsPerPage,
        totalPages: meta.totalPages,
        currentPage: meta.currentPage,
      },
    };
  }

  async findOne(id: number): Promise<any> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: { user: true, liked: true },
    });
    log(offer);
    return offer;
  }

  async update(id: number, updateOfferInput: UpdateOfferInput): Promise<any> {
    const { likedId, ...rest } = updateOfferInput;
    const liked = await this.offerRepository.findOne({
      where: { id: likedId },
    });
    const offer = await this.offerRepository.findOne({
      where: { id: id },
      relations: { liked: true },
    });
    const res = await this.offerRepository.update(id, { ...offer });
    return res;
  }

  async remove(id: number) {
    return await this.offerRepository.delete({ id });
  }
  async getUser(userId: number): Promise<UserEntity> {
    return await this.usersService.getOneUser(userId);
  }
}
