const ICommand = require('./iCommand.js');

class RandomCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['random', 'dice'];
        model.argumentCounts = [0, 1];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0} [maxNumber]`';
        model.description = 'replys with a random number between 1 and [maxNumber]';
        model.detail = '' +
            '\n-`[maxNumber]`: optional maximum number, 1000 is used by default' +
            '\n-ex:`{0} 777`' +
            '';
        return model;
    }

    handle(args) {
        if (args != null && args.length != 0 && !args[0].isNumber()) {
            this.sendArgumentError();
            return;
        }

        var maxNumber = 1000;

        if (args != null && args.length != 0) {
            maxNumber = parseInt(args[0]);
        }

        var roll = Math.floor(Math.random() * maxNumber);
        var txt = '{0} rolls a {2} {1}';
        txt = txt.split('{0}').join(this.request.message.member.displayName);
        txt = txt.split('{1}').join(roll);
        txt = txt.split('{2}').join(this.emoji('game_die'));

        this.send(txt);
    }
}

module.exports = RandomCommand;