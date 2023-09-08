import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SimpleProduct } from './entities/products/types/simple-product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductAttributes } from './entities/attributes/product-attribute.entity';
import { SimpleProductService } from './services/products/simple/simple-product.service';
import { SimpleProductController } from './controllers/product-types/simple/simple-product.controller';
import { ProductAttributeController } from './controllers/attributes/product-attribute.controller';
import { ProductAttributeService } from './services/attributes/product-attribute.service';
import { ProductOptionsService } from './services/attributes/options/product-options.service';
import { ProductRulesService } from './services/attributes/rules/product-rules.service';
import { ProductAttributeRule } from './entities/attributes/rule/attribute-rule.entity';
import { ProductAttributeOption } from './entities/attributes/options/attribute-option.entity';
import { SimpleProductOptions } from './entities/attributes/options/simple/simple-product-option.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            SimpleProduct,
            ProductAttributes,
            ProductAttributeOption,
            ProductAttributeRule,
            SimpleProductOptions,
        ]),
    ],
    controllers: [
        ProductController,
        SimpleProductController,
        ProductAttributeController,
    ],
    providers: [
        ProductService,
        SimpleProductService,
        ProductAttributeService,
        ProductOptionsService,
        ProductRulesService,
    ],
})
export class ProductModule {}
