/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class QuestionSchema extends Schema {
  up() {
    this.create('questions', table => {
      table.increments();

      table.integer('user_id').notNullable().references('id').inTable('users');
      table.string('title', 80).notNullable();
      table.string('description', 255).notNullable();
      table.string('type', 20).notNullable();
      table.string('answer').notNullable();
      table.jsonb('lines');

      table.timestamps();
    });
  }

  down() {
    this.drop('questions');
  }
}

module.exports = QuestionSchema;
