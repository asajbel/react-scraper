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
  findOrCreate: function(req, res) {
    db.User
      .findOneAndUpdate({name: req.body.name}, req.body, {upsert: true, new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getSaved: function(req, res) {
    db.User
      .findOne({name: req.params.name})
      .populate("articles")
      .then(dbModel => res.json(dbModel.articles.reverse()))
      .catch(err => res.status(422).json(err));
  },
  saveArticle: function(req, res) {
    console.log("saveArticle", req.body);
    db.User
      .findOneAndUpdate({name: req.body.name}, { $push: { articles: req.params.id} }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeArticle: function(req, res) {
    console.log("removeArticle", req.query);
    db.User
      .findOneAndUpdate({name: req.query.name}, { $pull: { articles: req.params.id} }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("create", req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    console.log("update", req.body);
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("remove", req.body);
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}