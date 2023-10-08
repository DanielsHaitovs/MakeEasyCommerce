import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreViewModule } from './relations/store-view/store-view.module';
import { StoreAttributeModule } from './relations/store-attribute/store-attribute.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Store]),
        StoreViewModule,
        StoreAttributeModule,
    ],
    controllers: [StoreController],
    providers: [StoreService, StoreHelperService],
})
export class StoreModule {}
