const response = require('../messaging/response.js');
const textUtil = require('../utils/textUtil.js');
const emojiUtil = require('../utils/emojiUtil.js');
const colorUtil = require('../utils/colorUtil.js');

const newModel = {
  commandName: null
  , mention: null
  , argumentCounts: null
  , permissions: null
  , responseEmoji: null
};

class ICommand {
  constructor(commandModel) {
    this._commandName = commandModel.commandName;
    this._mention = commandModel.mention;
    this._argumentCounts = commandModel.argumentCounts;
    this._permissions = commandModel.permissions;
    this._responseEmoji = commandModel.responseEmoji;
  }

  get commandName() { return this._commandName; }
  get fullCommandName() {
    if (this._fullCommandName == null) {
      this._fullCommandName = this.commandName[0];
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

  get permissions() { return this._permissions; }

  get argumentCounts() { return this._argumentCounts; }
  get responseEmoji() { return this._responseEmoji; }

  get config() { return this._config; }
  set config(value) { if (value) this._config = value; }

  handleCommand(req) {
    this.request = req;

    if (this.permissions != null && !this.canDoAll(this.permissions)) {
      this.sendError('You have insufficient rights to perform this command');
      return;
    }

    var argsCount;

    try {
      argsCount = this.request.args.length;
    }
    catch (e) {
      this.sendError('Can\'t read parameter');
      throw e;
    }

    try {
      if (this.request.args != null
        && this.request.args.length == 1
        && this.request.args[0] === '?') {
        this.sendInfo(this.infoMessage, this.fullCommandName);
        return;
      }

      if (this.argumentCounts != null
        && (argsCount == null
          || this.argumentCounts.indexOf(argsCount) < 0)
      ) {

        this.sendArgumentError();
        return;
      }
    }
    catch (e) {
      this.sendError('Argument error');
      throw e;
    }

    try {
      this.handle(this.request.args);
    }
    catch (e) {
      var txt = 'Bot Error\n\nPlease contact admin/mod.\n\nId: {0}';
      txt = txt.split('{0}').join(this.request.message.id);
      this.sendCritical(txt);
      throw e;
    }
  }

  canDo(permission) {
    return this.request.message.member.hasPermission(permission);
  }

  canDoAll(permissions) {
    for (var permission of permissions) {
      var hasPermission = this.canDo(permission);
      if (hasPermission == null || !hasPermission) {
        return false;
      }
    }
    return true;
  }

  canDoAny(permissions) {
    for (var permission of permissions) {
      var hasPermission = this.canDo(permission);
      if (hasPermission != null && hasPermision) {
        return true;
      }
    }
    return false;
  }

  send(messageText, colorName, emojiName, isSelfDelete = false) {
    var emojiUrl = null;
    var colorHex = null;

    if (emojiName != null && emojiName != '') {
      emojiUrl = this.emojiUrl(emojiName);
    }
    else if (this.responseEmoji != null) {
      emojiUrl = this.emojiUrl(this.responseEmoji);
    }

    if (colorName != null && colorName != '') {
      colorHex = this.color(colorName);
    }
    if (colorHex == null) {
      colorHex = this.color('info');
    }

    var model = response.newMessage;
    model.message = this.request.message;
    model.messageText = messageText;
    model.color = colorHex;
    model.emojiUrl = emojiUrl;

    return response.send(model, isSelfDelete);
  }

  reply(replyText, messageText, colorName, emojiName, isSelfDelete = false) {
    var emojiUrl = null;
    var colorHex = null;

    if (emojiName != null && emojiName != '') {
      emojiUrl = this.emojiUrl(emojiName);
    }
    else if (this.responseEmoji != null) {
      emojiUrl = this.emojiUrl(this.responseEmoji);
    }

    if (colorName != null && colorName != '') {
      colorHex = this.color(colorName);
    }
    else if (colorHex == null) {
      colorHex = this.color('info');
    }

    var model = response.newMessage;
    model.message = this.request.message;
    model.messageText = messageText;
    model.replyText = replyText;
    model.color = colorHex;
    model.emojiUrl = emojiUrl;

    return response.reply(model, isSelfDelete);
  }

  sendError(msg, isSelfDelete = false) {
    var txt = '{1} {0}';
    txt = txt.split('{0}').join(msg);
    txt = txt.split('{1}').join(this.emoji(this.config.warningEmoji));
    this.send(txt, 'error', null, isSelfDelete);
  }

  sendCritical(msg, isSelfDelete = false) {
    var txt = '{1} {0}';
    txt = txt.split('{0}').join(msg);
    txt = txt.split('{1}').join(this.emoji(this.config.errorEmoji));
    this.send(txt, 'error', null, isSelfDelete);
  }

  sendSuccess(msg, isSelfDelete = false) {
    var txt = '{1} {0}';
    txt = txt.split('{0}').join(msg);
    txt = txt.split('{1}').join(this.emoji(this.config.successEmoji));
    this.send(txt, 'success', null, isSelfDelete);
  }

  sendInfo(msg) {
    var txt = "{2} **{0} Command**\n\n{1}";
    txt = txt.split("{0}").join(this.commandName);
    txt = txt.split("{1}").join(msg);
    txt = txt.split("{2}").join(this.emoji(this.config.infoEmoji));

    this.send(txt, 'info');
  }

  sendArgumentError(msg) {
    var msgTxt = '{0}\n\n{1}';

    msgTxt = msgTxt.split('{0}').join((msg != null && msg != '') ? msg : 'Incorrect argument format.');
    msgTxt = msgTxt.split('{1}').join(this.infoMessage);

    this.sendError(msgTxt);
  }

  emoji(emojiName) {
    return emojiUtil.get(emojiName, this.config.emojis);
  }

  emojiUrl(emojiName) {
    return emojiUtil.url(emojiName, this.config.emojis);
  }

  color(colorName) {
    return colorUtil.pick(colorName);
  }

  // overridable methods for strict implementation
  info() { }
  handle(args) { }
}

module.exports = ICommand;