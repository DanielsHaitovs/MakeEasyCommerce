import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeService } from './service/attribute.service';
import { AttributeHelperService } from './service/query/helper.service';
import { AttributeQueryService } from './service/query/query.service';
import { MecModule } from '@src/mec/mec.module';
import { AttributeController } from './controller/attribute.controller';
import { AttributeRuleService } from './service/query/relations/rule/attribute-rule.service';
import { AttributeRuleModule } from '@src/rule/rule.module';
import { AttributeOptionString } from './entities/options/string-option.entity';
import { AttributeOptionNumber } from './entities/options/number-option.entity';
import { AttributeOptionsService } from './service/query/relations/options/attribute-option.service';
import { OptionCreateService } from './service/query/relations/options/create/create-option.service';
import { OptionUpdateService } from './service/query/relations/options/update/update-option.service';
import { AttributeOptionController } from './controller/attribute-option.controller ';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute, AttributeOptionString, AttributeOptionNumber]), MecModule, AttributeRuleModule],
    controllers: [AttributeController, AttributeOptionController],
    providers: [
        AttributeService,
        AttributeHelperService,
        AttributeRuleService,
        AttributeOptionsService,
        OptionCreateService,
        OptionUpdateService,
        AttributeQueryService
    ],
    exports: [AttributeHelperService]
})
export class AttributeModule {}
