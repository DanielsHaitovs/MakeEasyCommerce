import { Module } from '@nestjs/common';
import { AttributeService } from './service/attribute.service';
import { AttributeController } from './controller/attribute.controller';
import { AttributeHelperService } from '@src/attribute/service/helper/attribute-helper.service';
import { AttributeQueryService } from '@src/attribute/service/query/attribute-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { DataHelperService } from '@src/utils/data-help.service';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute])],
    controllers: [AttributeController],
    providers: [
        AttributeService,
        AttributeHelperService,
        AttributeQueryService,
        DataHelperService,
    ],
})
export class AttributeModule {}
