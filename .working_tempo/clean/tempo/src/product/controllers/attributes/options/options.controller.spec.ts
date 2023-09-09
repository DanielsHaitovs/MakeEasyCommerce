import { Test, TestingModule } from '@nestjs/testing';
import { ProductOptionsController } from './options.controller';
import { ProductOptionsService } from '@src/product/services/attributes/options/product-options.service';

describe('ProductOptionsController', () => {
    let controller: ProductOptionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductOptionsController],
            providers: [ProductOptionsService],
        }).compile();

        controller = module.get<ProductOptionsController>(
            ProductOptionsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
