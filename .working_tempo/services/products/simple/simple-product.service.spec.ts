import { Test, TestingModule } from '@nestjs/testing';
import { SimpleProductService } from './simple-product.service';

describe('SimpleProductService', () => {
    let service: SimpleProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SimpleProductService],
        }).compile();

        service = module.get<SimpleProductService>(SimpleProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
