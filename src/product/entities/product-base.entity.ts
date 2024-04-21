import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Unique, Index } from 'typeorm';
import { ProductType } from '../enum/product.enum';

export class ProductBase extends MecBaseEntity {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    inStock: boolean;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Unique('uk_product_name', ['name'])
    @Index('ik_product_name')
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Unique('uk_product_sku', ['sku'])
    @Index('ik_product_sku')
    sku: string;

    @Column({
        default: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Unique('uk_product_quantity', ['quantity'])
    @Index('ik_product_quantity')
    quantity: number;

    @Column({ enum: ProductType, default: ProductType.Simple })
    @IsNotEmpty()
    @IsEnum(ProductType)
    type: ProductType;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;
}
