import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Address } from './customer/entities/address.entity';
import { Details } from './customer/entities/details.entity';
import { Product } from './product/entities/product.entity';
import { Basket } from './basket/entities/basket.entity';
import { Order } from './order/entities/order.entity';
import { CatalogModule } from './catalog/catalog.module';
import { Catalog } from './catalog/entities/catalog.entity';
import { EavModule } from './eav/eav.module';
import { EAV } from './eav/entities/eav.entity';
import { EAVAttribute } from './eav/entities/eav-attribute.entity';
import { EAVAttributeOption } from './eav/entities/eav-attribute-option.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.TYPEORM_HOST,
            port: 5432,
            database: process.env.TYPEORM_DATABASE,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            entities: [
                Customer,
                Address,
                Details,
                Product,
                Basket,
                Order,
                EAV,
                EAVAttribute,
                EAVAttributeOption,
                Catalog,
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        EavModule,
        CatalogModule,
        CustomerModule,
        BasketModule,
        ProductModule,
        OrderModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
