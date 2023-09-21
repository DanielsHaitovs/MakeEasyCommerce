import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { ProductAttributeModule } from './relations/product-attribute/product-attribute.module';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './relations/product-attribute/entities/product-attribute.entity';
import { OptionModule } from './relations/option/option.module';
import { RuleModule } from './relations/rule/rule.module';
import { QueryService } from '@src/base/services/query/query.service';
import { GetQueryService } from '@src/base/services/query/get/get-query.service';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';
import { Option } from './relations/option/entities/option.entity';
import { OptionHelperService } from '@src/base/services/helper/attributes/option-helper.service';
import { OptionService } from './relations/option/services/option.service';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { Attributes } from './entities/attributes.entity';
import { Rule } from './relations/rule/entities/rule.entity';
import { RuleHelperService } from '@src/base/services/helper/attributes/rule-helper.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attributes, Rule, Option, ProductAttribute]),
        OptionModule,
        RuleModule,
        ProductAttributeModule,
    ],
    controllers: [AttributeController],
    providers: [
        AttributeService,
        AttributeHelperService,
        OptionService,
        OptionHelperService,
        QueryService,
        CreateQueryService,
        GetQueryService,
    ],
})
export class AttributeModule {}
