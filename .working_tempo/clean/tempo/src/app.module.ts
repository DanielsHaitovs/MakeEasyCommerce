import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/entities/attribute.entity';
import { OptionValues } from './attribute/entities/inheritance/options/option-values.entity';
import { AttributeRule } from './attribute/entities/inheritance/rules/attribute-rule.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ProductAttributes } from './product/entities/attributes/attributes-product.entity';
import { ProductVariants } from './product/entities/product-types/product-variants.entity';
import { SimpleProduct } from './product/entities/product-types/simple-product.entity';
import { ConfigurableProduct } from './product/entities/product-types/configurable-product.entity';
import { PersonalizedProduct } from './product/entities/product-types/personalized-product.entity';
import { GroupedProduct } from './product/entities/product-types/grouped-product.entity';
import { VirtualProduct } from './product/entities/product-types/virtual-product.entity';
import { ProductOptionValues } from './product/entities/attributes/options/option-values.entity';
import { ProductAttributeRule } from './product/entities/attributes/rules/attribute-rule.entity';
import { SimpleProductAttributesValues } from './product/entities/attributes/values/attribute-values.entity';

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
                ProductAttributes,
                ProductOptionValues,
                ProductAttributeRule,
                SimpleProductAttributesValues,
                ProductVariants,
                SimpleProduct,
                ConfigurableProduct,
                PersonalizedProduct,
                GroupedProduct,
                VirtualProduct,
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        ProductModule,
        AttributeModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
