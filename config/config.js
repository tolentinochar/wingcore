// Require the uuid module to be able to generate a uuid for the running bot instance
const { v4: uuidv4 } = require('uuid');

// Load data references
const defaultJson = require('./config.json');
const timezoneJson = require('../refdata/timezoneData.json');
const coreEmojiJson = require('../refdata/emojiData.json');

class Config {
  constructor(configJson, emojiJson) {
    this._configJson = configJson;
    this._emojiJson = emojiJson;

    //create property for custom config (keys not in default)
    const defaultKeys = Object.keys(defaultJson);
    const customKeys = defaultKeys !== null ? Object.keys(this._configJson).filter(x => !defaultKeys.includes(x)) : null;

    if (customKeys !== null) {
      for (var key of customKeys) {
        this[key] = this._configJson[key];
      }
    }
  }

  get envTOKEN() {
    return process.env.TOKEN;
  }

  get envCHANNEL_WHITELIST() {
    return process.env.CHANNEL_WHITELIST;
  }

  get envCHANNEL_BLACKLIST() {
    return process.env.CHANNEL_BLACKLIST;
  }

  get envIS_LIVE() {
    return process.env.IS_LIVE;
  }

  get version() { return this._version; }
  set version(value) { if (value) this._version = value; }

  get uuid() {
    if (this._uuid == null) {
      this._uuid = uuidv4();
    }
    return this._uuid;
  }
  get uuidShort() {
    if (this._uuidShort == null) {
      this._uuidShort = this.uuid.substring(0, 7);
    }
    return this._uuidShort;
  }

  get commandPrefix() {
    if (this._commandPrefix == null) {
      this._commandPrefix = (this._configJson != null && this._configJson.commandPrefix != null) ? this._configJson.commandPrefix : defaultJson.commandPrefix;
    }
    return this._commandPrefix;
  }

  get mentionPrefix() {
    if (this._mentionPrefix == null) {
      this._mentionPrefix = (this._configJson != null && this._configJson.mentionPrefix != null) ? this._configJson.mentionPrefix : defaultJson.mentionPrefix;
    }
    return this._mentionPrefix;
  }

  get infoEmoji() {
    if (this._infoEmoji == null) {
      this._infoEmoji = (this._configJson != null && this._configJson.infoEmoji != null) ? this._configJson.infoEmoji : defaultJson.infoEmoji;
    }
    return this._infoEmoji;
  }

  get warningEmoji() {
    if (this._warningEmoji == null) {
      this._warningEmoji = (this._configJson != null && this._configJson.warningEmoji != null) ? this._configJson.warningEmoji : defaultJson.warningEmoji;
    }
    return this._warningEmoji;
  }

  get errorEmoji() {
    if (this._errorEmoji == null) {
      this._errorEmoji = (this._configJson != null && this._configJson.errorEmoji != null) ? this._configJson.errorEmoji : defaultJson.errorEmoji;
    }
    return this._errorEmoji;
  }

  get successEmoji() {
    if (this._successEmoji == null) {
      this._successEmoji = (this._configJson != null && this._configJson.successEmoji != null) ? this._configJson.successEmoji : defaultJson.successEmoji;
    }
    return this._successEmoji;
  }

  get language() {
    if (this._language == null) {
      this._language = (this._configJson != null && this._configJson.language != null) ? this._configJson.language : defaultJson.language;
    }
    return this._language;
  }

  get region() {
    if (this._region == null) {
      this._region = (this._configJson != null && this._configJson.region != null) ? this._configJson.region : defaultJson.region;
    }
    return this._region;
  }

  get channelWhitelist() {
    if (this._channelWhitelist == null) {
      var allWhitelist = [];

      if (this._configJson !== null && this._configJson.channelWhitelist !== undefined && this._configJson.channelWhitelist.length > 0) {
        allWhitelist = allWhitelist.concat(this._configJson.channelWhitelist);
      }
      else if (defaultJson !== null && defaultJson.channelWhitelist !== undefined && defaultJson.channelWhitelist.length > 0) {
        allWhitelist = allWhitelist.concat(defaultJson.channelWhitelist);
      }

      var envChannelWhitelist = this.envCHANNEL_WHITELIST;
      if (envChannelWhitelist !== null && envChannelWhitelist !== undefined && envChannelWhitelist !== '') {
        allWhitelist = allWhitelist.concat(envChannelWhitelist.split(','));
      }

      this._channelWhitelist = allWhitelist;
    }
    return this._channelWhitelist;
  }

  get channelBlacklist() {
    if (this._channelBlacklist == null) {
      var allBlacklist = [];

      if (this._configJson !== null && this._configJson.channelBlacklist !== undefined && this._configJson.channelBlacklist.length > 0) {
        allBlacklist = allBlacklist.concat(this._configJson.channelBlacklist);
      }
      else if (defaultJson !== null && defaultJson.channelBlacklist !== undefined && defaultJson.channelBlacklist.length > 0) {
        allBlacklist = allBlacklist.concat(defaultJson.channelBlacklist);
      }

      var envChannelBlacklist = this.envChannelBlacklist;
      if (envChannelBlacklist !== null && envChannelBlacklist !== undefined && envChannelBlacklist !== '') {
        allBlacklist = allBlacklist.concat(envChannelBlacklist.split(','));
      }

      this._channelBlacklist = allBlacklist;
    }
    return this._channelBlacklist;
  }

  get dailyResetLocalTime() {
    if (this._dailyResetLocalTime == null) {
      this._dailyResetLocalTime = (this._configJson != null && this._configJson.dailyResetLocalTime != null) ? this._configJson.dailyResetLocalTime : defaultJson.dailyResetLocalTime;
    }
    return this._dailyResetLocalTime;
  }

  get timezone() {
    if (this._timezone == null) {
      var timezones = timezoneJson['timezones'];
      if (timezones != null) {
        this._timezone = timezones.find(x => x.name === this.region);
      }
    }
    return this._timezone;
  }

  get timezoneOffset() {
    if (this._timezoneOffset == null && this.timezone != null) {
      this._timezoneOffset = this.timezone.offset;
    }
    return this._timezoneOffset;
  }

  get emojis() {
    if (this._emojis == null) {
      var allEmojis = coreEmojiJson["emojis"];
      if (this._emojiJson != null) {
        var customEmojis = this._emojiJson["emojis"];
        for (var e of customEmojis) {
          allEmojis.push(e);
        }
      }
      this._emojis = allEmojis;
    }
    return this._emojis;
  }
}

module.exports = Config;