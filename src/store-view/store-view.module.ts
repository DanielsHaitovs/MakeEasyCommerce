import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreView } from './entities/store-view.entity';
import { StoreViewService } from './services/store-view.service';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreViewAttributes } from './entities/store-attributes.entity';
import { StoreViewRule } from './entities/Attributes/attributes-rule.entity';
import { StoreViewAttributesDescription } from './entities/Attributes/attributes-description.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StoreView,
            StoreViewAttributes,
            StoreViewAttributesDescription,
            StoreViewRule,
        ]),
    ],
    controllers: [StoreViewController],
    providers: [StoreViewService, StoreHelperService],
})
export class StoreViewModule {}
