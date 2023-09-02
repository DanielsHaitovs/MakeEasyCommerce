import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SimpleProduct } from './entities/inheritance/product-types/simple-product.entity';
import { ConfigurableProduct } from './entities/inheritance/product-types/configurable-product.entity';
import { PersonalizedProduct } from './entities/inheritance/product-types/personalized-product.entity';
import { GroupedProduct } from './entities/inheritance/product-types/grouped-product.entity';
import { ProductVariants } from './entities/inheritance/product-types/product-variants.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductVariants,
            SimpleProduct,
            ConfigurableProduct,
            PersonalizedProduct,
            GroupedProduct,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
