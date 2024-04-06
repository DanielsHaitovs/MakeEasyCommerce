import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { AttributeService } from '../service/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { AttributeResponseDto } from '../dto/get-attribute.dto';
import { AttributeRelationSelectDto } from '../dto/filter-attribute.dto';
import { AttributeRelationSelectPipe } from '../pipes/attribute-relation-select.pipe';
import { PaginationPipe } from '@src/pipes/pagination.pipe';
import { UpdateAttributeDto, UpdateAttributeRuleDto } from '../dto/update-attribute.dto';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post()
    @ApiOperation({
        summary: 'Create Attribute',
        description: 'Creates record (specifically) for attribute entity'
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute Rule',
        required: false
    })
    async create(@Body() createRule: CreateAttributeDto): Promise<AttributeResponseDto> {
        return await this.attributeService.createAttribute({ createAttribute: createRule });
    }

    @Get()
    @ApiOperation({
        summary: 'Get Attributes',
        description: 'Get Attributes with option to paginate and include relations'
    })
    @ApiOkResponse({
        description: 'Attributes page',
        type: AttributeResponseDto
    })
    async getAllAttributes(
        @Query(PaginationPipe) pagination: PaginationDto,
        @Query(AttributeRelationSelectPipe) relations: AttributeRelationSelectDto
    ): Promise<AttributeResponseDto> {
        return await this.attributeService.getAttributes({ pagination, relations });
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Attribute ID'
    })
    @ApiOperation({
        summary: 'Get Attributes',
        description: 'Get Attributes with option to paginate and include relations'
    })
    @ApiOkResponse({
        description: 'Attributes page',
        type: AttributeResponseDto
    })
    async getAllAttributeById(
        @Param('id', ParseIntPipe) id: number,
        @Query(AttributeRelationSelectPipe) relations: AttributeRelationSelectDto
    ): Promise<AttributeResponseDto> {
        return await this.attributeService.getAttributeById({ id, relations });
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Attribute ID'
    })
    @ApiOperation({
        summary: 'Update Attribute',
        description: 'Update Attribute with option to include relations'
    })
    @ApiBody({
        type: UpdateAttributeDto,
        description: 'Update Attribute Rule',
        required: false
    })
    async updateAttribute(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAttribute: UpdateAttributeDto
    ): Promise<AttributeResponseDto> {
        return await this.attributeService.updateAttribute({ id, updateAttribute });
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Attribute ID'
    })
    @ApiOperation({
        summary: 'Delete Attribute',
        description: 'Delete Attribute with option to include relations'
    })
    async deleteAttribute(@Param('id', ParseIntPipe) id: number): Promise<AttributeResponseDto> {
        return await this.attributeService.deleteAttribute({ id });
    }

    @Patch()
    @ApiOperation({
        summary: 'Update Attribute Rule By Attribute ID or Rule ID',
        description: 'Update Attribute Rule relation by Attribute ID or Rule ID, Rule ID is faster'
    })
    @ApiBody({
        type: UpdateAttributeRuleDto,
        description: 'Update Attribute Rule',
        required: false
    })
    async updateAttributeRule(@Body() updateRule: UpdateAttributeRuleDto): Promise<AttributeResponseDto> {
        return await this.attributeService.updateAttributeRule({ id: updateRule.id, ruleId: updateRule.ruleId, rule: updateRule });
    }
}
