/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FormSchema extends Schema {
  up() {
    this.create('forms', table => {
      table.increments('id');

      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('title', 80).notNullable();
      table.string('description', 255).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('forms');
  }
}

module.exports = FormSchema;
