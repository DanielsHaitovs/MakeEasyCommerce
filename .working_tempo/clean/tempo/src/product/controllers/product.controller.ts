import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Product',
        description: 'Create product entity',
    })
    @ApiBody({
        type: CreateProductDto,
        description: 'Create Product DTO',
        required: true,
    })
    async create(@Body() createProductDto: CreateProductDto): Promise<any> {
        return await this.productService.create({
            createProductDto: createProductDto,
        });
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
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
