import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
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

export class GetStoreDto extends GetStoreShortDto {}
