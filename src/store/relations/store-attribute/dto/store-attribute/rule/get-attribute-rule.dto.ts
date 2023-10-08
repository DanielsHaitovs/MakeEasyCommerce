import { ApiProperty } from '@nestjs/swagger';
import { RuleBaseDto } from '@src/attribute/relations/rule/dto/rule-base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStoreRuleDto } from './create-attribute-rule.dto';

export class GetStoreRuleDto extends CreateStoreRuleDto {
    @ApiProperty({
        title: 'Store Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreFrontRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Store Front end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Store Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeAttribute: number;

    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
        default: 0,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;
}

export class GetStoreBackRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Store Back end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
        default: 0,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;
}
