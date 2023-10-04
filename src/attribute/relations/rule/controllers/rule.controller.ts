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
import { ruleService } from '../services/rule.service';
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
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { GetRuleDto } from '../dto/get-rule.dto';
import { RuleFindByType } from '../dto/rule-base.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';
import { RuleResponseI } from '../interface/rule.interface';

@Controller('rule')
@ApiTags('Rule')
export class RuleController {
    constructor(private readonly ruleService: ruleService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute rule',
        description: 'Creates record (specifically) for rule attribute entity',
    })
    @ApiBody({
        type: CreateRuleDto,
        description: 'Create Attribute rule',
        required: true,
    })
    async create(
        @Body() CreateRuleDto: CreateRuleDto,
    ): Promise<RuleResponseI> {
        return this.ruleService.create({ CreateRuleDto });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes rule',
        description: 'Get data of all Attributes rule, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your attributes rule. You can set page and limit for this query.',
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
        type: [GetRuleDto],
    })
    async findAll(@Query() orderedPagination): Promise<RuleResponseI> {
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
        type: GetRuleDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
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
        type: GetRuleDto,
    })
    async findOneBy(
        @Param('id', ParseIntPipe) id: number,
        @Query() type, // this needs to be with specific type, for some reason it did not worked out, investigate
    ): Promise<RuleResponseI> {
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
        type: UpdateRuleDto,
        description: 'Attribute Rule',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() UpdateRuleDto: UpdateRuleDto,
    ): Promise<RuleResponseI> {
        return this.ruleService.update({
            id: id,
            rule: UpdateRuleDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Rule by ID',
        description: 'Delete specifically attribute rule data by id',
    })
    async removeBasket(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
        return await this.ruleService.remove({ id });
    }
}
