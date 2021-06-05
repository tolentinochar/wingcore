const ICommand = require('./iCommand.js');

const commandName = ['ping', 'pong'];
const mention = ['ping', 'pong'];
const argumentCounts = null;
const infoEmoji = null;
const responseEmoji = null;

class PingCommand extends ICommand {
    constructor() {
        super(
            commandName
            , mention
            , argumentCounts
            , infoEmoji
            , responseEmoji
        );
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