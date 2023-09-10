import { AttributeType } from '.working_tempo/base/enum/attributes/attribute-type.enum';
import { ProductTypes } from '.working_tempo/base/enum/product/product-types.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export abstract class AttributeDescription {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

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
    @IsEnum(ProductTypes)
    appliesTo: ProductTypes[];
}
