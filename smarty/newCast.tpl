   {$newCastlist=[]}
   {$newCast_cnt=0}
   {$newcast=$helper->getNewFaceCastRowSet()}
   {foreach $newcast as $casttempRow}
      {if $casttempRow->castEntry|count_characters > 0}
        {*<!--以下の処理はコメントアウトしているが必要-->*}
		<!--{$dateObj=$helper->getTodayDate()}
        {$dateObj->set($casttempRow->castEntry, Zend_Date::DATES)}
        {$dateObj->add(30, Zend_Date::DAY)}-->
        {if $dateObj->isLater($helper->getTodayDate())}
            {$newCastlist[]=$casttempRow}
            {$newCast_cnt=$newCast_cnt+1}
        {/if}
      {/if}
   {/foreach}
   {if $newCast_cnt > 0}
       <article>
         <section class="content content5">
         <h3 class="content_title">新入生<span>NEW FACE</span></h3>
         <div class="content_area flex flex_around">
          <ul class="list">
          {foreach $newCastlist as $castRow}
            <li>
            <a href="/profile/top/castCode/{$castRow->castCode}/">
               <p class="catch">{if $castRow->getExtendProperty(ID)|count_characters >0}{$castRow->getExtendProperty(ID)|truncate:20}{else}コメント準備中{/if}</p>
               <div class="imageWrap">
                   <div class="newOn">NEW</div>
                   {if $castRow->hasphoto(1)}
                        <img src="{$castRow->getPath(1)}" width="300" height="400" alt="{$shopname} {$castRow->castName}" title="{$shopname} {$castRow->castName}">
                   {else} 
                        <img src="{$cdn}/images/noimage.jpg" width="300" height="400" alt="{$shopname} {$castRow->castName}" title="{$shopname} {$castRow->castName}">
                   {/if}
                   {$next=$castRow->nextScheduleRow()}
                   {if $castRow->isAttend()}
                       {if $castRow->scheduleComment|count_characters >0}
                            <p class="time">{$castRow->scheduleComment}</p>
                       {else}
                            <p class="time">本日&emsp;{$castRow->scheduleMinTime|date_format:"%H:%M"}-{$castRow->scheduleMaxTime|date_format:"%H:%M"}</p>
                       {/if}
                   {else}
                        {if $next->isExists()}
                            <p class="time">次回出勤&emsp;{$next->scheduleMinTime|date_format:"%m月%d日(%a)"|replace:'Sun':'日'|replace:'Mon':'月'|replace:'Tue':'火'|replace:'Wed':'水'|replace:'Thu':'木'|replace:'Fri':'金'|replace:'Sat':'土'}</p>
                        {/if}
                   {/if}
               </div>
               <p class="name">{$castRow->castName}（{$castRow->castAge}）</p>
               <p class="profile">T{$castRow->castSizeT}&nbsp;B{$castRow->castSizeB}({$castRow->castSizeC})W{$castRow->castSizeW}&nbsp;H{$castRow->castSizeH}</p>
               <div class="iconArea">
                    {if $castRow->isAmature()}<span class="iconOn">未経験</span>{/if}
                    {if $castRow->getExtendProperty(ID)|count_characters >0}<span class="iconOn">写メ日記</span>{/if}
               </div>
            </a>
            </li>
          {/foreach}
          </ul>
         </div>
         </section>
       </article>
   {/if}