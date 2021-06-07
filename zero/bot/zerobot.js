const IBot = require('../../base/iBot.js');

const configJSON = require('./config/config.json');

const testCommand = require('./command/testCommand.js');

 const version = require('../../package.json').version;

class ZeroBot extends IBot {
  constructor() {
    super(
      configJSON
      , version
    );
  }

  getAllCommands() {
    return [
      new testCommand()
    ]
  }
}

module.exports = ZeroBot;

