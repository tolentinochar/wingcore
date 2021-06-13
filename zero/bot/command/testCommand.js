const ICommand = require('../../../commands/iCommand.js');

const commandName = ['x'];
const mention = null;
const argumentCounts = null;
const infoEmoji = null;
const responseEmoji = null;

class TestCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['x'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: test command.' +
            '';

        return ret;
    }

    handle(args) {
        var ret = '' +
        'Hello {0}' +
        '';
        ret = ret.split('{0}').join('world');
        this.send(ret);
    }
}

module.exports = TestCommand;