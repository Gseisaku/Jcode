    var ref = document.referrer;
    var refid = document.getElementById('refid');
    var pager = document.getElementsByClassName('pagerSet');

    if(ref.indexOf("girls") !== -1 || ref.indexOf("profile") !== -1){
        refid.innerHTML = ' &gt; <a href="/girls/" id="refid">在籍一覧</a>';
    }else if(ref.indexOf("schedule") !== -1){
        refid.innerHTML = ' &gt; <a href="/schedule/" id="refid">出勤表</a>';
        pager[0].style.display = "none";
    }else if(ref.indexOf("ranking") !== -1){
        refid.innerHTML = ' &gt; <a href="/ranking/" id="refid">ランキング</a>';
        pager[0].style.display = "none";
    }else if(ref.indexOf("gravure") !== -1){
        refid.innerHTML = ' &gt; <a href="/gravure/" id="refid">グラビア</a>';
        pager[0].style.display = "none";
    }else if(ref.indexOf("movie") !== -1){
        refid.innerHTML = ' &gt; <a href="/movie/" id="refid">動画</a>';
        pager[0].style.display = "none";
    }else if(ref.indexOf("blog") !== -1){
        refid.innerHTML = ' &gt; <a href="/blog/" id="refid">写メ日記</a>';
        pager[0].style.display = "none";
    }else{
        refid.remove();
        pager[0].style.display = "none";
    }