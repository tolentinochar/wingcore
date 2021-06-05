const {emojis} = require('../refdata/emojiData.json');

class EmojiUtil {
  static get(emojiName) {
    var emoji = searchEmoji(emojiName);
    var emojiCode = '<{0}{1}>';
    emojiCode = emojiCode.split('{0}').join(emoji.code);
    emojiCode = emojiCode.split('{1}').join(emoji.id);
    return emojiCode;
  }

  static url(emojiName) {
    var emoji = searchEmoji(emojiName);
    var emojiUrl = 'https://cdn.discordapp.com/emojis/{0}.png?v=1';
    emojiUrl = emojiUrl.split('{0}').join(emoji.id);
    return emojiUrl;
  }
}

function searchEmoji(emojiName) {
  for (var emo of emojis) {
    if (emo != null
        && emo.name != null
        && emo.name === emojiName) {
      return emo;
    }
  }
}

module.exports = EmojiUtil;