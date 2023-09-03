import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SimpleProduct } from './entities/inheritance/product-types/simple-product.entity';
import { ConfigurableProduct } from './entities/inheritance/product-types/configurable-product.entity';
import { PersonalizedProduct } from './entities/inheritance/product-types/personalized-product.entity';
import { GroupedProduct } from './entities/inheritance/product-types/grouped-product.entity';
import { ProductVariants } from './entities/inheritance/product-types/product-variants.entity';
import { VirtualProduct } from './entities/inheritance/product-types/virtual-product.entity';
import { SimpleProductController } from './controllers/simple/simple-product.controller';
import { SimpleProductService } from './services/simple/simple-product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductVariants,
            SimpleProduct,
            ConfigurableProduct,
            PersonalizedProduct,
            GroupedProduct,
            VirtualProduct,
        ]),
    ],
    controllers: [SimpleProductController, ProductController],
    providers: [ProductService, SimpleProductService],
})
export class ProductModule {}
