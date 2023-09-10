import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/product/entity/product/product.entity';
import { SimpleProduct } from '@src/product/entity/product/types/simple.product.entity';
import { ProductAttributes } from '@src/product/entity/product/attributes/attribute.product.entity';
import { AttributeRule } from '@src/product/entity/product/attributes/relations/rule.attribute.entity';
import { AttributeOption } from '@src/product/entity/product/attributes/relations/options/option.attribute.entity';
import { SingleAttributeOption } from '@src/product/entity/product/attributes/relations/options/single-option.attribute.entity';
import { ProductAttributeController } from '@src/product/controllers/attributes/product-attribute.controller';
import { ProductService } from '@src/product/services/product/product.service';
import { ProductAttributeService } from '@src/product/services/product/attribute.product.service';
import { SimpleProductService } from '@src/product/services/product/product-type/simple.product.service';
import { AttributeService } from '@src/product/services/attribute/attribute.service';
import { CreateQueryService } from './services/query/create/create-query.service';
import { OptionService } from '@src/product/services/attribute/options/option.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            SimpleProduct,
            ProductAttributes,
            AttributeRule,
            AttributeOption,
            SingleAttributeOption,
        ]),
    ],
    controllers: [ProductAttributeController],
    providers: [
        ProductService,
        SimpleProductService,
        AttributeService,
        OptionService,
        ProductAttributeService,
        CreateQueryService,
    ],
})
export class BaseModule {}
