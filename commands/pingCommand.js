const ICommand = require('./iCommand.js');

class PingCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['ping', 'pong'];
        model.mention = ['ping', 'pong'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: pings the server then responds with pong.' +
            '';

        return ret;
    }

    handle(args) {
        this.reply('pong!');
    }
}

module.exports = PingCommand;