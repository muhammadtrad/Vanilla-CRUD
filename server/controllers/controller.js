const Text = require('../models/model');

const textController = {};

textController.addText = (req, res, next) => {
  Text.create({ text: req.body.text })
    .then((textDoc) => {
      res.locals.data = textDoc;
      return next();
    })
    .catch((err) => next(err));
};

textController.getText = (req, res, next) => {
  Text.find()
    .then((textDoc) => {
      res.locals.data = textDoc;
      return next();
    })
    .catch((err) => next(err));
};


textController.deleteText = (req, res, next) => {
  Text.findByIdAndDelete(req.params.id).exec()
    .then((textDoc) => {
      res.locals.data = textDoc;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = textController;
