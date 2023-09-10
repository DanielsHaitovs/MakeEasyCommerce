import { Module } from '@nestjs/common';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';

@Module({
    controllers: [OptionController],
    providers: [OptionService],
    imports: [TypeOrmModule.forFeature([Option])],
})
export class OptionModule {}
