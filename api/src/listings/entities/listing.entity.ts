import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Agent } from '../../agents/entities/agent.entity';

@Entity('listing')
@Index(['suburb', 'price', 'propertyType'])
@Index(['price'])
@Index(['propertyType'])
@Index(['beds'])
@Index(['baths'])
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  suburb: string;

  @Column()
  price: number;

  @Column()
  beds: number;
  @Column()
  baths: number;

  @Column()
  propertyType: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  internalNotes?: string;

  @ManyToOne(() => Agent, (agent) => agent.listings)
  agent: Agent;
}
