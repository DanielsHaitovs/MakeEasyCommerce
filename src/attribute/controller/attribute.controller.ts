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
import { AttributeSelectDto } from '@src/mec/dto/filter/attribute/attribute-filter.dto';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { AttributeSelect } from '@src/mec/enum/attribute/attribute.enum';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import { FilterByIdsDto } from '@src/mec/dto/filter/query-filter.dto';

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
    // @ApiQuery({
    //     name: 'Attribute Query Filter',
    //     description: 'Provides all available filters',
    //     type: AttributeQueryFilterDto,
    // })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Attribute Query Filter',
        type: [AttributeSelectDto],
        enum: AttributeSelect,
        example: AttributeSelect.All,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'valueIds',
        required: false,
        type: FilterByIdsDto,
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
        description: 'Specific Attribute Attribute and its details',
        type: [GetAttributeDto],
    })
    async find(
        @Query('selectForQuery', ParseArrayPipe) selectProp: AttributeSelect[],
        @Query('valueIds') valueIds: number[],
        @Query('paginate', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
        @Query('joinRule', ParseBoolPipe) joinRule: boolean,
        @Query('joinOption', ParseBoolPipe) joinOptions: boolean,
        @Query('isActive', ParseBoolPipe) isRequired: boolean,
        @Query('isRequired', ParseBoolPipe) isActive: boolean,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findAttributeQuery({
            attributeQuery: {
                page,
                limit,
                by,
                direction,
                selectProp,
                valueIds,
                joinOptions,
                joinRule,
                isActive,
                isRequired,
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
        enum: AttributeSelect,
        example: AttributeSelect.All,
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
        @Query('selectForQuery', ParseArrayPipe) selectProp: AttributeSelect[],
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
        enum: AttributeSelect,
        example: AttributeSelect.All,
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
        @Query('selectForQuery', ParseArrayPipe) select: AttributeSelect[],
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
