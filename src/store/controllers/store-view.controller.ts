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
import { StoreViewService } from '../services/store-view.service';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { CreateStoreViewDto } from '../dto/create-store.dto';
import { StoreViewResponseI } from '../interfaces/store.interfaces';
import { GetStoreViewDto } from '../dto/get-store.dto';
import { UpdateStoreViewDto } from '../dto/update-store.dto';

@ApiTags('Store View')
@Controller('store_view')
export class StoreViewController {
    constructor(private readonly storeViewService: StoreViewService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Store View',
        description: 'Creates record (specifically) for store view entity',
    })
    @ApiBody({
        type: CreateStoreViewDto,
        description: 'Create Store View',
        required: true,
    })
    async create(
        @Body() createStoreViewDto: CreateStoreViewDto,
    ): Promise<StoreViewResponseI> {
        return this.storeViewService.create({ createStoreViewDto });
    }

    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Store Views',
        description: 'Get data of all store views, good luck!',
    })
    @ApiQuery({
        name: 'paginate and order',
        description:
            'Its basically will try to find all your store views. You can set page and limit for this query.',
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
        description: 'All Store Views and theirs details',
        type: [GetStoreViewDto],
    })
    async findAll(@Query() orderedPagination): Promise<StoreViewResponseI> {
        return await this.storeViewService.findAll({
            condition: orderedPagination,
        });
    }

    @Get('get/one/by/:id')
    @ApiOperation({
        summary: 'Find 1 Store View by id',
        description: 'Get data of specific Store View, good luck!',
    })
    @ApiParam({ name: 'id', description: 'Store View ID' })
    @ApiOkResponse({
        description: 'Specific Store View and its details',
        type: GetStoreViewDto,
    })
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreViewResponseI> {
        return await this.storeViewService.findOneById({ id });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Store View by ID',
        description: 'Update specifically store view data by id',
    })
    @ApiBody({
        type: UpdateStoreViewDto,
        description: 'Store View',
        required: true,
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStoreView: UpdateStoreViewDto,
    ): Promise<StoreViewResponseI> {
        return this.storeViewService.update({
            id: id,
            storeView: updateStoreView,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Store View by ID',
        description: 'Delete specifically store view data by id',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<StoreViewResponseI> {
        return await this.storeViewService.remove({ id });
    }
}
