const fileUtil = require('../utils/fileUtil.js');

const path = '../temp/logs';
const fileName = new Date().toDate() + '_logs.txt'

class Logger {
    static ready(client, version, uuid) {
        var log = '{0} [{1}] {2} v{3} is online.';
        log = log.split('{0}').join(new Date().toDateTime());
        log = log.split('{1}').join(uuid);
        log = log.split('{2}').join(client.user.tag);
        log = log.split('{3}').join(version);

        fileUtil.write(path, fileName, log);
        console.info(log);
    }

    static request(request, uuid) {
        var log = '{0} [{1}] ({2}) {3}:{4}';
        log = log.split('{0}').join(new Date().toDateTime());
        log = log.split('{1}').join(uuid);
        log = log.split('{2}').join(request.message.id);
        log = log.split('{3}').join(request.message.author.tag);
        log = log.split('{4}').join(request.message.content);

        console.log(log);
    }

    static error(e, message = null, uuid = null) {
        var log = '';
        if (message != null && uuid != null) {
            log = '{0} [{1}] ({2}) {3}:{4}';
            log = log.split('{0}').join(new Date().toDateTime());
            log = log.split('{1}').join(uuid);
            log = log.split('{2}').join(message.id);
            log = log.split('{3}').join(message.author.tag);
            log = log.split('{4}').join(message.content);
            console.error(log);
        }

        log += '\n' + e.stack;

        fileUtil.write(path, fileName, log);
        console.error(e);
    }

    static log(txt) {
        fileUtil.write(path, fileName, txt);
    }

    static console(txt, title = null) {
        if (title) {
            console.log(title);
        }
        console.log(txt);
    }
}

module.exports = Logger;