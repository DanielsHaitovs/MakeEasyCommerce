import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ProductAttributeService } from '../services/product-attribute.service';
import { CreateProductAttributeDto } from '../dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from '../dto/update-product-attribute.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-attribute')
@ApiTags('ProductAttribute')
export class ProductAttributeController {
    constructor(
        private readonly productAttributeService: ProductAttributeService,
    ) {}

    @Post()
    create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
        return this.productAttributeService.create(createProductAttributeDto);
    }

    @Get()
    findAll() {
        return this.productAttributeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productAttributeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductAttributeDto: UpdateProductAttributeDto,
    ) {
        return this.productAttributeService.update(
            +id,
            updateProductAttributeDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productAttributeService.remove(+id);
    }
}
