import { ApiProperty } from '@nestjs/swagger';
import { StoreDescription } from '../entities/store-base.entity';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateStoreViewDto } from './create-store.dto';

export class GetStoreViewDto extends CreateStoreViewDto {
    @ApiProperty({
        title: 'Store View ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreShortDto {
    @ApiProperty({
        title: 'Store ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Store Data',
        type: StoreDescription,
    })
    @ValidateNested({ each: true })
    description: StoreDescription;
}

export class GetStoreDto extends GetStoreShortDto {
    @ApiProperty({
        title: 'Store View Data',
        type: GetStoreViewDto,
    })
    @ValidateNested({ each: true })
    storeViews: GetStoreViewDto;
}
