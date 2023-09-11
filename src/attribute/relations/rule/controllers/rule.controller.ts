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
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import {
    OrderedPaginationDto,
    PaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { GetRulesDto } from '../dto/get-rule.dto';
import { RuleResponseDto } from '../dto/rule-base.dto';

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
    ): Promise<GetRulesDto | RuleResponseDto> {
        return this.ruleService.create({ createRulesDto });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes Rules',
        description: 'Get data of all Attributes Rules, good luck!',
    })
    @ApiQuery({
        name: 'paginate',
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
    async findAll(@Query() orderedPagination) {
        return await this.ruleService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/by')
    @ApiOperation({
        summary: 'Find Attributes Rule by attribute Column Name and its value',
        description: 'Get data of specific Rule condition, good luck!',
    })
    @ApiQuery({
        name: 'Pagination',
        description:
            'Its basically will try to find your all attribute rules by mentioned code and value. You can set page and limit for this query.',
        type: PaginationDto,
        example: {
            page: 1,
            limit: 10,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetRulesDto],
    })
    async findOne(@Param('id', ParseIntPipe) id: number, @Query() pagination) {
        return this.ruleService.findOne({
            id: id,
            condition: pagination,
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRulesDto: UpdateRulesDto) {
        return this.ruleService.update(+id, updateRulesDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ruleService.remove(+id);
    }
}
