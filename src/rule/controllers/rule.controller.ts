import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    ParseIntPipe,
    Patch,
    Delete,
    ParseArrayPipe,
} from '@nestjs/common';
import { RuleService } from '../services/rule.service';
import { CreateRuleDto } from '../dto/create-rule.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { RuleResponseI } from '../interface/get-rule.interface';
import { GetRuleDto } from '../dto/get-rule.dto';
import {
    RuleFilterRequestDto,
    RuleSelectDto,
} from '@src/mec/dto/query/attribute/attributes/rule-filter.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleSelect } from '@src/mec/enum/attribute/attributes/rule-type.enum';
import { FilterRequestDto } from '@src/mec/dto/query/query-filter.dto';

@ApiTags('Rule (Attribute)')
@Controller('rule')
export class RuleController {
    constructor(private readonly ruleService: RuleService) {}

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
    async create(@Body() createRule: CreateRuleDto): Promise<RuleResponseI> {
        return await this.ruleService.create({ createRule });
    }

    @Get('query')
    @ApiOperation({
        summary: 'Advanced Rule Filter Query',
        description:
            'Provides all available rule properties to select for query. You can return list of specific Rule properties.',
    })
    @ApiQuery({
        name: 'Rule Query Filter',
        description: 'Provides all available filters',
        type: RuleFilterRequestDto,
    })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Rule Query Filter',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
        isArray: true,
        required: false,
    })
    @ApiOkResponse({
        description: 'Specific Rule Rule and its details',
        type: [GetRuleDto],
    })
    async findRuleQuery(
        @Query() ruleQuery,
        @Query('selectForQuery', ParseArrayPipe) select: string[],
    ): Promise<RuleResponseI> {
        return await this.ruleService.findRuleQuery({
            ruleQuery: {
                selectProp: select,
                ...ruleQuery,
            },
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Rules',
        description: 'Get data of all rules, good luck!',
    })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Rule Query Filter',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
        isArray: true,
    })
    @ApiQuery({
        name: 'orderForQuery',
        description: 'Order Rule Query Filter',
        type: FilterRequestDto,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetRuleDto],
    })
    async findAll(
        @Query('selectForQuery', ParseArrayPipe) select: string[],
        @Query() filter,
    ): Promise<RuleResponseI> {
        return await this.ruleService.findRuleQuery({
            ruleQuery: {
                page: filter.page,
                limit: filter.limit,
                by: filter.by,
                direction: filter.direction,
                selectProp: select,
                valueIds: null,
                valueSettings: null,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find 1 Rule by id',
        description: 'Get data of specific Rule, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Rule and its details',
        type: GetRuleDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
        return await this.ruleService.findRuleQuery({
            ruleQuery: {
                valueIds: [id],
                valueSettings: null,
                page: null,
                limit: null,
                by: null,
                direction: null,
                selectProp: null,
            },
        });
    }

    @Get('get/filtered/by/:id')
    @ApiOperation({
        summary: 'Find 1 filtered Rule by id',
        description: 'Get specific data of specific Rule, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Rule and mentioned details details',
        type: GetRuleDto,
    })
    @ApiQuery({
        name: 'selectForQuery',
        description: 'Select Rule Query Filter',
        type: [RuleSelectDto],
        enum: RuleSelect,
        example: [RuleSelect.Id],
        isArray: true,
        required: false,
    })
    async findOneAndSelect(
        @Param('id', ParseIntPipe) id: number,
        @Query('selectForQuery', ParseArrayPipe) select: string[],
    ): Promise<RuleResponseI> {
        return await this.ruleService.findRuleQuery({
            ruleQuery: {
                valueIds: [id],
                valueSettings: null,
                page: null,
                limit: null,
                by: null,
                direction: null,
                selectProp: select,
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
        return this.ruleService.update({
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
        return await this.ruleService.remove({ id });
    }
}
