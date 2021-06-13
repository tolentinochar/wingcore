const ICommand = require('./iCommand.js');

class NoCommand extends ICommand {
  constructor() {
    var model = {};
    model.argumentCounts = [0];
    super(model);
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