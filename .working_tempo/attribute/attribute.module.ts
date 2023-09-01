import { Module } from '@nestjs/common';
import { AttributeService } from './service/attribute.service';
import { AttributeController } from './controller/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeRule } from './entities/inheritance/rules/attribute-rule.entity';
import { AttributeDescription } from './entities/inheritance/description/description.entity';
import { BooleanAttribute } from './entities/inheritance/types/boolean.entity';
import { StringAttribute } from './entities/inheritance/types/string.entity';
import { NumberAttribute } from './entities/inheritance/types/number.entity';
import { DateAttribute } from './entities/inheritance/types/date.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Attribute,
            AttributeRule,
            AttributeDescription,
            // StringAttribute,
            // NumberAttribute,
            // DateAttribute,
            // BooleanAttribute,
        ]),
    ],
    controllers: [AttributeController],
    providers: [AttributeService],
})
export class AttributeModule {}
