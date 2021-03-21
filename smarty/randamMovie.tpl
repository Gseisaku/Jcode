    <div id="mainTopVideo">
      <div>
        {$where=$controller->getWhereSet()}
        {$where->in('videoCategory', ['ID'])}
        {$where->ascSort('videoCreate')}
        {$videoRowSet=$controller->searchVideoRowSet($where)}
        {$rand=$videoRowSet->count()}
        {if $rand > 0}
            {assign var=no value=1|rand:$rand}
            {foreach $videoRowSet as $videoRow}
                {if $videoRow@iteration==$no}
                    <video poster="{$videoRow->getPath(1)}" autoplay muted loop playsinline>
                        <source src="{$videoRow->mp4()}" type="video/mp4">
                    </video>
                    {break}
                {/if}
            {/foreach}
        {/if}
      </div>
    </div>		