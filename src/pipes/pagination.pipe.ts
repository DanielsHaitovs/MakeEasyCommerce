import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
    transform(pagination: PaginationDto): PaginationDto {
        if (pagination.limit === undefined || pagination.page === undefined) {
            return {
                limit: 0,
                page: 0
            };
        }

        if (!isNaN(Number(pagination.limit))) {
            pagination.limit = Number(pagination.limit);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        if (!isNaN(Number(pagination.page))) {
            pagination.page = Number(pagination.page);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        return pagination;
    }
}
