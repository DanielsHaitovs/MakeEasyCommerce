import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from '@src/customer/dto/create-customer.dto';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';

export class OrderDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    order_type: number;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    order_status: number;
}

export class CreateOrderDto extends OrderDto {
    @ApiProperty({ type: () => [Number] })
    @IsNotEmpty()
    baskets_ids: number[];
    @ApiProperty({ type: () => [Number] })
    @IsOptional()
    customers_ids: number[];
    @ApiProperty({ type: [CreateCustomerDto] })
    @IsOptional()
    @ValidateNested()
    customers: CreateCustomerDto[];
}
