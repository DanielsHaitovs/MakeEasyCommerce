import { Module } from '@nestjs/common';
import { QueryService } from './services/query/query.service';
import { CreateQueryService } from './services/query/create/create-query.service';
import { GetQueryService } from './services/query/get/get-query.service';

@Module({
    controllers: [],
    providers: [QueryService, CreateQueryService, GetQueryService],
})
export class BaseModule {}
