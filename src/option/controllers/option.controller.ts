import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { AttributeOptionService } from '../services/option.service';
import { CreateOptionDto } from '../dto/create-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { GetOptionDto } from '../dto/get-option.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import { FilterByIdsDto } from '@src/mec/dto/filter/query-filter.dto';
import { OptionResponseI } from '../interfaces/query/option-query.interface';

@Controller('attribute-option')
@ApiTags('Attribute Option')
export class AttributeOptionController {
    constructor(private readonly optionService: AttributeOptionService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Option',
        description: 'Create Option is a record that will be used in Attribute',
    })
    @ApiBody({
        type: CreateOptionDto,
        description: 'Create Option',
        required: true,
    })
    async create(
        @Body() createOptionDto: CreateOptionDto,
    ): Promise<OptionResponseI> {
        return await this.optionService.create({ createOptionDto });
    }

    @Get('get')
    @ApiOperation({
        summary: 'Advanced Option Filter Query',
        description: 'Provides all available Option filters for query.',
    })
    @ApiQuery({
        name: 'ids',
        description:
            'If id(s) are mentioned then rest filtering will be based on this array of ids',
        required: false,
        type: FilterByIdsDto,
    })
    @ApiQuery({
        name: 'queryPage',
        description: 'Option Query Page',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'queryLimit',
        description: 'Option Query Page Limit',
        type: Number,
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'orderQueryBy',
        description: 'Order by Option value',
        type: String,
        required: false,
    })
    @ApiQuery({
        name: 'orderQueryDirection',
        description: 'Option Query Order Direction -> ASC | DESC',
        enum: OrderDirection,
        required: false,
    })
    @ApiOkResponse({
        description: 'Attribute Option(s)',
        type: [GetOptionDto],
    })
    async find(
        @Query('ids') optionIds: number[],
        @Query('queryPage') page: number,
        @Query('queryLimit') limit: number,
        @Query('orderQueryBy') by: string,
        @Query('orderQueryDirection') direction: OrderDirection,
    ): Promise<OptionResponseI> {
        return await this.optionService.findOptionQuery({
            optionQuery: {
                optionIds,
                by,
                direction,
                page,
                limit,
            },
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find 1 Option by id',
        description: 'Get data of specific Option, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Option id (Attribute)' })
    @ApiOkResponse({
        description: 'Specific Option by ID',
        type: GetOptionDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionService.findOptionQuery({
            optionQuery: {
                optionIds: [id],
                page: null,
                limit: null,
                by: null,
                direction: null,
            },
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Option by ID',
        description: 'Update specifically option data by id',
    })
    @ApiBody({
        type: UpdateOptionDto,
        description: 'Attribute Option',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOptionDto: UpdateOptionDto,
    ): Promise<OptionResponseI> {
        return this.optionService.update({
            id: id,
            option: updateOptionDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Option by ID',
        description: 'Delete specifically option data by id',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionService.remove({ id });
    }
}
