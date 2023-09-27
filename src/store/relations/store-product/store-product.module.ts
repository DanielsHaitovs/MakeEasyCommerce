import { Module } from '@nestjs/common';
import { StoreProductService } from './services/store-product.service';
import { StoreProductController } from './controllers/store-product.controller';

@Module({
    controllers: [StoreProductController],
    providers: [StoreProductService],
})
export class StoreProductModule {}
