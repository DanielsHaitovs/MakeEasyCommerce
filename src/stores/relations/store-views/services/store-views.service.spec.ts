import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewsService } from './store-views.service';

describe('StoreViewsService', () => {
    let service: StoreViewsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreViewsService],
        }).compile();

        service = module.get<StoreViewsService>(StoreViewsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
