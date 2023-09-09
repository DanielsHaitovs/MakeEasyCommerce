import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Tree,
    TreeChildren,
    TreeParent,
    OneToMany,
    RelationId,
} from 'typeorm';
import { EAVRule } from './inheritance/eav-rule.entity';
import { Description } from './inheritance/description.entity';
import { AttributeEAV } from './inheritance/attribute/eav-attribute.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('eav_index')
@Tree('nested-set')
export class EAV {
    @PrimaryGeneratedColumn()
    id: number;

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    // @ApiProperty({ type: () => EAVRule })
    @Column(() => EAVRule)
    rules: EAVRule;

    // @ApiProperty({ type: () => Description })
    @Column(() => Description)
    description: Description;

    // Tree relationships
    // @ApiProperty({ type: () => EAV })
    @TreeChildren()
    children: EAV[];
    // @ApiProperty({ type: () => EAV })
    @TreeParent()
    parent: EAV;

    // @ApiProperty({ type: () => AttributeEAV })
    @OneToMany(() => AttributeEAV, (attributes) => attributes.parent_eav, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    attributes: AttributeEAV[];

    @ApiProperty({ type: () => EAV })
    @RelationId((eav: EAV) => eav.attributes)
    attribute_ids: number[];
    // @OneToMany(() => Product, (product) => product.eav)
    // @JoinTable({
    //     name: 'eav_product_index',
    //     joinColumn: {
    //         name: 'eav_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_product_eavId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'product_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_product_productId',
    //     },
    //     synchronize: true,
    // })
    // products: Product[];

    // @OneToMany(() => Order, (order) => order.eav)
    // @JoinTable({
    //     name: 'eav_order_index',
    //     joinColumn: {
    //         name: 'eav_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_order_eavId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'order_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_order_orderId',
    //     },
    //     synchronize: true,
    // })
    // orders: Order[];

    // Customer can be ONE to ONE
    // Specifically for EAV
    // Customer settings are defined per store
    // @OneToOne(() => Customer, (customer) => customer.eav)
    // @JoinTable({
    //     name: 'eav_customer_index',
    //     joinColumn: {
    //         name: 'eav_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_customer_eavId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'customer_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_eav_customer_customerId',
    //     },
    //     synchronize: true,
    // })
    // customers: Order[];
}

// I guess...
// Same Needs to be done for each existing Entity
// But Guess better will be to inject it into each entity
// (and then use it as a decorator?)
