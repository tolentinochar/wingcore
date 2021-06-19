const ICommand = require('../../../commands/iCommand.js');

class TestYCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['y'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0}`';
        model.description = 'test Y command';
        model.detail = '';
        return model;
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