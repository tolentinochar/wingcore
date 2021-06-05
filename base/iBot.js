const extensions = require('../extensions/extension.js');
const Discord = require('discord.js');

const logger = require('../logger/logger.js');

const requestModel = require('../messaging/request.js');
const request = new requestModel();

const noCommandHandler = require('../commands/noCommand.js');
const noCommand = new noCommandHandler();

const deleteCommand = require('../commands/deleteCommand.js');
const pingCommand = require('../commands/pingCommand.js');
const instanceCommand = require('../commands/instanceCommand.js');

const configJs = require('../config/config.js');

class IBot {
  constructor(configJson, version) {
    this._config = new configJs(configJson);
    this._config.version = version;

    const client = new Discord.Client();

    client.once('ready', () => {
      logger.ready(client, this.config.version, this.config.uuidShort)
    });
    client.login(this.config.envTOKEN);

    client.on('message', message => {
      this.handleMessage(client, message);
    });

  }

  get config() {
    return this._config;
  }

  handleMessage(client, message) {
    request.setRequest(client, message, this.config.commandPrefix);

    if (this.shouldHandleMessage(request)) {
      var command = null;

      logger.request(request, this.config.uuidShort);

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

      command.handleCommand(request);
      this.handleCommand(request);
    }
    else if (this.hasMention(request)) {
      var mention = null;

      logger.request(request, this.config.uuidShort);

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
        , new instanceCommand()
      ];

      var extraCommands = this.getAllCommands();

      if (extraCommands != null) {
        allBotCommands = allBotCommands.concat(extraCommands);
      }

      this._allCommands = allBotCommands;
    }

    return this._allCommands;
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
    var ret = false;
    // Don't handle messages sent by the bot (avoid looping)
    if (request.message.author.id === request.client.user.id) return ret;

    ret = (
      request.messageContent.startsWith(this.commandPrefix)
      && (this.config.channelWhitelist.find(x => x == request.message.channel.id) != null || this.config.channelWhitelist.length === 0)
      && (!this.config.channelBlacklist.find(x => x == request.message.channel.id) == null || this.config.channelBlacklist.length === 0)
    );

    return ret;
  }

  hasMention(request) {
    var ret = false;
    // Don't handle messages sent by the bot (avoid looping)
    if (request.message.author.id === request.client.user.id) return ret;
    
    ret = (
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