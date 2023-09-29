import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributesService } from './store-attributes.service';

describe('StoreAttributesService', () => {
    let service: StoreAttributesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreAttributesService],
        }).compile();

        service = module.get<StoreAttributesService>(StoreAttributesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
