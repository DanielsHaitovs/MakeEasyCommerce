import { Module } from '@nestjs/common';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { QueryService } from '@src/base/services/query/query.service';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';
import { GetQueryService } from '@src/base/services/query/get/get-query.service';
import { OptionHelperService } from '@src/base/services/helper/attributes/option-helper.service';
import { Attributes } from '@src/attribute/entities/attribute.entity';

@Module({
    controllers: [OptionController],
    providers: [
        OptionService,
        OptionHelperService,
        QueryService,
        CreateQueryService,
        GetQueryService,
    ],
    imports: [TypeOrmModule.forFeature([Attributes, Option])],
})
export class OptionModule {}
