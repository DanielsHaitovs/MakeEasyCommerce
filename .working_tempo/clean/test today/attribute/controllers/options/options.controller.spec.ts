import { Test, TestingModule } from '@nestjs/testing';
import { OptionsService } from '@src/product/services/attributes/options/options.service';
import { OptionsController } from './options.controller';

describe('OptionsController', () => {
    let controller: OptionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OptionsController],
            providers: [OptionsService],
        }).compile();

        controller = module.get<OptionsController>(OptionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
