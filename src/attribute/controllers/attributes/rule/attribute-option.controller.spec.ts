import { Test, TestingModule } from '@nestjs/testing';
import { AttributeRuleController } from '@src/attribute/relations/attribute-rule/controllers/rule.controller';
import { AttributeService } from '@src/attribute/services/attribute.service';

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
