import { Injectable } from "@nestjs/common";
import knex, { Knex } from "knex";
import knexConfig from "knexfile"; // Adjust if using TS paths

@Injectable()
export class KnexClientService {
 private knex: Knex;

 private connectDB() {
    this.knex = knex(knexConfig["development"]);
  }
  constructor() {
    this.connectDB();
  }

  get getKnex() {
    if (!this.knex) {
      this.connectDB();
    }
    return this.knex;
  }
}
