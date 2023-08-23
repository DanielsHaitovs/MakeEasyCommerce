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
import { CustomerService } from '../services/customer.service';
import {
    CreateCustomerAddressDto,
    CreateCustomerDto,
} from '../dto/create-customer.dto';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import {
    GetCustomerAddressDetailsDto,
    GetCustomerDto,
} from '../dto/get-customer.dto';
import {
    UpdateCustomerAddressDetailsDto,
    UpdateCustomerDto,
} from '../dto/update-customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Customer',
        description: 'Create (specifically) customer entity',
    })
    @ApiBody({
        type: CreateCustomerDto,
        description: 'Create Customer',
        required: true,
    })
    async create(
        @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<GetCustomerDto> {
        return await this.customerService.create({ createCustomerDto });
    }

    @Post('new/detailed')
    @ApiOperation({
        summary: 'Create Customer with Address',
        description: 'Create customer and address entity',
    })
    @ApiBody({
        type: CreateCustomerAddressDto,
        description: 'Create Customer and Address Entity',
        required: true,
    })
    async createCustomerAddress(
        @Body() createCustomerDto: CreateCustomerAddressDto,
    ): Promise<GetCustomerAddressDetailsDto> {
        return await this.customerService.createCustomerAddress({
            createCustomerDto: createCustomerDto,
        });
    }

    // This one in future MUST have option
    // filter by page number and amount on page
    // Most likely this will be separate route
    // But this I'll keep for fun (Once I'll generate 1 million customers) hehe
    @Get('get/all')
    @ApiOperation({
        summary: 'Find All Customers',
        description: 'Get specifically data all customers, good luck!',
    })
    @ApiQuery({
        name: 'details',
        description: 'include address details data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'address',
        description: 'include address data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'All Customers',
        type: [GetCustomerDto],
    })
    async findAllCustomers(
        @Query('address') address: boolean,
        @Query('details') details: boolean,
    ): Promise<GetCustomerDto[]> {
        return await this.customerService.findAll({
            address: address,
            details: details,
        });
    }

    @Get('get/by/:id')
    @ApiOperation({
        description: 'Finds Specifically Customer data by ID.',
    })
    @ApiParam({ name: 'id', description: 'customer id' })
    @ApiQuery({
        name: 'details',
        description: 'include address details data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiQuery({
        name: 'address',
        description: 'include address data',
        type: 'boolean',
        example: false,
        required: false,
    })
    @ApiOkResponse({
        description: 'Customer entity and its details if selected',
        type: GetCustomerDto,
    })
    async findOneCustomer(
        @Param('id') id: number,
        @Query('address') address: boolean,
        @Query('details') details: boolean,
    ): Promise<GetCustomerDto> {
        return await this.customerService.findOne({
            id: +id,
            address: address,
            details: details,
        });
    }

    // Missing proper response body
    // I was to lazy to do that when I was typing this...
    @Patch('update/:id')
    @ApiOperation({
        summary: 'Update Customer by ID',
        description: 'Update specifically customer data by id',
    })
    @ApiParam({ name: 'id', description: 'customer id' })
    @ApiBody({
        type: UpdateCustomerDto,
        description: 'Customer',
        required: true,
    })
    async updateCustomer(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ): Promise<any> {
        return await this.customerService.update({
            id: +id,
            updateCustomerDto: updateCustomerDto,
        });
    }

    @Patch('update/address/:id')
    @ApiOperation({
        summary: 'Update Customer and its address&details by ID',
        description: 'Update all customer data by id',
    })
    @ApiParam({ name: 'id', description: 'customer id' })
    @ApiBody({
        type: UpdateCustomerAddressDetailsDto,
        description: 'Update customer body with address and its detail',
        required: true,
    })
    async updateCustomerAddressDetails(
        @Param('id') id: string,
        @Body() updateBody: UpdateCustomerAddressDetailsDto,
    ): Promise<any> {
        return await this.customerService.updateCustomerAddressDetails({
            id: +id,
            updateCustomer: updateBody,
        });
    }

    @Patch('update/addresses/:id')
    @ApiOperation({
        summary: 'Clean Update Customer of Address Relation',
        description: 'Update & Remove specific customer address by id',
    })
    @ApiParam({ name: 'id', description: 'customer id' })
    @ApiBody({
        type: [Number],
        description: 'Update Of Customer Relation',
        required: false,
    })
    async deleteAddressRelation(
        @Param('id') id: string,
        @Body() address_ids: number[],
    ): Promise<any> {
        return await this.customerService.deleteCustomerAddressRelation({
            id: +id,
            address_ids: address_ids,
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Customer by ID',
        description:
            'This will remove everything what is related to this customer',
    })
    @ApiParam({ name: 'id', description: 'customer id' })
    async removeCustomer(@Param('id') id: number): Promise<number> {
        return await this.customerService.delete({ id: +id });
    }
}
