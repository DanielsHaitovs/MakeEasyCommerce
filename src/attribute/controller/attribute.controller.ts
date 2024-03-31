import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { AttributeService } from '../service/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { AttributeResponseDto } from '../dto/get-attribute.dto';

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
}
