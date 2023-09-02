import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, Unique } from 'typeorm';

@Entity('product_index')
@Unique('product_index_unique', ['sku'])
export class Product extends MecBaseEntity {
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
}
