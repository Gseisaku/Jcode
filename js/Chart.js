<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.bundle.min.js"></script>

{if $castRow->getExtendProperty(5538)!=""}
<div><canvas id="pcChart"></canvas></div>
<form>
	<input type="hidden" id="chartval1" value="{$castRow->getExtendProperty(5538)}">
	<input type="hidden" id="chartval2" value="{$castRow->getExtendProperty(5539)}">
	<input type="hidden" id="chartval3" value="{$castRow->getExtendProperty(5540)}">
	<input type="hidden" id="chartval4" value="{$castRow->getExtendProperty(5541)}">
	<input type="hidden" id="chartval5" value="{$castRow->getExtendProperty(5542)}">
	<input type="hidden" id="chartval6" value="{$castRow->getExtendProperty(5543)}">
	<input type="hidden" id="chartval7" value="{$castRow->getExtendProperty(5544)}">
</form>
{/if}

{if $castRow->getExtendProperty(5538)!=""}
<div><canvas id="spChart"></canvas></div>
<form>
	<input type="hidden" id="chartval1" value="{$castRow->getExtendProperty(5538)}">
	<input type="hidden" id="chartval2" value="{$castRow->getExtendProperty(5539)}">
	<input type="hidden" id="chartval3" value="{$castRow->getExtendProperty(5540)}">
	<input type="hidden" id="chartval4" value="{$castRow->getExtendProperty(5541)}">
	<input type="hidden" id="chartval5" value="{$castRow->getExtendProperty(5542)}">
	<input type="hidden" id="chartval6" value="{$castRow->getExtendProperty(5543)}">
	<input type="hidden" id="chartval7" value="{$castRow->getExtendProperty(5544)}">
</form>
{/if}

<!-- ==================== レーダーチャート ==================== -->
<script>

    // 色の設定
    var colorSet = {
    	red: 'rgb(255, 99, 132)',
    	orange: 'rgb(255, 159, 64)',
    	yellow: 'rgb(255, 205, 86)',
    	green: 'rgb(75, 192, 192)',
    	blue: 'rgb(54, 162, 235)',
    	purple: 'rgb(153, 102, 255)',
    	grey: 'rgb(201, 203, 207)'
    };
    
    // 乱数生成(0～100)
    var rnd100 = function(){
    	return Math.round(Math.random() * 100);
    };
    
    // 色のRGB変換
    var color = Chart.helpers.color;
    
    // チャート項目を取得
    var cht1 = document.getElementById("chartval1").value;
    var cht2 = document.getElementById("chartval2").value;
    var cht3 = document.getElementById("chartval3").value;
    var cht4 = document.getElementById("chartval4").value;
    var cht5 = document.getElementById("chartval5").value;
    var cht6 = document.getElementById("chartval6").value;
    var cht7 = document.getElementById("chartval7").value;
    //console.log(cht1);
    
    /*
     * チャートの初期設定
     */
    var config = {
    	type: 'radar',
    	data: {
    		labels: ["愛嬌", "不倫再現度", "サービス", "癒し", "エロ度", "感度", "トーク力"],
    		datasets: [{
    			label: "評価",
    			backgroundColor: color(colorSet.red).alpha(0.5).rgbString(),
    			borderColor: colorSet.red,
    			pointBackgroundColor: colorSet.red,
    			data: [cht1, cht2, cht3, cht4, cht5, cht6, cht7]
    		},/*{
    			label: "摂取量",
    			backgroundColor: color(colorSet.blue).alpha(0.5).rgbString(),
    			borderColor: colorSet.blue,
    			pointBackgroundColor: colorSet.blue,
    			data: [100, 90, 80, 70, 60, 50, 40]
    		},*/]
    	},
    	options: {
    		animation:false,
    		showTooltips: false,
    		legend: { position: 'bottom' },
    		title: {
    			display: true,
    			fontSize:20,
    			fontColor:'#666',
    			text: 'レビュー'
    		},
    		scale: {
    			display: true,
    			pointLabels: {
    				fontSize: 15,
    				fontColor: colorSet.yellow
    			},
    			ticks: {
    				display: false,
    				fontSize: 12,
    				fontColor: colorSet.green,
    				min: 0,
    				max: 100,
    				beginAtZero: true
    			},
    			gridLines: {
    				display: true,
    				color: colorSet.yellow
    			}
    		}
    	}
    };
    
    /*
     * チャートの作成
     */
    if(window.matchMedia('(max-width: 960px)').matches){
        var ctx = document.getElementById('spChart').getContext('2d');
    } else {
        var ctx = document.getElementById('pcChart').getContext('2d');    
    }
    ctx.canvas.height = 280;
    var myRadar = new Chart(ctx, config);
    //var myRadar = new Chart($("#myChart"), config);

</script>
<!-- ==================== レーダーチャート ==================== -->