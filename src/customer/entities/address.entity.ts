import { IsNumber, IsString } from 'class-validator';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Details } from './details.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('customer_address_index')
export class Address extends MecBaseEntity {
    @IsString()
    @Column()
    country: string;

    @IsString()
    @Column()
    postal_code: string;

    @IsNumber()
    @Column()
    address_type: number;

    @Index()
    @ManyToOne(() => Customer, (customer) => customer.address, {
        onDelete: 'CASCADE',
    })
    // @JoinColumn(
    // {
    //     name: 'customer_id',
    //     referencedColumnName: "id" ,
    //     foreignKeyConstraintName: "fk_customer_index_address"
    // })
    customer: Address[];

    @Index()
    @OneToOne(() => Details, (details) => details.address, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'details_id',
        foreignKeyConstraintName: 'fk_address_index_details',
    })
    details: Details;
}
