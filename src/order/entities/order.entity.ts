import { Basket } from '@src/basket/entities/basket.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { IsNumber } from 'class-validator';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';

@Entity('order_index')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @IsNumber()
    @Column()
    order_type: number;
    @IsNumber()
    @Column()
    order_status: number;
    @ManyToMany(() => Basket, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: 'order_baskets_index',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_order_basket_orderId',
        },
        inverseJoinColumn: {
            name: 'basket_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_order_basket_basketId',
        },
        synchronize: true,
    })
    baskets: Basket[];

    @RelationId((order: Order) => order.baskets)
    baskets_ids: number[];

    @ManyToMany(() => Customer, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: 'order_customers_address',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_order_customer_orderId',
        },
        inverseJoinColumn: {
            name: 'customer_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'fk_order_customer_customerId',
        },
        synchronize: true,
    })
    customers: Customer[];

    @RelationId((order: Order) => order.customers)
    customers_ids: number[];
}
