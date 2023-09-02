import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { GetAddressDetailsDto } from './address/get-address.dto';

export class GetCustomerDto extends CustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetCustomerAddressDetailsDto extends GetCustomerDto {
    @ApiProperty({ type: [GetAddressDetailsDto] })
    @ValidateNested()
    address: GetAddressDetailsDto[];
}
