import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresController } from './controllers/stores.controller';
import { StoresService } from './services/stores.service';
import { StoreViewsModule } from './relations/store-views/store-views.module';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';

@Module({
    imports: [StoreViewsModule, TypeOrmModule.forFeature([Store])],
    controllers: [StoresController],
    providers: [StoresService, StoreHelperService],
})
export class StoresModule {}
