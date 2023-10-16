import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import {
    AttributerRelations,
    OrderedPaginationDto,
    SingleConditionDto,
} from '../filters.dto';

export class StoreAttributeRelations extends AttributerRelations {}

export class StoreFilters extends SingleConditionDto {
    @ApiProperty({
        title: 'Filter by Store View',
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    storeViewId: number;
}
export class StoreRuleFilters extends StoreFilters {}
export class StoreOptionFilters extends StoreFilters {}
export class StoreAttributeFilters extends StoreFilters {
    @ApiProperty({
        title: 'Filter by Store View',
        type: Number,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    defaultAttributeId: number;

    @ApiProperty({
        title: 'Is Default',
        type: Boolean,
        nullable: true,
    })
    @IsOptional()
    @IsBoolean()
    isDefault: boolean;

    @ApiProperty({
        title: 'Store Attribute Relation Filters',
        type: StoreAttributeRelations,
        nullable: true,
        default: null,
    })
    @ValidateNested({ each: true })
    attributeRelations: StoreAttributeRelations;
}

export class StoreViewOrderedPaginationDto extends OrderedPaginationDto {
    @ApiProperty({
        title: 'Filter by Store View',
        type: Number,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    storeViewId: number;
}
