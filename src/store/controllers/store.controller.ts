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
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateStoreDto, CreateStoreShortDto } from '../dto/create-store.dto';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { StoreResponseI } from '../interfaces/store.interface';
import { GetStoreDto } from '../dto/get-store.dto';
import { StoreService } from '../services/store.service';

@ApiTags('Store')
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Store',
        description: 'Creates record (specifically) for store entity',
    })
    @ApiBody({
        type: CreateStoreShortDto,
        description: 'Create Store',
        required: true,
    })
    async create(
        @Body() createStoreDto: CreateStoreShortDto,
    ): Promise<StoreResponseI> {
        return this.storeService.create({ createStoreDto });
    }

    @Post('new/storeViews')
    @ApiOperation({
        summary: 'Create Store with Store View(s)',
        description:
            'Creates record specifically for store entity and will save store view(s)',
    })
    @ApiBody({
        type: CreateStoreDto,
        description: 'Create Store with its Store Views',
        required: true,
    })
    async createFull(
        @Body() createStoreDto: CreateStoreDto,
    ): Promise<StoreResponseI> {
        return this.storeService.createCollection({ createStoreDto });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Stores',
        description: 'Get data of all store, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your stores. You can set page and limit for this query.',
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
        description: 'All Stores and theirs details',
        type: [GetStoreDto],
    })
    async findAll(@Query() orderedPagination): Promise<StoreResponseI> {
        return await this.storeService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Store by id',
        description: 'Get data of specific Store, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Store ID' })
    @ApiOkResponse({
        description: 'Specific Store and its details',
        type: GetStoreDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreResponseI> {
        return await this.storeService.findOneById({ id });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Store by ID',
        description: 'Update specifically store data by id',
    })
    @ApiBody({
        type: UpdateStoreDto,
        description: 'Update Store',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStore: UpdateStoreDto,
    ): Promise<StoreResponseI> {
        return this.storeService.update({
            id: id,
            store: updateStore,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Store by ID',
        description: 'Delete specifically store data by id',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreResponseI> {
        return await this.storeService.remove({ id });
    }
}
