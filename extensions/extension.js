Date.prototype.toGameDate = function () {
  const offset = this.getTimezoneOffset();
  var ret = new Date(this.getTime() - (offset * 60 * 1000));
  ret = ret.toISOString().split('T')[0];
  return ret;
};

Date.prototype.toGameTime = function () {
  const offset = this.getTimezoneOffset();
  var ret = new Date(this.getTime() - (offset * 60 * 1000));
  ret = ret.toISOString().split('T')[1].substr(0, 5);
  return ret;
};

Date.prototype.toGameDateTime = function () {
  const offset = this.getTimezoneOffset();
  var ret = '{0} {1}';
  var now = new Date(this.getTime() - (offset * 60 * 1000));
  var day = now.toISOString().split('T')[0];
  var time = now.toISOString().split('T')[1].substr(0, 5);
  ret = ret.split('{0}').join(day);
  ret = ret.split('{1}').join(time);
  return ret;
};

Date.prototype.toGameTimeDate = function () {
  const offset = this.getTimezoneOffset();
  var ret = '{1} {0}';
  var now = new Date(this.getTime() - (offset * 60 * 1000));
  var day = now.toISOString().split('T')[0];
  var time = now.toISOString().split('T')[1].substr(0, 5);
  ret = ret.split('{0}').join(day);
  ret = ret.split('{1}').join(time);
  return ret;
};

Date.prototype.toDateTime = function () {
  const offset = this.getTimezoneOffset();
  var ret = '{0} {1}';
  var now = new Date(this.getTime() - (offset * 60 * 1000));
  var day = now.toISOString().split('T')[0];
  var time = now.toISOString().split('T')[1].substr(0, 8);
  ret = ret.split('{0}').join(day);
  ret = ret.split('{1}').join(time);
  return ret;
};

Date.prototype.toDate = function () {
  return this.toISOString().split('T')[0];
};

Date.prototype.applyTime = function (time) {
  var times = time.split(':');
  var hour = (times.length > 0) ? times[0] : 0;
  var min = (times.length > 1) ? times[1] : 0;
  var sec = (times.length > 2) ? times[2] : 0;

  this.setHours(hour);
  this.setMinutes(min);
  this.setSeconds(sec);
  return this;
};

Number.prototype.minuteToWord = function () {
  var words = '{0}{1}{2}';
  var hours = Math.floor(this / 60);
  var mins = Math.floor(this - (hours * 60));

  if (hours > 0) {
    words = words.split('{0}').join(hours + ' hours');
  }
  else {
    words = words.split('{0}').join('');
  }

  if (hours > 0 && mins > 0) {
    words = words.split('{1}').join(' and ');
  }
  else {
    words = words.split('{1}').join('');
  }

  if (mins > 0) {
    words = words.split('{2}').join(mins + ' minutes');
  }
  else {
    words = words.split('{2}').join('');
  }
  return words;
};

String.prototype.isNumber = function () {
  var reg = /^\d+$/;
  var ret = this.match(reg);
  return (ret != null);
};

String.prototype.isTime = function () {
  var reg = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  var ret = this.match(reg);
  return (ret != null);
};

String.prototype.sanitize = function () {
  return this.trim().toLowerCase();
};

String.prototype.isEmpty = function () {
  return this == null || this == undefined || this == '';
};

String.prototype.toMinute = function () {
  var ret = parseInt(this);
  return ret * 60 * 1000;
};