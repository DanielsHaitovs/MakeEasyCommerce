import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product/product.entity';
import { SimpleProduct } from './entity/product/types/simple.product.entity';
import { ProductAttributes } from './entity/product/attributes/attribute.product.entity';
import { AttributeRule } from './entity/product/attributes/relations/rule.attribute.entity';
import { AttributeOption } from './entity/product/attributes/relations/options/option.attribute.entity';
import { SingleAttributeOption } from './entity/product/attributes/relations/options/single-option.attribute.entity';
import { ProductAttributeController } from './controllers/attributes/product-attribute.controller';
import { ProductAttributeService } from './services/product/attribute.product.service';
import { AttributeService } from './services/attribute/attribute.service';
import { BaseModule } from '@src/base/base.module';
import { CreateQueryService } from '.working_tempo/base/services/query/create/create-query.service';
import { OptionService } from './services/attribute/options/option.service';

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
        BaseModule,
    ],
    controllers: [ProductAttributeController],
    providers: [
        // ProductService,
        // SimpleProductService,
        AttributeService,
        OptionService,
        ProductAttributeService,
        CreateQueryService,
    ],
})
export class ProductModule {}
