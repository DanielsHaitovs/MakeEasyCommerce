import { Test, TestingModule } from '@nestjs/testing';
import { AttributeOptionController } from './attribute-option.controller';
import { AttributeOptionService } from '@src/attribute/services/attributes/attribute-option.service';

describe('AttributeOptionController', () => {
    let controller: AttributeOptionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AttributeOptionController],
            providers: [AttributeOptionService],
        }).compile();

        controller = module.get<AttributeOptionController>(AttributeOptionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
