const ICommand = require('../../../commands/iCommand.js');

class TestXCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['x'];
        super(model);
    }

    info() {
        var ret = '' +
            '`{0}`' +
            '\n: test X command.' +
            '';

        return ret;
    }

    handle(args) {
        var ret = '' +
            'X: Hello {0} {1}' +
            '';
        ret = ret.split('{0}').join('world');
        ret = ret.split('{1}').join(new Date().toDate());
        this.send(ret);
    }
}

module.exports = TestXCommand;