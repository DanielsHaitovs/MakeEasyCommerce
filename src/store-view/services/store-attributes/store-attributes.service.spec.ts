import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewAttributesService } from './store-attributes.service';

describe('StoreViewAttributesService', () => {
    let service: StoreViewAttributesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreViewAttributesService],
        }).compile();

        service = module.get<StoreViewAttributesService>(
            StoreViewAttributesService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
