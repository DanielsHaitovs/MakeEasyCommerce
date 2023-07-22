import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Attribute } from '@src/attributes/entities/attribute.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Attribute])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
