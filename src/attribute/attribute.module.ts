import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeService } from './service/attribute.service';
import { AttributeHelperService } from './service/query/helper.service';
import { AttributeQueryService } from './service/query/query.service';
import { MecModule } from '@src/mec/mec.module';
import { AttributeController } from './controller/attribute.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute]), MecModule],
    controllers: [AttributeController],
    providers: [AttributeService, AttributeHelperService, AttributeQueryService],
    exports: [AttributeHelperService]
})
export class AttributeModule {}
