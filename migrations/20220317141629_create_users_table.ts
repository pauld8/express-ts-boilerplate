import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('role').nullable().defaultTo('user');
    table.text('hash');
    table.text('salt');
    table.string('full_name_eng').nullable().defaultTo('');
    table.string('full_name_heb').nullable().defaultTo('');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
