import { ApiProperty } from '@nestjs/swagger';
import { StoreRuleDto } from '@src/attribute/relations/rule/dto/rule-base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class StoreRuleBaseDto extends StoreRuleDto {
    storeView: number;
}

export class CreateStoreRuleDto extends StoreRuleDto {
    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
        default: 0,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Store Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeAttribute: number;
}
