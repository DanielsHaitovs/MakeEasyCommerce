import { Module } from '@nestjs/common';
import { QueryFilterService } from './service/query/query-filter.service';
import { ErrorHandlerService } from '@src/utils/error-handler.service';
import { DataHelperService } from '@src/utils/data-help.service';

@Module({
    providers: [QueryFilterService, DataHelperService, ErrorHandlerService],
    exports: [QueryFilterService, DataHelperService, ErrorHandlerService],
})
export class MecModule {}
