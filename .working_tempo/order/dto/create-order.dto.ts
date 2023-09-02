import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerAddressDto } from '@src/customer/dto/create-customer.dto';
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
    // @ApiProperty({ type: [CreateCustomerDto] })
    // @IsNotEmpty()
    // @ValidateNested({ each: true })
    // customers: CreateCustomerDto[];
}

export class CreateGuestOrderDto extends OrderDto {
    @ApiProperty({ type: () => [Number] })
    @IsNotEmpty()
    baskets_ids: number[];
    @ApiProperty({ type: [CreateCustomerAddressDto] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    customers: CreateCustomerAddressDto[];
}
