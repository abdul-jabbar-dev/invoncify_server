import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexConf from 'knexfile';
 

@Injectable()
export class KnexService {
    protected knex: Knex
    constructor() {
        this.knex = knex(knexConf)

    }
    get getKnex() {
        return this.knex
    }
}
