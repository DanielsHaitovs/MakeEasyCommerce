import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    GetCustomerAddressDetailsDto,
    GetCustomerDto,
} from '../dto/get-customer.dto';
import {
    CreateCustomerAddressDto,
    CreateCustomerDto,
} from '../dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { Address } from '../entities/address.entity';
import { GetAddressDetailsDto } from '../dto/address/get-address.dto';
import {
    UpdateCustomerAddressDetailsDto,
    UpdateCustomerDto,
} from '../dto/update-customer.dto';
import { AddressService } from './address.service';
import { Details } from '../entities/details.entity';

@Injectable()
export class CustomerService {
    constructor(
        private readonly addressService: AddressService,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createCustomerDto,
    }: {
        createCustomerDto: CreateCustomerDto;
    }): Promise<GetCustomerDto> {
        // Add validation in case if user already exists!
        // If it's needed, cuz right now
        // I'm saving all emails and
        // I don't have unique indicators
        const customer = this.entityManager.create(Customer, createCustomerDto);
        return await this.entityManager.save(Customer, customer);
    }

    async createCustomerAddress({
        createCustomerDto,
    }: {
        createCustomerDto: CreateCustomerAddressDto;
    }): Promise<GetCustomerAddressDetailsDto> {
        // const customer = this.entityManager.create(Customer, createCustomerDto);
        return await this.entityManager.save(
            Customer,
            this.entityManager.create(Customer, createCustomerDto),
        );
    }

    async findAll({
        address,
        details,
    }: {
        address: boolean;
        details: boolean;
    }): Promise<GetCustomerDto[]> {
        const where = {
            filter: '',
            value: null,
        };
        const relations = {
            address: address,
            details: details,
        };
        try {
            return await this.findCustomerQuery({
                where,
                relations,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findOne({
        id,
        address,
        details,
    }: {
        id: number;
        address: boolean;
        details: boolean;
    }): Promise<GetCustomerAddressDetailsDto> {
        const where = {
            filter: 'id',
            value: id,
        };
        try {
            return (
                await this.findCustomerQuery({
                    where,
                    relations: { address: address, details: details },
                    many: false,
                })
            ).shift();
        } catch (e) {
            return e.message;
        }
    }

    async findOneBy({
        filter,
        value,
        address,
        details,
    }: {
        filter: string;
        value: any;
        address: boolean;
        details: boolean;
    }): Promise<any> {
        try {
            return (
                await this.findCustomerQuery({
                    where: {
                        filter: filter,
                        value: value,
                    },
                    relations: {
                        address: address,
                        details: details,
                    },
                    many: false,
                })
            ).shift();
        } catch (e) {
            return e.message;
        }
    }

    async update({
        id,
        updateCustomerDto,
    }: {
        id: number;
        updateCustomerDto: UpdateCustomerDto;
    }): Promise<any> {
        return await this.entityManager
            .getRepository(Customer)
            .createQueryBuilder('customer')
            .update(Customer)
            .where('id = :id', { id: id })
            .set(updateCustomerDto)
            .execute();
    }

    async updateCustomerAddressDetails({
        id,
        updateCustomer,
    }: {
        id: number;
        updateCustomer: UpdateCustomerAddressDetailsDto;
    }): Promise<any> {
        if (updateCustomer.address_ids != undefined) {
            delete updateCustomer.address_ids;
        }

        updateCustomer.id = id;
        const current: GetCustomerAddressDetailsDto = await this.findOne({
            id: id,
            address: true,
            details: true,
        });
        if (updateCustomer === undefined) {
            throw 'update customer dto body is empty';
        }

        const customer_entity: GetCustomerDto = {
            ...updateCustomer,
        };

        // New Address + update customer
        // We created new address record and updated customer
        if (current.address_ids.length === 0) {
            console.log(123);

            const addresses: GetAddressDetailsDto[] =
                await this.entityManager.save(Address, updateCustomer.address);

            // SMTH For Uncle GOOGLE or Aunt GPT
            // each next request relies on result of action of previous await
            // except maybe for first one P.S. not sure
            // They are running in parallel
            // My preferable expectations ->
            // order of Promise object, but looks like always the same
            // I expect for "findOneBuy" to get updated data from "update"
            // which also supposed by that time include updated
            // relation ids from "updateCustomerRelations"
            //
            // Currently logical seems that this needs to
            // separated from "Promise.all()"
            // But so I would not forget to get answer's on my questions
            // I'll just leave it here working with ".Promise.all()"
            // With extremely big comment so it will annoy me every time I see it
            // Simply because for current state of project works just fine
            // also, according to what wrote before,
            // I have no clue why it's working then...

            return (
                await Promise.all([
                    await this.updateCustomerRelations({
                        id,
                        relation: 'address',
                        updated_relation: addresses,
                        current_relation: current.address,
                    }),
                    await this.update({
                        id: id,
                        updateCustomerDto: customer_entity,
                    }),
                    await this.findOneBy({
                        filter: 'id',
                        value: id,
                        address: true,
                        details: true,
                    }),
                ])
            ).slice(-1);
        }

        // Customer already has address
        if (updateCustomer.address_ids === undefined) {
            updateCustomer.address_ids = current.address_ids;
            // if address body has id then we will update it
            updateCustomer.address.map(async (address) => {
                if (address.id != undefined) {
                    await this.addressService.update({
                        id: address.id,
                        updateAddressDto: address,
                    });
                }
            });
            return await this.update({
                id: id,
                updateCustomerDto: customer_entity,
            });
        }
    }

    async deleteCustomerAddressRelation({
        id,
        address_ids,
    }: {
        id: number;
        address_ids: number[];
    }): Promise<any> {
        // this will delete all customer addresses
        if (address_ids.length === undefined) {
            const customer_address = await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.customer', 'customer')
                .select(['address.id', 'customer.id'])
                .where('customer.id = :id', { id: id })
                .getMany();

            // SMTH For Uncle GOOGLE or Aunt GPT
            // I want to know
            // If it's worth if looping with Promise.all?
            // Currently have 2 conditions
            // Promise inside the loop, cuz loop works pretty fast
            // and maybe sending this request in parallel might be more efficient???
            // or Looping without promise, but using await.. I need result of remove action
            // at some point this supposed to be helpful for debugging
            // to see actual state of address body under this id
            try {
                customer_address.map(async (address) => {
                    await this.addressService.remove({
                        id: address.id,
                    });
                });
            } catch (e) {
                return e.message;
            }
        }

        if (address_ids.length > 0) {
            try {
                address_ids.map(async (address_id) => {
                    await this.addressService.remove({
                        id: address_id,
                    });
                });
            } catch (e) {
                return e.message;
            }
        }
        return null;
    }

    async delete({ id }: { id: number }): Promise<any> {
        const customer: GetCustomerAddressDetailsDto = await this.findOne({
            id: id,
            address: true,
            details: true,
        });
        customer.address.map(async (address) => {
            if (address.details != undefined) {
                await this.entityManager.delete(Details, address.details.id);
            }
        });

        delete customer.address;
        await this.entityManager.delete(Customer, customer.id);
    }

    protected async findCustomerQuery({
        where,
        relations,
        many,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            address: boolean;
            details: boolean;
        };
        many: boolean;
    }): Promise<any[]> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'customer.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (!many && relations.details) {
            return [
                await this.entityManager
                    .getRepository(Customer)
                    .createQueryBuilder('customer')
                    .leftJoinAndSelect('customer.address', 'address')
                    .leftJoinAndSelect('address.details', 'details')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && relations.address) {
            return [
                await this.entityManager
                    .getRepository(Customer)
                    .createQueryBuilder('customer')
                    .leftJoinAndSelect('customer.address', 'address')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (many && relations.details) {
            return await this.entityManager
                .getRepository(Customer)
                .createQueryBuilder('customer')
                .leftJoinAndSelect('customer.address', 'address')
                .leftJoinAndSelect('address.details', 'details')
                .where(condition, query)
                .getMany();
        }

        if (many && relations.address) {
            return await this.entityManager
                .getRepository(Customer)
                .createQueryBuilder('customer')
                .leftJoinAndSelect('customer.address', 'address')
                .where(condition, query)
                .getMany();
        }

        return await this.entityManager
            .getRepository(Customer)
            .createQueryBuilder('customer')
            .where(condition, query)
            .getMany();
    }

    protected async updateCustomerRelations({
        id,
        relation,
        updated_relation,
        current_relation,
    }: {
        id: number;
        relation: string;
        updated_relation: any[];
        current_relation: any[];
    }): Promise<any> {
        try {
            return await this.entityManager
                .getRepository(Customer)
                .createQueryBuilder('customer')
                .relation(Customer, relation)
                .of(id)
                .addAndRemove(updated_relation, current_relation);
        } catch (e) {
            return e.message;
        }
    }
}
