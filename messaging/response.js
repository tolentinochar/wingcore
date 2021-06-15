class Response {
  static async send(model, isSelfDelete = false) {
    var msg = {
      color: model.color
      , title: model.title
      , description: model.messageText
    };

    if (model.emojiUrl != null && model.emojiUrl != '') {
      msg['thumbnail'] =
      {
        url: model.emojiUrl
      };
    }

    if (isSelfDelete) {
      return await model.message.channel.send({ embed: msg })
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch(function (e) {
          throw e;
        });

    }
    else {
      return await model.message.channel.send({ embed: msg })
        .catch(function (e) {
          throw e;
        });
    }
  }

  static async reply(model, isSelfDelete = false) {
    var msg = {
      color: model.color
      , title: model.title
      , description: model.messageText
    };

    if (model.emojiUrl != null && model.emojiUrl != '') {
      msg['thumbnail'] =
      {
        url: model.emojiUrl
      };
    }

    if (model.messageText == null || model.messageText == '') {
      msg = null;
    }

    if (isSelfDelete) {
      return await model.message.reply(model.replyText, (msg != null) ? { embed: msg } : null)
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch(function (e) {
          throw e;
        });
    }
    else {
      return await model.message.reply(model.replyText, (msg != null) ? { embed: msg } : null)
        .catch(function (e) {
          throw e;
        });
    }
  }

  static get newMessage() {
    return {
      message: null
      , title: null
      , messageText: null
      , replyText: null
      , color: null
      , emojiUrl: null
    };
  }
}

module.exports = Response;