import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

export class StoreDto {
    @ApiProperty({
        title: 'Store Status',
        type: Boolean,
        default: false,
    })
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @ApiProperty({
        title: 'Store Name',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        title: 'Store code',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        title: 'Store Description',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}

export class StoreViewDto {
    @ApiProperty({
        title: 'Store View Status',
        type: Boolean,
        default: false,
    })
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @ApiProperty({
        title: 'Store View Name',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        title: 'Store View code',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        title: 'Store View Description',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}

export class CreateStoreShortDto extends StoreDto {}
export class CreateStoreDto extends CreateStoreShortDto {
    @ApiProperty({
        title: 'Store Views',
        type: [StoreViewDto],
        nullable: true,
    })
    @ValidateNested({ each: true })
    storeViews: StoreViewDto[];
}

export class CreateStoreViewShortDto extends StoreViewDto {}
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
