import { Module } from '@nestjs/common';
import { AttributeService } from './service/attribute.service';
import { AttributeController } from './controller/attribute.controller';
import { AttributeHelperService } from '@src/mec/service/attribute/attribute-helper.service';
import { DataHelperService } from '@src/mec/utils/data-help.service';
import { AttributeQueryService } from '@src/mec/service/attribute/attribute-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';

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
