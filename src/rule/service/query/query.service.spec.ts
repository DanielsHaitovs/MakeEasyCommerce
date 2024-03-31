import { Test, TestingModule } from '@nestjs/testing';
import { RuleQueryService } from './query.service';

describe('RuleQueryService', () => {
    let service: RuleQueryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RuleQueryService]
        }).compile();

        service = module.get<RuleQueryService>(RuleQueryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
