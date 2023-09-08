import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { IsEnum } from 'class-validator';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { SimpleProduct } from '@src/product/entities/types/simple-product.entity';
import { ProductAttributeOption } from '../attribute-option.entity';
import { ProductAttributes } from '@src/product/entities/attributes/product-attribute.entity';

@Entity('product_simple_attribute_options')
@Index('product_simple_index_option', ['id', 'value'])
export class SimpleProductOptions extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    @IsEnum(AttributeType)
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => SimpleProduct, (attribute) => attribute.options)
    simpleProduct: SimpleProduct;

    @ManyToOne(
        () => ProductAttributeOption,
        (attribute) => attribute.simpleProductOptions,
    )
    parentOption: ProductAttributeOption;

    @ManyToOne(
        () => ProductAttributes,
        (attribute) => attribute.simpleProductAttribute,
    )
    parentAttribute: ProductAttributes;
}
