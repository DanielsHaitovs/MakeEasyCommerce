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
import { GetCustomerAddressDetailsDto } from '@src/customer/dto/get-customer.dto';

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
                    // customer.
                    const new_customer: CreateCustomerAddressDto =
                        this.entityManager.create(Customer, { ...customer });
                    return await this.customerService.createCustomerAddress({
                        createCustomerDto: new_customer,
                    });
                },
            );

            const customerIds = guest_customer.map(async (el) => {
                return (await el).id;
            });

            const order = {
                baskets_ids: order_data.basketIds,
                baskets: order_data.basket,
                customerIds: await Promise.all(customerIds),
                customers: guest_customer,
                ...this.entityManager.create(Order, createGuestOrderDto),
            };
            console.log('order');
            console.log(order);
            return await this.entityManager.save(Order, order);
        }
        return null;
    }

    protected async getRelationByIds({
        listOfIds,
        relation,
    }: {
        listOfIds: number[];
        relation: string;
    }): Promise<any> {
        if (relation === 'basket') {
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

            return {
                baskets: baskets,
                basketIds: basketIds,
            };
        }
        if (relation === 'customer') {
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
        }
    }
    // async create({
    //     createOrderDto,
    // }: {
    //     createOrderDto: CreateGuestOrderDto;
    // }): Promise<GetOrderDto> {
    //     // Find existing baskets
    //     const baskets: GetBasketDto[] = await this.entityManager
    //         .createQueryBuilder(Basket, 'basket')
    //         .where('id IN (:...ids)', {
    //             ids: createOrderDto.baskets_ids,
    //         })
    //         .groupBy('basket.id')
    //         .getMany();
    //     // Get theirs Ids
    //     const basketIds: number[] = baskets.map((el) => {
    //         return el.id;
    //     });

    //     // I'll rewrite it, just building my thoughts -->
    //     // Currently I can accept only 1 active basket
    //     // therefore let's find only newest active (by id)
    //     // see comment below -># Merge 2 baskets into 1
    //     // But I can add Marketing Basket Templates
    //     let new_basket_id = 0;
    //     let basket_customersIds = [];
    //     baskets.map((basket) => {
    //         if (basket.id > new_basket_id && basket.status === 0) {
    //             new_basket_id = basket.id;
    //             basket_customersIds = basket.customer_ids;
    //         }
    //     });

    //     if (basketIds.length != createOrderDto.baskets_ids.length) {
    //         throw 'Can not find one of mentioned basket ids';
    //     }

    //     // If customer is not provided in body
    //     // and is also missing in basket then error
    //     if (
    //         createOrderDto.customers === undefined &&
    //         createOrderDto.customers_ids === undefined &&
    //         basket_customersIds.length === 0
    //     ) {
    //         throw 'customer address entity not found';
    //     }

    //     // If customer provided in body
    //     // but missing in basket
    //     // then I need to register it as guest customer
    //     if (
    //         createOrderDto.customers != undefined &&
    //         createOrderDto.customers_ids === undefined &&
    //         basket_customersIds.length === 0
    //     ) {
    //         const guest_customer = createOrderDto.customers.map(
    //             async (customer) => {
    //                 const new_customer: CreateCustomerAddressDto =
    //                     this.entityManager.create(Customer, { ...customer });
    //                 return await this.customerService.createCustomerAddress({
    //                     createCustomerDto: new_customer,
    //                 });
    //             },
    //         );

    //         const customerIds = guest_customer.map(async (el) => {
    //             return (await el).id;
    //         });

    //         // delete createOrderDto.customers;
    //         const order = {
    //             baskets_ids: basketIds,
    //             baskets: baskets,
    //             customerIds: await Promise.all(customerIds),
    //             customers: guest_customer,
    //             ...this.entityManager.create(Order, createOrderDto),
    //         };
    //         console.log('order');
    //         console.log(order);
    //         return await this.entityManager.save(Order, order);
    //     }

    //     // If customer is not provided in body
    //     // but exists in basket
    //     if (
    //         createOrderDto.customers === undefined &&
    //         createOrderDto.customers_ids === undefined &&
    //         basket_customersIds.length > 0
    //     ) {
    //         console.log('!!!!');
    //         createOrderDto.customers_ids = basket_customersIds;
    //     }

    //     if (
    //         createOrderDto.customers_ids != undefined &&
    //         createOrderDto.customers_ids.length > 0 &&
    //         createOrderDto.customers_ids.shift() != 0 &&
    //         createOrderDto.customers === undefined
    //     ) {
    //         console.log('Should not be here');

    //         const customers = await this.entityManager
    //             .createQueryBuilder(Customer, 'customer')
    //             .where('id IN (:...ids)', {
    //                 ids: createOrderDto.customers_ids,
    //             })
    //             .getMany();

    //         const customerIds: number[] = customers.map((el) => {
    //             return el.id;
    //         });

    //         if (customerIds.length != createOrderDto.customers_ids.length) {
    //             throw 'Can not find one of mentioned customer ids';
    //         }

    //         // delete createOrderDto.customers;
    //         const order = {
    //             baskets_ids: basketIds,
    //             baskets: baskets,
    //             customerIds: customerIds,
    //             customers: customers,
    //             ...this.entityManager.create(Order, createOrderDto),
    //         };
    //         // console.log(this.entityManager.create(Order, createOrderDto));
    //         return await this.entityManager.save(Order, order);
    //     }
    //     console.log('none');
    //     return null;
    // }
}
