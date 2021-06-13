const ICommand = require('../../../commands/iCommand.js');

class TestYCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['y'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: test Y command.' +
            '';

        return ret;
    }

    handle(args) {
        var ret = '' +
        'Y: Hello {0}' +
        '';
        ret = ret.split('{0}').join('world');
        this.send(ret);
    }
}

module.exports = TestYCommand;