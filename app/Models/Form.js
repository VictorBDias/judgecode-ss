/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Model = use('Model');

class Form extends Model {
  questions() {
    return this.belongsToMany('App/Models/Question').pivotTable(
      'forms_questions',
    );
  }

  user() {
    return this.hasOne('App/Quiz/Models/User');
  }
}

module.exports = Form;
