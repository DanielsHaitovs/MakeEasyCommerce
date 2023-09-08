import { Test, TestingModule } from '@nestjs/testing';
import { SimpleProductController } from './simple-product.controller';
import { SimpleProductService } from '@src/product/services/products/simple/simple-product.service';

describe('SimpleProductController', () => {
    let controller: SimpleProductController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SimpleProductController],
            providers: [SimpleProductService],
        }).compile();

        controller = module.get<SimpleProductController>(
            SimpleProductController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
