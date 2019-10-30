import Help from '../models/Help';

class UnanswerController {
  async index(req, res) {
    const unanswereds = await Help.findAll({
      where: { answer: null },
    });
    return res.json(unanswereds);
  }
}

export default new UnanswerController();
