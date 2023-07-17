import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetOrderDto } from './dto/get-order.dto';
import { CreateGuestOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { GetBasketDto } from '@src/basket/dto/get-basket.dto';
import { BasketService } from '@src/basket/basket.service';
import { Basket } from '@src/basket/entities/basket.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { CreateCustomerAddressDto } from '@src/customer/dto/create-customer.dto';
import { CustomerService } from '@src/customer/services/customer.service';
import {
    GetCustomerAddressDetailsDto,
    GetCustomerDto,
} from '@src/customer/dto/get-customer.dto';

@Injectable()
export class OrderService {
    constructor(
        private readonly basketService: BasketService,
        private readonly customerService: CustomerService,
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

    async createGuestOrder({
        createGuestOrderDto,
    }: {
        createGuestOrderDto: CreateGuestOrderDto;
    }): Promise<GetOrderDto> {
        if (createGuestOrderDto.customers != undefined) {
            const order_data = await this.getRelationByIds({
                listOfIds: createGuestOrderDto.baskets_ids,
                relation: 'basket',
            });

            // Create New Guest customers
            const guest_customer = createGuestOrderDto.customers.map(
                async (customer) => {
                    return this.entityManager.create(Customer, { ...customer });
                },
            );

            console.log('guest_customer');
            console.log(guest_customer);
            console.log('order_data');
            console.log(order_data);
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

    async findAll(): Promise<any> {
        return await this.entityManager
            .getRepository(Order)
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.baskets', 'baskets')
            .leftJoinAndSelect('order.customers', 'customers')
            .getMany();
    }
    protected async getRelationByIds({
        listOfIds,
        relation,
    }: {
        listOfIds: number[];
        relation: string;
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
                        basket.customer_ids != undefined &&
                        basket.customer_ids.length > 0
                    ) {
                        return basket.customer_ids;
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
    }
}
