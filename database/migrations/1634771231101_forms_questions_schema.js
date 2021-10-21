/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FormsQuestionsSchema extends Schema {
  up() {
    this.create('forms_questions', table => {
      table.increments();

      table.integer('form_id').references('id').inTable('forms');
      table.integer('question_id').references('id').inTable('questions');

      table.timestamps();
    });
  }

  down() {
    this.drop('forms_questions');
  }
}

module.exports = FormsQuestionsSchema;
