$(function() {
	if(window.matchMedia('(max-width: 960px)').matches){
        
        $('a[href^="/schedule/"]').attr({
          href: 'https://www.cityheaven.net/kanagawa/A1403/A140301/crystal_kyoto/attend/?of=y',
          rel: 'nofollow noopener noreferrer',
          target: '_blank'
        });
        
	}
});