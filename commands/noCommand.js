const ICommand = require('./iCommand.js');

class NoCommand extends ICommand {
  constructor() {
    var model = {};
    model.commandName = ['Unknown'];
    model.argumentCounts = [0];
    super(model);
  }

  info() {
    var ret = '';

    return ret;
  }

  handle(args) {
    var reply = '' +
      'Unknown command' +
      '';
    this.sendError(reply);
  }
}

module.exports = NoCommand;