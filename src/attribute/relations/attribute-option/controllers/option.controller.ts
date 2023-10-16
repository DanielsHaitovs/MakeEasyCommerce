import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
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
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OptionService } from '../services/option.service';
import { CreateOptionDto } from '../dto/create-option.dto';
import { GetOptionDto } from '../dto/get-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { OptionResponseI } from '../interface/create-option.interface';
import { OrderType } from '@src/base/enum/query/query.enum';

@Controller('options')
@ApiTags('Options (Attribute)')
export class OptionController {
    constructor(private readonly optionService: OptionService) {}

    @Post('new/:id')
    @ApiOperation({
        summary: 'Create 1 option',
        description: 'Create Attribute Option',
    })
    @ApiBody({
        type: CreateOptionDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Param('id', ParseIntPipe) id: number,
        @Body() createOption: CreateOptionDto,
    ): Promise<OptionResponseI> {
        console.log(id);
        return await this.optionService.create({
            relatedAttribute: id,
            createOption,
        });
    }

    @Post('many/new/:id')
    @ApiOperation({
        summary: 'Create many options',
        description: 'Create many attribute options',
    })
    @ApiParam({ name: 'id', description: 'Parent Attribute ID' })
    @ApiBody({
        type: [CreateOptionDto],
        description: 'Create Many Attribute Options',
        required: true,
    })
    async createMany(
        @Param('id', ParseIntPipe) id: number,
        @Body() createOptions: CreateOptionDto[],
    ): Promise<OptionResponseI> {
        return await this.optionService.createMany({
            relatedAttribute: id,
            createOptions,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Options',
        description: 'Get data of all Options (ASC), good luck!',
    })
    @ApiQuery({
        name: 'paginate',
        description:
            'Its basically will try to find all your attribute options. You can set page and limit for this query.',
        type: OrderedPaginationDto,
        example: {
            page: 1,
            limit: 10,
        },
        required: true,
    })
    @ApiOkResponse({
        description: 'All Options and theirs values',
        type: [GetOptionDto],
    })
    async findAll(@Query() filter): Promise<OptionResponseI> {
        return await this.optionService.findOption({
            optionFilters: {
                page: filter.page,
                limit: filter.limit,
                orderBy: filter.orderBy,
                orderDirection: filter.orderDirection,
                columnName: null,
                value: null,
                select: null,
                many: true,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute Option by ID',
        description: 'Get data of 1 specific Attribute option',
    })
    @ApiParam({ name: 'id', description: 'Attribute Option id' })
    @ApiOkResponse({
        description: 'Option id and its value',
        type: GetOptionDto,
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionService.findOption({
            optionFilters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: null,
                many: false,
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Option by ID',
        description: 'Update specifically attribute option data by id',
    })
    @ApiBody({
        type: UpdateOptionDto,
        description: 'Option',
        required: true,
    })
    @ApiParam({ name: 'id', description: 'option id' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOption: UpdateOptionDto,
    ): Promise<OptionResponseI> {
        return this.optionService.update({
            id: id,
            updateOptionDto: updateOption,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Option by ID',
        description: 'Delete specifically attribute option data by id',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionService.remove({ id });
    }
}
// @Get('get/by/attribute/:relatedAttribute')
// @ApiOperation({
//     summary: 'Find group of Attribute Options',
//     description: 'Get all options that are related to 1 specific Attribute',
// })
// @ApiParam({ name: 'relatedAttribute', description: 'Attribute Option id' })
// @ApiQuery({ type: OrderedPaginationDto })
// @ApiOkResponse({
//     description: 'Attribute Options',
//     type: GetAttributeOptionDto,
// })
// async findOneByParent(
//     @Param('relatedAttribute', ParseIntPipe) relatedAttribute: number,
//     @Query() filter,
// ): Promise<any> {
//     return await this.attributeOptionService.findByAttribute({
//         id: relatedAttribute,
//         condition: filter,
//     });
// }

// @Patch('update/by/attribute/:id')
// @ApiOperation({
//     summary: 'Update Attribute Option by ID',
//     description: 'Update specifically attribute options data by id',
// })
// @ApiBody({
//     type: UpdateAttributeOptionsDto,
//     description: 'Attribute Options',
//     required: true,
// })
// @ApiParam({ name: 'id', description: 'option id' })
// async updateByAttribute(
//     @Body() updateOption: UpdateAttributeOptionsDto,
//     @Param('id', ParseIntPipe) id: number,
// ): Promise<OptionResponseI> {
//     return this.attributeOptionService.updateByAttribute({
//         updateAttributeOptions: updateOption,
//     });
// }

// @Delete('/by/attribute/:id')
// @ApiOperation({
//     summary: 'Delete Attribute Option by ID',
//     description: 'Delete specifically attribute option data by id',
// })
// @ApiBody({
//     type: [Number],
//     description: 'Attribute Options IDS',
//     required: true,
// })
// async removeByAttribute(
//     @Param('id', ParseIntPipe) id: number,
//     @Query() optionIds: number[],
// ): Promise<OptionResponseI> {
//     return {
//         status: '0101',
//         message: 'Ongoing',
//         error: {
//             message: 'Lazy dev',
//             in: 'World',
//         },
//     };
// return await this.attributeOptionService.removeByAttributeId({
//     relatedAttribute: id,
//     optionIds,
// });
// }
