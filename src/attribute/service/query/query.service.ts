import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { QueryService } from '@src/mec/service/query/query-filter.service';
import { DataHelperService } from '@src/mec/service/data/helper.service';

@Injectable()
export class AttributeQueryService extends QueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService
    ) {
        super();
    }
}
