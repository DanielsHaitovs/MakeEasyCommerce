import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import {
    AttributeOptionsDto,
    PaginationDto,
} from '@src/attribute/dto/attribute.dto';
import { GetAttributeOptionsDto } from '@src/attribute/dto/get-attribute.dto';
import { AttributeResponse } from '@src/attribute/dto/responses/response.dto';
import { OptionsService } from '@src/attribute/services/options/options.service';

@Controller('options')
@ApiTags('AttributeOptions')
export class OptionsController {
    constructor(private readonly optionsService: OptionsService) {}

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
}
