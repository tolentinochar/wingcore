const {colors} = require('../refdata/colorData.json');

class ColorUtil {
  static pick(colorName) {
    var color = searchColor(colorName);
    return color.code;
  }
}

function searchColor(colorName) {
  for (var color of colors) {
    if (color != null
        && color.name != null
        && color.name === colorName) {
      return color;
    }
  }
}

module.exports = ColorUtil;