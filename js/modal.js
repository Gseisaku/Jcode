$(window).on('load', function() {
    
      var $elem = $('.modalBlock');
      var replaceWidth = 750;

      function fadeMoveSwitch() {
        
        var windowWidth = parseInt($(window).width());
        
        $elem.each(function() {
        var $this = $(this);
          
          if(windowWidth >= replaceWidth) {
                $(window).scroll(function () {
                    $('.header_icon').css('display', 'block');
                    if ($(this).scrollTop() > 100) {
                        $this.fadeIn();
                    } else {
                        $this.fadeOut();
                    }
                });         
          } else {
            	$('.hnav').css('display', 'block');
            	$this.css('display', 'none');
          }
        });
      }
      fadeMoveSwitch();

});

$(function() {
	
  var $elem = $('.modalBlock');
  
  var replaceWidth = 960;
  var replaceIpadWidth = 750;
  
  function fadeMoveSwitch() {
    
    var windowWidth = parseInt($(window).width());

    $elem.each(function() {
    var $this = $(this);
      
      if(windowWidth >= replaceWidth) {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $this.fadeIn();
                } else {
                    $this.fadeOut();
                }
            });         
      } else {
        if(windowWidth >= replaceIpadWidth) {
        	$(window).on("scroll touchmove", function(){
        		$this.stop();
        		$this.css('display', 'none').delay(100).fadeIn('fast');
        	});
        } else {
        	$(window).on("load", function(){
        		$this.css('display', 'none');
        	});        
        }
      }
    });
  }
  fadeMoveSwitch();

});