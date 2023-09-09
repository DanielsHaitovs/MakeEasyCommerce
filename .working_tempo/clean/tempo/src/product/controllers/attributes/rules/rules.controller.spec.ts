import { Test, TestingModule } from '@nestjs/testing';
import { ProductRulesController } from './rules.controller';
import { ProductRulesService } from '@src/product/services/attributes/rules/product-rules.service';

describe('ProductRulesController', () => {
    let controller: ProductRulesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductRulesController],
            providers: [ProductRulesService],
        }).compile();

        controller = module.get<ProductRulesController>(ProductRulesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
