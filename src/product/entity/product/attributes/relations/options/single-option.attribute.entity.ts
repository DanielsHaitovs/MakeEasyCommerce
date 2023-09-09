import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '../../attribute.product.entity';
import { AttributeOption } from './option.attribute.entity';
import { SimpleProduct } from '../../../types/simple.product.entity';

@Entity('product_simple_options')
@Index('product_simple_option_index', ['id', 'value'])
export class SingleAttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => ProductAttributes, (attribute) => attribute.id)
    parentAttributeId: ProductAttributes;

    @ManyToOne(() => AttributeOption, (attribute) => attribute.id)
    parentOptionId: AttributeOption;

    @ManyToOne(() => SimpleProduct, (attribute) => attribute.id)
    parentProductId: SimpleProduct;
}
