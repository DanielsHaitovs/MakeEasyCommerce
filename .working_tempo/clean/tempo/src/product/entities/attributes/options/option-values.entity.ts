import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { IsEnum } from 'class-validator';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '../attributes-product.entity';
import { AttributeType } from '@src/base/enum/attributes/type.enum';

@Entity('product_attribute_options')
@Index('product_attribute_option', ['id', 'value'])
export class ProductOptionValues extends MecBaseEntity {
    // Maybe there is point of splitting this into several tables
    // Number Attribute Table
    // String Attribute Table and etc.
    @Column('jsonb', { nullable: false })
    @IsEnum(AttributeType)
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => ProductAttributes, (attribute) => attribute.options)
    attribute: ProductAttributes;
}
