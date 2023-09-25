import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewService } from '../services/store-view.service';
import { StoreViewController } from './store-view.controller';

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
