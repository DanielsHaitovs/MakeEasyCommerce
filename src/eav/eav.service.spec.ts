import { Test, TestingModule } from '@nestjs/testing';
import { EavService } from './eav.service';

describe('EavService', () => {
  let service: EavService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EavService],
    }).compile();

    service = module.get<EavService>(EavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
