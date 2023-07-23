import { EAVAttribute } from '@src/eav/entities/eav-attribute.entity';
import { EAV } from '@src/eav/entities/eav.entity';
import { IsNumber, IsString } from 'class-validator';
import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['sku'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @IsString()
    @Column()
    sku: string;
    @IsNumber()
    @Column()
    product_type: number;
    @IsNumber()
    @Column()
    visibility: number;
    @IsNumber()
    @Column()
    quantity: number;
    @Column({
        type: 'numeric',
        precision: 20,
        scale: 2,
    })
    final_price: number;
    @IsNumber()
    @Column()
    store_id: number;
    @ManyToOne(() => EAV, (attribute) => attribute.products)
    @JoinTable({
        name: 'products_eav_index',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_product_eav_productId',
        },
        inverseJoinColumn: {
            name: 'eav_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_product_eav_eavId',
        },
        synchronize: true,
    })
    eav: EAVAttribute[];
}
