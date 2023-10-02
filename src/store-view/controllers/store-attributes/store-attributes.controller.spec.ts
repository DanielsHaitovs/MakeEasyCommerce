import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewAttributesController } from './store-attributes.controller';
import { StoreViewAttributesService } from '@src/store-view/services/store-attributes/store-attributes.service';

describe('StoreViewAttributesController', () => {
    let controller: StoreViewAttributesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreViewAttributesController],
            providers: [StoreViewAttributesService],
        }).compile();

        controller = module.get<StoreViewAttributesController>(
            StoreViewAttributesController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
