import {
    CreateConfigurableProduct,
    CreateGroupedProductDto,
    CreatePersonalizedProductDto,
    CreateProductDto,
    CreateSimpleProductDto,
    CreateVirtualProductDto,
} from '../create-product.dto';

import {
    GetConfigurableProduct,
    GetGroupedProductDto,
    GetPersonalizedProductDto,
    GetProductDto,
    GetSimpleProductDto,
    GetVirtualProductDto,
} from '../get-product.dto';

export type GetResponseOptions =
    | GetProductDto
    | GetVirtualProductDto
    | GetSimpleProductDto
    | GetConfigurableProduct
    | GetPersonalizedProductDto
    | GetGroupedProductDto;

export type CreateResponseOptions =
    | CreateProductDto
    | CreateVirtualProductDto
    | CreateSimpleProductDto
    | CreateConfigurableProduct
    | CreatePersonalizedProductDto
    | CreateGroupedProductDto;

export class ProductError {
    message: string;
    errors: [
        {
            message: string;
        },
        {
            status: number;
        },
    ];
}

export class ProductSuccess {
    status: number;
    result: any[];
}
