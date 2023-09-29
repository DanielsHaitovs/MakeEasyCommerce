import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewsController } from './store-views.controller';
import { StoreViewsService } from './store-views.service';

describe('StoreViewsController', () => {
    let controller: StoreViewsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreViewsController],
            providers: [StoreViewsService],
        }).compile();

        controller = module.get<StoreViewsController>(StoreViewsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
