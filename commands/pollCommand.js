const ICommand = require('./iCommand.js');

const emojiNumbers = [
    'zero'
    , 'one'
    , 'two'
    , 'three'
    , 'four'
    , 'five'
    , 'six'
    , 'seven'
    , 'eight'
    , 'nine'
];

class PollCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['poll'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0} <"text"> ["option1"] ["option2"] ... ["option9"]`';
        model.description = 'creates a poll using emoji to vote';
        model.detail = '' +
            '\n-`<"text">`: poll question' +
            '\n-`["option"]`: optional answer candidates, limit of 9 options' +
            '\n: if no option is given, Yes and No options are used by default' +
            '\n-`<"text">` and `["option"]` should be enclosed in `\"` double quotes if there are multiple words' +
            '\n-ex:`{0} "what\'s your favorite color?" black "blue green" red`' +
            '';
        return model;
    }

    handle(args) {
        if (args == null || args.length == 0 || args.length == 2 || args.length > 10) {
            this.sendArgumentError();
            return;
        }

        var answers = [];
        var emojis = [];
        var msg = '' +
            '{3} **{0}**' +
            '\n*-{1}*' +
            '\n\n{2}' +
            '';

        if (args.length == 1) {
            emojis = [this.emoji('ok_hand'), this.emoji('thumbsdown')];
            answers = [this.emoji('ok_hand') + ' yes', this.emoji('thumbsdown') + ' no'];
        }

        for (var i = 1; i < args.length; i++) {
            emojis.push(this.emoji(emojiNumbers[i]));
            answers.push(this.emoji(emojiNumbers[i]) + ' ' + args[i]);
        }

        msg = msg.split('{0}').join(args[0]); //question
        msg = msg.split('{1}').join(this.request.message.member.displayName);
        msg = msg.split('{2}').join(answers.join('\n\n'));
        msg = msg.split('{3}').join(this.emoji('ballot_box'));

        this.sendMulti(msg, emojis);
    }

    async sendMulti(msg, emojis) {
        const prev = await this.send(msg);
        for (var e of emojis) {
            prev.react(e);
        }
    }
}

module.exports = PollCommand;