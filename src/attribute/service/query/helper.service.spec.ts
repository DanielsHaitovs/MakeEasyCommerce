import { Test, TestingModule } from '@nestjs/testing';
import { AttributeHelperService } from './helper.service';

describe('AttributeHelperService', () => {
    let service: AttributeHelperService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AttributeHelperService]
        }).compile();

        service = module.get<AttributeHelperService>(AttributeHelperService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
