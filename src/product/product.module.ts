import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product/product.entity';
import { SimpleProduct } from './entity/product/types/simple.product.entity';
import { ProductAttributes } from './entity/product/attributes/attribute.product.entity';
import { AttributeRule } from './entity/product/attributes/relations/rule.attribute.entity';
import { AttributeOption } from './entity/product/attributes/relations/options/option.attribute.entity';
import { SingleAttributeOption } from './entity/product/attributes/relations/options/single-option.attribute.entity';

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
    controllers: [],
    providers: [],
})
export class ProductModule {}
