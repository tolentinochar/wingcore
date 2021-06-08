const ICommand = require('./iCommand.js');

const commandName = ['help'];
const mention = null;
const argumentCounts = null;
const infoEmoji = null;
const responseEmoji = null;

class HelpCommand extends ICommand {
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