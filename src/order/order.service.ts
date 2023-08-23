import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetOrderDto } from './dto/get-order.dto';
import { CreateGuestOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { GetBasketDto } from '@src/basket/dto/get-basket.dto';
import { Basket } from '@src/basket/entities/basket.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { GetCustomerAddressDetailsDto } from '@src/customer/dto/get-customer.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    // Basic Order
    // Registered Customer
    // More can be found in Order Readme.md
    async create({
        createOrderDto,
    }: {
        createOrderDto: CreateOrderDto;
    }): Promise<GetOrderDto> {
        if (
            createOrderDto.baskets_ids != undefined &&
            createOrderDto.baskets_ids.length > 0
        ) {
            // Find existing basket data
            const basket_data = await this.getRelationByIds({
                listOfIds: createOrderDto.baskets_ids,
                relation: 'basket',
                selectValues: [],
            });

            basket_data.customerIds = basket_data.customerIds;

            if (
                basket_data.basketIds.length !=
                createOrderDto.baskets_ids.length
            ) {
                throw 'could not find one of provided basket ids';
            }

            // Find existing customer data
            if (
                createOrderDto.customers_ids != undefined &&
                createOrderDto.customers_ids.length > 0
            ) {
                const customer_data = await this.getRelationByIds({
                    listOfIds: createOrderDto.customers_ids,
                    relation: 'customer',
                    selectValues: [],
                });

                if (
                    customer_data.customerIds.length !=
                    createOrderDto.customers_ids.length
                ) {
                    throw 'could not find one of provided customer ids';
                }

                const order = {
                    baskets_ids: basket_data.basketIds,
                    baskets: basket_data.baskets,
                    customerIds: customer_data.customerIds,
                    customers: customer_data.customers,
                    ...this.entityManager.create(Order, createOrderDto),
                };
                return await this.entityManager.save(Order, order);
            }

            const customerIds: number[] = basket_data.customerIds.shift();
            const customer_data = await this.getRelationByIds({
                listOfIds: customerIds,
                relation: 'customer',
                selectValues: [],
            });

            if (
                customer_data.customerIds != undefined &&
                customer_data.customerIds.length > 0
            ) {
                const order = {
                    baskets_ids: basket_data.basketIds,
                    baskets: basket_data.baskets,
                    customerIds: customer_data.customerIds,
                    customers: customer_data.customers,
                    ...this.entityManager.create(Order, createOrderDto),
                };
                return await this.entityManager.save(Order, order);
            }

            throw 'could not find one of provided customer ids';
        }

        throw 'baskets ids were not specified';
    }

    // Create Guest Order with saving customer for it
    async createGuestOrder({
        createGuestOrderDto,
    }: {
        createGuestOrderDto: CreateGuestOrderDto;
    }): Promise<GetOrderDto> {
        if (createGuestOrderDto.customers != undefined) {
            const order_data = await this.getRelationByIds({
                listOfIds: createGuestOrderDto.baskets_ids,
                relation: 'basket',
                selectValues: [],
            });

            // Create New Guest customers
            const guest_customer = createGuestOrderDto.customers.map(
                async (customer) => {
                    return this.entityManager.create(Customer, { ...customer });
                },
            );

            const order = {
                baskets_ids: order_data.basketIds,
                baskets: order_data.baskets,
                customers: guest_customer,
                ...this.entityManager.create(Order, createGuestOrderDto),
            };
            return await this.entityManager.save(Order, order);
        }
        return null;
    }

    async findAll({
        baskets,
        customers,
    }: {
        baskets: boolean;
        customers: boolean;
    }): Promise<GetOrderDto[]> {
        const where = {
            filter: '',
            value: null,
        };
        const relations = {
            baskets: baskets,
            customers: customers,
        };
        try {
            return await this.findOrderQuery({
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
        baskets,
        customers,
    }: {
        id: number;
        baskets: boolean;
        customers: boolean;
    }): Promise<GetOrderDto> {
        const where = {
            filter: 'id',
            value: id,
        };
        try {
            return (
                await this.findOrderQuery({
                    where,
                    relations: { baskets: baskets, customers: customers },
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
        baskets,
        customers,
    }: {
        filter: string;
        value: any;
        baskets: boolean;
        customers: boolean;
    }): Promise<any> {
        try {
            return (
                await this.findOrderQuery({
                    where: {
                        filter: filter,
                        value: value,
                    },
                    relations: {
                        baskets: baskets,
                        customers: customers,
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
        updateOrderDto,
    }: {
        id: number;
        updateOrderDto: UpdateOrderDto;
    }): Promise<any> {
        // Find existing order data
        const order_data = await this.findOne({
            id: id,
            baskets: true,
            customers: true,
        });

        if (order_data == undefined) {
            throw 'could not find order with such id';
        }

        // Find existing basket data
        const basket_data = await this.getRelationByIds({
            listOfIds: updateOrderDto.baskets_ids,
            relation: 'basket',
            selectValues: [],
        });

        if (basket_data.basketIds.length != updateOrderDto.baskets_ids.length) {
            throw 'could not find one of provided basket ids';
        }

        // Find existing customer data
        if (updateOrderDto.customers_ids != undefined) {
            const customer_data = await this.getRelationByIds({
                listOfIds: updateOrderDto.customers_ids,
                relation: 'customer',
                selectValues: [],
            });

            if (
                customer_data.customerIds.length !=
                updateOrderDto.customers_ids.length
            ) {
                throw 'could not find one of provided customer ids';
            }

            // Update order
            const order = {
                ...order_data,
                ...updateOrderDto,
                baskets_ids: basket_data.basketIds,
                baskets: basket_data.baskets,
                customers_ids: customer_data.customerIds,
                customers: customer_data.customers,
            };

            await this.entityManager.save(Order, order);

            // Update Order Relations
            await this.updateOrderRelations({
                id: id,
                relation: 'baskets',
                updated_relation: basket_data.baskets,
                current_relation: order_data.baskets,
            });

            await this.updateOrderRelations({
                id: id,
                relation: 'customers',
                updated_relation: customer_data.customers,
                current_relation: order_data.customers,
            });

            return await this.findOne({
                id: id,
                baskets: true,
                customers: true,
            });
        }

        // Update order
        const order = {
            ...order_data,
            ...updateOrderDto,
            baskets_ids: basket_data.basketIds,
            baskets: basket_data.baskets,
        };

        await this.entityManager.save(Order, order);

        // Update Order Relations
        await this.updateOrderRelations({
            id: id,
            relation: 'baskets',
            updated_relation: basket_data.baskets,
            current_relation: order_data.baskets,
        });
    }

    async delete({ id }: { id: number }): Promise<any> {
        try {
            return await this.entityManager.delete(Order, id);
        } catch (e) {
            return e.message;
        }
    }

    protected async getRelationByIds({
        relation,
        listOfIds,
        selectValues,
    }: {
        relation: string;
        listOfIds: number[];
        selectValues: string[];
    }): Promise<any> {
        if (relation === 'basket') {
            try {
                const baskets: GetBasketDto[] = await this.entityManager
                    .createQueryBuilder(Basket, 'basket')
                    .where('id IN (:...ids)', {
                        ids: listOfIds,
                    })
                    .groupBy('basket.id')
                    .getMany();

                // Get theirs Ids
                const basketIds: number[] = baskets.map((el) => {
                    return el.id;
                });
                const basket_customers = baskets.map((basket) => {
                    if (
                        basket.customers_ids != undefined &&
                        basket.customers_ids.length > 0
                    ) {
                        return basket.customers_ids;
                    }
                });

                return {
                    baskets: baskets,
                    basketIds: basketIds,
                    customerIds: basket_customers,
                };
            } catch (e) {
                return e.message;
            }
        }
        if (relation === 'customer') {
            try {
                const customers: GetCustomerAddressDetailsDto[] =
                    await this.entityManager
                        .createQueryBuilder(Customer, 'customer')
                        .where('id IN (:...ids)', {
                            ids: listOfIds,
                        })
                        .groupBy('customer.id')
                        .getMany();

                // Get theirs Ids
                const customerIds: number[] = customers.map((el) => {
                    return el.id;
                });

                return {
                    customers: customers,
                    customerIds: customerIds,
                };
            } catch (e) {
                return e.message;
            }
        }

        return selectValues;
    }

    protected async findOrderQuery({
        where,
        relations,
        many,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            baskets: boolean;
            customers: boolean;
        };
        many: boolean;
    }): Promise<any[]> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'order.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (!many && relations.customers && relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.baskets', 'baskets')
                    .leftJoinAndSelect('order.customers', 'customers')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && !relations.customers && relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.baskets', 'baskets')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && relations.customers && !relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.customers', 'customers')
                    .where(condition, query)
                    .getOne(),
            ];
        }
        //

        if (many && relations.customers && relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.baskets', 'baskets')
                    .leftJoinAndSelect('order.customers', 'customers')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && !relations.customers && relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.baskets', 'baskets')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && relations.customers && !relations.baskets) {
            return [
                await this.entityManager
                    .getRepository(Order)
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.customers', 'customers')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(Order)
            .createQueryBuilder('order')
            .where(condition, query)
            .getMany();
    }

    protected async updateOrderRelations({
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
            await this.entityManager
                .getRepository(Order)
                .createQueryBuilder('order')
                .relation(Order, relation)
                .of(id)
                .addAndRemove(updated_relation, current_relation);
        } catch (e) {
            return e.message;
        }
    }
}
