import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tree', function (table) {
    table.increments();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tree');
}
