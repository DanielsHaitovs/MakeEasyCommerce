import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { GetStoreViewDto } from '../../store-view/dto/get-store-view.dto';
import { CreateStoreShortDto } from './create-store.dto';

export class GetStoreShortDto extends CreateStoreShortDto {
    @ApiProperty({
        title: 'Store ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    createdAt: Date;
    updatedAt: Date;
}

export class GetStoreDto extends GetStoreShortDto {
    @ApiProperty({
        title: 'Get Store Views',
        type: [GetStoreViewDto],
        nullable: true,
    })
    @ValidateNested({ each: true })
    storeViews: GetStoreViewDto[];
}
