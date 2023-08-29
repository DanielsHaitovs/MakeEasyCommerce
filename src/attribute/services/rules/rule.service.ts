import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
}
