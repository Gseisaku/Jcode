/*Script部分*/
$(function(){
        var selectedItem = $("ul.select_box li.selected").text()
        var selectBox = $("ul.select_box")
        var selectItems = $("ul.select_box li")
        var display = $(".display_selectedItem")

        display.text(selectedItem)
        $("li.selected").css("background","#fff");

        $("#sort_area dt").on("click", function() {
            $(this).toggleClass("ac");
            $(this).next();
            selectBox.slideToggle();
        });

        selectItems.on("click",function(){
            selectItems.removeClass("selected").css("background","#fff");
            $(this).addClass("selected").css("background","#fff");
            selectedItem = $("li.selected").text()
            selectBox.hide();
            display.text(selectedItem)
        })
})

/*html部分*/
/*
<div class="sort-area">
  <dl id="sort_area">
	<dt>並び替え</dt>
		<dd>
			<div class="sort-option">
			  <div class="display_selectedItem"></div>
			  <ul class="select_box" style="display:none;">
				<li class="selected"> - </li>
				<li><span class="ol sort" data-sort="tall:asc">身長が低い順</span></li>
				<li><span class="ol sort" data-sort="tall:desc">身長が高い順</span></li>
				<li><span class="ol sort" data-sort="bust:asc">バストが小さい順</span></li>
				<li><span class="ol sort" data-sort="bust:desc">バストが大きい順</span></li>
				<li><span class="ol sort" data-sort="default:asc">クリア</span></li>                
			  </ul>                    
			</div>    
		</dd>
  </dl>
  <dl id="filter_area">
	<dt>絞り込み</dt>
		<dd>
			<div class="filter-option">
			  <div class="display_selectedItem2"></div>
			  <ul class="select_box2" style="display:none;">
				<li class="selected2"> - </li>
				<li><span class="ol filter" data-filter=".プラチナ">プラチナ</span></li>
				<li><span class="ol filter" data-filter=".ゴールド">ゴールド</span></li>
				<li><span class="ol filter" data-filter=".スタンダード">スタンダード</span></li>
				<li><span class="ol filter" data-filter=".新人">新人</span></li>
				<li><span class="ol filter" data-filter=".パ○パン">パ○パン</span></li>
				<li><span class="ol filter" data-filter=".潮〇き">潮〇き</span></li>
				<li><span class="ol filter" data-filter=".金">金</span></li>
				<li><span class="ol filter" data-filter=".MP">MP</span></li>
				<li><span class="ol filter" data-filter="all">全て</span></li>
			  </ul>                    
			</div>    
		</dd>
  </dl>
</div>
*/