import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseArrayPipe,
    ParseIntPipe,
    ParseBoolPipe,
} from '@nestjs/common';
import { AttributeService } from '../service/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeResponseI } from '../interface/attribute.interface';
import {
    AttributeSelectDto,
    AttributeWhereDto,
} from '@src/attribute/dto/filter/attribute-filter.dto';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import { FilterByIdsDto } from '@src/mec/dto/filter/query-filter.dto';
import { AttributeProperties } from '../enum/attribute.enum';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with its attribute',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute & Attribute & Option(s)',
        required: true,
    })
    async create(
        @Body() createAttribute: CreateAttributeDto,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.create({ createAttribute });
    }

    @Get('get')
    @ApiOperation({
        summary: 'Advanced Attribute Filter Query',
        description:
            'Provides all available query filters for Attribute. You can use this to find specific Attribute with its relations. Not All of them are nullable, OrderBy, ColumnName and Value are nullable',
    })
    @ApiQuery({
        name: 'ids',
        description:
            'If id(s) are mentioned then rest filtering will be based on this array of ids',
        required: false,
        type: FilterByIdsDto,
    })
    @ApiQuery({
        name: 'joinRule',
        description: 'Attribute Query Rule Relation',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'joinOption',
        description: 'Attribute Query Option Relation',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'isActive',
        description: 'Return only active attributes',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'isRequired',
        description: 'Return only required attributes',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'queryPage',
        description: 'Attribute Query Page',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'queryLimit',
        description: 'Attribute Query Page Limit',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'selectWhereQuery',
        description:
            'Select one or many records from rule property list if you want to filter by this property value (true | false) -> "filterValue"',
        type: [AttributeWhereDto],
        enum: AttributeProperties,
        isArray: true,
        required: false,
    })
    // @ApiQuery({
    //     name: 'filterValue',
    //     description:
    //         'This value is used in "selectWhereQuery" filter to determine if the value is true or false',
    //     type: Boolean,
    //     required: false,
    // })
    @ApiQuery({
        name: 'selectForQuery',
        required: true,
        description:
            'Select one or many records from rule property list if you want to return only these properties',
        type: [AttributeSelectDto],
        enum: AttributeProperties,
        example: [AttributeProperties.Id],
        isArray: true,
    })
    @ApiQuery({
        name: 'orderQueryBy',
        description: 'Order Rule By rule property',
        type: String,
        required: false,
    })
    @ApiQuery({
        name: 'orderQueryDirection',
        description: 'Attribute Query Order Direction -> ASC | DESC',
        enum: OrderDirection,
        required: false,
    })
    @ApiOkResponse({
        description: 'Specific Attribute Attribute and its details',
        type: [GetAttributeDto],
    })
    async find(
        @Query('ids') valueIds: number[],
        @Query('isActive') active: boolean,
        @Query('isRequired') required: boolean,
        @Query('joinRule') joinRule: boolean,
        @Query('joinOption') joinOptions: boolean,
        @Query('queryPage') page: number,
        @Query('queryLimit') limit: number,
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
        @Query('selectForQuery', ParseArrayPipe)
        selectProp: AttributeProperties[],
        // @Query('selectWhereQuery') selectWhere: AttributeProperties[],
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeQuery({
            attributeQuery: {
                page,
                limit,
                by,
                direction,
                selectProp,
                valueIds,
                joinOptions: joinOptions,
                joinRule: joinRule,
                isActive: active,
                isRequired: required,
            },
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attribute',
        description: 'Get data of all attributes, good luck!',
    })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Attribute Query Filter',
        type: [AttributeSelectDto],
        enum: AttributeProperties,
        example: AttributeProperties.All,
        isArray: true,
        required: true,
    })
    @ApiQuery({
        name: 'orderQueryBy',
        description: 'Attribute Query Order By Filter',
        type: String,
        required: false,
    })
    @ApiQuery({
        name: 'orderQueryDirection',
        description: 'Attribute Query Order Direction',
        enum: OrderDirection,
        required: false,
    })
    @ApiQuery({
        name: 'paginate',
        description: 'Attribute Query Page',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: 'Attribute Query Page Limit',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'joinRule',
        description: 'Attribute Query Rule Relation',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'joinOption',
        description: 'Attribute Query Option Relation',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'isActive',
        description: 'Return only active attributes',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'isRequired',
        description: 'Return only required attributes',
        type: Boolean,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findAll(
        @Query('selectForQuery', ParseArrayPipe)
        selectProp: AttributeProperties[],
        @Query('paginate', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
        @Query('joinRule', ParseBoolPipe) joinRule: boolean,
        @Query('joinOption', ParseBoolPipe) joinOptions: boolean,
        @Query('isActive', ParseBoolPipe) isRequired: boolean,
        @Query('isRequire', ParseBoolPipe) isActive: boolean,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeQuery({
            attributeQuery: {
                page,
                limit,
                by,
                direction,
                selectProp,
                valueIds: null,
                joinOptions,
                joinRule,
                isActive,
                isRequired,
            },
        });
    }
    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute by id',
        description: 'Get data of specific Attribute, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Attribute id (Attribute)' })
    @ApiQuery({
        name: 'isActive',
        description: 'Filter if attribute is active',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'isRequired',
        description: 'Filter if attribute is required',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Attribute Query Filter',
        type: [AttributeSelectDto],
        enum: AttributeProperties,
        example: AttributeProperties.All,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'selectRuleRelation',
        description: 'Load this attribute attribute relation',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'selectOptionRelation',
        description: 'Load this attribute option relation(s)',
        type: Boolean,
        required: false,
    })
    @ApiOkResponse({
        description: 'Specific Attribute and its details',
        type: GetAttributeDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
        @Query('isActive', ParseBoolPipe) isActive: boolean,
        @Query('isRequired', ParseBoolPipe) isRequired: boolean,
        @Query('selectForQuery', ParseArrayPipe) select: AttributeProperties[],
        @Query('selectRuleRelation', ParseBoolPipe) joinRule: boolean,
        @Query('selectOptionRelation', ParseBoolPipe) joinOption: boolean,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeQuery({
            attributeQuery: {
                valueIds: [id],
                isActive: isActive,
                isRequired: isRequired,
                selectProp: select,
                joinOptions: joinOption,
                joinRule: joinRule,
                page: null,
                limit: null,
                by: null,
                direction: null,
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute by ID',
        description: 'Update specifically attribute data by id',
    })
    @ApiBody({
        type: UpdateAttributeShortDto,
        description: 'Update Attribute Data, relations are not included',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAttributeDto: UpdateAttributeShortDto,
    ): Promise<AttributeResponseI> {
        return this.attributeService.update({
            id: id,
            attribute: updateAttributeDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute by ID',
        description: 'Delete specifically attribute data by id',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<AttributeResponseI> {
        return this.attributeService.remove({ id });
    }
}
