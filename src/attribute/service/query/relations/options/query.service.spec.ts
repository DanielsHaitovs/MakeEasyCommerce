import { Test, TestingModule } from '@nestjs/testing';
import { OptionQueryService } from './option-query.service';

describe('OptionQueryService', () => {
    let service: OptionQueryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OptionQueryService]
        }).compile();

        service = module.get<OptionQueryService>(OptionQueryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
