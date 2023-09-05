import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { AttributeDescription } from '../inheritance/attribute/description/description.entity';
import { ProductAttributeOption } from '../inheritance/attribute/options/attribute-option.entity';
import { Product } from '../product.entity';

@Entity('product_attribute_index')
@Index('product_index_attribute', ['id', 'createdAt', 'updatedAt'])
export class ProductAttributes extends MecBaseEntity {
    @Column(() => AttributeDescription)
    description: AttributeDescription;

    @ManyToOne(() => ProductAttributes, { onDelete: 'CASCADE' })
    parent: ProductAttributes; // Optional parent attribute for handling arrays

    @OneToMany(() => ProductAttributeOption, (option) => option.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: ProductAttributeOption[];

    @ManyToOne(() => Product, (product) => product.attributes)
    product: Product;
}
