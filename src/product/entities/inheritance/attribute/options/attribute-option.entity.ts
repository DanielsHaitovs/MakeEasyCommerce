import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { ProductAttributes } from '@src/product/entities/attributes/product-attribute.entity';
import { SimpleProductOptions } from './simple/simple-product-option.entity';

@Entity('product_attribute_options')
@Index('attribute_index_option', ['id', 'value'])
export class ProductAttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    @IsEnum(AttributeType)
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => ProductAttributes, (attribute) => attribute.options)
    attribute: ProductAttributes;

    @OneToMany(() => SimpleProductOptions, (option) => option.simpleProduct)
    simpleProductOptions: SimpleProductOptions[];
}
