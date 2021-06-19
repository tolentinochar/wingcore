const ICommand = require('../../../commands/iCommand.js');

class TestXCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['x'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0}`';
        model.description = 'test X command';
        model.detail = '';
        return model;
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