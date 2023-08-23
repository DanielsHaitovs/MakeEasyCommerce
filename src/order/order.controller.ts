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
import { OrderService } from './order.service';
import { CreateGuestOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { GetOrderDto } from './dto/get-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Order',
        description: 'Create (specifically) order entity',
    })
    @ApiBody({
        type: CreateOrderDto,
        description: 'Create Order',
        required: true,
    })
    async create(@Body() createOrderDto: CreateOrderDto): Promise<GetOrderDto> {
        return await this.orderService.create({ createOrderDto });
    }

    @Post('guest/new')
    @ApiOperation({
        summary: 'Create Guest Order',
        description: 'Create guest order with new customer entity',
    })
    @ApiBody({
        type: CreateGuestOrderDto,
        description: 'Create Guest Order',
        required: true,
    })
    async createGuestOrder(
        @Body() createOrderDto: CreateGuestOrderDto,
    ): Promise<GetOrderDto> {
        return await this.orderService.createGuestOrder({
            createGuestOrderDto: createOrderDto,
        });
    }

    // This one in future MUST have option
    // filter by page number and amount on page
    // Most likely this will be separate route
    // But this I'll keep for fun (Once I'll generate 1 million baskets) hehe
    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Orders',
        description: 'Get data of all Orders, good luck!',
    })
    @ApiQuery({
        name: 'customers',
        description: 'include customers data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'baskets',
        description: 'include baskets data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Orders and theirs customers',
        type: [GetOrderDto],
    })
    async findAllCustomers(
        @Query('baskets') baskets: boolean,
        @Query('customers') customers: boolean,
    ): Promise<GetOrderDto[]> {
        return await this.orderService.findAll({
            baskets: baskets,
            customers: customers,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        description: 'Finds Specifically Order data by ID.',
    })
    @ApiParam({ name: 'id', description: 'order id' })
    @ApiQuery({
        name: 'baskets',
        description: 'include baskets data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'customers',
        description: 'include customers data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Order entity and its details if selected',
        type: GetOrderDto,
    })
    async findOneCustomer(
        @Param('id') id: number,
        @Query('baskets') baskets: boolean,
        @Query('customers') customers: boolean,
    ): Promise<GetOrderDto> {
        return await this.orderService.findOne({
            id: +id,
            baskets: baskets,
            customers: customers,
        });
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Order by ID',
        description: 'Update specifically order data by id',
    })
    @ApiBody({
        type: UpdateOrderDto,
        description: 'Order',
        required: true,
    })
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<GetOrderDto> {
        return await this.orderService.update({
            id: +id,
            updateOrderDto: updateOrderDto,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Order by ID',
        description: 'Delete specifically order data by id',
    })
    async removeOrder(@Param('id') id: string): Promise<number> {
        return await this.orderService.delete({ id: +id });
    }
}
