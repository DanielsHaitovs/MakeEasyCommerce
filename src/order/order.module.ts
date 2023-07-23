import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EAV } from '@src/eav/entities/eav.entity';
import { EAVAttribute } from '@src/eav/entities/eav-attribute.entity';
import { EAVAttributeOption } from '@src/eav/entities/eav-attribute-option.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            EAV,
            EAVAttribute,
            EAVAttributeOption,
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
