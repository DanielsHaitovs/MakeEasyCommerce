import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// Product ->
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product/product.entity';
import { SimpleProduct } from './product/entity/product/types/simple.product.entity';
import { ProductAttributes } from './product/entity/product/attributes/attribute.product.entity';
import { AttributeRule } from './product/entity/product/attributes/relations/rule.attribute.entity';
import { AttributeOption } from './product/entity/product/attributes/relations/options/option.attribute.entity';
import { SingleAttributeOption } from './product/entity/product/attributes/relations/options/single-option.attribute.entity';
// <- Product
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
                // Product ->
                Product,
                SimpleProduct,
                ProductAttributes,
                AttributeRule,
                AttributeOption,
                SingleAttributeOption,
                // <- Product
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
