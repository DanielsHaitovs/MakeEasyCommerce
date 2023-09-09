import { Column, Entity } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('product_attribute_options')
// @Index('attribute_index_option', ['id', 'value'])
export class ProductAttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    // @ManyToOne(() => ProductAttributes, (attribute) => attribute.options)
    // attribute: ProductAttributes;

    // @OneToMany(() => SimpleProductOptions, (option) => option.simpleProduct)
    // simpleProductOptions: SimpleProductOptions[];
}
