const db = require("../models");

module.exports = {
	findAll: function(req, res) {
		db.Article
			.find(req.query)
			.sort({ createdAt: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
  findById: function(req, res) {
    console.log(req.params.id);
    db.Article
      .findById(req.params.id)
      .populate("notes")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createNote: function(req, res) {
    db.Note
      .create(req.body)
      .then(dbModel => {
        return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { notes: dbModel._id} }, { new: true })
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}