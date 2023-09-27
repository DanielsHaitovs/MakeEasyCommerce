import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributesController } from './store-attributes.controller';
import { StoreAttributesService } from './store-attributes.service';

describe('StoreAttributesController', () => {
    let controller: StoreAttributesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreAttributesController],
            providers: [StoreAttributesService],
        }).compile();

        controller = module.get<StoreAttributesController>(
            StoreAttributesController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
