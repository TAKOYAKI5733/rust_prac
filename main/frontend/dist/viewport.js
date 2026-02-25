// viewport.js
(function() {
  var screenWidth = window.screen.width;
  var metaTag = document.createElement('meta');
  metaTag.name = "viewport";

  if (screenWidth < 412) {
    // 小型スマホ：412px縮小版
    var scale = screenWidth / 412;
    metaTag.content = "width=412, initial-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no";
  } else if (screenWidth < 744) {
    // 通常スマホ：レスポンシブ
    metaTag.content = "width=device-width, initial-scale=1.0";
  } else if (screenWidth < 1440) {
    // タブレットと小型PC：1440px縮小版
    var scale = screenWidth / 1440;
    metaTag.content = "width=1440, initial-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no";
  } else {
    // PC：レスポンシブ
    metaTag.content = "width=device-width, initial-scale=1.0";
  }

  // 既存のviewportメタタグがある場合は置き換え
  var existingMetaTag = document.querySelector('meta[name="viewport"]');
  if (existingMetaTag) {
    existingMetaTag.content = metaTag.content;
  } else {
    document.getElementsByTagName('head')[0].appendChild(metaTag);
  }
})();
