import { Module } from '@nestjs/common';
import { AttributeOptionService } from './services/option.service';
import { AttributeOptionController } from './controllers/option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeOption } from './entities/option.entity';
import { MecModule } from '@src/mec/mec.module';
import { OptionHelperService } from './services/helper/option-helper.service';
import { OptionQueryService } from './services/query/option-query.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeOption]), MecModule],
    controllers: [AttributeOptionController],
    providers: [
        AttributeOptionService,
        OptionHelperService,
        OptionQueryService,
    ],
    exports: [OptionHelperService],
})
export class AttributeOptionModule {}
