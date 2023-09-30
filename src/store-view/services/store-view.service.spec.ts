import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewService } from './store-view.service';

describe('StoreViewService', () => {
    let service: StoreViewService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreViewService],
        }).compile();

        service = module.get<StoreViewService>(StoreViewService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
