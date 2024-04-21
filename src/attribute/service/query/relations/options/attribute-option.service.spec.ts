import { Test, TestingModule } from '@nestjs/testing';
import { AttributeOptionsService } from './attribute-option.service';

describe('AttributeOptionsService', () => {
    let service: AttributeOptionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AttributeOptionsService]
        }).compile();

        service = module.get<AttributeOptionsService>(AttributeOptionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
