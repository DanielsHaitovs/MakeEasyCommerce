import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreViewService } from './services/store-view.service';
import { Store } from './entities/store.entity';
import { StoreView } from './entities/store-view.entity';
import { StoreOption } from './relations/store-attributes/entities/store-option.entity';
import { StoreAttributesModule } from './relations/store-attributes/store-attributes.module';
import { StoreProductModule } from './relations/store-product/store-product.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([StoreView, Store, StoreOption]),
        StoreAttributesModule,
        StoreProductModule,
    ],
    controllers: [StoreController, StoreViewController],
    providers: [StoreService, StoreViewService, StoreHelperService],
})
export class StoreModule {}
