import { Module } from '@nestjs/common';
import { StoreAttributesService } from './services/store-attributes.service';
import { StoreAttributesController } from './controllers/store-attributes.controller';

@Module({
    controllers: [StoreAttributesController],
    providers: [StoreAttributesService],
})
export class StoreAttributesModule {}
