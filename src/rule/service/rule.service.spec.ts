import { Test, TestingModule } from '@nestjs/testing';
import { AttributeRuleService } from './rule.service';

describe('AttributeRuleService', () => {
    let service: AttributeRuleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AttributeRuleService],
        }).compile();

        service = module.get<AttributeRuleService>(AttributeRuleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
