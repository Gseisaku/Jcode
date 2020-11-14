<script>

jQuery(function() {
    var nav = jQuery('#global_menu');
    var body =  jQuery('body');
	        
    var navTop = nav.offset().top + 300;
    //スクロールするたびに実行
    jQuery(window).scroll(function () {
       var winTop = jQuery(this).scrollTop();
       if (winTop >= navTop) {
           body.addClass('fixed');
       } else if (winTop <= navTop) {
           body.removeClass('fixed');
        }
   });
});

jQuery(document).ready(function($){
   $('body').append('<div id="scr"><div class="scr01"><a href="https://yoyaku-beauty.jp/reserve/contents/reserve_top.xhtml?CODE=1a730ff27b2631a1bf378ff20b5d8e80cf058d68b639914dbff94413dab973c6" onclick="gtag(\'event\', \'click\', {\'event_category\': \'WEB\',\'event_label\': \'web_side\',\'value\': \'1\'});" target="_blank"><div>Web予約はこちら</div></a></div><div class="scr02"><a href="https://line.me/R/ti/p/%40780wncms" onclick="gtag(\'event\', \'click\', {\'event_category\': \'LINE\',\'event_label\': \'line_side\',\'value\': \'1\'});" target="_blank"><div>LINE予約はこちら</div></a></div></div>');
});

</script>