import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurableProductService } from './configurable-product.service';

describe('ConfigurableProductService', () => {
    let service: ConfigurableProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigurableProductService],
        }).compile();

        service = module.get<ConfigurableProductService>(
            ConfigurableProductService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
