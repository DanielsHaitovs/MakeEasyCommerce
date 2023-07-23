import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';
import { Details } from './entities/details.entity';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { EAV } from '@src/eav/entities/eav.entity';
import { EAVAttribute } from '@src/eav/entities/eav-attribute.entity';
import { EAVAttributeOption } from '@src/eav/entities/eav-attribute-option.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Customer,
            Address,
            Details,
            EAV,
            EAVAttribute,
            EAVAttributeOption,
        ]),
    ],
    controllers: [CustomerController, AddressController],
    providers: [CustomerService, AddressService],
})
export class CustomerModule {}
