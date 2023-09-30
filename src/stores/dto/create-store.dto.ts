import { ApiProperty } from '@nestjs/swagger';
import { StoreBaseDto } from '@src/stores/dto/store-base.dto';
import { ValidateNested } from 'class-validator';
import { CreateStoreViewShortDto } from '../../store-view/dto/create-store-view.dto';

export class CreateStoreShortDto extends StoreBaseDto {}
export class CreateStoreDto extends CreateStoreShortDto {
    @ApiProperty({
        title: 'Store Views',
        type: [CreateStoreViewShortDto],
        nullable: true,
    })
    @ValidateNested({ each: true })
    storeViews: CreateStoreViewShortDto[];
}
