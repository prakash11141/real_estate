import {
  Controller,
  Get,
  Param,
  Query,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { QueryListingsDto } from './dto/query-listings.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  findAll(@Query() query: QueryListingsDto, @Headers('role') role: string) {
    const isAdmin = role === 'admin';
    return this.listingsService.findAll(query, isAdmin);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers('role') role: string,
  ) {
    const isAdmin = role === 'admin';
    return this.listingsService.findOne(id, isAdmin);
  }
}
