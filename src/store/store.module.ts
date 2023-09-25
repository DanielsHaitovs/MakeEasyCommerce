import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreViewService } from './services/store-view.service';
import { Store } from './entities/store.entity';
import { StoreView } from './entities/store-view.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StoreView, Store])],
    controllers: [StoreController, StoreViewController],
    providers: [StoreService, StoreViewService, StoreHelperService],
})
export class StoreModule {}
