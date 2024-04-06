import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecModule } from '@src/mec/mec.module';
import { AttributeOptionString } from './entities/string-option.entity';
import { AttributeOptionNumber } from './entities/number-option.entity';
import { OptionService } from './service/option.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeOptionString, AttributeOptionNumber]), MecModule],
    controllers: [],
    providers: [OptionService],
    exports: []
})
export class AttributeOptionModule {}
