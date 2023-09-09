import { Test, TestingModule } from '@nestjs/testing';
import { ProductRulesService } from './product-rules.service';

describe('ProductRulesService', () => {
    let service: ProductRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductRulesService],
        }).compile();

        service = module.get<ProductRulesService>(ProductRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
