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
import { AttributeOptionsDto } from '@src/base/dto/attributes/attribute.dto';
import { GetAttributeOptionsDto } from '@src/base/dto/attributes/get-attribute.dto';
import { AttributeResponse } from '@src/base/dto/attributes/requests/attribute-response.dto';
import { UpdateOptionDto } from '@src/base/dto/attributes/update-attribute.dto';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
import { ProductOptionsService } from '@src/product/services/attributes/options/product-options.service';

@Controller('product_options')
@ApiTags('Product Attribute Options')
export class ProductOptionsController {
    constructor(private readonly optionsService: ProductOptionsService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Multiple (or 1) option(s)',
        description: 'Create (specifically) attribute entity options',
    })
    @ApiBody({
        type: [AttributeOptionsDto],
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createOptionsDto: AttributeOptionsDto[],
    ): Promise<GetAttributeOptionsDto[] | AttributeResponse> {
        return await this.optionsService.createOptions({
            createOptions: createOptionsDto,
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
        type: PaginationDto,
        example: {
            page: 1,
            limit: 10,
        },
        required: true,
    })
    @ApiOkResponse({
        description: 'All Options and theirs values',
        type: [GetAttributeOptionsDto],
    })
    async findAll(@Query() filter): Promise<GetAttributeOptionsDto[]> {
        return await this.optionsService.findAll({
            condition: filter,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute Option by ID',
        description: 'Get data of 1 specific Attribute option, good luck!',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiOkResponse({
        description: 'Option id and its value',
        type: GetAttributeOptionsDto,
    })
    async findOneById(
        @Param('id') id: number,
    ): Promise<GetAttributeOptionsDto> {
        return await this.optionsService.findOneById({
            id: id,
        });
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
    async update(@Body() updateOption: UpdateOptionDto) {
        return this.optionsService.update({
            id: updateOption.id,
            value: updateOption.value,
            parentId: updateOption.attributeId,
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
        return await this.optionsService.remove({ id: +id });
    }
}
