class Response {
  static send(model, isSelfDelete = false) {
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
      model.message.channel.send({ embed: msg })
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch(console.error);
    }
    else {
      model.message.channel.send({ embed: msg })
        .catch(console.error);
    }
  }

  static reply(model, isSelfDelete = false) {
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
      model.message.reply(model.replyText, (msg != null) ? { embed: msg } : null)
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch(console.error);
    }
    else {
      model.message.reply(model.replyText, (msg != null) ? { embed: msg } : null)
        .catch(console.error);
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