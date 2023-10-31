import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rule } from './entities/rule.entity';
import { RuleController } from './controllers/rule.controller';
import { RuleService } from './services/rule.service';
import { RuleHelperService } from '@src/mec/services/attribute/attributes/rule/rule-helper.service';
import { DataHelperService } from '@src/utils/data-help.service';

@Module({
    imports: [TypeOrmModule.forFeature([Rule])],
    controllers: [RuleController],
    providers: [RuleService, RuleHelperService, DataHelperService],
})
export class RuleModule {}
