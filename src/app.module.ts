import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { SimpleProduct } from './product/entities/types/simple-product.entity';
import { ProductAttributes } from './product/entities/attributes/product-attribute.entity';
import { ProductAttributeOption } from './product/entities/inheritance/attribute/options/attribute-option.entity';
import { SimpleProductOptions } from './product/entities/inheritance/attribute/options/simple/simple-product-option.entity';
import { ProductAttributeRule } from './product/entities/inheritance/attribute/rule/attribute-rule.entity';

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
                Product,
                SimpleProduct,
                ProductAttributes,
                ProductAttributeOption,
                ProductAttributeRule,
                SimpleProductOptions,
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        ProductModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
