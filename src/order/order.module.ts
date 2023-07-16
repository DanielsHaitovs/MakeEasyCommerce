import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BasketService } from '@src/basket/basket.service';
import { CustomerService } from '@src/customer/services/customer.service';
import { AddressService } from '@src/customer/services/address.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrderService, BasketService, CustomerService, AddressService],
})
export class OrderModule {}
