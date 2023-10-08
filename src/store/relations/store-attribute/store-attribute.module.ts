import { Module } from '@nestjs/common';
import { StoreAttributeService } from './services/store-attribute.service';
import { StoreAttributeController } from './controllers/store-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreViewRule } from './entities/store-attribute/attribute-rule.entity';
import { StoreViewRuleService } from './services/store-attribute/attribute-rule.service';
import { StoreRuleHelperService } from '@src/base/services/helper/store/store-attributes/attributes-rule-helper.service';
import { StoreViewRuleController } from './controllers/store-attribute/rule/attribute-rule.controller';
import { StoreOptionHelperService } from '@src/base/services/helper/store/store-attributes/attributes-option-helper.service';
import { StoreViewOption } from './entities/store-attribute/attribute-option.entity';
import { StoreViewOptionController } from './controllers/store-attribute/option/attribute-option.controller';
import { StoreViewOptionService } from './services/store-attribute/option/attribute-option.service';
import { StoreAttribute } from './entities/store-attribute.entity';
import { StoreAttributeDescription } from './entities/store-attribute/attributes-description.entity';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StoreAttribute,
            StoreAttributeDescription,
            StoreViewRule,
            StoreViewOption,
        ]),
    ],
    controllers: [
        StoreAttributeController,
        StoreViewRuleController,
        StoreViewOptionController,
    ],
    providers: [
        StoreAttributeService,
        StoreViewRuleService,
        StoreViewOptionService,
        StoreHelperService,
        StoreRuleHelperService,
        StoreOptionHelperService,
    ],
})
export class StoreAttributeModule {}
