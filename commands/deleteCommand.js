const ICommand = require('./iCommand.js');

class DeleteCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['delete'];
        model.mention = ['delete'];
        model.argumentCounts = [1];
        model.permissions = ['MANAGE_MESSAGES'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0} <count>`';
        model.description = 'deletes messages';
        model.detail = '' +
            '\n-`<count>`: number of messages to delete, limit of 100' +
            '\n-ex: `{0} 10`' +
            '';
        return model;
    }

    handle(args) {
        if (!args[0].isNumber()) {
            this.sendArgumentError();
            return;
        }

        const channel = this.request.message.channel;
        const messageManager = this.request.message.channel.messages;

        var deleteCount = parseInt(args[0]);
        var total = deleteCount + 1;

        messageManager.fetch({ limit: total }).then((messages) => {
            messages.forEach((message) => {
                message.delete();
            });
        });

        var text = 'Deleting {0} message{1}.';
        text = text.split('{0}').join(deleteCount);
        text = text.split('{1}').join(deleteCount > 1 ? 's' : '');

        this.sendSuccess(text, true);
    }
}

module.exports = DeleteCommand;