import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RuleService } from '../service/rule.service';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { RuleResponseDto } from '../dto/get-rule.dto';
import { RuleShortSelect } from '../enum/rule.enum';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleQueryDto } from '../dto/filter.dto';

@ApiTags('Attribute Rule')
@Controller('rule')
export class RuleController {
    constructor(private readonly ruleService: RuleService) {}

    @Post()
    @ApiOperation({
        summary: 'Create Attribute Rule',
        description: 'Creates record (specifically) for rule attribute entity'
    })
    @ApiBody({
        type: CreateRuleDto,
        description: 'Create Attribute Rule',
        required: false
    })
    async create(@Body() createRule: CreateRuleDto): Promise<RuleResponseDto> {
        return await this.ruleService.createRule({ rule: createRule });
    }

    @Get()
    @ApiOperation({
        summary: 'Get All rules',
        description: 'Get Attribute Rules with option to paginate'
    })
    @ApiOkResponse({
        description: 'Attributes Rule Page',
        type: RuleResponseDto
    })
    async getAllRules(
        @Query(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })) paginate: PaginationDto
    ): Promise<RuleResponseDto> {
        return await this.ruleService.getRules({ pagination: paginate });
    }

    @Post('filter')
    @ApiOperation({
        summary: 'Filter Through Rules',
        description: 'Filter through rules'
    })
    @ApiBody({
        type: RuleQueryDto,
        description: 'Filter Rule',
        required: true
    })
    @ApiOkResponse({
        description: 'Attributes Rule Filtered Result',
        type: RuleResponseDto
    })
    async filterRules(@Body() ruleQuery: RuleQueryDto): Promise<RuleResponseDto> {
        return await this.ruleService.ruleQuery({ filters: ruleQuery });
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get Attribute Rule By ID',
        description: 'Get specific rule by its id (Attribute)'
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Rule and its details',
        type: RuleResponseDto
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<RuleResponseDto> {
        return await this.ruleService.getRuleById({ id });
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update Attribute Rule',
        description: 'Update specific rule by its id (Attribute)'
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)', type: Number })
    @ApiBody({
        type: UpdateRuleDto,
        description: 'Update Attribute Rule',
        required: true,
        isArray: false
    })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRule: UpdateRuleDto): Promise<RuleResponseDto> {
        return await this.ruleService.updateRule({ id, rule: updateRule });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Rule',
        description: 'Delete specific rule by its id (Attribute)'
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)', type: Number })
    @ApiOkResponse({
        description: 'Delete Rule',
        type: RuleResponseDto
    })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<RuleResponseDto> {
        return await this.ruleService.deleteRule({ id });
    }

    @Get('type/by/:id')
    @ApiOperation({
        summary: 'Get Attribute Rule By ID',
        description: 'Get specific rule by its id (Attribute)'
    })
    @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
    @ApiQuery({
        name: 'type',
        required: true,
        enum: RuleShortSelect,
        description: 'Simple Property select for Rule'
    })
    @ApiOkResponse({
        description: 'Specific Rule and its details',
        type: RuleResponseDto
    })
    async findOneType(@Param('id', ParseIntPipe) id: number, @Query('type') type: RuleShortSelect): Promise<RuleResponseDto> {
        return await this.ruleService.getRuleType({ id, type });
    }
}
