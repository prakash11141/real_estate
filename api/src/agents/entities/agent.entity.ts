import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('agent')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Listing, (listing) => listing.agent)
  listings: Listing[];
}
