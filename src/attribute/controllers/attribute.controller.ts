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
import { AttributeService } from '../services/attributes/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';

import { AttributeResponse } from '../dto/requests/attribute-response.dto';
import { AttributeFilterByValue } from '../dto/requests/attribute-requests.dto';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute',
        description: 'Create (specifically) attribute entity',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttributeDto: CreateAttributeDto,
    ): Promise<GetAttributeDto | AttributeResponse> {
        return await this.attributeService.create({
            createAttributeDto: createAttributeDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes, good luck!',
    })
    @ApiQuery({
        name: 'pagination',
        description: 'You can set page and limit for this query.',
        type: PaginationDto,
        required: true,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findAll(
        @Query() filter: any,
        @Query('includeRules', ParseBoolPipe) includeRules: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<GetAttributeDto[]> {
        console.log(filter);
        return await this.attributeService.findAll({
            condition: {
                page: filter.page,
                limit: filter.limit,
                relations: {
                    includeOptions: includeOptions,
                    includeRules: includeRules,
                },
                filter: {
                    code: null,
                    value: null,
                },
            },
        });
    }

    @Get('get/by')
    @ApiOperation({
        summary: 'Find Attributes by attribute code and its value',
        description: 'Finds data of specific Attribute, good luck!',
    })
    @ApiQuery({
        name: 'Find by value',
        description: 'You can find attribute data by column value.',
        type: AttributeFilterByValue,
        example: {
            code: 'name',
            value: 'test',
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'Data of 1 specific attribute',
        type: [GetAttributeDto],
    })
    async findBy(
        @Query() filter: any,
        @Query('includeRules', ParseBoolPipe) includeRules: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<GetAttributeDto[]> {
        return await this.attributeService.findBy({
            condition: {
                page: 1,
                limit: 0,
                relations: {
                    includeOptions: includeOptions,
                    includeRules: includeRules,
                },
                filter: filter,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute by ID',
        description: 'Get data of 1 specific Attribute, good luck!',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findOneById(
        @Param('id') id: number,
        @Query('includeRules', ParseBoolPipe) includeRules: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<GetAttributeDto> {
        return await this.attributeService.findOneById({
            id: id,
            loadRelations: {
                includeOptions: includeOptions,
                includeRules: includeRules,
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute by ID',
        description: 'Update specifically attribute data by id',
    })
    @ApiBody({
        type: UpdateAttributeDto,
        description: 'Attribute',
        required: true,
    })
    async update(
        @Query('keepOldOptions', ParseBoolPipe) conditionValue: boolean,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.attributeService.update({
            id: updateAttributeDto.id,
            keepOldOptions: conditionValue,
            updateAttributeDto: updateAttributeDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute by ID',
        description: 'Delete specifically attribute data by id',
    })
    async removeBasket(
        @Param('id') id: string,
    ): Promise<string | AttributeResponse> {
        return await this.attributeService.remove({ id: +id });
    }
}
