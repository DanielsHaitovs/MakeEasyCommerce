import { Module } from '@nestjs/common';
import { RuleService } from './services/rule.service';
import { RuleController } from './controllers/rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeRule } from './entities/rule.entity';
import { RuleHelperService } from '@src/base/services/attribute/attributes/rule-helper.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeRule])],
    controllers: [RuleController],
    providers: [RuleService, RuleHelperService],
})
export class AttributeRuleModule {}
