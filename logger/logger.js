
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
        var log = '{0} [{1}] ({2}) {3}: {4}';
        log = log.split('{0}').join(new Date().toDateTime());
        log = log.split('{1}').join(uuid);
        log = log.split('{2}').join(request.message.id);
        log = log.split('{3}').join(request.message.author.tag);
        log = log.split('{4}').join(request.message.content);

        console.log(log);
    }

    static response(isSuccess, isHandled, message, uuid) {
        var log = '' +
            '{0} {1} {2} {3}' +
            '';

        log = log.split('{0}').join(new Date().toDateTime());
        log = log.split('{1}').join(uuid);
        log = log.split('{1}').join(request.client.user.tag);
        log = log.split('{2}').join(isSuccess ? 'SUCCESS' : 'FAILED'); //success/failed
        log = log.split('{3}').join(isHandled ? 'HANDLED' : 'UNHANDLED'); //handled/unhandled
        log = log.split('{4}').join(message); //message

        console.warn(log);
    }
}

module.exports = Logger;