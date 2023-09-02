import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    ValidateNested,
    IsNotEmpty,
    IsEmail,
    IsNumber,
} from 'class-validator';
import { CreateAddressDto } from './address/create-address.dto';

export class CustomerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    last_name: string;
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    customer_type: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    store_id: number;
    address_ids: number[];
}

export class CreateCustomerDto extends CustomerDto {}

export class CreateCustomerAddressDto extends CustomerDto {
    @ApiProperty({ type: [CreateAddressDto] })
    @ValidateNested()
    @IsNotEmpty()
    address: CreateAddressDto[];
}
