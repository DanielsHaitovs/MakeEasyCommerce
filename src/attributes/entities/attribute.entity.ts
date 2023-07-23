import { Entity, PrimaryGeneratedColumn, Column, Tree } from 'typeorm';
import { EAVAttributeRule } from '@src/eav/entities/Inheritance/eav-attribute-rule.entity';

@Entity('eav_attributes_index')
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;
    @Column(() => EAVAttributeRule)
    rules: EAVAttributeRule;
}

// I guess...
// Same Needs to be done for each existing Entity
// @ManyToMany(() => Product, (product) => product.attributes)
// @JoinTable()
// products: Product[];
