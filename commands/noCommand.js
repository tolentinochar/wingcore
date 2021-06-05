const ICommand = require('./iCommand.js');

const commandName = null;
const mention = null;
const argumentCounts = [0];
const infoEmoji = null;
const responseEmoji = null;

class NoCommand extends ICommand {
  constructor() {
    super(
      commandName
      , mention
      , argumentCounts
      , infoEmoji
      , responseEmoji
    );
  }

  handle(args) {
    var reply = '' +
      'Paimon can\'t understand!' +
      '\nUnknown command is used.' +
      '';
    this.sendError(reply);
  }
}

module.exports = NoCommand;