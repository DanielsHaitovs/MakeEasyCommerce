import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { EavService } from '../services/eav.service';
import { UpdateEavDto } from '../dto/update-eav.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateEavDto } from '../dto/create-eav.dto';
import { GetParentEavAttributesDto } from '../dto/get-eav.dto';

@ApiTags('EAV')
@Controller('eav')
export class EavController {
    constructor(private readonly eavService: EavService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create EAV',
        description: 'Create (specifically) eav entity',
    })
    @ApiBody({
        type: CreateEavDto,
        description: 'Create EAV',
        required: true,
    })
    async create(@Body() createEavDto: CreateEavDto) {
        return await this.eavService.create({
            createEavDto: createEavDto,
        });
    }

    // This one in future MUST have option
    // filter by page number and amount on page
    // Most likely this will be separate route
    // But this I'll keep for fun (Once I'll generate 1 million baskets) hehe
    @Get('get/all')
    @ApiOperation({
        summary: 'Find All EAVs',
        description: 'Get data of all Eav, good luck!',
    })
    @ApiQuery({
        name: 'attributes',
        description: 'include eav attributes data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'products',
        description: 'include eav products data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'customers',
        description: 'include eav customers data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'baskets',
        description: 'include eav baskets data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'orders',
        description: 'include eav orders data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Filtered EAV Data',
        type: [GetParentEavAttributesDto],
    })
    async findAll(
        @Query('attributes') attributes: boolean,
        @Query('products') products: boolean,
        @Query('customers') customers: boolean,
        @Query('baskets') baskets: boolean,
        @Query('orders') orders: boolean,
    ): Promise<GetParentEavAttributesDto[]> {
        return await this.eavService.findAll({
            attributes: attributes,
            products: products,
            customers: customers,
            baskets: baskets,
            orders: orders,
        });
    }

    @Get('get/:id')
    @ApiOperation({
        summary: 'Find EAV by Id',
        description: 'Get data Eav',
    })
    @ApiQuery({
        name: 'attributes',
        description: 'include eav attributes data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'products',
        description: 'include eav products data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'customers',
        description: 'include eav customers data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'baskets',
        description: 'include eav baskets data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'orders',
        description: 'include eav orders data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Filtered EAV Data',
        type: [GetParentEavAttributesDto],
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Query('attributes') attributes: boolean,
        @Query('products') products: boolean,
        @Query('customers') customers: boolean,
        @Query('baskets') baskets: boolean,
        @Query('orders') orders: boolean,
    ): Promise<GetParentEavAttributesDto> {
        return await this.eavService.findOne({
            id: id,
            attributes: attributes,
            products: products,
            customers: customers,
            baskets: baskets,
            orders: orders,
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEavDto: UpdateEavDto) {
        return this.eavService.update(+id, updateEavDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eavService.remove(+id);
    }
}
