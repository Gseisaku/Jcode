
<main>
 <div class="container">
  <div class="pan"><img src="{$cdn}/images/image_84.png" class="pan_icon">トップ &gt; {block name=title}{/block}</div>
  
   <article>
     <section class="content content5">
        <h3 class="content_title">動画一覧<span>MOVIE</span></h3>

        {$where=$controller->getWhereSet()}
        {$where->in('videoCategory', ['ID'])}
        {$where->ascSort('videoCreate')}
        {$videoRowSet=$controller->searchVideoRowSet($where)}
        {$result=$videoRowSet->count()}
        {$videoList=[]}
        {$i=0}
        {$c=0}
        {foreach $videoRowSet as $videoRow}
           {$videoList[$i][]=$videoRow}
           {$c=$c+1}
           {if (($c % 3) == 0)}
               {$i=$i+1}
           {/if}
        {/foreach}
        {$n=0}
        {for $i = 0 to $result}
            {foreach $videoList[$i] as $videoRow}
                <div>
                    <p>{$i+1}ページ目</p>
                    <video id="pickUpMovie" poster="{$videoRow->getPath(1)}" muted controls>   
                        <source src="{$videoRow->mp4()}" type="video/mp4">
                    </video>
                    {if $videoRow->videoCast|count_characters > 0}
                      {if $helper->getCastRow($videoRow->videoCast)->isExists()}
                        {$castRow = $helper->getCastRow($videoRow->videoCast)}
                        <a href="/profile/top/castCode/{$castRow->castCode}"><p class="name">{$castRow->castName}({$castRow->castAge})</p></a>
                      {/if}
                    {/if}
                </div>
                {$n=$n+1}
                {if (($n % 3) == 0)}
                    <div style="margin-bottom:100px;"></div>
                {/if}                
            {/foreach}
        {/for}
     </section>
   </article>        
    
 </div>
</main>
{/block}