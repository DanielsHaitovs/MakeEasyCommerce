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
import { CreateAttributeDto } from '@src/product/dto/attributes/create-attribute.dto';
import { ProductAttributeService } from '@src/product/services/attributes/product-attribute.service';

@Controller('product_attributes')
@ApiTags('Product Attributes')
export class ProductAttributeController {
    constructor(private readonly attributeService: ProductAttributeService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Attribute',
        description:
            'Creates record (specifically) for product attribute entity',
    })
    @ApiBody({
        type: CreateAttributeDto,
        description: 'Create Attribute',
        required: true,
    })
    async create(@Body() createAttributeDto: CreateAttributeDto): Promise<any> {
        return await this.attributeService.create({
            createAttributeDto,
        });
    }

    // @Get()
    // findAll() {
    //     return this.attributeService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.attributeService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateProductDto: UpdateProductDto,
    // ) {
    //     return this.attributeService.update(+id, updateProductDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.attributeService.remove(+id);
    // }
}
