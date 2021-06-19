const ICommand = require('./iCommand.js');

class NoCommand extends ICommand {
  constructor() {
    var model = {};
    model.commandName = ['Unknown'];
    model.argumentCounts = [0];
    super(model);
  }

  info() {
    var model = this.newInfoModel;
        model.header = '';
        model.description = '';
        model.detail = '';
        return model;
  }

  handle(args) {
    var reply = '' +
      'Unknown command' +
      '';
    this.sendError(reply);
  }
}

module.exports = NoCommand;