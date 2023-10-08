import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributeOptionController } from './attribute-option.controller';
import { OptionService } from '@src/attribute/relations/option/services/option.service';

describe('StoreAttributeOptionController', () => {
    let controller: StoreAttributeOptionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreAttributeOptionController],
            providers: [OptionService],
        }).compile();

        controller = module.get<StoreAttributeOptionController>(
            StoreAttributeOptionController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
