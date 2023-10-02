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
import { OptionService } from '../services/option.service';
import { CreateOptionDto, CreateOptionsDto } from '../dto/create-option.dto';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { GetOptionDto } from '../dto/get-option.dto';
import { OptionResponseI } from '../interfaces/option.interface';
import { GetAttributeOptions } from '@src/attribute/dto/get-attribute.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';

@Controller('options')
@ApiTags('AttributeOptions')
export class OptionController {
    constructor(private readonly optionsService: OptionService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 option',
        description: 'Create (specifically) attribute option',
    })
    @ApiBody({
        type: CreateOptionDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createOption: CreateOptionDto,
    ): Promise<OptionResponseI> {
        return await this.optionsService.create({ createOption });
    }

    @Post('many/new')
    @ApiOperation({
        summary: 'Create many options',
        description: 'Create (specifically) attribute options',
    })
    @ApiBody({
        type: CreateOptionsDto,
        description: 'Create Many Attribute Options',
        required: true,
    })
    async createMany(
        @Body() createOptions: CreateOptionsDto,
    ): Promise<OptionResponseI> {
        return await this.optionsService.createMany({ createOptions });
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
        return await this.optionsService.findAll({
            condition: filter,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute Option by ID',
        description: 'Get data of 1 specific Attribute option',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiOkResponse({
        description: 'Option id and its value',
        type: GetOptionDto,
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionsService.findOne({ id });
    }

    @Get('get/by/attribute/:parentId')
    @ApiOperation({
        summary: 'Find group of Attribute Options',
        description: 'Get all options that are related to 1 specific Attribute',
    })
    @ApiParam({ name: 'parentId', description: 'attribute id' })
    @ApiOkResponse({
        description: 'Attribute and its options',
        type: GetAttributeOptions,
    })
    async findOneByParent(
        @Param('parentId', ParseIntPipe) parentId: number,
    ): Promise<any> {
        return await this.optionsService.findOneByAttribute({ parentId });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute Option by ID',
        description: 'Update specifically attribute option data by id',
    })
    @ApiBody({
        type: UpdateOptionDto,
        description: 'Attribute',
        required: true,
    })
    @ApiParam({ name: 'id', description: 'option id' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOption: UpdateOptionDto,
    ): Promise<OptionResponseI> {
        return this.optionsService.update({
            id: id,
            updateOptionDto: updateOption,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute Option by ID',
        description: 'Delete specifically attribute option data by id',
    })
    async removeBasket(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<OptionResponseI> {
        return await this.optionsService.remove({ id });
    }
}
