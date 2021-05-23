    $('.sort1 span').on('click', function(){
            $('#acMenu1').css('display', 'none');
    	    $('#acMenu2').css('display', 'block');
            $('#acMenu3').css('display', 'none');
            $('#acMenu4').css('display', 'none'); 
    });

    $('.sort2 span').on('click', function(){
            $('#acMenu1').css('display', 'none');
            $('#acMenu2').css('display', 'none');
    	    $('#acMenu3').css('display', 'block');
            $('#acMenu4').css('display', 'none');
    });    
    
    $('.sort3 span').on('click', function(){
            $('#acMenu1').css('display', 'none');
            $('#acMenu2').css('display', 'none');
            $('#acMenu3').css('display', 'none');
    	    $('#acMenu4').css('display', 'block');
    });

    $('.sort4 span').on('click', function(){
            $('#acMenu1').css('display', 'block');
            $('#acMenu2').css('display', 'none');
            $('#acMenu3').css('display', 'none');
    	    $('#acMenu4').css('display', 'none');
    });    

    $('li:last-child span').on('click', function(){
            $('#acMenu1').css('display', 'block');
            $('#acMenu2').css('display', 'none');
            $('#acMenu3').css('display', 'none');
    	    $('#acMenu4').css('display', 'none');
    });  