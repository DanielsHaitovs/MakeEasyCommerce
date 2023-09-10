import { Module } from '@nestjs/common';
import { ProductAttributeController } from './controllers/product-attribute.controller';
import { ProductAttributeService } from './services/product-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';

@Module({
    controllers: [ProductAttributeController],
    providers: [ProductAttributeService],
    imports: [TypeOrmModule.forFeature([ProductAttribute])],
})
export class ProductAttributeModule {}
