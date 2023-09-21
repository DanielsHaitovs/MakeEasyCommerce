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
    ParseIntPipe,
} from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeResponseInterface } from '../interfaces/attribute.interface';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import {
    GetAttributeDto,
    GetAttributeShortDto,
} from '../dto/get-attribute.dto';
import { UpdateRulesDto } from '../relations/rule/dto/update-rule.dto';
import { UpdateManyOptionsDto } from '../relations/option/dto/update-option.dto';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('short/new')
    @ApiOperation({
        summary: 'Create 1 Attribute Description',
        description: 'Create 1 attribute only with description',
    })
    @ApiBody({
        type: CreateAttributeShortDto,
        description: 'Create Attribute Description',
        required: true,
    })
    async createShort(
        @Body() createAttribute: CreateAttributeShortDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.createShort({ createAttribute });
    }

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with all data',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttribute: CreateAttributeDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.create({ createAttribute });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes Descriptions, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your attributes description. You can set page and limit for this query.',
        type: OrderedPaginationDto,
        example: {
            by: 'id',
            type: 'ASC',
            page: 1,
            limit: 10,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes Descriptions',
        type: [GetAttributeShortDto],
    })
    async findAll(
        @Query() orderedPagination,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute by id',
        description:
            'Get data of specific Attribute and its data condition, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeDto,
    })
    async findOneById(
        @Param('id') id: number,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findOneById({ id });
    }

    @Get('relations/get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute with relation(s) by id',
        description:
            'Its basically will try to find your attributes with mentioned relations.',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeDto,
    })
    async findOneWithRelationsById(
        @Param('id') id: number,
        @Query('includeRules', ParseBoolPipe) includeRules: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findOneWithRelationById({
            id: id,
            relations: {
                joinRules: includeRules,
                joinOptions: includeOptions,
            },
        });
    }

    @Get('get/one/rule/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute Rule by id',
        description: 'Its basically will try to find your attributes Rule.',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeDto,
    })
    async findAttributeRule(
        @Param('id') id: number,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findAttributeRule({ id });
    }

    @Get('options/get/one/by/:id')
    @ApiOperation({
        summary: 'Find Options of specific Attribute id',
        description: 'Its basically will try to find your attributes Rule.',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Options and its details',
        type: GetAttributeDto,
    })
    async findAttributeOptions(
        @Param('id') id: number,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findAttributeOptions({ id });
    }

    @Patch('update/description/:id')
    @ApiOperation({
        summary: 'Update Attribute description by ID',
        description: 'Update specifically attribute description data by id',
    })
    @ApiBody({
        type: UpdateAttributeShortDto,
        description: 'Attribute Description',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAttribute: UpdateAttributeShortDto,
    ): Promise<AttributeResponseInterface> {
        return this.attributeService.update({
            id,
            attribute: updateAttribute,
        });
    }

    @Patch('update/rules/:id')
    @ApiOperation({
        summary: 'Update Attribute rules by ID',
        description: 'Update specifically attribute rules data by id',
    })
    @ApiBody({
        type: UpdateRulesDto,
        description: 'Attribute Rules',
        required: true,
    })
    async updateRules(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRules: UpdateRulesDto,
    ): Promise<AttributeResponseInterface> {
        return this.attributeService.updateRules({
            attributeId: id,
            updateRules,
        });
    }

    @Patch('update/options/:id')
    @ApiOperation({
        summary: 'Update Attribute options by ID',
        description:
            'Update specifically attribute options data, can add, remove, update option by parent attribute id',
    })
    @ApiBody({
        type: UpdateManyOptionsDto,
        description: 'Attribute Options',
        required: true,
    })
    async updateOptions(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOptions: UpdateManyOptionsDto,
        @Query('keepOld', ParseBoolPipe) keepOld: boolean,
    ): Promise<AttributeResponseInterface> {
        return this.attributeService.updateOptions({
            attributeId: id,
            updateOptions: updateOptions,
            keepOld: keepOld,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attributeService.remove(+id);
    }
}
