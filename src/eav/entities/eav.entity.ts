import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Tree,
    TreeChildren,
    TreeParent,
    OneToMany,
    JoinTable,
} from 'typeorm';
import { EAVRule } from './Inheritance/eav-rule.entity';
import { Description } from './Inheritance/description.entity';
import { EAVAttribute } from './eav-attribute.entity';
import { Product } from '@src/product/entities/product.entity';
import { Order } from '@src/order/entities/order.entity';

@Entity('eav_index')
@Tree('nested-set')
export class EAV {
    @PrimaryGeneratedColumn()
    id: number;
    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    @Column(() => EAVRule)
    rules: EAVRule;
    @Column(() => Description)
    description: Description;
    @OneToMany(() => EAVAttribute, (attributes) => attributes.eav, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    attributes: EAVAttribute[];
    // Tree relationships
    @TreeChildren()
    children: EAV[];
    @TreeParent()
    parent: EAV;

    @OneToMany(() => Product, (product) => product.eav)
    @JoinTable({
        name: 'eav_product_index',
        joinColumn: {
            name: 'eav_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_eav_product_eavId',
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_eav_product_productId',
        },
        synchronize: true,
    })
    products: Product[];

    @OneToMany(() => Order, (order) => order.eav)
    @JoinTable({
        name: 'eav_order_index',
        joinColumn: {
            name: 'eav_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_eav_order_eavId',
        },
        inverseJoinColumn: {
            name: 'order_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_eav_order_orderId',
        },
        synchronize: true,
    })
    orders: Order[];

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
