class TextUtil {
  static italics(text) {
    return this.apply(text, '*');
  }

  static bold(text) {
    return this.apply(text, '**');
  }

  static boldItalics(text) {
    return this.apply(text, '***');
  }

  static underline(text) {
    return this.apply(text, '__');
  }

  static strike(text) {
    return this.apply(text, '~~');
  }

  static codeBlock(text) {
    return this.apply(text, '`');
  }

  static codeBlockMulti(text) {
    return this.apply(text, '```');
  }

  static spoiler(text) {
    return this.apply(text, '||');
  }

  static apply(text, markup) {
    var reply = '{0}{1}{0}';
    reply = reply.split('{0}').join(markup);
    reply = reply.split('{1}').join(text);
    return reply;
  }
}

module.exports = TextUtil;