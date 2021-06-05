class GameDayUtil {
  static localDate() {
    return new Date();
  }

  static gameDate(offset) {
    var ret = new Date();
    var timezoneOffset = null
    try {
      timezoneOffset = parseInt(offset);
    }
    catch (e) {
      console.error(e);
      offset = 0;
    }

    ret.setHours(ret.getHours() + timezoneOffset);
    return ret;
  }

  static gameTomorrowDate(offset) {
    var ret = this.gameDate(offset);
    ret.setDate(ret.getDate() + 1);
    return ret;
  }

  static resetDate(time) {
    var today = this.localDate();
    
    var tomorrow = this.localDate();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    var reset = this.localDate();
    reset.applyTime(time);

    if (today >= reset) {
      reset = tomorrow;
      reset.applyTime(time);
    }

    return reset;
  }
}

module.exports = GameDayUtil;
