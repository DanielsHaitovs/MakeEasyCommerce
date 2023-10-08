import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class StoreBaseDto {
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
