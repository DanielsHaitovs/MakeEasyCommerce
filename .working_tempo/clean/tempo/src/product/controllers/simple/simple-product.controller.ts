import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateSimpleProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    ProductError,
    ProductSuccess,
} from '@src/product/dto/requests/product-response.dto';
import { SimpleProductService } from '@src/product/services/simple/simple-product.service';

@Controller('simple-product')
@ApiTags('Simple Product')
export class SimpleProductController {
    constructor(private readonly simpleProduct: SimpleProductService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Simple Product',
        description: 'Create simple product entity',
    })
    @ApiBody({
        type: CreateSimpleProductDto,
        description: 'Create Product DTO',
        required: true,
    })
    async create(
        @Body() createProductDto: CreateSimpleProductDto,
    ): Promise<ProductError | ProductSuccess> {
        return await this.simpleProduct.create({
            createProductDto: {
                product_type: 'simple',
                ...createProductDto,
            },
        });
    }

    @Get()
    findAll() {
        // return this.simpleProduct.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.simpleProduct.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.simpleProduct.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.simpleProduct.remove(+id);
    }
}
