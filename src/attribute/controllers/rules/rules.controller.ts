import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '@src/attribute/dto/attribute.dto';
import { AttributeRulesDto } from '@src/attribute/dto/create-attribute.dto';
import { GetAttributeRulesDto } from '@src/attribute/dto/get-attribute.dto';
import { AttributeResponse } from '@src/attribute/dto/responses/response.dto';
import { UpdateRulesDto } from '@src/attribute/dto/update-attribute.dto';
import { RulesService } from '@src/attribute/services/rules/rules.service';

@Controller('options')
@ApiTags('AttributeRules')
export class RulesController {
    constructor(private readonly rulesService: RulesService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Multiple (or 1) rule(s)',
        description: 'Create (specifically) attribute entity rules',
    })
    @ApiBody({
        type: [AttributeRulesDto],
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createRulesDto: AttributeRulesDto,
    ): Promise<GetAttributeRulesDto | AttributeResponse> {
        return await this.rulesService.create({
            newRule: createRulesDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Rules',
        description: 'Get data of all Rules (ASC), good luck!',
    })
    @ApiQuery({
        name: 'paginate',
        description:
            'Its basically will try to find all your attribute rules. You can set page and limit for this query.',
        type: PaginationDto,
        example: {
            page: 1,
            limit: 10,
        },
        required: true,
    })
    @ApiOkResponse({
        description: 'All Rules and theirs values',
        type: [GetAttributeRulesDto],
    })
    async findAll(@Query() filter): Promise<GetAttributeRulesDto[]> {
        return await this.rulesService.findAll({
            condition: filter,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find Rules For One Attribute by Rules ID',
        description: 'Get data of 1 specific Attribute rules, good luck!',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiOkResponse({
        description: 'Rules id and its value',
        type: GetAttributeRulesDto,
    })
    async findOneById(@Param('id') id: number): Promise<GetAttributeRulesDto> {
        return await this.rulesService.findOneById({
            id: id,
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute Option by ID',
        description: 'Update specifically attribute option data by id',
    })
    @ApiBody({
        type: UpdateRulesDto,
        description: 'Attribute',
        required: true,
    })
    async update(@Body() updateOption: UpdateRulesDto) {
        return this.rulesService.update({
            id: updateOption.id,
            rules: updateOption,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Option by ID',
        description: 'Delete specifically attribute option data by id',
    })
    async removeBasket(
        @Param('id') id: string,
    ): Promise<number | AttributeResponse> {
        return await this.rulesService.remove({ id: +id });
    }
}
