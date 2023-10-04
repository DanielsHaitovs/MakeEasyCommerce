import { ApiProperty } from '@nestjs/swagger';
import { CreateStoreViewShortDto } from '@src/store-view/dto/create-store-view.dto';
import { StoreBaseDto } from '@src/stores/dto/store-base.dto';
import { ValidateNested } from 'class-validator';

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
