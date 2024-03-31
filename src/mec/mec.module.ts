import { Module } from '@nestjs/common';
import { QueryService } from './service/query/query-filter.service';
import { HandlerService } from './service/handler/query.service';
import { DataHelperService } from './service/data/helper.service';

@Module({
    providers: [QueryService, DataHelperService, HandlerService],
    exports: [QueryService, DataHelperService, HandlerService]
})
export class MecModule {}
