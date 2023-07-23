import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { EAV } from '@src/eav/entities/eav.entity';
import { EAVAttribute } from '@src/eav/entities/eav-attribute.entity';
import { EAVAttributeOption } from '@src/eav/entities/eav-attribute-option.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Basket,
            EAV,
            EAVAttribute,
            EAVAttributeOption,
        ]),
    ],
    controllers: [BasketController],
    providers: [BasketService],
})
export class BasketModule {}
