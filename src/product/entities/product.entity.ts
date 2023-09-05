import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Entity, Index, Unique } from 'typeorm';

@Entity('product_index')
@Unique(['id'])
@Index('product_index_index', ['id', 'updatedAt'])
export class Product extends MecBaseEntity {}
