/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Question extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  forms() {
    return this.belongsToMany('App/Models/Form').pivotTable('forms_questions');
  }

  static get hidden() {
    return ['updated_at', 'created_at'];
  }
}

module.exports = Question;
