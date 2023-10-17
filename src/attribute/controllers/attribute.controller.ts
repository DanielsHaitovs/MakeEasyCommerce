import { Controller, Get, Post, Body, Param, Query, ParseBoolPipe } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateAttributeDto, CreateAttributeShortDto } from '../dto/create-attribute.dto';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { AttributeResponseI } from '../interfaces/attribute.interface';
import { GetAttributeDescriptionDto, GetAttributeDto, GetAttributeShortDto } from '../dto/get-attribute.dto';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new/short')
    @ApiOperation({
        summary: 'Create 1 Attribute Short',
        description: 'Create 1 attribute only with its rule',
    })
    @ApiBody({
        type: CreateAttributeShortDto,
        description: 'Create Attribute Short',
        required: true,
    })
    async createShort(@Body() createAttribute: CreateAttributeShortDto) {
        return await this.attributeService.createShort({ createAttribute });
    }

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with its rule and option(s)',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute & Rule & Option(s)',
        required: true,
    })
    async create(@Body() createAttribute: CreateAttributeDto) {
        return await this.attributeService.create({ createAttribute });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes Descriptions, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your attributes description. You can set page and limit for this query.',
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
        description: 'All Attributes Descriptions',
        type: [GetAttributeShortDto],
    })
    async findAll(@Query() orderedPagination): Promise<AttributeResponseI> {
        return await this.attributeService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute Short by id',
        description:
            'Get data of specific Attribute Short and its data condition, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Attribute Short Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Main details',
        type: GetAttributeDescriptionDto,
    })
    async findOneById(@Param('id') id: number): Promise<AttributeResponseI> {
        return await this.attributeService.findOneById({ id });
    }

    @Get('relations/get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute with relation(s) by id',
        description:
            'Its basically will try to find your attributes with mentioned relations.',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeDto,
    })
    async findOneWithRelationsById(
        @Param('id') id: number,
        @Query('includeRule', ParseBoolPipe) includeRule: boolean,
        @Query('includeOptions', ParseBoolPipe) includeOptions: boolean,
    ): Promise<AttributeResponseI> {
        return await this.attributeService.findOneWithRelationById({
            id: id,
            relations: {
                joinRule: includeRule,
                joinOptions: includeOptions,
            },
        });
    }

    // @Get()
    // findAll() {
    //     return this.attributeService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.attributeService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateAttributeDto: UpdateAttributeDto,
    // ) {
    //     return this.attributeService.update(+id, updateAttributeDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.attributeService.remove(+id);
    // }
}
