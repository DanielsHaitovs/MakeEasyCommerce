import { Test, TestingModule } from '@nestjs/testing';
import { AttributeService } from '@src/attribute/services/attribute.service';
import { AttributeRuleController } from './attribute-rule.controller';

describe('AttributeRuleController', () => {
    let controller: AttributeRuleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AttributeRuleController],
            providers: [AttributeService],
        }).compile();

        controller = module.get<AttributeRuleController>(AttributeRuleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
