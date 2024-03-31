import { Test, TestingModule } from '@nestjs/testing';
import { AttributeQueryService } from './query.service';

describe('AttributeQueryService', () => {
    let service: AttributeQueryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AttributeQueryService]
        }).compile();

        service = module.get<AttributeQueryService>(AttributeQueryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
