import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeService } from '.working_tempo/services/attributes/product-attribute.service';
import { ProductAttributeController } from './product-attribute.controller';

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
