import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeController } from './attribute.controller';
import { ProductAttributeService } from '@src/product/services/attributes/attributes/product-attribute.service';

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
