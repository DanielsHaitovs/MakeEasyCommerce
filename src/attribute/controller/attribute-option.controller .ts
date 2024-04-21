import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute.dto';
import { PaginationPipe } from '@src/pipes/pagination.pipe';
import { AttributeOptionsService } from '../service/query/relations/options/attribute-option.service';
import { OptionResponseDto } from '../dto/options/get-option.dto';
import { AttributeResponseDto } from '../dto/get-attribute.dto';
import { AttributeType } from '../enum/attribute.enum';
import { UpdateNumberOptionDto, UpdateStringOptionDto } from '../dto/options/update-option.dto';
import { IdsFilterPipe } from '@src/pipes/ids-filter-pipe.pipe';

@ApiTags('Attribute Option')
@Controller('attribute-option')
export class AttributeOptionController {
    constructor(private readonly optionService: AttributeOptionsService) {}

    @Post(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Attribute ID'
    })
    @ApiOperation({
        summary: 'Create Attribute Option',
        description: 'Creates record (specifically) for attribute option entity'
    })
    @ApiBody({
        type: CreateAttributeOptionDto,
        description: 'Create Attribute Option',
        required: false
    })
    @ApiOkResponse({
        description: 'Attribute Options',
        type: OptionResponseDto
    })
    async createOptions(
        @Param('id', ParseIntPipe) id: number,
        @Body() createOptions: CreateAttributeOptionDto
    ): Promise<OptionResponseDto> {
        return await this.optionService.create({ id, createOptions });
    }

    @Get('stringOptions')
    @ApiOperation({
        summary: 'Get Attributes String Options',
        description: 'Get Attributes Options by type String with option to paginate'
    })
    @ApiOkResponse({
        description: 'Attribute String Option page',
        type: OptionResponseDto
    })
    async getAllStringOptions(@Query(PaginationPipe) pagination: PaginationDto): Promise<OptionResponseDto> {
        return await this.optionService.getStringOptions({ pagination });
    }

    @Patch('stringOptions')
    @ApiOperation({
        summary: 'Update Attribute String Option',
        description: 'Update Attribute String Options'
    })
    @ApiBody({
        type: UpdateStringOptionDto,
        isArray: true,
        description: 'Update Attribute String Option',
        required: false
    })
    async updateStringOption(@Body() updateOption: UpdateStringOptionDto[]): Promise<OptionResponseDto> {
        return await this.optionService.updateStringOption({ updateOption });
    }

    @Delete('stringOptions')
    @ApiQuery({
        name: 'stringOptionsIds',
        type: Number,
        required: true,
        isArray: true,
        description: 'String Option IDs'
    })
    @ApiOperation({
        summary: 'Delete String Options',
        description: 'Delete Many String Options By theirs IDs'
    })
    async deleteStringOption(@Query('stringOptionsIds', IdsFilterPipe) ids: number[]): Promise<unknown> {
        return await this.optionService.deleteOptions({ ids, type: AttributeType.String });
    }

    @Get('stringOptions/ids')
    @ApiQuery({
        name: 'ids',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiOperation({
        summary: 'Get Attributes String Options',
        description: 'Get Attributes Options by type String with option to paginate'
    })
    @ApiOkResponse({
        description: 'Attribute String Option page',
        type: OptionResponseDto
    })
    async getStringOptionsByIds(
        @Query('ids', IdsFilterPipe) ids: number[],
        @Query(PaginationPipe) pagination: PaginationDto
    ): Promise<OptionResponseDto> {
        return await this.optionService.getStringOptionsByIds({ ids, pagination });
    }

    @Get('by/stringOption-ids')
    @ApiQuery({
        name: 'ids',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiOkResponse({
        description: 'Attribute From Option ID',
        type: AttributeResponseDto
    })
    async getAttributeFromStringOptionId(@Query('numberOptionsIds', IdsFilterPipe) ids: number[]): Promise<AttributeResponseDto> {
        return await this.optionService.findAttributeByOptionId({ ids, type: AttributeType.String });
    }

    @Get('numberOptions')
    @ApiOperation({
        summary: 'Get Attributes Number Options',
        description: 'Get Attributes Options by type number with option to paginate'
    })
    @ApiOkResponse({
        description: 'Attribute Number Options page',
        type: OptionResponseDto
    })
    async getAllNumberOptions(@Query(PaginationPipe) pagination: PaginationDto): Promise<OptionResponseDto> {
        return await this.optionService.getNumberOptions({ pagination });
    }

    @Patch('numberOptions')
    @ApiOperation({
        summary: 'Update Attribute',
        description: 'Update Attribute Number Option'
    })
    @ApiBody({
        type: UpdateNumberOptionDto,
        isArray: true,
        description: 'Update Attribute Number Option',
        required: false
    })
    async updateNumberOption(@Body() updateOption: UpdateNumberOptionDto[]): Promise<OptionResponseDto> {
        return await this.optionService.updateNumberOption({ updateOption });
    }

    @Delete('numberOptions')
    @ApiQuery({
        name: 'numberOptionsIds',
        type: Number,
        required: true,
        isArray: true,
        description: 'Number Option IDs'
    })
    @ApiOperation({
        summary: 'Delete Number Options',
        description: 'Delete Many Number Options By theirs IDs'
    })
    async deleteNumberOption(@Query('numberOptionsIds', IdsFilterPipe) ids: number[]): Promise<unknown> {
        return await this.optionService.deleteOptions({ ids, type: AttributeType.Number });
    }

    @Get('numberOptions/ids')
    @ApiQuery({
        name: 'ids',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiOperation({
        summary: 'Get Attributes Number Options',
        description: 'Get Attributes Options by type Number with option to paginate'
    })
    @ApiOkResponse({
        description: 'Attribute Number Option page',
        type: OptionResponseDto
    })
    async getNumberOptionsByIds(
        @Query('ids', IdsFilterPipe) ids: number[],
        @Query(PaginationPipe) pagination: PaginationDto
    ): Promise<OptionResponseDto> {
        return await this.optionService.getNumberOptionsByIds({ ids, pagination });
    }

    @Get('by/numberOptions-ids')
    @ApiQuery({
        name: 'ids',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiOkResponse({
        description: 'Attribute From Option ID',
        type: AttributeResponseDto
    })
    async getAttributeFromNumberOptionId(@Query('ids', IdsFilterPipe) ids: number[]): Promise<AttributeResponseDto> {
        return await this.optionService.findAttributeByOptionId({ ids, type: AttributeType.Number });
    }

    @Get('options/ids')
    @ApiQuery({
        name: 'stringOptionIds',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiQuery({
        name: 'numberOptionIds',
        type: Number,
        isArray: true,
        required: true
    })
    @ApiOperation({
        summary: 'Get Attributes Options',
        description: 'Get Attributes Options'
    })
    @ApiOkResponse({
        description: 'Attribute Option page',
        type: OptionResponseDto
    })
    async getOptionsByIds(
        @Query('stringOptionIds', IdsFilterPipe) stringOptionIds: number[],
        @Query('numberOptionIds', IdsFilterPipe) numberOptionIds: number[]
    ): Promise<OptionResponseDto> {
        return await this.optionService.getOptionsByIds({ stringOptionIds, numberOptionIds });
    }

    // @Patch()
    // @ApiOperation({
    //     summary: 'Update Attribute Rule By Attribute ID or Rule ID',
    //     description: 'Update Attribute Rule relation by Attribute ID or Rule ID, Rule ID is faster'
    // })
    // @ApiBody({
    //     type: UpdateAttributeRuleDto,
    //     description: 'Update Attribute Rule',
    //     required: false
    // })
    // async updateAttributeRule(@Body() updateRule: UpdateAttributeRuleDto): Promise<AttributeResponseDto> {
    //     return await this.optionService.updateAttributeRule({ id: updateRule.id, ruleId: updateRule.ruleId, rule: updateRule });
    // }
}
