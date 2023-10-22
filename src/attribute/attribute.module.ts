import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeHelperService } from '@src/mec/services/attribute/attribute-helper.service';
import { QueryHelperService } from '@src/mec/services/query/helper/query-help.service';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute])],
    controllers: [AttributeController],
    providers: [AttributeService, AttributeHelperService, QueryHelperService],
})
export class AttributeModule {}
