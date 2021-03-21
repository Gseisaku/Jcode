<?php

require_once("./my_smarty.public.class.php");

class HeavenBlog{
	
	var $m_objMySmarty;
	var $m_strPhotoDir;
	
	function __construct(){
	
		// mySmartyインスタンスを取得
		$this->m_objMySmarty = new MySmartyPublic();
		
		// 設定情報の読込み
		$this->m_strPhotoDir = "./manager/". $this->m_objMySmarty->get_config_vars("photo_dir");
		
		// 業務ロジックを呼出す
		$this->action();
	}
	
	function action(){		
		
		// ページの表示
		$this->Show();
	}    
	
	function Show(){
    		
		// mySmartyインスタンスを取得
		$objMySmarty = $this->m_objMySmarty;
		
		// Userオブジェクトを作成
		$objUser = new User();
		
		if($_GET['from_url'] == 'girls'){
			$sort = " ORDER BY user_show_no, user_id ";
			$objUserList = $objUser->GetIdList1("", $sort);
		}
		elseif($_GET['from_url'] == 'main'){
			$where = " AND user_pickingup = '1' ";
			$sort = " ORDER BY user_id";
			$objUserList = $objUser->GetIdList1($where, $sort);
		}
		elseif($_GET['from_url'] == 'schedule'){
			$where = " AND dat_schedule.schedule_day = '". $_GET['base_day']. "'";
			$sort = " ORDER BY CASE schedule_in_time ".
								" WHEN '日の出' THEN '0' ".
								" WHEN 'LAST' THEN '91' ".
								" WHEN '出勤' THEN '92' ".
								" WHEN '要TEL' THEN '93' ".
								" ELSE schedule_in_time ".
							" END, ".
						" schedule_out_time, ".
						" mas_user.user_show_no, ".
						" mas_user.user_id ";
			$objUserList = $objUser->GetIdList2($where, $sort);
		}
		$count = $_GET['count'];
		$max = count($objUserList);
		if($count >= 1 && $count <= $max){
			$_GET['uid'] = $objUserList[$count - 1]['user_id'];
		}

		if($count == "" || $count == 0){
			$count = 0;
			for($i = 0; $i < $max; $i++){
				if($objUserList[$i]['user_id'] == $_GET['uid']){
					$count = $i + 1;
					break;
				}
			}
		}

		$back_no = $count - 1;
		if($back_no < 1)	$back_no = $max;

		$next_no = $count + 1;
		if($next_no > $max)	$next_no = 1;

		$objMySmarty->assign("BackNo", $back_no);
		$objMySmarty->assign("NextNo", $next_no);
		$objMySmarty->assign("TotalNo", $max);
		$objMySmarty->assign("FromUrl", $_GET['from_url']);
		$objMySmarty->assign("BaseDay", $_GET['base_day']);

		// 一覧画面から遷移してきた場合、該当IDのデータを取得
		if(isset($_GET['uid'])){
			$objUser->GetUser($_GET['uid']);
			
			// 女の子が存在しない場合、トップへ飛ばす
			if($objUser->GetDelFlag() == '1' or $objUser->GetDelFlag() == '' or $objUser->GetShowFlag() == '1'){
				header("Location: ./");
				exit;
			}
		}
		
        /*------------------------------------------*/
        // ブログデータ取得
        /*------------------------------------------*/

		// ブログ用配列
        $tmpBlogData = array();
        $BlogData    = array();

        // ブログ用変数と値の取得
        $BlogUrl = $objUser->GetBlogUrl();
		$BlogPhoto    = $objUser->GetYobi_2();
        $BlogPhotoFlg = $objUser->GetYobi_3();

		// 年月計算
        $Ym = date('Ym', strtotime('-1 month'));
        $m  = date('m');

        // ヘブンからデータ取得
        if($BlogUrl!="" && $_GET['hid']==""){
	        $BlogUrl = 'https://www.cityheaven.net/kanagawa/A1403/A140301/club_kyoto/girlid-' . $BlogUrl . '/diary/';
		}elseif($BlogUrl!="" && $_GET['hid']=="2"){
        	$BlogUrl = 'https://www.cityheaven.net/kanagawa/A1403/A140301/club_kyoto/girlid-' . $BlogUrl . '/diary/2/';
        }elseif($BlogUrl!="" && $_GET['hid']=="3"){
        	$BlogUrl = 'https://www.cityheaven.net/kanagawa/A1403/A140301/club_kyoto/girlid-' . $BlogUrl . '/diary/3/';
        }elseif($BlogUrl!="" && $_GET['hid']=="archive"){
        	$BlogUrl = 'https://www.cityheaven.net/kanagawa/A1403/A140301/club_kyoto/girlid-' . $BlogUrl . '/diary/date' .
            $Ym . '/';        
        }

        // 写メ画像を取得
        if($BlogPhoto!="" && $BlogPhotoFlg === "1"){
            $BlogPhotoData= 'https://syameru.com/img/' . $BlogPhoto . '/'  . $BlogPhoto . '.jpeg';
        }

		// cURLのセッションを初期化				
		$ch = curl_init();

        // URLとオプションを指定
        curl_setopt( $ch, CURLOPT_URL, $BlogUrl );         // 取得するURL
        curl_setopt( $ch, CURLOPT_HEADER, false );         // ヘッダー内容の出力有無
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );  // 取得した内容を文字列で返す
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false ); // サーバー証明書の検証
        curl_setopt( $ch, CURLOPT_FAILONERROR, true );     // エラー判定
        curl_setopt( $ch, CURLOPT_TIMEOUT, 30);            // 関数の実行にかけられる時間の最大値
        
        // cURL関数を実行
        $tmpBlogData = curl_exec( $ch );
        
        // 正規表現で対象のデータを抽出
        preg_match_all("/<span class=\"diary_time\">(.*?)<\/span>/", $tmpBlogData, $BlogDate);
        preg_match_all("/<h1 class=\"diary_title\">(.*?)<\/a>/s", $tmpBlogData, $BlogTitle);
        preg_match_all("/<p>(?!.*logoarea)(.*?)<\/p>/s", $tmpBlogData, $BlogText);    		

        // 日付と記事のタイトルを配列に格納
        $Blog = count($BlogDate[1]);
        for($i=0; $i<=$Blog; $i++){
            $BlogData[date][]  = date('Y-m-d H:i', strtotime($BlogDate[1][$i]));
            $BlogTitle[1][$i]  = strip_tags($BlogTitle[1][$i]);
            $BlogData[title][] = mb_convert_encoding($BlogTitle[1][$i], 'sjis', 'auto'); 
        }

		// cURLのセッションを終了
		curl_close( $ch );        

        // 特定のタグを除去
        $reg = '/<h2.*?>.*?<\/h2>/mis';
                
		// 記事の内容をエンコードして取得
        $blognum = count($BlogText[0]);
        for($i=0; $i<$blognum; $i++){
            $BlogText[0][$i]   = preg_replace($reg, '', $BlogText[0][$i]);
			$BlogData[text][]  = mb_convert_encoding($BlogText[0][$i], 'sjis', 'auto');
            $i++;
        }
        
        // 記事表示の開始
        $html.="<ul class='heavenBlogList'>";
        
		// 有効な記事の内容を表示
        $blogTxt = count($BlogData[text]);
		for($i=0; $i<$blogTxt; $i++){
           if(strpos($BlogData[text][$i], "このページの内容の一部は") === false){                
                $html.="<li><div class='heavenBlogTitle'>".$BlogData[title][$i]."<span>".$BlogData[date][$i]."</span></div>";
                
                $updDate = substr($BlogData[date][$i], 5, 2);             
				
                if($i>=1){
					$html.="<div class='heavenBlogText'>".$BlogData[text][$i]."</div>";    
                }else{
					$html.="<div class='heavenBlogText'>".$BlogData[text][$i]."</div>";    
                }
                
                $html.="</li>";
           }
        }
		
		$html.="</ul>";
		
        // もっと見るの処理
        if($blogTxt>=10 || $_GET['hid']=="" || $_GET['hid']=="2" || $_GET['hid']=="3" || $_GET['hid']=="archive"){
        	$html.="<div class='blogPageLink'>";
        }		
        
        // nextbackの処理
        if($blogTxt>=10 && $_GET['hid']==""){
        	$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls&hid=2'>もっと見る</a>";
             if($m==$updDate){	
                $html.="</div><div class='blogPageLink'><a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls&hid=archive'>先月の記事</a>";
             }
        }elseif($blogTxt>=10 && $_GET['hid']=="2"){
        	$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls&hid=3' class='harf'>もっと見る</a>
					<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls' class='harf'>前に戻る</a>";
        }elseif($blogTxt<10 && $_GET['hid']=="2"){
			$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls'>前に戻る</a>";        
        }elseif($_GET['hid']=="3"){
			$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls&hid=2'>前に戻る</a>";
        }elseif($_GET['hid']!="archive" && $m==$updDate){
        	$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls&hid=archive'>先月の記事</a>";
        }elseif($_GET['hid']=="archive"){
        	$html.="<a href='./profile_blog.html?uid=" . $_GET['uid']. "&from_url=girls'>今月の記事</a>";        
        }

        if($blogTxt>=10 || $_GET['hid']=="" || $_GET['hid']=="2" || $_GET['hid']=="3" || $_GET['hid']=="archive"){
        	$html.="</div>";
        }		

        echo $html;
        		
	}
}

new HeavenBlog();

?>