<h2 class="openBtn">明日のご予約状況</h2>
<div class="top_real_wrap inner">

	<p class="leadText">明日のご予約状況です。既に受付終了している妻たちです。</p>

	{$nextDate=$currentDate->add(1, Zend_Date::DAY)}
	<p class="realtime_info">
		{$nextDate->get(Zend_Date::MONTH_SHORT)}月{$nextDate->get(Zend_Date::DAY_SHORT)}日{$nextDate->get(Zend_Date::HOUR_SHORT)}:{$nextDate->get(Zend_Date::MINUTE)}
	</p>

	{$baseDate1=$helper->getTodayDate()}
	{$nextDate1=$baseDate1->add(1, Zend_Date::DAY)}
	{$merchant=$controller->getMerchantRow(321)}
	{$where=$controller->getCastWhere()}
	{$where->ascSort('scheduleMinTime')}
	{$where->ascSort('scheduleMaxTime')}
	{$where->addRestrictAttendance($nextDate1)}
	{$castNewRowSet_sort=$merchant->searchCastRowSet($where)}
	{$castCount1=0}

	<div class="top_realtime">
	{foreach $castNewRowSet_sort as $castRow}
		{if $castRow->stypeName == "受付終了"}
		  {$icon_photo=OFF}
		  {$icon_tsuma2=OFF}
		  {$icon_gold=OFF}
		  {$icon_silver=OFF}
		  {$icon_yellow=OFF}
		  {$icon_red=OFF}

		  {foreach from=","|explode:$castRow->getExtendProperty(5105) item=icon}
			{if $icon=="_8834"}
			  {$icon_photo=ON}
			{/if}
			{if $icon=="_8835"}
			  {$icon_tsuma2=ON}
			{/if}
			{if $icon=="_8838"}
			  {$icon_gold=ON}
			{/if}
			{if $icon=="_8839"}
			  {$icon_silver=ON}
			{/if}
			{if $icon=="_9612"}
			  {$icon_yellow=ON}
			{/if}
			{if $icon=="_9613"}
			  {$icon_red=ON}
			{/if}
		  {/foreach}
			<div class="realCell">
			  <a href="/profile/top/castCode/{$castRow->castCode}/">
				<p class="reservationStatus">{$castRow->stypeName}</p> 
				<div class="imageWrap">
				<div>                    
				{if $castRow->hasphoto(1)}
				  <img src="{$cdn1}/common/img/loading250.gif"  data-original="{$castRow->getPath(1,350)}" alt="{$castRow->getExtendProperty(5736)}" title="川崎堀之内ソープランド {$tName} {$castRow->castName}" class="photo">
				{else} 
				  <img src="{$cdn1}/common/img/dummy.gif" data-original="{$cdn1}/common/img/noimage.jpg" alt="{$castRow->getExtendProperty(5736)}" title="川崎堀之内ソープランド {$tName} {$castRow->castName}" class="photo">
				{/if}
				</div>
				</div>
				<p>{$castRow->castName}&#160;({$castRow->castAge})
				<br>T{$castRow->castSizeT}&#160;B{$castRow->castSizeB}({$castRow->castSizeC})W{$castRow->castSizeW}&#160;H{$castRow->castSizeH}
				<br>明日｜{$castRow->scheduleMinTime|date_format:"%H:%M"}-{$castRow->scheduleMaxTime|date_format:"%H:%M"}</p>
			  </a>
			</div>              

		  {$castCount1=$castCount1+1}
		{/if}
	{/foreach}

	</div>

	{if $castCount1==0}
		<p class="realtime_info">明日の出勤で、受付終了している妻たちはまだいません。</p>
	{/if}

	<span class="moreBtn">
		<a class="more" href="/cast/schedule/y/{$nextDate1->get(Zend_Date::YEAR)}/MM/{$nextDate1->get(Zend_Date::MONTH)}/dd/{$nextDate1->get(Zend_Date::DAY)}">
			明日の出勤表
		</a>
	</span>          

</div>