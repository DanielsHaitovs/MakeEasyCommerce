import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { GetBasketDto } from '@src/basket/dto/get-basket.dto';
import { GetCustomerDto } from '@src/customer/dto/get-customer.dto';

export class UpdateOrderDto extends CreateOrderDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;
    baskets: GetBasketDto[];
    customers: GetCustomerDto[];
}
