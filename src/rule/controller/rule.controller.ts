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
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
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

@ApiTags('Attribute Rule')
@Controller('attribute-rule')
export class AttributeRuleController {
    constructor(private readonly attributeRuleService: AttributeRuleService) {}

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
        name: 'selectForQuery',
        description: 'Select Attribute Query Filter',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: RuleSelect.Id,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'selectWhereQuery',
        description: 'Where Attribute Query',
        type: [RuleWhereDto],
        enum: RuleWhere,
        isArray: true,
        required: false,
    })
    @ApiQuery({
        name: 'whereValue',
        description: 'Return only where is',
        type: Boolean,
        required: false,
    })
    @ApiQuery({
        name: 'valueIds',
        description: 'Where Attribute ID Query Filter',
        type: [Number],
        isArray: true,
        required: false,
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
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async find(
        @Query('selectForQuery', ParseArrayPipe) selectWhere: RuleWhere[],
        @Query('whereValue', ParseBoolPipe) whereValue: boolean,
        @Query('selectForQuery', ParseArrayPipe) selectProp: RuleSelect[],
        @Query('valueIds', ParseArrayPipe) ruleIds: number[],
        @Query('paginate', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
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
                whereValue,
                ruleIds,
            },
        });
    }

    @Get()
    findAll() {
        return this.attributeRuleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attributeRuleService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttributeRuleDto: UpdateRuleDto,
    ) {
        return this.attributeRuleService.update(+id, updateAttributeRuleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attributeRuleService.remove(+id);
    }
}
