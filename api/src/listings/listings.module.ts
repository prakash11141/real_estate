import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listing } from './entities/listing.entity';
import { Agent } from 'http';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Agent])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
