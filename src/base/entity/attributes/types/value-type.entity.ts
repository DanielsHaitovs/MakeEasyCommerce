import { BooleanAttribute } from '@src/base/types/boolean.entity';
import { DateAttribute } from '@src/base/types/date.entity';
import { JsonAttribute } from '@src/base/types/json.entity';
import { NumberAttribute } from '@src/base/types/number.entity';
import { StringAttribute } from '@src/base/types/string.entity';
import { Column, Index } from 'typeorm';

// @Index('product_attribute_values_type_index', ['text', 'boolean', 'date', 'json', 'number'])
export class ProductAttributeValuesType {
    @Column(() => StringAttribute)
    text: StringAttribute;

    @Column(() => BooleanAttribute)
    boolean: BooleanAttribute;

    @Column(() => DateAttribute)
    date: DateAttribute;

    @Column(() => JsonAttribute)
    json: JsonAttribute;

    @Column(() => NumberAttribute)
    number: NumberAttribute;
}
