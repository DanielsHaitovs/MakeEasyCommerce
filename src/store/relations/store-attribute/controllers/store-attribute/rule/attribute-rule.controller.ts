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
import { StoreViewOrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';
import { StoreViewRuleService } from '../../../services/store-attribute/attribute-rule.service';
import { CreateStoreRuleDto } from '../../../dto/store-attribute/rule/create-attribute-rule.dto';
import { StoreRuleResponseI } from '../../../interface/store-attributes/attributes-rule.interface';
import { GetStoreRuleDto } from '../../../dto/store-attribute/rule/get-attribute-rule.dto';
import {
    StoreRuleFindBy,
    StoreRuleFindByType,
} from '@src/attribute/relations/rule/dto/rule-base.dto';
import { UpdateStoreRuleDto } from '../../../dto/store-attribute/rule/update-attribute-rule.dto';

@Controller('storeRule')
@ApiTags('Store Attribute Rule')
export class StoreViewRuleController {
    constructor(private readonly ruleService: StoreViewRuleService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute rule',
        description: 'Creates record (specifically) for rule attribute entity',
    })
    @ApiBody({
        type: CreateStoreRuleDto,
        description: 'Create Attribute rule',
        required: true,
    })
    async create(
        @Body() createRuleDto: CreateStoreRuleDto,
    ): Promise<StoreRuleResponseI> {
        return this.ruleService.create({ createRuleDto });
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
        type: StoreViewOrderedPaginationDto,
        example: {
            by: 'id',
            type: 'ASC',
            page: Number,
            limit: Number,
            storeView: Number,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetStoreRuleDto],
    })
    async findAll(@Query() orderedPagination): Promise<StoreRuleResponseI> {
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
        type: GetStoreRuleDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreRuleResponseI> {
        return await this.ruleService.findOneById({ id });
    }

    @Get('get/one/by/')
    @ApiOperation({
        summary: 'Find 1 Attribute Rule by attribute and store view',
        description: 'Get data of specific Rule condition, good luck!',
    })
    @ApiQuery({
        name: 'filters',
        type: StoreRuleFindBy,
        required: true,
    })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetStoreRuleDto,
    })
    async findOneBy(
        @Query() filter, // this needs to be with specific type, for some reason it did not worked out, investigate
    ): Promise<StoreRuleResponseI> {
        return await this.ruleService.findOneByStoreViewAndAttribute({
            storeView: filter.storeView,
            relatedAttribute: filter.relatedAttribute,
        });
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
        type: StoreRuleFindByType,
        example: {
            storeView: Number,
            type: AttributeRuleType,
        },
        required: true,
    })
    @ApiParam({ name: 'id', description: 'product attribute id' })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: GetStoreRuleDto,
    })
    async findOneByType(
        @Param('id', ParseIntPipe) id: number,
        @Query() type, // this needs to be with specific type, for some reason it did not worked out, investigate
    ): Promise<StoreRuleResponseI> {
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
        type: UpdateStoreRuleDto,
        description: 'Attribute Rule',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRuleDto: UpdateStoreRuleDto,
    ): Promise<StoreRuleResponseI> {
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
    async removeBasket(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreRuleResponseI> {
        return await this.ruleService.remove({ id });
    }
}
