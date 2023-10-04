import { Module } from '@nestjs/common';
import { StoreViewService } from './services/store-view.service';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreAttributeModule } from './store-attribute/store-attribute.module';
import { StoreAttributeController } from './store-attribute/controllers/store-attribute.controller';
import { StoreAttributeService } from './store-attribute/services/store-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreView } from './entities/store-view.entity';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';

@Module({
    imports: [StoreAttributeModule, TypeOrmModule.forFeature([StoreView])],
    controllers: [StoreViewController, StoreAttributeController],
    providers: [
        StoreViewService,
        StoreAttributeService,
        AttributeHelperService,
    ],
})
export class StoreViewModule {}
