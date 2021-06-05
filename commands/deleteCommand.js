const ICommand = require('./iCommand.js');

const commandName = ['delete'];
const mention = ['delete'];
const argumentCounts = [1];
const infoEmoji = null;
const responseEmoji = null;

class DeleteCommand extends ICommand {
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
            '`{0} <count>`' +
            '\n: deletes <count> number of messages.' +
            '\n-`<count>`: limit of 100.' +
            '';

        return ret;
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

        this.send(text, null, null, null, true);
    }
}

module.exports = DeleteCommand;