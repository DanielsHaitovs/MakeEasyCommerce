import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute.dto';
import { PaginationPipe } from '@src/pipes/pagination.pipe';
import { AttributeOptionsService } from '../service/relations/options/attribute-option.service';
import { OptionResponseDto } from '../dto/options/get-option.dto';

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
        @Query('ids') ids: number[],
        @Query(PaginationPipe) pagination: PaginationDto
    ): Promise<OptionResponseDto> {
        return await this.optionService.getStringOptionsByIds({ ids, pagination });
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
        @Query('ids') ids: number[],
        @Query(PaginationPipe) pagination: PaginationDto
    ): Promise<OptionResponseDto> {
        return await this.optionService.getNumberOptionsByIds({ ids, pagination });
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
        @Query('stringOptionIds') stringOptionIds: number[],
        @Query('numberOptionIds') numberOptionIds: number[]
    ): Promise<OptionResponseDto> {
        return await this.optionService.getOptionsByIds({ stringOptionIds, numberOptionIds });
    }

    // @Patch(':id')
    // @ApiParam({
    //     name: 'id',
    //     type: String,
    //     required: true,
    //     description: 'Attribute ID'
    // })
    // @ApiOperation({
    //     summary: 'Update Attribute',
    //     description: 'Update Attribute with option to include relations'
    // })
    // @ApiBody({
    //     type: UpdateAttributeDto,
    //     description: 'Update Attribute Rule',
    //     required: false
    // })
    // async updateAttribute(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateAttribute: UpdateAttributeDto
    // ): Promise<AttributeResponseDto> {
    //     return await this.optionService.updateAttribute({ id, updateAttribute });
    // }

    // @Delete(':id')
    // @ApiParam({
    //     name: 'id',
    //     type: String,
    //     required: true,
    //     description: 'Attribute ID'
    // })
    // @ApiOperation({
    //     summary: 'Delete Attribute',
    //     description: 'Delete Attribute with option to include relations'
    // })
    // async deleteAttribute(@Param('id', ParseIntPipe) id: number): Promise<AttributeResponseDto> {
    //     return await this.optionService.deleteAttribute({ id });
    // }

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
