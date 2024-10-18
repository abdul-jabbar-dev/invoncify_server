import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invoice", (table) => {
    table.increments("id").primary();
    table
      .string("client_id").notNullable()
      .references("id")
      .inTable("client")
      .onDelete("CASCADE");
    table.enum("status", ["PENDING", "CANCELLED", "REFUNDED", "PAID"]);
    table.jsonb("products");
    table.jsonb("prePayments").nullable();
    table.jsonb("meta");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("invoice");
}
