import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewController } from './store-view.controller';
import { StoreViewService } from './services/store-view.service';

describe('StoreViewController', () => {
    let controller: StoreViewController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreViewController],
            providers: [StoreViewService],
        }).compile();

        controller = module.get<StoreViewController>(StoreViewController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
