import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { QueryListingsDto } from './dto/query-listings.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepo: Repository<Listing>,
  ) {}

  async findAll(query: QueryListingsDto, isAdmin: boolean) {
    const qb = this.listingRepo
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.agent', 'agent');

    if (query.price_min !== undefined) {
      qb.andWhere('listing.price >= :min', {
        min: Number(query.price_min),
      });
    }

    if (query.price_max !== undefined) {
      qb.andWhere('listing.price <= :max', {
        max: Number(query.price_max),
      });
    }

    if (query.beds !== undefined) {
      qb.andWhere('listing.beds = :beds', {
        beds: Number(query.beds),
      });
    }

    if (query.baths !== undefined) {
      qb.andWhere('listing.baths = :baths', {
        baths: Number(query.baths),
      });
    }

    if (query.propertyType) {
      qb.andWhere('LOWER(listing.propertyType) = LOWER(:type)', {
        type: query.propertyType,
      });
    }

    if (query.suburb) {
      qb.andWhere('LOWER(listing.suburb) LIKE LOWER(:suburb)', {
        suburb: `%${query.suburb}%`,
      });
    }

    if (query.keyword) {
      qb.andWhere(
        '(LOWER(listing.title) LIKE LOWER(:kw) OR LOWER(listing.description) LIKE LOWER(:kw))',
        {
          kw: `%${query.keyword}%`,
        },
      );
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    qb.skip((page - 1) * limit).take(limit);

    console.log(qb.getSql());
    console.log(qb.getParameters());

    const [data, total] = await qb.getManyAndCount();

    const result = data.map((listing) => {
      if (!isAdmin) delete listing.internalNotes;
      return listing;
    });

    return { items: result, total };
  }

  async findOne(id: number, isAdmin: boolean) {
    const listing = await this.listingRepo.findOne({
      where: { id },
      relations: ['agent'],
    });

    // !check if internal status notes are seen by admin
    // !uncomment the below line to test internalNotes visibility for admin users

    // isAdmin = true;

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (!isAdmin) {
      delete listing.internalNotes;
    }

    return listing;
  }
}
