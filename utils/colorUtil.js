const { colors } = require('../refdata/colorData.json');

class ColorUtil {
  static pick(colorName) {
    var color = searchColor(colorName);
    return color.code;
  }
}

function searchColor(colorName) {
  var ret = (colorName != null && colors != null) ? colors.find(x => x.name === colorName) : null;
  return ret;
}

module.exports = ColorUtil;