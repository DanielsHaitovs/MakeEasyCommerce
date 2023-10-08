import { Test, TestingModule } from '@nestjs/testing';
import { StoreAttributeOptionService } from './attribute-option.service';

describe('StoreAttributeOptionService', () => {
    let service: StoreAttributeOptionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreAttributeOptionService],
        }).compile();

        service = module.get<StoreAttributeOptionService>(
            StoreAttributeOptionService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
