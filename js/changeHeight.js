$(function() {

	var $slide = $('#slider2');
	slideHeight = $slide.outerHeight();    	
	var $nav = $('#header_group');
	navHeight = $nav.outerHeight();
	adjustHeight = slideHeight + navHeight;

	$('body').css('background-position-y', adjustHeight + 'px');

});