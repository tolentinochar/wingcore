const IBot = require('../../base/iBot.js');

const configJson = require('./config/config.json');
const emojiJson = require('./refdata/emojiData.json');

const testXCommand = require('./command/testXCommand.js');
const testYCommand = require('./command/testYCommand.js');

const version = require('../../package.json').version;

class ZeroBot extends IBot {
  constructor() {
    var model = {};
    model.configJson = configJson;
    model.emojiJson = emojiJson;
    model.version = version;
    super(model);
  }

  getAllCommands() {
    return [
      new testXCommand()
      , new testYCommand()
    ]
  }
}

module.exports = ZeroBot;

