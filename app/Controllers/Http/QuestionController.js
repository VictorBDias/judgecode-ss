const Question = use('App/Models/Question');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const questions = await Question.query()
      .with('user', builder => {
        builder.select(['id', 'username', 'email']);
      })
      .fetch();

    return questions;
  }

  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.all();
    const form_id = request.input('form_id', null);

    const question = await Question.create({
      user_id: auth.user.id,
      ...data,
    });

    if (form_id) await question.forms().sync([form_id]);

    return response.json(question);
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const question = await Question.findOrFail(params.id);

    return question;
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.all(); // only() [nomes dos campos]
    const question = await Question.findOrFail(params.id);

    question.merge(data);

    // question.title = data.title;
    // question.description = data.description;
    // question.type = data.titypetle;
    // question.answer = data.answer;
    // question.lines = data.lines;

    await question.save(data);
    return question;
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const question = await Question.findOrFail(params.id);

    if (question.user_id !== auth.user.id) {
      return response.status(401);
    }

    await question.delete();
    return { message: 'Questão deletada' };
  }
}

module.exports = QuestionController;
