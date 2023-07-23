import { Module } from '@nestjs/common';
import { EavService } from './eav.service';
import { EavController } from './eav.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EAV } from './entities/eav.entity';
import { EAVAttribute } from './entities/eav-attribute.entity';
import { EAVAttributeOption } from './entities/eav-attribute-option.entity';
import { Product } from '@src/product/entities/product.entity';
import { Order } from '@src/order/entities/order.entity';
import { Customer } from '@src/customer/entities/customer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EAV,
            EAVAttribute,
            EAVAttributeOption,
            Product,
            Order,
            Customer,
        ]),
    ],
    controllers: [EavController],
    providers: [EavService],
})
export class EavModule {}
