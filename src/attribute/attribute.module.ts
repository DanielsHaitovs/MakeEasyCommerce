import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeOptionModule } from './relations/attribute-option/option.module';
import { AttributeRuleModule } from './relations/attribute-rule/rule.module';
import { AttributeHelperService } from '@src/base/services/attribute/attribute-helper.service';
import { AttributeOptionService } from './services/attributes/attribute-option.service';
import { OptionService } from './relations/attribute-option/services/option.service';
import { OptionHelperService } from '@src/base/services/attribute/attributes/option-helper.service';
import { AttributeOptionController } from './controllers/attributes/attribute-option.controller';

@Module({
    imports: [
        AttributeOptionModule, AttributeRuleModule,
        TypeOrmModule.forFeature([Attribute]),
    ],
    controllers: [AttributeController, AttributeOptionController],
    providers: [AttributeService, AttributeOptionService, OptionService, AttributeHelperService, OptionHelperService],
})
export class AttributeModule {}
