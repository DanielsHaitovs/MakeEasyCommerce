import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { StoreDescriptionDto, StoreViewDescriptionDto } from './store-base.dto';

export class CreateStoreViewDto {
    @ApiProperty({
        title: 'Single Store View Data',
        type: StoreViewDescriptionDto,
    })
    @ValidateNested({ each: true })
    view: StoreViewDescriptionDto;

    @ApiProperty({
        title: 'Parent Store ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    store: number;
}

export class CreateStoreShortDto {
    @ApiProperty({
        title: 'Store Data',
        type: StoreDescriptionDto,
    })
    description: StoreDescriptionDto;
}

export class CreateStoreDto extends CreateStoreShortDto {
    @ApiProperty({
        title: 'Store Views Data',
        type: [CreateStoreViewDto],
    })
    @ValidateNested({ each: true })
    storeViews: CreateStoreViewDto[];
}
