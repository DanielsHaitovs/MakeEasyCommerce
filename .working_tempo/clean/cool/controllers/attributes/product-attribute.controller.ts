import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseBoolPipe,
} from '@nestjs/common';

import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { FilterAttributeDto } from '@src/base/dto/filters/attribute/attribute-relation.dto';
import { PaginationDto } from '@src/base/dto/filters/pagination.dto';
import { AttributeResponse } from '@src/base/dto/response/attribute.response.dto';
import { CreateAttributeDto } from '.working_tempo/dto/attributes/attribute/create-attribute.dto';
import { GetAttributeDto } from '.working_tempo/dto/attributes/attribute/get-attribute.dto';
import { UpdateAttributeDto } from '.working_tempo/dto/attributes/attribute/update-attribute.dto';
import { ProductAttributeService } from '.working_tempo/services/attributes/product-attribute.service';

@Controller('product_attributes')
@ApiTags('Product Attributes')
export class ProductAttributeController {
    constructor(private readonly attributeService: ProductAttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Product Attribute',
        description:
            'Creates record (specifically) for product attribute entity',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Product Attribute',
        required: true,
    })
    async create(@Body() createAttributeDto: CreateAttributeDto): Promise<any> {
        return await this.attributeService.create({
            createAttributeDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Product Attributes',
        description: 'Get data of all Product Attributes, good luck!',
    })
    @ApiOkResponse({
        description: 'All Product Attributes and theirs details',
        type: [GetAttributeDto],
    })
    @ApiQuery({
        name: 'Pagination',
        description:
            'Way how you can optimize your response! Page | Limit | Include Attribute Rule Relation | Include Attribute Options Relation',
        type: PaginationDto,
        example: {
            page: 1,
            limit: 10,
        },
        required: true,
    })
    @ApiQuery({
        type: Boolean,
        name: 'includeRule',
        description: 'In case if you need to load this attribute rule settings',
        required: true,
    })
    @ApiQuery({
        type: Boolean,
        name: 'includeOptions',
        description:
            'In case if you need to load this attribute options settings',
        required: true,
    })
    async findAll(
        @Query() filter,
        @Query('includeRule', ParseBoolPipe) includeRule: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<AttributeResponse> {
        return await this.attributeService.findAll({
            condition: {
                page: filter.page,
                limit: filter.limit,
                includeOptions: includeOptions,
                includeRule: includeRule,
            },
        });
    }

    @Get('get/by')
    @ApiOperation({
        summary:
            'Find Product Attributes by attribute column name and its value',
        description: 'Get data of 1 specific Attribute',
    })
    @ApiQuery({
        name: 'Query Filtering and Pagination',
        description:
            'Way how you can optimize your response! Page | Limit | Include Attribute Rule Relation | Include Attribute Options Relation',
        type: FilterAttributeDto,
        example: {
            code: 'id',
            value: 1,
            page: 1,
            limit: 10,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Product Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findBy(
        @Query() filter,
        @Query('includeRule', ParseBoolPipe) includeRule: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<AttributeResponse> {
        return await this.attributeService.findBy({
            condition: {
                page: filter.page,
                limit: filter.limit,
                code: filter.code,
                value: filter.value,
                includeOptions: includeOptions,
                includeRule: includeRule,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Product Attribute by ID',
        description: 'Get data of 1 specific Product Attribute, good luck!',
    })
    @ApiParam({ name: 'id', description: 'product attribute id' })
    @ApiOkResponse({
        description: 'All Product Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findOneById(
        @Param('id') id: number,
        @Query('includeRule', ParseBoolPipe) includeRule: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<AttributeResponse> {
        return await this.attributeService.findOneById({
            id: id,
            loadRelations: {
                includeOptions: includeOptions,
                includeRule: includeRule,
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Product Attribute by ID',
        description: 'Update specifically product attribute data by id',
    })
    @ApiParam({ name: 'id', description: 'product attribute id' })
    @ApiBody({
        type: UpdateAttributeDto,
        description: 'Product Attribute',
        required: true,
    })
    async update(
        @Param('id') id: number,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ): Promise<AttributeResponse> {
        return this.attributeService.update({
            id: id,
            updateAttributeDto: updateAttributeDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Product Attribute by ID',
        description: 'Delete specifically product attribute data by id',
    })
    async removeBasket(@Param('id') id: string): Promise<AttributeResponse> {
        return await this.attributeService.remove({ id: +id });
    }
}
