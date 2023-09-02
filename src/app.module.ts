import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/entities/attribute.entity';
import { OptionValues } from './attribute/entities/inheritance/options/option-values.entity';
import { AttributeRule } from './attribute/entities/inheritance/rules/attribute-rule.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { SimpleProduct } from './product/entities/inheritance/product-types/simple-product.entity';
import { ConfigurableProduct } from './product/entities/inheritance/product-types/configurable-product.entity';
import { PersonalizedProduct } from './product/entities/inheritance/product-types/personalized-product.entity';
import { GroupedProduct } from './product/entities/inheritance/product-types/grouped-product.entity';

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
                Attribute,
                OptionValues,
                AttributeRule,
                Product,
                SimpleProduct,
                ConfigurableProduct,
                PersonalizedProduct,
                GroupedProduct,
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        AttributeModule,
        ProductModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
