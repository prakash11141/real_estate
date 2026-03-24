import { Test, TestingModule } from '@nestjs/testing';
import { ListingsService } from './listings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';

describe('ListingsService', () => {
  let service: ListingsService;
  let repo: Repository<Listing>;

  const mockListing = {
    id: 1,
    title: 'Test House',
    price: 500000,
    beds: 3,
    baths: 2,
    propertyType: 'apartment',
    suburb: 'Lalitpur',
    description: 'Test description',
    internalNotes: 'Internal note 2',
  } as Listing;

  beforeEach(async () => {
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[{ ...mockListing }], 1]),
      getSql: jest.fn().mockReturnValue('SELECT * FROM listing'),
      getParameters: jest.fn().mockReturnValue({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),

          useValue: {
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    repo = module.get<Repository<Listing>>(getRepositoryToken(Listing));
  });

  it('should return all listings with internalNotes removed for non-admin', async () => {
    const result = await service.findAll({}, false);
    expect(result.total).toBe(1);
    expect(result.items[0].internalNotes).toBeUndefined();
    expect(result.items[0].title).toBe('Test House');
  });

  it('should return all listings with internalNotes for admin', async () => {
    const result = await service.findAll({}, true);
    expect(result.items[0].internalNotes).toBe('Internal note');
  });
});
