class TextUtil {
  static italics(text) {
    return this.applyFont(text, '*');
  }

  static bold(text) {
    return this.applyFont(text, '**');
  }

  static boldItalics(text) {
    return this.applyFont(text, '***');
  }

  static underline(text) {
    return this.applyFont(text, '__');
  }

  static strike(text) {
    return this.applyFont(text, '~~');
  }

  static codeBlock(text) {
    return this.applyFont(text, '`');
  }

  static codeBlockMulti(text) {
    return this.applyFont(text, '```');
  }

  static spoiler(text) {
    return this.applyFont(text, '||');
  }

  static applyFont(text, markup) {
    var reply = '{0}{1}{0}';
    reply = reply.split('{0}').join(markup);
    reply = reply.split('{1}').join(text);
    return reply;
  }
}

module.exports = TextUtil;