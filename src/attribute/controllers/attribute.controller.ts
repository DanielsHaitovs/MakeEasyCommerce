import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AttributeResponseInterface } from '../interfaces/attribute.interface';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import {
    GetAttributeDto,
    GetAttributeOptions,
    GetAttributeShortDto,
} from '../dto/get-attribute.dto';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('short/new')
    @ApiOperation({
        summary: 'Create 1 Attribute Short',
        description: 'Create 1 attribute only with description',
    })
    @ApiBody({
        type: CreateAttributeShortDto,
        description: 'Create Attribute Short',
        required: true,
    })
    async createShort(
        @Body() createAttribute: CreateAttributeShortDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.createShort({ createAttribute });
    }

    @Post('new')
    @ApiOperation({
        summary: 'Create 1 Attribute',
        description: 'Create 1 attribute with all data',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttribute: CreateAttributeDto,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.create({ createAttribute });
    }
    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes Rules, good luck!',
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
        type: [GetAttributeShortDto],
    })
    async findAll(
        @Query() orderedPagination,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Attribute by id',
        description:
            'Get data of specific Attribute and its data condition, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Attribute Data' })
    @ApiOkResponse({
        description: 'Specific Attribute Rule and its details',
        type: GetAttributeDto,
    })
    async findOneById(
        @Param('id') id: number,
    ): Promise<AttributeResponseInterface> {
        return await this.attributeService.findOneById({ id });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.attributeService.update(+id, updateAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attributeService.remove(+id);
    }
}
