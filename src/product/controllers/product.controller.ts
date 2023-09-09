import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    CreateProductDto,
    CreateProductShortDto,
} from '../dto/products/product/create-product.dto';
import { ProductService } from '../services/product/product.service';
import { UpdateProductDto } from '../dto/products/product/update-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Product Attribute',
        description:
            'Creates record (specifically) for product attribute entity',
    })
    @ApiBody({
        type: CreateProductDto,
        description: 'Create Product Attribute',
        required: true,
    })
    async create(@Body() createProductDto: CreateProductDto): Promise<any> {
        return await this.productService.create({ createProductDto });
    }

    @Post('short/new')
    @ApiOperation({
        summary: 'Create Short Product Attribute',
        description: 'Creates record (specifically) for product entity',
    })
    @ApiBody({
        type: CreateProductShortDto,
        description: 'Create Product Short Attribute',
        required: true,
    })
    async createShort(
        @Body() createProductDto: CreateProductShortDto,
    ): Promise<any> {
        return await this.productService.createShort({ createProductDto });
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.remove(+id);
    }
}
