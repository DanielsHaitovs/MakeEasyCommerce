import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeRule } from './entities/rule.entity';
import { MecModule } from '@src/mec/mec.module';
import { RuleController } from './controller/rule.controller';
import { RuleService } from './service/rule.service';
import { RuleHelperService } from './service/query/helper.service';
import { RuleQueryService } from './service/query/query.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeRule]), MecModule],
    controllers: [RuleController],
    providers: [RuleService, RuleHelperService, RuleQueryService],
    exports: [RuleHelperService]
})
export class AttributeRuleModule {}
