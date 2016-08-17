<?php
  header('Content-Type: text/html; charset=utf-8');
  require_once("./utils.php");
  $limit = 52;
  $page = 1;
  if(!empty($_GET["p"])){
  if(is_numeric($_GET["p"])) {
          $page = $_GET["p"];
      }
  }

  $con = connect_mysql();
  $maxid = get_record_count("maindata", $con);
  $str = select_all_and_echo("maindata", $limit, $limit*($page - 1), $con);
  mysql_close($con);

  $jsoned = json_encode($str);

  // ref: http://www.webopixel.net/php/494.html
  function pager($c, $t, $l) {
      $current_page = $c;     //現在のページ
      $total_rec = $t;    //総レコード数
      $page_rec = $l;   //１ページに表示するレコード
      $total_page = ceil($total_rec / $page_rec); //総ページ数
      $show_nav = 5;  //表示するナビゲーションの数
      $path = '?p=';   //パーマリンク
      //全てのページ数が表示するページ数より小さい場合、総ページを表示する数にする
      if ($total_page < $show_nav) {
          $show_nav = $total_page;
      }
      //トータルページ数が2以下か、現在のページが総ページより大きい場合表示しない
      if ($total_page <= 1 || $total_page < $current_page ) return;
      //総ページの半分
      $show_navh = floor($show_nav / 2);
      //現在のページをナビゲーションの中心にする
      $loop_start = $current_page - $show_navh;
      $loop_end = $current_page + $show_navh;
      //現在のページが両端だったら端にくるようにする
      if ($loop_start <= 0) {
          $loop_start  = 1;
          $loop_end = $show_nav;
      }
      if ($loop_end > $total_page) {
          $loop_start  = $total_page - $show_nav +1;
          $loop_end =  $total_page;
      }
      ?>
      <div id="pagenation">
          <ul>
              <?php
              //2ページ移行だったら「一番前へ」を表示
              if ( $current_page > 2) echo '<li class="prev"><a href="'. $path .'1">&laquo;</a></li>';
              //最初のページ以外だったら「前へ」を表示
              if ( $current_page > 1) echo '<li class="prev"><a href="'. $path . ($current_page-1).'">&lsaquo;</a></li>';
              for ($i=$loop_start; $i<=$loop_end; $i++) {
                  if ($i > 0 && $total_page >= $i) {
                      if($i == $current_page) echo '<li class="active">';
                      else echo '<li>';
                      echo '<a href="'. $path . $i.'">'.$i.'</a>';
                      echo '</li>';
                  }
              }
              //最後のページ以外だったら「次へ」を表示
              if ( $current_page < $total_page) echo '<li class="next"><a href="'. $path . ($current_page+1).'">&rsaquo;</a></li>';
              //最後から２ページ前だったら「一番最後へ」を表示
              if ( $current_page < $total_page - 1) echo '<li class="next"><a href="'. $path . $total_page.'">&raquo;</a></li>';
              ?>
          </ul>
      </div>
      <?php
  }
?>

<html>
    <head>
        <title>元カレ計算機 データビューア</title>
        <link rel="stylesheet" type="text/css" href="thumbnail.css">
        <link rel="shortcut icon" href="favicon.ico">
        <script src="./js-base64/base64.js"></script>
        <script src="./node_modules/jquery/dist/jquery.min.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-37231645-1', 'auto');
          ga('send', 'pageview');

        </script>
    </head>
    <body>
        <div id="app" align="left">
            <h2>元カレ一覧</h2>
            <span>(※古いデータは正しく計算されない場合があります)</span>
            <?php pager($page, $maxid, $limit); ?>
        </div>
    </body>
    <script type="text/javascript">
      var summonTypes = {
          "magna": "マグナ",
          "element": "属性",
          "zeus": "ゼウス系",
          "chara": "キャラ",
          "ranko": "蘭子",
          "odin": "属性攻+キャラ攻",
      }
      var elementTypes = {
          "fire": "火",
          "wind": "風",
          "earth": "土",
          "water": "水",
          "light": "光",
          "dark": "闇",
      }
      var summonElementTypes = {
          "fire": {"name": "火", "type": ["fire"]},
          "wind": {"name": "風", "type": ["wind"]},
          "earth": {"name": "土", "type": ["earth"]},
          "water": {"name": "水", "type": ["water"]},
          "light": {"name": "光", "type": ["light"]},
          "dark": {"name": "闇", "type": ["dark"]},
          "lightFire": {"name": "光/火", "type": ["light", "fire"]},
          "darkEarth": {"name": "闇/土", "type": ["dark", "earth"]},
          "windEarth": {"name": "風/土", "type": ["wind", "earth"]},
          "darkWater": {"name": "闇/水", "type": ["dark", "water"]},
          "earthLight": {"name": "土/光", "type": ["earth", "light"]},
          "windLight": {"name": "風/光", "type": ["wind", "light"]},
          "lightDark": {"name": "光/闇", "type": ["light", "dark"]},
          "darkFire": {"name": "闇/火", "type": ["dark", "fire"]},
          "waterLight": {"name": "水/光", "type": ["water", "light"]},
          "windFire": {"name": "風/火", "type": ["wind", "fire"]},
          "fireWater": {"name": "火/水", "type": ["fire", "water"]},
          "all": {"name": "全属性", "type": ["all"]},
      }
      var Jobs = {
          "beruse":       {"name": "ベルセルク",       "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 6000.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 10.0, "DaBonus": 26.5, "TaBonus": 5.5},
          "sage":         {"name": "セージ",           "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "suparuta":     {"name": "スパルタ",         "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1500.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "warlock":      {"name": "ウォーロック",     "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 2000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "alche":        {"name": "アルケミスト",     "favArm1": "dagger", "favArm2": "gun",    "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 100.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "ninja":        {"name": "忍者",             "favArm1": "katana", "favArm2": "fist",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 31.5, "TaBonus": 3.0},
          "samurai":      {"name": "侍",               "favArm1": "katana", "favArm2": "bow",    "type": "attack",  "atBonus": 3000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "kensei":       {"name": "剣聖",             "favArm1": "sword",  "favArm2": "katana", "type": "pecu",    "atBonus": 1500.0, "kouzinBonus": 0.0, "hpBonus": 300.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "gunsri":       {"name": "ガンスリ",         "favArm1": "gun",    "favArm2": "gun",    "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 11.5, "TaBonus": 3.0},
          "kenja":        {"name": "賢者",             "favArm1": "wand",   "favArm2": "wand",   "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 1000.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "assassin":     {"name": "アサシン",         "favArm1": "dagger", "favArm2": "dagger", "type": "pecu",    "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "weaponmaster": {"name": "ウェポンマスター", "favArm1": "sword",  "favArm2": "axe",    "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 23.0, "TaBonus": 5.0},
          "holyse":       {"name": "ホリセバー",       "favArm1": "sword",  "favArm2": "spear",  "type": "defense", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "bishop":       {"name": "ビショップ",       "favArm1": "wand",   "favArm2": "spear",  "type": "heal",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "hermit":       {"name": "ハーミット",       "favArm1": "wand",   "favArm2": "dagger", "type": "attack",  "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "hokuai":       {"name": "ホークアイ",       "favArm1": "dagger", "favArm2": "gun",    "type": "balance", "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "darkfe":       {"name": "ダクフェ",         "favArm1": "sword",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "oga":          {"name": "オーガ",           "favArm1": "fist",   "favArm2": "fist",   "type": "attack",  "atBonus": 2000.0, "kouzinBonus": 5.0, "hpBonus": 200.0, "shugoBonus": 0.0, "DaBonus": 60.0, "TaBonus": 5.0},
          "side":         {"name": "サイドワインダー", "favArm1": "bow",    "favArm2": "gun",    "type": "balance", "atBonus": 1000.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "superstar":    {"name": "スーパースター",   "favArm1": "music",  "favArm2": "dagger", "type": "pecu",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
          "valc":         {"name": "ヴァルキュリア",   "favArm1": "spear",  "favArm2": "axe",    "type": "attack",  "atBonus": 500.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 11.5, "TaBonus": 8.0},
          "none":         {"name": "なし",             "favArm1": "none",   "favArm2": "none",   "type": "none",    "atBonus": 0.0, "kouzinBonus": 0.0, "hpBonus": 0.0, "shugoBonus": 0.0, "DaBonus": 6.5, "TaBonus": 3.0},
      }
      // skill data
      var skilltypes = {
          "non": {name: "無し", type:"non", amount: "non"},
          "normalS": {name:"通常攻刃(小)", type:"normal", amount: "S"},
          "normalM": {name:"通常攻刃(中)", type:"normal", amount: "M"},
          "normalL": {name:"通常攻刃(大)", type:"normal", amount: "L"},
          "normalLL": {name:"通常攻刃II", type:"normal", amount: "LL"},
          "normalBoukunL": {name:"通常暴君", type:"normalBoukun", amount: "LL"},
          "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
          "normalHaisuiM": {name:"通常背水(中)", type:"normalHaisui", amount: "M"},
          "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
          "normalKonshinL": {name:"通常渾身(大)", type:"normalKonshin", amount: "L"},
          "normalNiteS": {name:"通常二手(小)", type:"normalNite", amount: "S"},
          "normalNiteM": {name:"通常二手(中)", type:"normalNite", amount: "M"},
          "normalNiteL": {name:"通常二手(大)", type:"normalNite", amount: "L"},
          "normalSanteL": {name:"通常三手(大)", type:"normalSante", amount: "L"},
          "normalKatsumiM": {name:"通常克己(中)", type:"normalKatsumi", amount: "M"},
          "normalKamui": {name:"通常神威", type:"normalKamui", amount: "S"},
          "magnaM": {name: "マグナ攻刃", type:"magna", amount:"M"},
          "magnaL": {name: "マグナ攻刃II", type:"magna", amount:"L"},
          "magnaHaisuiS": {name:"マグナ背水(小)", type:"magnaHaisui", amount: "S"},
          "magnaHaisuiM": {name:"マグナ背水(中)", type:"magnaHaisui", amount: "M"},
          "magnaHaisuiL": {name:"マグナ背水(大)", type:"magnaHaisui", amount: "L"},
          "magnaSanteL": {name:"マグナ三手(大)", type:"magnaSante", amount: "L"},
          "magnaKatsumiM": {name:"マグナ克己(中)", type:"magnaKatsumi", amount: "M"},
          "magnaKamui": {name:"マグナ神威", type:"magnaKamui", amount: "S"},
          "magnaBoukun": {name:"マグナ暴君", type:"magnaBoukun", amount: "L"},
          "unknownM": {name:"アンノウンI", type:"unknown", amount: "M"},
          "unknownL": {name:"アンノウンII", type:"unknown", amount: "L"},
          "strengthHaisuiM": {name:"ストレングス背水(中)", type:"unknownOtherHaisui", amount: "M"},
          "strengthS": {name:"ストレングス等(小)", type:"unknownOther", amount: "S"},
          "strengthM": {name:"ストレングス等(中)", type:"unknownOther", amount: "M"},
          "strengthL": {name:"ストレングス等(大)", type:"unknownOther", amount: "L"},
          "normalHPS": {name:"通常守護(小)", type:"normalHP", amount: "S"},
          "normalHPM": {name:"通常守護(中)", type:"normalHP", amount: "M"},
          "normalHPL": {name:"通常守護(大)", type:"normalHP", amount: "L"},
          "magnaHPS": {name:"マグナ守護(小)", type:"magnaHP", amount: "S"},
          "magnaHPM": {name:"マグナ守護(中)", type:"magnaHP", amount: "M"},
          "magnaHPL": {name:"マグナ守護(大)", type:"magnaHP", amount: "L"},
          "magnaHPLL": {name:"マグナ守護II", type:"magnaHP", amount: "LL"},
          "unknownHPS": {name:"アンノウンVIT(小)", type:"unknownHP", amount: "S"},
          "unknownHPM": {name:"アンノウンVIT(中)", type:"unknownHP", amount: "M"},
          "unknownHPL": {name:"アンノウンVIT(大)", type:"unknownHP", amount: "L"},
          "unknownOtherBoukunL": {name:"ミフネ流・極意", type:"unknownOtherBoukun", amount: "L"},
          "unknownOtherNiteS": {name:"ミフネ流・双星", type:"unknownOtherNite", amount: "S"},
          "gurenJuin": {name:"紅蓮の呪印・弐", type:"gurenJuin", amount: "L"},
          "normalCriticalS": {name:"通常技巧(小)", type:"normalCritical", amount: "S"},
          "normalCriticalM": {name:"通常技巧(中)", type:"normalCritical", amount: "M"},
          "normalCriticalL": {name:"通常技巧(大)", type:"normalCritical", amount: "L"},
          "magnaCriticalS": {name:"マグナ技巧(小)", type:"magnaCritical", amount: "S"},
          "magnaCriticalM": {name:"マグナ技巧(中)", type:"magnaCritical", amount: "M"},
          "magnaCriticalL": {name:"マグナ技巧(大)", type:"magnaCritical", amount: "L"},
          "normalSetsuna": {name:"通常刹那", type:"normalSetsuna", amount: "M"},
          "magnaSetsuna": {name:"マグナ刹那", type:"magnaSetsuna", amount: "M"},
          "cosmosAT": {name:"コスモスAT", type:"cosmos", amount: "L"},
          "cosmosDF": {name:"コスモスDF", type:"cosmos", amount: "L"},
          "cosmosBL": {name:"コスモスBL", type:"cosmos", amount: "L"},
          "bahaAT-dagger": {name:"バハ攻-短剣", type:"bahaAT", amount: "L"},
          "bahaAT-axe": {name:"バハ攻-斧", type:"bahaAT", amount: "L"},
          "bahaAT-spear": {name:"バハ攻-槍", type:"bahaAT", amount: "L"},
          "bahaAT-gun": {name:"バハ攻-銃", type:"bahaAT", amount: "L"},
          "bahaATHP-sword": {name:"バハ攻HP-剣", type:"bahaATHP", amount: "M"},
          "bahaATHP-wand": {name:"バハ攻HP-杖", type:"bahaATHP", amount: "M"},
          "bahaHP-fist": {name:"バハHP-格闘", type:"bahaHP", amount: "L"},
          "bahaHP-katana": {name:"バハHP-刀", type:"bahaHP", amount: "L"},
          "bahaHP-bow": {name:"バハHP-弓", type:"bahaHP", amount: "L"},
          "bahaHP-music": {name:"バハHP-楽器", type:"bahaHP", amount: "L"},
          "bahaFUATHP-dagger": {name:"バハフツ-短剣", type:"bahaFUATHP", amount: "LL"},
          "bahaFUATHP-axe": {name:"バハフツ-斧", type:"bahaFUATHP", amount: "LL"},
          "bahaFUATHP-spear": {name:"バハフツ-槍", type:"bahaFUATHP", amount: "LL"},
          "bahaFUATHP-gun": {name:"バハフツ-銃", type:"bahaFUATHP", amount: "LL"},
          "bahaFUATHP-sword": {name:"バハフツ-剣", type:"bahaFUATHP", amount: "LL"},
          "bahaFUATHP-wand": {name:"バハフツ-杖", type:"bahaFUATHP", amount: "LL"},
          "bahaFUHP-fist": {name:"バハフツHP-格闘", type:"bahaFUHP", amount: "L"},
          "bahaFUHP-katana": {name:"バハフツHP-刀", type:"bahaFUHP", amount: "L"},
          "bahaFUHP-bow": {name:"バハフツHP-弓", type:"bahaFUHP", amount: "L"},
          "bahaFUHP-music": {name:"バハフツHP-楽器", type:"bahaFUHP", amount: "L"},
      };
      var armtypes = {
          "dagger": "短剣",
          "sword": "剣",
          "spear": "槍",
          "axe": "斧",
          "wand": "杖",
          "gun": "銃",
          "fist": "格闘",
          "bow": "弓",
          "music": "楽器",
          "katana": "刀",
          "none": "無し",
      };

      var objs = JSON.parse('<?php print_r($jsoned); ?>');
      var header = "<tr><th>ランク</th><th>ジョブ</th><th>属性</th><th>自分の召喚石</th><th>フレ召喚石</th></tr>"
      var armheader = "<tr><th>武器名</th><th>種類</th><th>スキル</th><th>本数最小</th><th>本数最大</th></tr>"

      for(var i = 0; i < objs.length; i++){
          var obj = objs[i];
          try {
              var data = JSON.parse(Base64.decode(obj.datachar))
          } catch(e) {
              console.log(e)
              continue;
          }

          var prof = data.profile; var armlist = data.armlist; var summon = data.summon; var chara = data.chara;
          // console.log(prof)
          $("<div/>", {
              "class": "wrapper",
              "id": obj.id,
          }).appendTo("#app");

          $("<div/>", {
              "class": "thumb",
              "id": obj.id,
          }).appendTo("#" + obj.id + ".wrapper");

          $("#" + obj.id + ".thumb").append("<h3><a href='http://hsimyu.net/motocal/?id=" + obj.id + "' target='_blank'>ID:" + obj.id + ", データ名: " + data.dataName + "</a></h3>");
          $("#" + obj.id + ".thumb").append("<div align='right'>作成日時:" + obj.created + "</div>");

          $("<table/>", {
              "class": "thumb-table-prof",
              "id": obj.id,
          }).appendTo("#" + obj.id + ".thumb");
          $("#" + obj.id + ".thumb-table-prof").append(header);

          var content = "";
          content += "<tr>";
          if(prof != null && prof != undefined && prof.length != 0) {
              content += "<td rowspan=" + summon.length + ">" + prof.rank + "</td>"
              content += "<td rowspan=" + summon.length + ">"
              if(prof.job in Jobs){
                  content += Jobs[prof.job].name
              }
              content += "</td>"
              content += "<td rowspan=" + summon.length + ">" + elementTypes[prof.element] + "</td>"
          }
          for(var j = 0; j < summon.length; j++){
              if(summon[j] != null && summon[j] != undefined) {
                  if(j > 1) content += "<tr>"
                  content += "<td>"
                  if(summon[j].selfElement in summonElementTypes) {
                      content += summonElementTypes[summon[j].selfElement].name + summonTypes[summon[j].selfSummonType] + summon[j].selfSummonAmount + "</td>"
                  }
                  content += "</td><td>"
                  if(summon[j].friendElement in summonElementTypes) {
                      content += summonElementTypes[summon[j].friendElement].name + summonTypes[summon[j].friendSummonType] + summon[j].friendSummonAmount + "</td>"
                  }
                  content += "</td></tr>"
              }
          }
          $("#" + obj.id + ".thumb-table-prof").append(content);

          $("<table/>", {
              "class": "thumb-table-arm",
              "id": obj.id,
          }).appendTo("#" + obj.id + ".thumb");
          $("#" + obj.id + ".thumb-table-arm").append(armheader);

          var armcontent = "";
          for(var j = 0; j < armlist.length; j++){
              if(armlist[j] != null && armlist[j] != undefined) {
                  if(armlist[j].considerNumberMax > 0 && armlist[j].name != ""){
                      armcontent += "<tr>"
                      armcontent += "<td>" + armlist[j].name + "</td>"
                      armcontent += "<td>" + armtypes[armlist[j].armType] + "</td>"
                      armcontent += "<td>"
                      if(armlist[j].skill1 in skilltypes) {
                          armcontent += skilltypes[armlist[j].skill1].name + "<br/>"
                      }
                      if(armlist[j].skill2 in skilltypes) {
                          armcontent += skilltypes[armlist[j].skill2].name
                      }
                      armcontent += "</td>"
                      armcontent += "<td>" + armlist[j].considerNumberMin + "本</td>"
                      armcontent += "<td>" + armlist[j].considerNumberMax + "本</td>"
                      armcontent += "</tr>"
                  }
              }
          }
          $("#" + obj.id + ".thumb-table-arm").append(armcontent);

      }
    </script>
</html>
