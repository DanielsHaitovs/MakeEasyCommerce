import { PartialType } from '@nestjs/swagger';
import { CreateStoreDto, CreateStoreViewDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
export class UpdateStoreViewDto extends PartialType(CreateStoreViewDto) {}
