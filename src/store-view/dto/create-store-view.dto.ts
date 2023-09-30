import { ApiProperty } from '@nestjs/swagger';
import { StoreBaseDto } from '@src/stores/dto/store-base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStoreViewShortDto extends StoreBaseDto {}
export class CreateStoreViewDto extends CreateStoreViewShortDto {
    @ApiProperty({
        title: 'Parent Store ID',
        type: Number,
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    store: number;
}
