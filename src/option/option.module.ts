import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeOption } from './entities/option.entity';
import { MecModule } from '@src/mec/mec.module';

@Module({
    imports: [TypeOrmModule.forFeature([AttributeOption]), MecModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AttributeOptionModule {}
