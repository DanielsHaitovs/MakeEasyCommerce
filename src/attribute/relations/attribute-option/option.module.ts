import { Module } from '@nestjs/common';
import { OptionService } from './services/option.service';
import { OptionController } from './controllers/option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeOption } from './entities/option.entity';
import { OptionHelperService } from '@src/base/services/attribute/attributes/option-helper.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeOption])],
    controllers: [OptionController],
    providers: [OptionService, OptionHelperService],
})
export class AttributeOptionModule {}
