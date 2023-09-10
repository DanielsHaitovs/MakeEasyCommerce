import { Module } from '@nestjs/common';
import { RuleService } from './services/rule.service';
import { RuleController } from './controllers/rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { QueryService } from '@src/base/services/query/query.service';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';
import { GetQueryService } from '@src/base/services/query/get/get-query.service';

@Module({
    controllers: [RuleController],
    providers: [RuleService, QueryService, CreateQueryService, GetQueryService],
    imports: [TypeOrmModule.forFeature([Rule])],
})
export class RuleModule {}
