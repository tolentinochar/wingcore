const ICommand = require('./iCommand.js');

const commandName = ['instance'];
const mention = ['instance'];
const argumentCounts = null;
const infoEmoji = null;
const responseEmoji = null;

class InstanceCommand extends ICommand {
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
            '\n: reponds with the bot instance currently running.' +
            '';

        return ret;
    }

    handle(args) {
        var msg = '{0} [{1}] v{2} is online.';
        msg = msg.split('{0}').join(this.request.client.user.tag);
        msg = msg.split('{1}').join(this.config.uuidShort);
        msg = msg.split('{2}').join(this.config.version);

        this.send(msg);
    }
}

module.exports = InstanceCommand;