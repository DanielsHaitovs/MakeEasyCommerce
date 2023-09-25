import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreView } from './entities/store-view.entity';
import { Store } from './entities/store.entity';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreViewService } from './services/store-view.service';

@Module({
    imports: [TypeOrmModule.forFeature([StoreView, Store])],
    controllers: [StoreViewController, StoreController],
    providers: [StoreService, StoreViewService, StoreHelperService],
})
export class StoreModule {}
