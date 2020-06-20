/* イメージランダム取得 */
$(function () {
  var bool = [1, -1];
  $('ul').html(
    $('li').sort(function(a, b) {
      return bool[Math.floor(Math.random() * bool.length)];
    })
  );
});
/* イメージスクロール */
$(function(){
 $(window).load(function(){
  $('.infiniteslide').show();
  $('.waitslide').hide();
  $('.infiniteslide').infiniteslide({
			'speed': 30,			// スピードを指定
			'direction' : 'left',	// スライドする向きを指定
			'pauseonhover': true,	// マウスオーバーでストップするかを指定
            'responsive': true,
			'clone' : 1000          // 子要素のコピー数を指定
  });
 });
});
