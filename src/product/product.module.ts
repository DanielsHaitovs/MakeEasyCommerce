import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ConfigurableProduct } from './entities/product/product-types/configurable-product.entity';
import { GroupedProduct } from './entities/product/product-types/grouped-product.entity';
import { SimpleProductController } from './controllers/simple/simple-product.controller';
import { SimpleProductService } from './services/simple/simple-product.service';
import { ProductAttributes } from './entities/attributes/attributes-product.entity';
import { ProductAttributeRule } from './entities/attributes/rules/attribute-rule.entity';
import { ProductOptionValues } from './entities/attributes/options/option-values.entity';
import { ProductAttributeService } from './services/attributes/attributes/product-attribute.service';
import { ProductRulesService } from './services/attributes/rules/product-rules.service';
import { ProductOptionsService } from './services/attributes/options/product-options.service';
import { ProductAttributeController } from './controllers/attributes/attribute.controller';
import { ProductRulesController } from './controllers/attributes/rules/rules.controller';
import { ProductOptionsController } from './controllers/attributes/options/options.controller';
import { SimpleProductOptionValues } from './entities/attributes/options/simple-product.entity';
import { ProductVariants } from './entities/product/product-types/product-variants.entity';
import { SimpleProduct } from './entities/product/product-types/simple-product.entity';
import { PersonalizedProduct } from './entities/product/product-types/personalized-product.entity';
import { VirtualProduct } from './entities/product/product-types/virtual-product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductAttributes,
            ProductAttributeRule,
            ProductOptionValues,
            ProductVariants,
            SimpleProduct,
            SimpleProductOptionValues,
            ConfigurableProduct,
            PersonalizedProduct,
            GroupedProduct,
            VirtualProduct,
        ]),
    ],
    controllers: [
        ProductController,
        ProductAttributeController,
        ProductRulesController,
        ProductOptionsController,
        SimpleProductController,
    ],
    providers: [
        ProductService,
        SimpleProductService,
        ProductAttributeService,
        ProductRulesService,
        ProductOptionsService,
    ],
})
export class ProductModule {}
