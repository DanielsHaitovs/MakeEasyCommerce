import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateSimpleProductDto } from '@src/product/dto/product-types/create-simple-product.dto';
import { UpdateSimpleProductDto } from '@src/product/dto/product-types/update-simple-product.dto';
import { SimpleProductService } from '@src/product/services/product-types/simple/simple-product.service';

@Controller('product')
export class SimpleProductController {
    constructor(private readonly productService: SimpleProductService) {}

    @Post()
    create(@Body() createProductDto: CreateSimpleProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateSimpleProductDto,
    ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
