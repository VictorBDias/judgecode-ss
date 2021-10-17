const Form = use('App/Models/Form');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with forms
 */
class FormController {
  /**
   * Show a list of all forms.
   * GET forms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const forms = await Form.query()
      // .with('user', builder => {
      //   builder.select(['id', 'username', 'email']);
      // })
      // .with('question', builder => {
      //   builder.select(['id', 'title']);
      // })
      .fetch();

    return forms;
  }

  /**
   * Create/save a new Form.
   * POST forms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.all();

    const form = await Form.create({
      user_id: auth.user.id,
      ...data,
    });

    return form;
  }

  /**
   * Display a single form.
   * GET forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const form = await Form.findOrFail(params.id);

    return form;
  }

  /**
   * Update form details.
   * PUT or PATCH forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const form = await Form.findOrFail(params.id);

    const data = request.all();

    form.title = data.title;
    form.description = data.description;

    await form.save(data);
    return form;
  }

  /**
   * Delete a form with id.
   * DELETE forms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const form = await Form.findOrFail(params.id);

    if (form.user_id !== auth.user.id) {
      return response.status(401);
    }

    await form.delete();
    return { message: 'Questão deletada' };
  }
}

module.exports = FormController;
