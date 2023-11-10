import { Module } from '@nestjs/common';
import { QueryFilterService } from './service/query/query-filter.service';
import { DataHelperService } from './utils/data-help.service';

@Module({
    providers: [QueryFilterService, DataHelperService],
    exports: [QueryFilterService, DataHelperService],
})
export class MecModule {}
