import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class MecProductBase {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    sku: string;

    @Column()
    @IsEnum(ProductVisibility)
    visibility: ProductVisibility;

    @Column()
    @IsNumber()
    quantity: number;

    @Column({
        type: 'numeric',
        precision: 20,
        scale: 2,
    })
    final_price: number;
}
