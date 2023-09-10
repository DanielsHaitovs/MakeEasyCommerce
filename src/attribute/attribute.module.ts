import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { ProductAttributeModule } from './relations/product-attribute/product-attribute.module';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { ProductAttribute } from './relations/product-attribute/entities/product-attribute.entity';
import { OptionModule } from './relations/option/option.module';
import { RuleModule } from './relations/rule/rule.module';
import { Rule } from './relations/rule/entities/rule.entity';
import { QueryService } from '@src/base/services/query/query.service';
import { GetQueryService } from '@src/base/services/query/get/get-query.service';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';

@Module({
    controllers: [AttributeController],
    providers: [
        AttributeService,
        QueryService,
        CreateQueryService,
        GetQueryService,
    ],
    imports: [
        RuleModule,
        ProductAttributeModule,
        OptionModule,
        TypeOrmModule.forFeature([Attribute, ProductAttribute, Rule]),
    ],
})
export class AttributeModule {}
