var _       = require('lodash');
var helpers = require('./_helpers');
var orm     = require('../../../../');

module.exports = {
  create: function (req, res, next) {
    var params = _.pick(req.body, 'author', 'body');

    req.models.message.get(req.params.messageId, function (err, message) {
      if (err) {
        if (err.code == orm.ErrorCodes.NOT_FOUND) {
          res.send(404, "Message not found");
        } else {
          return next(err);
        }
      }

      params.message_id = message.id;

      req.models.comment.create(params, function (err, message) {
        if(err) {
          if(Array.isArray(err)) {
            return res.send(200, { errors: helpers.formatErrors(err) });
          } else {
            return next(err);
          }
        }

        return res.send(200, message.serialize());
      });
    });
  },

  //RESTFUL API update,get param from BODY&URL
  update: function (req, res, next) {
    var params = _.pick(req.body, 'id','body');
    req.models.comment.find({message_id: params.id}).each(function (comment) {
      console.log("updating....");
      comment.body=params.body;
    }).save(function (err) {
      if(err) {
        console.log("have error");
        if (err.code == orm.ErrorCodes.NOT_FOUND) {
          res.send(404, "Message not found");
        } else if(Array.isArray(err)) {
          return res.send(200, { errors: helpers.formatErrors(err) });
        } else {
          return next(err);
        }
      }

      return res.send(200,"update comment sucessfully!");
    });
  },

  //RESTFUL API DELETE,get param from url /message/:messageId/:commentId
  delete: function (req, res, next) {
    req.models.comment.find({message_id: req.params.messageId, id: req.params.commentId},1).remove(function (err) {
      if(err) {
        if(Array.isArray(err)) {
          return res.send(200, { errors: helpers.formatErrors(err) });
        } else {
          return next(err);
        }
      }

      return res.send(200);
    });
  }
};
