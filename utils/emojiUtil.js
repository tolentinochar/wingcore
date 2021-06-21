const emojiNumbers = [
  'zero'
  , 'one'
  , 'two'
  , 'three'
  , 'four'
  , 'five'
  , 'six'
  , 'seven'
  , 'eight'
  , 'nine'
];

class EmojiUtil {
  static get(emojiName, emojis) {
    var ret = null;
    var emoji = this.searchEmoji(emojiName, emojis);
    if (emoji != null) {
      if (emoji.code != null) {
        ret = emoji.code;
      }
      else {
        ret = '<:{0}:{1}>';
        ret = ret.split('{0}').join(emoji.name);
        ret = ret.split('{1}').join(emoji.id);
      }
    }
    return ret;
  }

  static url(emojiName, emojis) {
    var emoji = this.searchEmoji(emojiName, emojis);
    var emojiUrl = 'https://cdn.discordapp.com/emojis/{0}.png?v=1';
    emojiUrl = emojiUrl.split('{0}').join(emoji.id);
    return emojiUrl;
  }

  static searchEmoji(emojiName, emojis) {
    var ret = (emojiName != null && emojis != null) ? emojis.find(x => x.name === emojiName) : null;
    return ret;
  }

  static number(number, emojis) {
    return this.get(emojiNumbers[number], emojis);
  }
}

module.exports = EmojiUtil;