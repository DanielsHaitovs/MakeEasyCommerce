import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute, OptionValues])],
    controllers: [AttributeController],
    providers: [AttributeService],
})
export class AttributeModule {}
