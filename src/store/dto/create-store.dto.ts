import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { StoreBaseDto } from './store-base.dto';

export class CreateStoreShortDto extends StoreBaseDto {}
export class CreateStoreDto extends CreateStoreShortDto {
    // @ApiProperty({
    //     title: 'Store Views',
    //     type: [CreateStoreViewShortDto],
    //     nullable: true,
    // })
    // @ValidateNested({ each: true })
    // storeViews: CreateStoreViewShortDto[];
}
