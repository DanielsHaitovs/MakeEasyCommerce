import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EAV } from '@src/eav/entities/eav.entity';
import { EAVAttribute } from '@src/eav/entities/eav-attribute.entity';
import { EAVAttributeOption } from '@src/eav/entities/eav-attribute-option.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            EAV,
            EAVAttribute,
            EAVAttributeOption,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
