// attribute.entity.ts

import { Product } from '@src/product/entities/product.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@Entity('attributes_index')
@Tree('nested-set')
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['string', 'number', 'boolean'] })
    dataType: 'string' | 'number' | 'boolean';

    // Other properties specific to your app's requirements (e.g., description, units, etc.)

    @ManyToMany(() => Product, (product) => product.attributes)
    @JoinTable()
    products: Product[];

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    @Column({ default: true })
    useInFilter: boolean;

    @Column({ default: true })
    useInSort: boolean;

    @Column({ default: true })
    useInReport: boolean;

    // Tree relationships
    @TreeChildren()
    children: Attribute[];

    @TreeParent()
    parent: Attribute;
}
