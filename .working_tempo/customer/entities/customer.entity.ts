import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, RelationId } from 'typeorm';
import { Address } from './address.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('customer_index')
export class Customer extends MecBaseEntity {
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

    @IsNumber()
    @Column()
    customer_type: number;

    @OneToMany(() => Address, (address) => address.customer, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    address: Address[];
    @RelationId((customer: Customer) => customer.address)
    address_ids: number[];
}
