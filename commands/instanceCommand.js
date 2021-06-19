const ICommand = require('./iCommand.js');

class InstanceCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['instance'];
        model.mention = ['instance'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0}`';
        model.description = 'reponds with the bot instance currently running';
        model.detail = '';
        return model;
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