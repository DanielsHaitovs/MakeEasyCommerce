import { Test, TestingModule } from '@nestjs/testing';
import { StoreViewRuleService } from '../../../services/store-attribute/attribute-rule.service';
import { StoreRuleController } from './attribute-rule.controller';

describe('StoreRuleController', () => {
    let controller: StoreRuleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreRuleController],
            providers: [StoreViewRuleService],
        }).compile();

        controller = module.get<StoreRuleController>(StoreRuleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
