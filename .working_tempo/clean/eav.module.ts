import { Module } from '@nestjs/common';
import { EavService } from './services/eav.service';
import { EavController } from './controllers/eav.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EAV } from './entities/eav.entity';
import { Product } from '@src/product/entities/product.entity';
import { Order } from '@src/order/entities/order.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { AttributeEAV } from './entities/inheritance/attribute/eav-attribute.entity';
import { AttributeEavController } from './controllers/attribute-eav.controller';
import { AttributeEavService } from './services/attributes-eav.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([EAV, AttributeEAV, Product, Order, Customer]),
    ],
    controllers: [EavController, AttributeEavController],
    providers: [EavService, AttributeEavService],
})
export class EavModule {}
