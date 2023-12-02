import { Module } from '@nestjs/common';
import { AttributeRuleService } from './service/rule.service';
import { AttributeRuleController } from './controller/rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeRule } from './entities/rule.entity';
import { MecModule } from '@src/mec/mec.module';
import { RuleHelperService } from './service/helper/rule-helper.service';
import { RuleQueryService } from './service/query/rule-query.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeRule]), MecModule],
    controllers: [AttributeRuleController],
    providers: [AttributeRuleService, RuleHelperService, RuleQueryService],
    exports: [AttributeRuleService, RuleHelperService],
})
export class AttributeRuleModule {}
