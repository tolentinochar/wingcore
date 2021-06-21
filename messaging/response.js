const emojiUtil = require('../utils/emojiUtil.js');
const maxChar = 2000;
const pagingTimeout = '1'.toMinute();

class Response {

  get emojis() { return this._emojis; }
  set emojis(value) {
    if (value) this._emojis = value;
  }

  async send(model, isSelfDelete = false) {
    var embeds = [];
    var texts = [];
    var emojis = this.emojis;

    if (Array.isArray(model.texts)) {
      texts = texts.concat(model.texts)
    }
    else {
      texts.push(model.texts);
    }

    for (var txt of texts) {
      var embed = {};
      embed.color = model.color;
      embed.description = txt;
      if (model.emojiUrl != null && model.emojiUrl != '') {
        embed.thumbnail = {
          url: model.emojiUrl
        };
      }
      if (txt.length > maxChar) {
        embed.split = true;
      }
      embeds.push(embed);
    }

    return await model.message.channel.send({ embed: embeds[0] })
      .then(function (m) {
        //self delete
        if (isSelfDelete) {
          setTimeout(() => m.delete(), 10000);
        }
        //pagination
        if (embeds.length > 1) {
          let currentIndex = 0;

          //page number
          m.react(emojiUtil.number(currentIndex + 1, emojis));
          m.react(emojiUtil.get('arrow_right', emojis));

          const author = model.message.author;
          const collector = m.createReactionCollector(
            //collect left and right arrow reactions from the message author
            (reaction, user) => [
              emojiUtil.get('arrow_left', emojis)
              , emojiUtil.get('arrow_right', emojis)
            ].includes(reaction.emoji.name) && user.id === author.id,
            { time: pagingTimeout }
          );

          collector.on('collect', reaction => {
            //remove current reactions
            m.reactions.removeAll().then(async () => {
              //index +-
              reaction.emoji.name === emojiUtil.get('arrow_left', emojis) ? currentIndex -= 1 : currentIndex += 1
              //edit message with new embed
              m.edit({ embed: embeds[currentIndex] })
              //react with left arrow if not the start, await so left arrow is reacted first
              if (currentIndex !== 0) await m.react(emojiUtil.get('arrow_left', emojis))
              //display new page number
              await m.react(emojiUtil.number(currentIndex + 1, emojis))
              //react with right arrow if not the end
              if (currentIndex < embeds.length - 1) m.react(emojiUtil.get('arrow_right', emojis))
            })
          });
        }
        return m;
      })
      .catch(function (e) {
        throw e;
      });
  }

  async reply(model, isSelfDelete = false) {
    return await model.message.reply(model.texts)
      .then(function (m) {
        if (isSelfDelete) {
          setTimeout(() => m.delete(), 10000);
        }
        return m;
      })
      .catch(function (e) {
        throw e;
      });
  }

  get newMessage() {
    return {
      message: null
      , title: null
      , texts: null
      , color: null
      , emojiUrl: null
    };
  }
}

module.exports = Response;