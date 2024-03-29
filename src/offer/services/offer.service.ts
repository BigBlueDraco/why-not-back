import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { OfferPagination } from '../dto/OfferPagination.response';
import { CreateOfferInput } from '../dto/create-offer.input';
import { OfferResponse } from '../dto/offer.response';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { Offer } from '../entities/offer.entity';
import { FileService } from 'src/file/file.service';
import { FileUpload, Upload } from 'graphql-upload-ts';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}
  createPagination({ items, meta }) {
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
  async create(
    context: any,
    createOfferInput: CreateOfferInput,
    file: FileUpload,
  ): Promise<OfferResponse> {
    const user = await this.usersService.userFromContext(context);
    const uploadetFile = await this.fileService.uploadToDrive({
      file,
      userId: user.id,
    });
    const offer = await this.offerRepository.save({
      userId: user.id,
      ...createOfferInput,
      img: uploadetFile,
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
          graded: true,
        },
      },
    );
    return this.createPagination({ items, meta });
  }

  async findOffersWithotCurrentUserOffers(
    context: any,
    page: number = 1,
    limit: number = 10,
  ) {
    const currentUser = await this.usersService.userFromContext(context);

    const { meta, items } = await paginate(
      this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.user', 'user')
        .leftJoinAndSelect('offer.graded', 'graded')
        .leftJoinAndSelect('offer.grades', 'grades')
        .where('offer.userId != :currentUserId', {
          currentUserId: currentUser.id,
        }),
      {
        page: 1,
        limit: 10,
      },
    );
    return this.createPagination({ items, meta });
  }

  async findOne(id: number): Promise<any> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: { user: true, graded: true, grades: true },
    });
    return offer;
  }

  async update(
    id: number,
    updateOfferInput: UpdateOfferInput,
    file?: FileUpload,
  ): Promise<any> {
    const updetetOffer = await this.offerRepository.findOne({
      where: { id: id },
    });
    const uploadetFile = await this.fileService.uploadToDrive({
      file,
      userId: updetetOffer.user.id,
    });
    const res = await this.offerRepository.update(id, {
      ...updateOfferInput,
      img: uploadetFile,
    });

    return res;
  }

  async remove(id: number) {
    return await this.offerRepository.delete({ id });
  }
  async getUser(userId: number): Promise<UserEntity> {
    return await this.usersService.getOneUser(userId);
  }
}
