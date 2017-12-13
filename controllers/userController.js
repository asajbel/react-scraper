const db = require("../models");

module.exports = {
	findAll: function(req, res) {
		db.User
			.find(req.params)
      .populate("articles")
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .populate("articles")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    db.User
      .find({name: req.params.name})
      .populate("articles")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getSaved: function(req, res) {
    db.User
      .findOne({name: "scraper"})
      .populate("articles")
      .then(dbModel => res.json(dbModel.articles))
      .catch(err => res.status(422).json(err));
  },
  saveArticle: function(req, res) {
    db.User
      .findOneAndUpdate({name: "scrapper"}, { $push: { articles: req.params.id} }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeArticle: function(req, res) {
    db.User
      .findOneAndUpdate({name: "scrapper"}, { $pull: { articles: req.params.id} }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}