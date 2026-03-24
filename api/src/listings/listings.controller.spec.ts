import { Test, TestingModule } from '@nestjs/testing';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { QueryListingsDto } from './dto/query-listings.dto';
import { NotFoundException } from '@nestjs/common';

describe('ListingsController', () => {
  let controller: ListingsController;
  let service: ListingsService;

  const mockListing = {
    id: 1,
    title: 'Test House',
    price: 500000,
    beds: 3,
    baths: 2,
    propertyType: 'apartment',
    suburb: 'kathmandu',
    description: 'Test description',
    internalNotes: 'Internal note 1',
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue({ items: [mockListing], total: 1 }),
    findOne: jest.fn().mockResolvedValue(mockListing),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingsController],
      providers: [
        {
          provide: ListingsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ListingsController>(ListingsController);
    service = module.get<ListingsService>(ListingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test findAll
  it('should return listings with isAdmin=false', async () => {
    const query: QueryListingsDto = {};
    const result = await controller.findAll(query, 'user');

    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Test House');
    expect(service.findAll).toHaveBeenCalledWith(query, false);
  });

  it('should return listings with isAdmin=true', async () => {
    const query: QueryListingsDto = {};
    const result = await controller.findAll(query, 'admin');

    expect(service.findAll).toHaveBeenCalledWith(query, true);
  });

  //findOne
  it('should return a single listing with isAdmin=false', async () => {
    const result = await controller.findOne(1, 'user');
    expect(result.id).toBe(1);
    expect(service.findOne).toHaveBeenCalledWith(1, false);
  });

  it('should return a single listing with isAdmin=true', async () => {
    const result = await controller.findOne(1, 'admin');
    expect(service.findOne).toHaveBeenCalledWith(1, true);
  });

  it('should throw NotFoundException if service throws', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException());
    await expect(controller.findOne(999, 'user')).rejects.toThrow(
      NotFoundException,
    );
  });
});
