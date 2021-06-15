const ICommand = require('./iCommand.js');

const greets = [
    'hello!'
    , 'hi!'
    , 'pong!'
];

class PingCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['ping', 'hello', 'hi'];
        model.mention = ['ping'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: pings the server then responds with a greeting' +
            '';

        return ret;
    }

    handle(args) {
        var txt = greets[Math.floor(Math.random() * greets.length)];
        this.reply(txt);
    }
}

module.exports = PingCommand;