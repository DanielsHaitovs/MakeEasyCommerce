import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseArrayPipe,
    ParseBoolPipe,
} from '@nestjs/common';
import { AttributeService } from '../services/attributes/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import {
    AttributeRelationsDto,
    PaginateAttributeRelationsDto,
    PaginationFilterDto,
} from '../dto/attribute.dto';
import { AttributeResponse } from '../dto/responses/response.dto';

@Controller('attribute')
@ApiTags('Attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute',
        description: 'Create (specifically) attribute entity',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(
        @Body() createAttributeDto: CreateAttributeDto,
    ): Promise<GetAttributeDto | AttributeResponse> {
        return await this.attributeService.create({
            createAttributeDto: createAttributeDto,
        });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Attributes',
        description: 'Get data of all Attributes, good luck!',
    })
    @ApiQuery({
        name: 'paginate',
        description:
            'Its basically will try to find all your attributes. You can set page and limit for this query. Optionally Can load Attribute Options values and Attribute Rules',
        type: PaginateAttributeRelationsDto,
        example: {
            page: 1,
            limit: 10,
            filter: {
                code: 'id',
                value: 1,
            },
            includeOptions: true,
            includeRule: false,
        },
        required: true,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findAll(@Query() filter): Promise<GetAttributeDto[]> {
        return await this.attributeService.findAll({
            condition: filter,
        });
    }

    @Get('get/by')
    @ApiOperation({
        summary: 'Find Attributes by attribute code and its value',
        description: 'Get data of 1 specific Attribute, good luck!',
    })
    @ApiQuery({
        name: 'Query Filtering and Pagination',
        description:
            'Its basically will try to find your attribute by mentioned code and value. You can set page and limit for this query. Optionally Can load Attribute Options values and Attribute Rules',
        type: PaginationFilterDto,
        example: {
            code: 'id',
            value: 1,
            includeRule: true,
            includeOptions: false,
            page: 1,
            limit: 10,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findBy(@Query() filter): Promise<GetAttributeDto[]> {
        return await this.attributeService.findBy({
            condition: filter,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        summary: 'Find One Attribute by ID',
        description: 'Get data of 1 specific Attribute, good luck!',
    })
    @ApiParam({ name: 'id', description: 'attribute id' })
    @ApiQuery({
        name: 'Load Attribute Relations',
        description:
            'Gives an option to decide which relation to load. Can load Attribute Options values and Attribute Rules',
        type: AttributeRelationsDto,
        example: {
            includeRule: true,
            includeOptions: false,
        },
        required: false,
    })
    @ApiOkResponse({
        description: 'All Attributes and theirs details',
        type: [GetAttributeDto],
    })
    async findOneById(
        @Param('id') id: number,
        @Query() relations,
    ): Promise<GetAttributeDto> {
        return await this.attributeService.findOneById({
            id: id,
            loadRelations: relations,
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Attribute by ID',
        description: 'Update specifically attribute data by id',
    })
    @ApiBody({
        type: UpdateAttributeDto,
        description: 'Attribute',
        required: true,
    })
    async update(
        @Query('keepOldOptions', ParseBoolPipe) conditionValue: boolean,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.attributeService.update({
            id: updateAttributeDto.id,
            keepOldOptions: conditionValue,
            updateAttributeDto: updateAttributeDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Attribute by ID',
        description: 'Delete specifically attribute data by id',
    })
    async removeBasket(
        @Param('id') id: string,
    ): Promise<string | AttributeResponse> {
        return await this.attributeService.remove({ id: +id });
    }
}