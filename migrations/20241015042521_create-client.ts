import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("client", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("company").nullable();
    table.string("photoURL").nullable();

    table.string("address").nullable();
    table.string("email").nullable();
    table.string("phoneNumber").nullable();
    table.enum("role", ["client", "user"]).notNullable().defaultTo("client");
    table
      .string("parentId")
      .references("id")
      .inTable("client")
      .onDelete("CASCADE")
      .nullable()
      .onUpdate("CASCADE");

    table.timestamps(true, true);
  });
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("client");
}
