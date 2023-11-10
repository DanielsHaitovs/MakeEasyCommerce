import { Test, TestingModule } from '@nestjs/testing';
import { QueryFilterService } from './query-filter.service';

describe('QueryFilterService', () => {
    let service: QueryFilterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QueryFilterService],
        }).compile();

        service = module.get<QueryFilterService>(QueryFilterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
