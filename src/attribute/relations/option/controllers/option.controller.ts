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
import { OptionDto, OptionResponseDto } from '../dto/option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { GetOptionDto } from '../dto/get-option.dto';
import { CreateOptionDto } from '../dto/post-option.dto';

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
    ): Promise<OptionResponseDto> {
        return await this.optionsService.create({ createOption });
    }

    @Post('many/new')
    @ApiOperation({
        summary: 'Create many options',
        description: 'Create (specifically) attribute options',
    })
    @ApiBody({
        type: [CreateOptionDto],
        description: 'Create Many Attribute Options',
        required: true,
    })
    async createMany(
        @Body() createOptions: CreateOptionDto[],
    ): Promise<OptionResponseDto> {
        return await this.optionsService.createMany({ createOptions });
    }

    // @Get('get/all')
    // @ApiOperation({
    //     summary: 'Find All Options',
    //     description: 'Get data of all Options (ASC), good luck!',
    // })
    // @ApiQuery({
    //     name: 'paginate',
    //     description:
    //         'Its basically will try to find all your attribute options. You can set page and limit for this query.',
    //     type: PaginationDto,
    //     example: {
    //         page: 1,
    //         limit: 10,
    //     },
    //     required: true,
    // })
    // @ApiOkResponse({
    //     description: 'All Options and theirs values',
    //     type: [GetAttributeOptionsDto],
    // })
    // async findAll(@Query() filter): Promise<GetAttributeOptionsDto[]> {
    //     return await this.optionsService.findAll({
    //         condition: filter,
    //     });
    // }

    // @Get('get/by/:id')
    // @ApiOperation({
    //     summary: 'Find One Attribute Option by ID',
    //     description: 'Get data of 1 specific Attribute option, good luck!',
    // })
    // @ApiParam({ name: 'id', description: 'attribute id' })
    // @ApiOkResponse({
    //     description: 'Option id and its value',
    //     type: GetOptionDto,
    // })
    // async findOneById(@Param('id') id: number): Promise<OptionResponseDto> {
    //     return await this.optionsService.findOneById({
    //         id: id,
    //     });
    // }

    // @Patch('update/:id')
    // @ApiOperation({
    //     summary: 'Update Attribute Option by ID',
    //     description: 'Update specifically attribute option data by id',
    // })
    // @ApiBody({
    //     type: UpdateOptionDto,
    //     description: 'Attribute',
    //     required: true,
    // })
    // async update(@Body() updateOption: UpdateOptionDto): Promise<OptionResponseDto> {
    //     return this.optionsService.update({
    //         id: updateOption.id,
    //         value: updateOption.value,
    //         parentId: updateOption.attributeId,
    //     });
    // }

    // @Delete(':id')
    // @ApiOperation({
    //     summary: 'Delete Attribute Option by ID',
    //     description: 'Delete specifically attribute option data by id',
    // })
    // async removeBasket(
    //     @Param('id', ParseIntPipe) id: number,
    // ): Promise<OptionResponseDto> {
    //     return await this.optionsService.remove({ id });
    // }
}
