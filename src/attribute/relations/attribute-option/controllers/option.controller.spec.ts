import { Test, TestingModule } from '@nestjs/testing';
import { AttributeOptionController } from './option.controller';
import { OptionService } from '../services/option.service';

describe('AttributeOptionController', () => {
    let controller: AttributeOptionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AttributeOptionController],
            providers: [OptionService],
        }).compile();

        controller = module.get<AttributeOptionController>(
            AttributeOptionController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
