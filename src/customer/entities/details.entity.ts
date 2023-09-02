import { IsString } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { Address } from './address.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('customer_address_details')
export class Details extends MecBaseEntity {
    @IsString()
    @Column()
    city: string;

    @IsString()
    @Column()
    street_name: string;

    @IsString()
    @Column()
    house_number: string;

    @IsString()
    @Column()
    phone_number: string;

    @IsString()
    @Column()
    company: string;

    @IsString()
    @Column()
    tax_id: string;

    @OneToOne(() => Address, (address) => address.details)
    address: Address;
}
