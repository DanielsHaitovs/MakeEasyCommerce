import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Index, Unique } from 'typeorm';

@Unique('product_unique_attribute_description', ['name', 'code'])
@Index('product_index_attribute_description', ['name', 'code'])
export abstract class AttributeDescription {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    code: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Column()
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: string;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;

    @Column('simple-array')
    @IsEnum([ProductTypes])
    appliesTo: ProductTypes[];
}
