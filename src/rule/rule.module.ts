import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rule } from './entities/rule.entity';
import { RuleController } from './controllers/rule.controller';
import { RuleService } from './services/rule.service';
import { RuleHelperService } from '@src/mec/services/attribute/attributes/rule-helper.service';
import { QueryHelperService } from '@src/mec/services/query/helper/query-help.service';

@Module({
    imports: [TypeOrmModule.forFeature([Rule])],
    controllers: [RuleController],
    providers: [RuleService, RuleHelperService, QueryHelperService],
})
export class RuleModule {}
