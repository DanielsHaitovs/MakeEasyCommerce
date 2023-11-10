import { Test, TestingModule } from '@nestjs/testing';
import { AttributeRuleController } from './rule.controller';
import { AttributeRuleService } from '../service/rule.service';

describe('AttributeRuleController', () => {
    let controller: AttributeRuleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AttributeRuleController],
            providers: [AttributeRuleService],
        }).compile();

        controller = module.get<AttributeRuleController>(
            AttributeRuleController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
