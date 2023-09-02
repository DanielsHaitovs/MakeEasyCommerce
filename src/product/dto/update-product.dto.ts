import { PartialType } from '@nestjs/swagger';
import { GetProductDto } from './get-product.dto';

export class UpdateProductDto extends PartialType(GetProductDto) {}
