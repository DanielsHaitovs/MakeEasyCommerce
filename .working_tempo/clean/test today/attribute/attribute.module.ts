import { Module } from '@nestjs/common';
import { AttributeService } from './services/attributes/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';
import { AttributeRule } from './entities/inheritance/rules/attribute-rule.entity';
import { OptionsService } from '../product/services/attributes/options/options.service';
import { RulesService } from './services/rules/rules.service';
import { OptionsController } from './controllers/options/options.controller';
import { RulesController } from './controllers/rules/rules.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attribute, OptionValues, AttributeRule]),
    ],
    controllers: [AttributeController, OptionsController, RulesController],
    providers: [AttributeService, OptionsService, RulesService],
})
export class AttributeModule {}
