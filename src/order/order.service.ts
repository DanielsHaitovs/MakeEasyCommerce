import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetOrderDto } from './dto/get-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { GetBasketDto } from '@src/basket/dto/get-basket.dto';
import { BasketService } from '@src/basket/basket.service';
import { Basket } from '@src/basket/entities/basket.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { GetCustomerDto } from '@src/customer/dto/get-customer.dto';

@Injectable()
export class OrderService {
    constructor(
        private readonly basketService: BasketService,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createOrderDto,
    }: {
        createOrderDto: CreateOrderDto;
    }): Promise<GetOrderDto> {
        const baskets: GetBasketDto[] = await this.entityManager
            .createQueryBuilder(Basket, 'basket')
            .where('id IN (:...ids)', {
                ids: createOrderDto.baskets_ids,
            })
            .groupBy('basket.id')
            .getMany();

        const basketIds: number[] = baskets.map((el) => {
            return el.id;
        });

        const basket_customers = [];
        baskets.map((basket) => {
            basket_customers.push({
                id: basket.id,
                status: basket.status,
                customer_ids: basket.customer_ids,
            });
        });

        console.log(basket_customers);

        if (basketIds.length != createOrderDto.baskets_ids.length) {
            throw `${basketIds} Only these baskets exist`;
        }

        if (
            createOrderDto.customers_ids.length > 0 &&
            createOrderDto.customers === undefined
        ) {
            const customers = await this.entityManager
                .createQueryBuilder(Customer, 'customer')
                .where('id IN (:...ids)', {
                    ids: createOrderDto.customers_ids,
                })
                .getMany();

            const customerIds: number[] = customers.map((el) => {
                return el.id;
            });

            delete createOrderDto.customers;
            const order = {
                baskets_ids: basketIds,
                baskets: baskets,
                customerIds: customerIds,
                customers: customers,
                ...this.entityManager.create(Order, createOrderDto),
            };
            // console.log(this.entityManager.create(Order, createOrderDto));
            // return await this.entityManager.save(Order, order);
        }

        return null;
    }
}
