import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreView } from './entities/store-view.entity';
import { StoreViewService } from './services/store-view.service';
import { StoreViewController } from './controllers/store-view.controller';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreViewAttributes } from './entities/store-attributes.entity';
import { StoreViewRule } from './entities/attributes/attributes-rule.entity';
import { StoreViewAttributesDescription } from './entities/attributes/attributes-description.entity';
import { StoreViewAttributesController } from './controllers/store-attributes/store-attributes.controller';
import { StoreViewAttributesService } from './services/store-attributes/store-attributes.service';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StoreView,
            StoreViewAttributes,
            StoreViewAttributesDescription,
            StoreViewRule,
        ]),
    ],
    controllers: [StoreViewController, StoreViewAttributesController],
    providers: [
        StoreViewService,
        StoreHelperService,
        StoreViewAttributesService,
        AttributeHelperService,
    ],
})
export class StoreViewModule {}
