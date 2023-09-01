import { Module } from '@nestjs/common';
import { AttributeService } from './services/attributes/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';
import { AttributeRule } from './entities/inheritance/rules/attribute-rule.entity';
import { OptionsService } from './services/options/options.service';
import { RuleService } from './services/rules/rule.service';
import { OptionsController } from './controllers/options/options.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attribute, OptionValues, AttributeRule]),
    ],
    controllers: [AttributeController, OptionsController],
    providers: [AttributeService, OptionsService, RuleService],
})
export class AttributeModule {}
