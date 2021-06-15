
class Logger {
    static ready(client, version, uuid) {
        var log = '{0} [{1}] {2} v{3} is online.';
        log = log.split('{0}').join(new Date().toDateTime());
        log = log.split('{1}').join(uuid);
        log = log.split('{2}').join(client.user.tag);
        log = log.split('{3}').join(version);

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
        if (message != null && uuid != null) {
            var log = '{0} [{1}] ({2}) {3}:{4}';
            log = log.split('{0}').join(new Date().toDateTime());
            log = log.split('{1}').join(uuid);
            log = log.split('{2}').join(message.id);
            log = log.split('{3}').join(message.author.tag);
            log = log.split('{4}').join(message.content);
            console.error(log);
        }

        console.error(e);
    }

    static text(txt, title = null) {
        if (title) {
            console.log(title);
        }
        console.log(txt);
    }
}

module.exports = Logger;