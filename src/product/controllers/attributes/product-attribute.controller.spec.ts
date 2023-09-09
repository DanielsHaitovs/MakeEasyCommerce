import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeController } from './product-attribute.controller';
import { ProductAttributeService } from '@src/product/services/product/attribute.product.service';

describe('ProductAttributeController', () => {
    let controller: ProductAttributeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductAttributeController],
            providers: [ProductAttributeService],
        }).compile();

        controller = module.get<ProductAttributeController>(
            ProductAttributeController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
