const ICommand = require('./iCommand.js');

class HelpCommand extends ICommand {
    constructor() {
        var model = {};
        model.commandName = ['help'];
        super(model);
    }

    info() {
        var model = this.newInfoModel;
        model.header = '`{0}`';
        model.description = 'displays command list';
        model.detail = '';
        return model;
    }

    handle(args) {
        var txt = '{3} **{0}**\n\n{1}'+
        'Use `{2}<command> ?` to see full command info.' +
        '\nex:`{2}help ?`' +
        '';
        var infoTmp = '';
        var allInfo = '';
        for (var info of this.request.allCommandInfo) {
            infoTmp = '{1}{0}\n\n';
            infoTmp = infoTmp.split('{0}').join(info);
            infoTmp = infoTmp.split('{1}').join(this.emoji('small_blue_diamond'));
            allInfo += infoTmp;
        }
        txt = txt.split('{0}').join('Bot Commands');
        txt = txt.split('{1}').join(allInfo);
        txt = txt.split('{2}').join(this.config.commandPrefix);
        txt = txt.split('{3}').join(this.emoji(this.config.infoEmoji));
        this.send(txt);
    }
}

module.exports = HelpCommand;