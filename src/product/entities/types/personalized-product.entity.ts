import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { BaseProduct } from '../inheritance/product-base.entity';

@Entity('product_type_personalized')
@Index('product_index_personalized', ['id', 'sku', 'name'])
@Unique('product_unique_personalized', ['id', 'sku', 'name', 'updatedAt'])
export class PersonalizedProduct extends BaseProduct {}
