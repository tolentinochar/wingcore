const ICommand = require('./iCommand.js');

class InstanceCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['instance'];
        model.mention = ['instance'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: reponds with the bot instance currently running' +
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