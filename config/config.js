// Require the uuid module to be able to generate a uuid for the running bot instance
const { v4: uuidv4 } = require('uuid');

// Load data references
var defaultJson = require('./config.json');
var timezoneJson = require('../refdata/timezoneData.json');


class Config {
  constructor(configJson) {
    this._configJson = configJson;
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
      this._commandPrefix = this._configJson.commandPrefix;
    }
    return this._commandPrefix;
  }

  get mentionPrefix() {
    if (this._mentionPrefix == null) {
      this._mentionPrefix = this._configJson.mentionPrefix;
    }
    return this._mentionPrefix;
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
      if (defaultJson !== null && defaultJson.channelWhitelist !== undefined && defaultJson.channelWhitelist.length > 0) {
        allWhitelist.push(defaultJson.channelWhitelist);
      }

      var envChannelWhitelist = this.envCHANNEL_WHITELIST;
      if (envChannelWhitelist !== null && envChannelWhitelist !== undefined && envChannelWhitelist !== '') {
        allWhitelist.concat(envChannelWhitelist.split(','));
      }

      this._channelWhitelist = allWhitelist;
    }
    return this._channelWhitelist;
  }

  get channelBlacklist() {
    if (this._channelBlacklist == null) {
      var allBlacklist = [];
      if (defaultJson !== null && defaultJson.channelBlacklist !== undefined && defaultJson.channelBlacklist.length > 0) {
        allBlacklist.push(defaultJson.channelBlacklist);
      }

      var envChannelBlacklist = this.envChannelBlacklist;
      if (envChannelBlacklist !== null && envChannelBlacklist !== undefined && envChannelBlacklist !== '') {
        allBlacklist.concat(envChannelBlacklist.split(','));
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

}

module.exports = Config;