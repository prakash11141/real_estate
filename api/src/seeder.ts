import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Agent } from './agents/entities/agent.entity';
import { Listing } from './listings/entities/listing.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Listing, Agent],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const agentRepo = AppDataSource.getRepository(Agent);
  const listingRepo = AppDataSource.getRepository(Listing);

  const agent1 = agentRepo.create({
    name: 'Prakash Shrestha',
    email: 'prakash@gmail.com',
  });
  const agent2 = agentRepo.create({
    name: 'Sushil Shrestha',
    email: 'sushil@gmail.com',
  });

  await agentRepo.save([agent1, agent2]);
  const listings: Listing[] = [];

  for (let i = 1; i <= 20; i++) {
    const listing = listingRepo.create({
      title: `Property ${i}`,
      suburb: i % 2 === 0 ? 'Kathmandu' : 'Lalitpur',
      price: 50000 * i,
      beds: (i % 5) + 1,
      baths: (i % 3) + 1,
      propertyType: i % 2 === 0 ? 'apartment' : 'house',
      description: `Nice property number ${i}`,
      internalNotes: `Internal note ${i}`,
      agent: i % 2 === 0 ? agent1 : agent2,
    });

    listings.push(listing);
  }

  await listingRepo.save(listings);

  console.log('Seeding completed');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
