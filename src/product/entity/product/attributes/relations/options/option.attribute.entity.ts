import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '../../attribute.product.entity';
import { SingleAttributeOption } from './single-option.attribute.entity';

@Entity('product_attribute_option')
@Index('product_attribute_option_index', ['id', 'value'])
export class AttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: true })
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => ProductAttributes, (attribute) => attribute.options, {
        cascade: false,
    })
    parentAttribute: ProductAttributes;

    @OneToMany(() => SingleAttributeOption, (option) => option, {
        cascade: false,
        eager: false,
    })
    simpleProductOptions: SingleAttributeOption[];
    @RelationId((option: AttributeOption) => option.simpleProductOptions)
    simpleProductOptionsIds: number[];
}
