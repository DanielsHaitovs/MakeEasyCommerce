import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributeController } from './store-attribute.controller';
import { StoreAttributeService } from '../services/store-attribute.service';

describe('StoreAttributeController', () => {
    let controller: StoreAttributeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreAttributeController],
            providers: [StoreAttributeService],
        }).compile();

        controller = module.get<StoreAttributeController>(
            StoreAttributeController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
