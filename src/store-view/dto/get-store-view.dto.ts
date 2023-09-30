import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStoreViewDto } from './create-store-view.dto';

export class GetStoreViewDto extends CreateStoreViewDto {
    @ApiProperty({
        title: 'Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    createdAt: Date;
    updatedAt: Date;
}
