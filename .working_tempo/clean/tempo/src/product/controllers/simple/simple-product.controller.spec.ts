import { Test, TestingModule } from '@nestjs/testing';
import { SimpleProductService } from '@src/product/services/simple/simple-product.service';
import { SimpleProductController } from './simple-product.controller';

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
