import { Test, TestingModule } from '@nestjs/testing';
import { RuleAttributeService } from './attribute-rule.service';

describe('RuleAttributeService', () => {
    let service: RuleAttributeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RuleAttributeService],
        }).compile();

        service = module.get<RuleAttributeService>(RuleAttributeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
