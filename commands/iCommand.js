const response = require('../messaging/response.js');
const textUtil = require('../utils/textUtil.js');
const emojiUtil = require('../utils/emojiUtil.js');
const colorUtil = require('../utils/colorUtil.js');

class ICommand {
  constructor(commandName, mention, argumentCounts, infoEmoji, responseEmoji) {
    this._commandName = commandName;
    this._mention = mention;
    this._argumentCounts = argumentCounts;
    this._infoEmoji = infoEmoji;
    this._responseEmoji = responseEmoji;
  }

  get commandName() { return this._commandName; }
  get fullCommandName() {
    if (this._fullCommandName == null) {
      var ret = '{0}';
      ret = ret.split('{0}').join(this.commandName[0]);
      this._fullCommandName = ret;
    }
    return this._fullCommandName;
  }

  get aliases() {
    if (this._aliases == null) {
      this._aliases = this.commandName.join(', ');
    }
    return this._aliases;
  }

  get mention() { return this._mention; }

  get infoMessage() {
    if (this._infoMessage == null) {
      var cmdName = this.fullCommandName;
      var reply = this.info();

      reply = reply.split('{0}').join(cmdName);
      if (this.commandName.length > 1) {
        reply += '\n`aliases: {0}`';
        reply = reply.split('{0}').join(this.aliases);
      }

      this._infoMessage = reply;
    }

    return this._infoMessage;
  }

  get request() { return this._request; }
  set request(newRequest) { if (newRequest) this._request = newRequest; }

  get config() { return this._config; }
  set config(value) { if (value) this._config = value; }

  handleCommand(req) {
    this.request = req;

    var argsCount;

    try {
      argsCount = this.request.args.length;
    }
    catch (e) {
      console.error(e);
      this.sendError('Parameter error.');
      return;
    }

    try {
      if (this.request.args != null
        && this.request.args.length == 1
        && this.request.args[0] === '?') {
        this.sendInfo(this.infoMessage, this.fullCommandName);
        return;
      }

      if (this._argumentCounts != null
        && (argsCount == null
          || this._argumentCounts.indexOf(argsCount) < 0)
      ) {

        this.sendArgumentError();
        return;
      }
    }
    catch (e) {
      console.error(e);
      this.sendError('Argument error.');
      return;
    }

    try {
      this.handle(this.request.args);
    }
    catch (e) {
      console.error(e);
      this.sendError('Unhandled Error');
    }
  }

  send(messageText, title, colorName, emojiName, isSelfDelete = false) {
    var emojiUrl = null;
    var colorHex = null;

    if (emojiName != null && emojiName != '') {
      emojiUrl = this.emojiUrl(emojiName);
    }
    else if (this._responseEmoji != null) {
      emojiUrl = this.emojiUrl(this._responseEmoji);
    }

    if (colorName != null && colorName != '') {
      colorHex = this.color(colorName);
    }
    else if (colorHex == null) {
      colorHex = this.color('Info');
    }

    var model = response.newMessage;
    model.message = this.request.message;
    model.messageText = messageText;
    model.color = colorHex;
    model.title = title;
    model.emojiUrl = emojiUrl;

    response.send(model, isSelfDelete);
  }

  reply(replyText, messageText, title, colorName, emojiName, isSelfDelete = false) {
    var emojiUrl = null;
    var colorHex = null;

    if (emojiName != null && emojiName != '') {
      emojiUrl = this.emojiUrl(emojiName);
    }
    else if (this._responseEmoji != null) {
      emojiUrl = this.emojiUrl(this._responseEmoji);
    }

    if (colorName != null && colorName != '') {
      colorHex = this.color(colorName);
    }
    else if (colorHex == null) {
      colorHex = this.color('Info');
    }

    var model = response.newMessage;
    model.message = this.request.message;
    model.messageText = messageText;
    model.replyText = replyText;
    model.color = colorHex;
    model.title = title;
    model.emojiUrl = emojiUrl;

    response.reply(model, isSelfDelete);
  }

  sendError(msg) {
    this.send(msg, 'Error', 'Error', 'PaimonHurt');
  }

  sendSuccess(msg) {
    this.send(msg, 'Success', 'Success', 'DilucCool');
  }

  sendInfo(msg, title) {
    var infoTitle = title;
    if (infoTitle == null) {
      infoTitle = 'Info';
    }

    var infoUrl = null;

    if (this._infoEmoji != null && this._infoEmoji != '') {
      infoUrl = this._infoEmoji;
    }

    if (infoUrl == null) {
      infoUrl = 'DilucCool';
    }

    this.send(msg, infoTitle, 'Info', infoUrl);
  }

  sendArgumentError(msg) {
    var msgTxt = '{0}\n\n{1}';

    msgTxt = msgTxt.split('{0}').join((msg != null && msg != '') ? msg : 'Incorrect argument format.');
    msgTxt = msgTxt.split('{1}').join(this.infoMessage);

    this.sendError(msgTxt);
  }

  emoji(emojiName) {
    return emojiUtil.get(emojiName);
  }

  emojiUrl(emojiName) {
    return emojiUtil.url(emojiName);
  }

  color(colorName) {
    return colorUtil.pick(colorName);
  }

  // overridable methods for strict implementation
  info() { }
  handle(args) { }
}

module.exports = ICommand;