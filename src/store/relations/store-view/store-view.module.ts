import { Module } from '@nestjs/common';
import { StoreViewService } from './store-view.service';
import { StoreViewController } from './store-view.controller';

@Module({
    controllers: [StoreViewController],
    providers: [StoreViewService],
})
export class StoreViewModule {}
