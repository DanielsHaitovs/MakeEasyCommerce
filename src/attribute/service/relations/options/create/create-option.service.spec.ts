import { Test, TestingModule } from '@nestjs/testing';
import { OptionCreateService } from './create-option.service';

describe('OptionCreateService', () => {
    let service: OptionCreateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OptionCreateService]
        }).compile();

        service = module.get<OptionCreateService>(OptionCreateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
