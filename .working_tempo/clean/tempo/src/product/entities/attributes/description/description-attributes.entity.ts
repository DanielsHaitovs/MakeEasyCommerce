import { AttributeDescriptionBase } from '@src/base/entity/attributes/description-base.entity';
import { Index, Unique } from 'typeorm';

const uniqueCode = 'product_attribute_description_unique';
const indexCode = 'product_attribute_description';
@Unique(uniqueCode, ['name', 'code'])
@Index(indexCode, ['name', 'code'])
export abstract class ProductAttributeDescription extends AttributeDescriptionBase {}
