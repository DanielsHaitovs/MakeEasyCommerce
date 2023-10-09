import { ApiProperty } from '@nestjs/swagger';
import { OptionDto } from '@src/attribute/relations/option/dto/option.dto';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class StoreOptionBody extends OptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    parentOption: number;
}

export class CreateStoreOptionDto extends OptionDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeAttribute: number;

    @ApiProperty({
        title: 'Parent Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    parentOption: number;
}

export class CreateManyStoreOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeAttribute: number;

    @ApiProperty({
        title: 'Parent Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Store Option(s) Data',
        type: [StoreOptionBody],
    })
    @ValidateNested({ each: true })
    options: StoreOptionBody[];
}
