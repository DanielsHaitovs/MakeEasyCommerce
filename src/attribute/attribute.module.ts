import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';
import { AttributeRule } from './entities/inheritance/rules/attribute-rule.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attribute, OptionValues, AttributeRule]),
    ],
    controllers: [AttributeController],
    providers: [AttributeService],
})
export class AttributeModule {}
