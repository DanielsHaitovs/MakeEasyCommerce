import { Test, TestingModule } from '@nestjs/testing';
import { OptionUpdateService } from './update-option.service';

describe('OptionUpdateService', () => {
    let service: OptionUpdateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OptionUpdateService]
        }).compile();

        service = module.get<OptionUpdateService>(OptionUpdateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
