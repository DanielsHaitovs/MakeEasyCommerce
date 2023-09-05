import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SimpleProduct } from './entities/types/simple-product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductAttributes } from './entities/attributes/product-attribute.entity';
import { ProductAttributeOption } from './entities/inheritance/attribute/options/attribute-option.entity';
import { SimpleProductOptions } from './entities/inheritance/attribute/options/simple/simple-product-option.entity';
import { SimpleProductService } from './services/product-types/simple/simple-product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            SimpleProduct,
            ProductAttributes,
            ProductAttributeOption,
            SimpleProductOptions,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, SimpleProductService],
})
export class ProductModule {}
