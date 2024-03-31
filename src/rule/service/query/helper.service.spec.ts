import { Test, TestingModule } from '@nestjs/testing';
import { RuleHelperService } from './helper.service';

describe('RuleHelperService', () => {
    let service: RuleHelperService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RuleHelperService]
        }).compile();

        service = module.get<RuleHelperService>(RuleHelperService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
