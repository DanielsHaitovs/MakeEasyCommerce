import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributeService } from './store-attribute.service';

describe('StoreAttributeService', () => {
    let service: StoreAttributeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreAttributeService],
        }).compile();

        service = module.get<StoreAttributeService>(StoreAttributeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
