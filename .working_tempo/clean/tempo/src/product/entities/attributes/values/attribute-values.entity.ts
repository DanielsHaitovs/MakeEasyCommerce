import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { SimpleProduct } from '../../product-types/simple-product.entity';
import { IsEnum } from 'class-validator';
import { AttributeType } from '@src/base/enum/attributes/type.enum';
import { ProductAttributeValuesType } from '@src/base/entity/attributes/types/value-type.entity';

@Entity('product_simple_attributes_values')
@Index('product_simple_attributes_values_index', ['id', 'type'])
export class SimpleProductAttributesValues extends MecBaseEntity {
    @Column()
    @IsEnum(AttributeType)
    type: AttributeType;

    @Column(() => ProductAttributeValuesType)
    values: ProductAttributeValuesType;

    @ManyToOne(() => SimpleProduct, (simple) => simple.attributes_values)
    relation: SimpleProduct;
}
