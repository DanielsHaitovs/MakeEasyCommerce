import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, RelationId } from 'typeorm';
import { AttributesBase } from './base.entity';
import { AttributeRule } from '@src/rule/entities/rule.entity';
import { AttributeOptionString } from './options/string-option.entity';
import { AttributeOptionNumber } from './options/number-option.entity';

export const AttributesIndex = {
    isActive: 'ik_attribute_active',
    code: 'ik_attribute_code'
};

export const AttributesUnique = {
    name: 'uk_attribute_name',
    code: 'uk_attribute_code'
};

@Entity('eav_attribute_index')
export class Attribute extends AttributesBase {
    @ManyToOne(() => Attribute, { cascade: false })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_parent'
    })
    parent: Attribute;

    @OneToOne(() => AttributeRule, {
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    rule: AttributeRule;

    @OneToMany(() => AttributeOptionString, (options) => options.attribute, {})
    stringOptions: AttributeOptionString[];
    @RelationId((options: Attribute) => options.stringOptions)
    stringOptionsIds: number[];

    @OneToMany(() => AttributeOptionNumber, (options) => options.attribute, {})
    numberOptions: AttributeOptionNumber[];
    @RelationId((options: Attribute) => options.numberOptions)
    numberOptionsIds: number[];

    // @ManyToOne(() => Product, (product) => product.attributes, { cascade: false })
    // @JoinColumn({
    //     foreignKeyConstraintName: 'fk_attributes_index_product'
    // })
    // product: Product;
}
