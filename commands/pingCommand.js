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
        var model = this.newInfoModel;
        model.header = '`{0}`';
        model.description = 'pings the server then responds with a greeting';
        model.detail = '';
        return model;
    }

    handle(args) {
        var txt = greets[Math.floor(Math.random() * greets.length)];
        this.reply(txt);
    }
}

module.exports = PingCommand;