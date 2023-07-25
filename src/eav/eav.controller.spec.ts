import { Test, TestingModule } from '@nestjs/testing';
import { EavController } from './eav.controller';
import { EavService } from './eav.service';

describe('EavController', () => {
    let controller: EavController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EavController],
            providers: [EavService],
        }).compile();

        controller = module.get<EavController>(EavController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
