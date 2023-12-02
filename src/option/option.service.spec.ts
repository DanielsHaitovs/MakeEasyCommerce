import { Test, TestingModule } from '@nestjs/testing';
import { AttributeOptionService } from './services/option.service';

describe('AttributeOptionService', () => {
    let service: AttributeOptionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AttributeOptionService],
        }).compile();

        service = module.get<AttributeOptionService>(AttributeOptionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
