import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreViewDto } from './create-store-view.dto';

export class UpdateStoreViewDto extends PartialType(CreateStoreViewDto) {}
