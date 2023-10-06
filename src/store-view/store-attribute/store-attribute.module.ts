import { Module } from '@nestjs/common';
import { StoreAttributeController } from './controllers/store-attribute.controller';
import { StoreAttributeService } from './services/store-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRule } from './entities/store-attributes/attribute-rule.entity';
import { StoreAttribute } from './entities/store-attribute.entity';
import { StoreAttributeDescription } from './entities/store-attributes/attributes-description.entity';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StoreRule,
            StoreAttribute,
            StoreAttributeDescription,
        ]),
    ],
    controllers: [StoreAttributeController],
    providers: [
        StoreAttributeService,
        AttributeHelperService,
        StoreHelperService,
    ],
})
export class StoreAttributeModule {}
