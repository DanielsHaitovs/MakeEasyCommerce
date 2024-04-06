import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeService } from './service/attribute.service';
import { AttributeHelperService } from './service/query/helper.service';
import { AttributeQueryService } from './service/query/query.service';
import { MecModule } from '@src/mec/mec.module';
import { AttributeController } from './controller/attribute.controller';
import { AttributeRuleService } from './service/rule/attribute-rule.service';
import { AttributeRuleModule } from '@src/rule/rule.module';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute]), MecModule, AttributeRuleModule],
    controllers: [AttributeController],
    providers: [AttributeService, AttributeHelperService, AttributeRuleService, AttributeQueryService],
    exports: [AttributeHelperService]
})
export class AttributeModule {}
