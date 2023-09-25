import { ApiProperty } from '@nestjs/swagger';
import { CreateStoreDto, CreateStoreViewDto } from './create-store.dto';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetStoreDto extends CreateStoreDto {
    @ApiProperty({
        title: 'Store ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Store Created Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        title: 'Store Updated Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    updatedAt: Date;
}

export class GetStoreViewDto extends CreateStoreViewDto {
    @ApiProperty({
        title: 'Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Store View Created Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        title: 'Store View Updated Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    updatedAt: Date;
}
