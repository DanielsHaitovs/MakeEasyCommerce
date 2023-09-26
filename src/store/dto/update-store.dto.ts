import { PartialType } from '@nestjs/swagger';
import {
    CreateStoreShortDto,
    CreateStoreViewShortDto,
} from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreShortDto) {}
export class UpdateStoreViewDto extends PartialType(CreateStoreViewShortDto) {}
