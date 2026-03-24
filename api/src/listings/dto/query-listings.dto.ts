import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class QueryListingsDto {
  @IsOptional()
  @IsNumber()
  price_min?: number;

  @IsOptional()
  @IsNumber()
  price_max?: number;

  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  beds?: number;

  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  baths?: number;

  @IsOptional()
  @IsString()
  propertyType?: string;
  @IsOptional()
  @IsString()
  suburb?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
