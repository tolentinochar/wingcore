const ICommand = require('./iCommand.js');

class HelpCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['help'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: displays command list.' +
            '';

        return ret;
    }

    handle(args) {
        var ret = this.request.allCommandInfo;
        this.send(ret, 'Bot Commands');
    }
}

module.exports = HelpCommand;