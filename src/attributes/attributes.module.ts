import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute } from './entities/attribute.entity';
import { Product } from '@src/product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Attribute, Product])],
    controllers: [AttributesController],
    providers: [AttributesService],
})
export class AttributesModule {}
