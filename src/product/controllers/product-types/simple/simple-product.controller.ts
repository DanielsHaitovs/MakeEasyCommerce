import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSimpleProductDto } from '@src/product/dto/product-types/create-simple-product.dto';
import { UpdateSimpleProductDto } from '@src/product/dto/product-types/update-simple-product.dto';
import { SimpleProductService } from '@src/product/services/product-types/simple/simple-product.service';

@Controller('simple_product')
@ApiTags('Simple Product')
export class SimpleProductController {
    constructor(private readonly productService: SimpleProductService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Product Attribute',
        description:
            'Creates record (specifically) for product attribute entity',
    })
    @ApiBody({
        type: CreateSimpleProductDto,
        description: 'Create Product Attribute',
        required: true,
    })
    async create(
        @Body() createProductDto: CreateSimpleProductDto,
    ): Promise<any> {
        return await this.productService.create({ createProductDto });
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
