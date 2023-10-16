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
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { GetRuleDto } from '../dto/get-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleFindByType } from '@src/base/dto/mec/attribute/attributes/rule.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';
import { RuleService } from '../services/rule.service';
import { RuleResponseI } from '../interface/rule.interface';

@Controller('attribute-rule')
@ApiTags('Rule (Attribute)')
export class AttributeRuleController {
    constructor(
        private readonly ruleService: RuleService,
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
        @Body() createRuleDto: CreateRuleDto,
    ): Promise<RuleResponseI> {
        return await this.ruleService.create({
            createRuleDto: createRuleDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Rules',
        description: 'Get data of all rules, good luck!',
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
        type: [GetRuleDto],
    })
    async findAll(@Query() orderedPagination): Promise<RuleResponseI> {
        return await this.ruleService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/by/:id')
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

    @Get('get/type/by/:id')
    @ApiOperation({
        summary: 'Find specific Attribute Rule Front or Back',
        description: 'Get data of specific Rule condition, good luck!',
    })
    @ApiQuery({
        name: 'filters',
        description:
            'Its basically will try to find your 1 attribute rule by mentioned rule type.',
        type: RuleFindByType,
        example: {
            type: AttributeRuleType,
        },
        required: true,
    })
    @ApiParam({ name: 'id', description: 'Attribute Rule id' })
    @ApiOkResponse({
        description: 'All Attributes Rule Type Details',
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
        summary: 'Update Rule by ID',
        description: 'Update specifically attribute rule data by id',
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
        summary: 'Delete Attribute Rule by ID',
        description: 'Delete specifically attribute rule data by id',
    })
    async removeRule(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RuleResponseI> {
        return await this.ruleService.remove({ id });
    }
}

// @Get('get/by/attribute/:id')
// @ApiOperation({
//     summary: 'Find 1 Attribute Rule by id',
//     description: 'Get data of specific Rule condition, good luck!',
// })
// @ApiParam({ name: 'id', description: 'Rule id (Attribute)' })
// @ApiOkResponse({
//     description: 'Specific Attribute Rule and its details',
//     type: GetAttributeRuleDto,
// })
// async findOneByAttributeId(
//     @Param('id', ParseIntPipe) id: number,
// ): Promise<RuleResponseI> {
//     return await this.ruleService.findOneById({ id });
// }

// @Delete('by/attribute/:relatedAttribute')
// @ApiOperation({
//     summary: 'Delete Attribute Rule by ID',
//     description: 'Delete specifically attribute rule data by id',
// })
// async removeAttributeRule(
//     @Param('relatedAttribute', ParseIntPipe) relatedAttribute: number,
// ): Promise<RuleResponseI> {
//     return await this.attributeRuleService.removeByAttributeId({
//         relatedAttribute,
//     });
// }



// @Get('get/type/by/attribute/:id')
// @ApiOperation({
//     summary: 'Find specific Attribute Rule Front or Back',
//     description: 'Get data of specific Rule condition, good luck!',
// })
// @ApiQuery({
//     name: 'filters',
//     description:
//         'Its basically will try to find your 1 attribute rule by mentioned rule type.',
//     type: RuleFindByType,
//     example: {
//         type: AttributeRuleType,
//     },
//     required: true,
// })
// @ApiParam({ name: 'id', description: 'Attribute Rule id' })
// @ApiOkResponse({
//     description: 'All Attributes Rule Type Details',
//     type: GetAttributeRuleDto,
// })
// async findOneTypeByAttribute(
//     @Param('id', ParseIntPipe) id: number,
//     @Query() type, // this needs to be with specific type, for some reason it did not worked out, investigate
// ): Promise<RuleResponseI> {
//     return this.ruleService.findThisRuleType({
//         id: id,
//         type: type,
//     });
// }
// @Patch('updateAttributeRule/:relatedAttribute')
// @ApiOperation({
//     summary: 'Update Attribute Rule by Attribute ID',
//     description: 'Update specifically attribute rule data by id',
// })
// @ApiBody({
//     type: UpdateAttributeRuleDto,
//     description: 'Attribute Rule',
//     required: true,
// })
// async updateAttributeRule(
//     @Param('relatedAttribute', ParseIntPipe) relatedAttribute: number,
//     @Body() updateRuleDto: UpdateAttributeRuleDto,
// ): Promise<RuleResponseI> {
//     return this.attributeRuleService.updateByAttributeId({
//         relatedAttribute,
//         rule: updateRuleDto,
//     });
// }
