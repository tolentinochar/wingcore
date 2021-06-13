const IBot = require('../../base/iBot.js');

const configJSON = require('./config/config.json');

const testXCommand = require('./command/testXCommand.js');
const testYCommand = require('./command/testYCommand.js');

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
      new testXCommand()
      , new testYCommand()
    ]
  }
}

module.exports = ZeroBot;

