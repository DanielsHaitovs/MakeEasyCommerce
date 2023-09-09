import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/products/product/create-product.dto';
import { ProductService } from '../services/product/product.service';
import { UpdateProductDto } from '../dto/products/product/update-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        // return this.productService.create(createProductDto);
    }

    @Get()
    findAll() {
        // return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return this.productService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        // return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return this.productService.remove(+id);
    }
}
