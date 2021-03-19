$(function () {
  var bool = [1, -1];
  $('.movList').html(
    $('.movList li').sort(function(a, b) {
      return bool[Math.floor(Math.random() * bool.length)];
    })
  );
  $('.movList li:gt(0)').css('display','none');
});