import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreView } from './entities/store-view.entity';
import { StoreViewService } from './services/store-views.service';
import { StoreViewsController } from './controllers/store-views.controller';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';

@Module({
    imports: [TypeOrmModule.forFeature([StoreView])],
    controllers: [StoreViewsController],
    providers: [StoreViewService, StoreHelperService],
})
export class StoreViewsModule {}
