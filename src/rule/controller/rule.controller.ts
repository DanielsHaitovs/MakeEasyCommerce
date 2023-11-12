import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { GetRuleDto } from '../dto/get-rule.dto';
import {
    RuleSelectDto,
    RuleWhereDto,
} from '@src/mec/dto/filter/attribute/attributes/rule-filter.dto';

import { RuleResponseI } from '../interface/get-rule.interface';

import { AttributeRuleService } from '../service/rule.service';
import {
    RuleSelect,
    RuleWhere,
} from '@src/mec/enum/attribute/attributes/rule.enum';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import { FilterByIdsDto } from '@src/mec/dto/filter/query-filter.dto';
import { DataHelperService } from '@src/mec/utils/data-help.service';

@ApiTags('Attribute Rule')
@Controller('attribute-rule')
export class AttributeRuleController {
    constructor(
        private readonly attributeRuleService: AttributeRuleService,
        private readonly dataHelper: DataHelperService,
    ) {}

    @Post('new/:id')
    @ApiOperation({
        summary: 'Create Attribute Rule',
        description: 'Creates record (specifically) for rule attribute entity',
    })
    @ApiBody({
        type: CreateRuleDto,
        description: 'Create Attribute Rule',
        required: false,
    })
    async create(
        @Body() createAttributeRule: CreateRuleDto,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.create({
            createAttributeRule,
        });
    }

    @Get('get')
    @ApiOperation({
        summary: 'Advanced Rule Filter Query',
        description:
            'Provides all available rule properties to select for query. You can return list of specific Rule properties.',
    })
    @ApiQuery({
        name: 'ids',
        description:
            'If id(s) are mentioned then rest filtering will be based on this array of ids',
        required: false,
        type: FilterByIdsDto,
    })
    @ApiQuery({
        name: 'queryPage',
        description: 'Rule Query Page',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'queryLimit',
        description: 'Rule Query Page Limit',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'selectWhereQuery',
        description:
            'Select one or many records from rule property list if you want to filter by this property value (true | false) -> "filterValue"',
        type: [RuleWhereDto],
        enum: RuleWhere,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'filterValue',
        description:
            'This value is used in "selectWhereQuery" filter to determine if the value is true or false',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'selectForQuery',
        required: false,
        description:
            'Select one or many records from rule property list if you want to return only these properties',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
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
        description: 'Rule Query Order Direction -> ASC | DESC',
        enum: OrderDirection,
        required: false,
    })
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async find(
        @Query('ids') ruleIds: number[],
        @Query('queryPage') page: number,
        @Query('queryLimit') limit: number,
        @Query('selectWhereQuery') selectWhere: RuleWhere[],
        @Query('filterValue') whereValue: string,
        @Query('selectForQuery') selectProp: RuleSelect[],
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.findRuleQuery({
            ruleQuery: {
                page,
                limit,
                by,
                direction,
                selectProp,
                selectWhere,
                whereValue: this.dataHelper.valueToBoolean(whereValue),
                ruleIds,
            },
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Advanced Rule Filter Query',
        description:
            'Provides all available rule properties to select for query. You can return list of specific Rule properties.',
    })
    @ApiQuery({
        name: 'queryPage',
        description: 'Rule Query Page',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'queryLimit',
        description: 'Rule Query Page Limit',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'selectWhereQuery',
        description:
            'Select one or many records from rule property list if you want to filter by this property value (true | false) -> "filterValue"',
        type: [RuleWhereDto],
        enum: RuleWhere,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'filterValue',
        description:
            'This value is used in "selectWhereQuery" filter to determine if the value is true or false',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'selectForQuery',
        required: false,
        description:
            'Select one or many records from rule property list if you want to return only these properties',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
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
        description: 'Rule Query Order Direction -> ASC | DESC',
        enum: OrderDirection,
        required: false,
    })
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async findAll(
        @Query('queryPage') page: number,
        @Query('queryLimit') limit: number,
        @Query('selectWhereQuery') selectWhere: RuleWhere[],
        @Query('filterValue') whereValue: string,
        @Query('selectForQuery') selectProp: RuleSelect[],
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.findRuleQuery({
            ruleQuery: {
                page,
                limit,
                by,
                direction,
                selectProp,
                selectWhere,
                whereValue: this.dataHelper.valueToBoolean(whereValue),
                ruleIds: null,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Advanced Rule Filter Query',
        description:
            'Provides all available rule properties to select for query. You can return list of specific Rule properties.',
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.findRuleQuery({
            ruleQuery: {
                page: null,
                limit: null,
                by: null,
                direction: null,
                selectProp: null,
                selectWhere: null,
                whereValue: null,
                ruleIds: [id],
            },
        });
    }

    @Get('get/filtered/:id')
    @ApiOperation({
        summary: 'Advanced Rule Filter Query',
        description:
            'Provides all available rule properties to select for query. You can return list of specific Rule properties.',
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiQuery({
        name: 'selectForQuery',
        required: false,
        description:
            'Select one or many records from rule property list if you want to return only these properties',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
        isArray: true,
    })
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
        @Query('selectForQuery') selectProp: RuleSelect[],
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.findRuleQuery({
            ruleQuery: {
                page: null,
                limit: null,
                by: null,
                direction: null,
                selectProp,
                selectWhere: null,
                whereValue: null,
                ruleIds: [id],
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Rule by ID',
        description: 'Update specifically rule data by id',
    })
    @ApiBody({
        type: UpdateRuleDto,
        description: 'Attribute Rule',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRuleDto: UpdateRuleDto,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.update({
            id: id,
            rule: updateRuleDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Rule by ID',
        description: 'Delete specifically rule data by id',
    })
    async removeRule(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
        return await this.attributeRuleService.remove({ id });
    }
}
