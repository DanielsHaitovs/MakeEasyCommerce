import { IsEmail, IsNumber, IsString } from 'class-validator';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { Address } from './address.entity';

@Entity('customer_index')
// @Unique(['email'])
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
    @IsString()
    @Column()
    first_name: string;
    @IsString()
    @Column()
    last_name: string;
    @IsEmail()
    @Column()
    email: string;
    @IsNumber()
    @Column()
    store_id: number;
    @OneToMany(() => Address, (address) => address.customer, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    address: Address[];

    @RelationId((customer: Customer) => customer.address)
    address_ids: number[];

    // Specifically for EAV
    // Customer settings are defined per store
    // @ManyToOne(() => EAV, (eav) => eav.customers)
    // @JoinTable({
    //     name: 'customer_eav_index',
    //     joinColumn: {
    //         name: 'customer_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_customer_eav_customerId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'eav_id',
    //         referencedColumnName: 'id',
    //         foreignKeyConstraintName: 'fk_customer_eav_eavId',
    //     },
    //     synchronize: true,
    // })
    // eav: EAV[];
}
