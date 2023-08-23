import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateAddressDto } from '../dto/address/create-address.dto';
import {
    GetAddressDetailsDto,
    GetAddressDto,
} from '../dto/address/get-address.dto';
import { Address } from '../entities/address.entity';
import { UpdateAddressDetailsDto } from '../dto/address/update-address.dto';
import { Details } from '../entities/details.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createAddressDto,
    }: {
        createAddressDto: CreateAddressDto;
    }): Promise<GetAddressDetailsDto> {
        try {
            return await this.entityManager.save(
                Address,
                this.entityManager.create(Address, createAddressDto),
            );
        } catch (e) {
            return e.message;
        }
    }

    async findAll(): Promise<GetAddressDto[]> {
        try {
            return await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .getMany();
        } catch (e) {
            return e.message;
        }
    }

    async findAllAddressesDetails(): Promise<GetAddressDetailsDto[]> {
        try {
            return await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.details', 'details')
                .getMany();
        } catch (e) {
            return e.message;
        }
    }

    async update({
        id,
        updateAddressDto,
    }: {
        id: number;
        updateAddressDto: UpdateAddressDetailsDto;
    }): Promise<GetAddressDetailsDto> {
        const address = await this.entityManager
            .getRepository(Address)
            .createQueryBuilder('address')
            .leftJoinAndSelect('address.details', 'details')
            .select(['address.id', 'details'])
            .where('address.id = :id', { id: id })
            .getOne();
        const new_entity: GetAddressDetailsDto = {
            ...this.entityManager.create(Address, {
                id: id,
                ...updateAddressDto,
            }),
        };
        if (updateAddressDto.details === undefined) {
            new_entity.details = address.details;
        } else {
            new_entity.details.id = address.details.id;
        }
        try {
            return await this.entityManager.save(Address, new_entity);
        } catch (e) {
            return e.message;
        }
    }

    async findOneById({
        id,
        details,
        customer,
    }: {
        id: number;
        details: boolean;
        customer: boolean;
    }): Promise<GetAddressDetailsDto> {
        try {
            return await this.findAddressQuery({
                where: {
                    filter: 'id',
                    value: id,
                },
                relations: {
                    customer: customer,
                    details: details,
                },
            });
        } catch (e) {
            return e.message;
        }
    }

    async remove({ id }: { id: number }): Promise<any> {
        const address = await this.entityManager
            .getRepository(Address)
            .createQueryBuilder('address')
            .leftJoinAndSelect('address.details', 'details')
            .select(['address.id', 'details.id'])
            .where('address.id = :id', { id: id })
            .getOne();

        try {
            if (address.details != undefined) {
                await this.entityManager.delete(Details, address.details.id);
            }
        } catch (e) {
            return e.message;
        }
    }

    protected async findAddressQuery({
        where,
        relations,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            customer: boolean;
            details: boolean;
        };
    }): Promise<any> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'address.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (relations.customer === true && relations.details === true) {
            return await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.details', 'details')
                .leftJoinAndSelect('address.customer', 'customer')
                .where(condition, query)
                .getMany();
        }

        if (relations.customer === true && relations.details === false) {
            return await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.customer', 'customer')
                .where(condition, query)
                .getMany();
        }

        if (relations.customer === false && relations.details === true) {
            return await this.entityManager
                .getRepository(Address)
                .createQueryBuilder('address')
                .leftJoinAndSelect('address.details', 'details')
                .where(condition, query)
                .getMany();
        }

        return await this.entityManager
            .getRepository(Address)
            .createQueryBuilder('address')
            .where(condition, query)
            .getMany();
    }
}
