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
import { RuleService } from '../services/rule.service';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import {
    OrderedPaginationDto,
    SingleConditionDto,
    SimpleFilterDto,
} from '@src/base/dto/filter/filters.dto';
import { GetRulesDto } from '../dto/get-rule.dto';
import { RuleFindByType, RuleResponseDto } from '../dto/rule-base.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';

@Controller('rule')
@ApiTags('Rule')
export class RuleController {
    constructor(private readonly ruleService: RuleService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute Rules',
        description: 'Creates record (specifically) for rule attribute entity',
    })
    @ApiBody({
        type: CreateRulesDto,
        description: 'Create Attribute Rules',
        required: true,
    })
    async create(
        @Body() createRulesDto: CreateRulesDto,
    ): Promise<RuleResponseDto> {
        return this.ruleService.create({ createRulesDto });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes Rules',
        description: 'Get data of all Attributes Rules, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your attributes rules. You can set page and limit for this query.',
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
        description: 'All Attributes and theirs details',
        type: [GetRulesDto],
    })
    async findAll(@Query() orderedPagination): Promise<any> {
        return await this.ruleService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute Rule by id',
        description: 'Get data of specific Rule condition, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetRulesDto,
    })
    async findOneById(@Param('id') id: number): Promise<RuleResponseDto> {
        return await this.ruleService.findOneById({ id });
    }

    @Get('get/one/type/by/:id')
    @ApiOperation({
        summary: 'Find specific Attribute Rule Front or Back',
        description: 'Get data of specific Rule condition, good luck!',
    })
    @ApiQuery({
        name: 'filters',
        description:
            'Its basically will try to find your 1 attribute rule by mentioned code and value. You can set page and limit for this query.',
        type: RuleFindByType,
        example: {
            type: AttributeRuleType,
        },
        required: true,
    })
    @ApiParam({ name: 'id', description: 'product attribute id' })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: GetRulesDto,
    })
    async findOneBy(
        @Param('id', ParseIntPipe) id: number,
        @Query() type, // this needs to be with specific type, for some reason it did not worked out, investigate
    ): Promise<RuleResponseDto> {
        return this.ruleService.findThisRuleType({
            id: id,
            type: type,
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute Rule by ID',
        description: 'Update specifically attribute rule data by id',
    })
    @ApiBody({
        type: UpdateRulesDto,
        description: 'Attribute Rule',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRulesDto: UpdateRulesDto,
    ): Promise<any> {
        return this.ruleService.update({
            id: id,
            rules: updateRulesDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Rule by ID',
        description: 'Delete specifically attribute rule data by id',
    })
    async removeBasket(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.ruleService.remove({ id });
    }
}
