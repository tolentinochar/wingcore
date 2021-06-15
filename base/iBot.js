require('dotenv').config();

const extensions = require('../extensions/extension.js');
const Discord = require('discord.js');

const logger = require('../logger/logger.js');

const requestModel = require('../messaging/request.js');
const request = new requestModel();

const noCommandHandler = require('../commands/noCommand.js');
const noCommand = new noCommandHandler();

const deleteCommand = require('../commands/deleteCommand.js');
const pingCommand = require('../commands/pingCommand.js');
const pollCommand = require('../commands/pollCommand.js');
const instanceCommand = require('../commands/instanceCommand.js');
const helpCommand = require('../commands/helpCommand.js');
const randomCommand = require('../commands/randomCommand.js');

const configJs = require('../config/config.js');

const newModel = {
  configJson: null
  , emojiJson: null
  , version: null
};

class IBot {
  constructor(model) {
    this._config = new configJs(model.configJson, model.emojiJson);
    this._config.version = model.version;

    const client = new Discord.Client();

    client.once('ready', () => {
      try {
        logger.ready(client, this.config.version, this.config.uuidShort)
      }
      catch (e) {
        logger.error(e);
      }
    });

    try {
      client.login(this.config.envTOKEN);
    }
    catch (e) {
      logger.error(e);
    }


    client.on('message', message => {
      try {
        this.handleMessage(client, message);
      }
      catch (e) {
        logger.error(e, message, this.config.uuidShort);
      }
    });

  }

  get config() {
    return this._config;
  }

  handleMessage(client, message) {
    // Don't handle messages sent by the bot (avoid looping)
    if (message.author.id === client.user.id) return false;

    if (message.content == null || !message.content.startsWith(this.commandPrefix)) return false;

    request.setRequest(client, message, this.config.commandPrefix);

    if (this.shouldHandleMessage(request)) {
      var command = null;

      if (this.config.envIS_LIVE != null && this.config.envIS_LIVE == 'false') {
        logger.request(request, this.config.uuidShort);
      }

      command = this.getBotCommandHandler(request.command);

      if (command == null) {
        command = this.getCommandHandler(request.command);
      }

      if (command == null) {
        command = noCommand;
      }

      if (command.config == null) {
        command.config = this.config;
      }

      //pass specifically for help command
      if (command.commandName == 'help') {
        request.allCommandInfo = this.allCommandInfo;
      }

      command.handleCommand(request);
      this.handleCommand(request);
    }
    else if (this.hasMention(request)) {
      var mention = null;

      if (this.config.envIS_LIVE != null && this.config.envIS_LIVE == 'false') {
        logger.request(request, this.config.uuidShort);
      }

      mention = this.getBotMentionHandler(request.mentionContent);

      if (mention != null) {
        mention.handleCommand(request);
        this.handleCommand(request);
      }
    }
  }

  get allCommands() {
    if (this._allCommands == null) {
      var allBotCommands = [
        new deleteCommand()
        , new pingCommand()
        , new pollCommand()
        , new instanceCommand()
        , new helpCommand()
        , new randomCommand()
      ];

      var extraCommands = this.getAllCommands();

      if (extraCommands != null) {
        allBotCommands = allBotCommands.concat(extraCommands);
      }

      allBotCommands.sort((a, b) => (a.commandName[0] > b.commandName[0]) ? 1 : ((b.commandName[0] > a.commandName[0]) ? -1 : 0));

      this._allCommands = allBotCommands;
    }

    return this._allCommands;
  }

  get allCommandInfo() {
    if (this._allCommandInfo == null && this.allCommands !== null) {
      var info = [];
      for (var cmd of this.allCommands) {
        info.push(cmd.infoMessage);
      }
      this._allCommandInfo = info;
    }
    return this._allCommandInfo;
  }

  getBotCommandHandler(command) {
    for (var cmd of this.allCommands) {
      if (cmd.commandName != null && cmd.commandName.find(x => x === command) != null) {
        return cmd;
      }
    }

    return null;
  }

  getBotMentionHandler(messageContent) {
    var messageArgs = messageContent.split(' ');

    for (var cmd of this.allCommands) {
      if (cmd.mention != null && cmd.mention.find(x => messageArgs.includes(x)) != null) {
        return cmd;
      }
    }
  }

  shouldHandleMessage(request) {
    var ret = (
      request.messageContent.startsWith(this.commandPrefix)
      && (this.config.channelWhitelist.find(x => x == request.message.channel.id) != null || this.config.channelWhitelist.length === 0)
      && (!this.config.channelBlacklist.find(x => x == request.message.channel.id) == null || this.config.channelBlacklist.length === 0)
    );

    return ret;
  }

  hasMention(request) {
    var ret = (
      request.mentionContent.startsWith(this.mentionPrefix + ' ')
      && (this.config.channelWhitelist.find(x => x == request.message.channel.id) != null || this.config.channelWhitelist.length === 0)
      && (!this.config.channelBlacklist.find(x => x == request.message.channel.id) == null || this.config.channelBlacklist.length === 0)
    );

    return ret;
  }

  get commandPrefix() {
    return this.config.commandPrefix;
  }

  get mentionPrefix() {
    return this.config.mentionPrefix;
  }

  // overridable methods for strict implementation
  getAllCommands() { }

  // overridable
  handleCommand(request) { }
  getCommandHandler(command) { }

}

module.exports = IBot;