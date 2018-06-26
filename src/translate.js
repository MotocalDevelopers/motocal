var React = require('react');

var multiLangData = {
    "motocal": {
        "en": "motocal / Granblue Fantasy ATK Calculator",
        "ja": "元カレ計算機(グラブル攻撃力計算機)",
    },
    "応援テキスト": {
        "en": "Kanpa to Me",
        "ja": "製作者を応援する",
    },
    "メイン装備yes": {
        "en": "main",
        "ja": "メイン武器である",
    },
    "メイン装備no": {
        "en": "not main",
        "ja": "メイン武器ではない",
    },
    "グラフ": {
        "en": "Graph",
        "ja": "グラフ",
    },
    "使い方": {
        "en": "Manual",
        "ja": "使い方",
    },
    "ジータ": {
        "en": "Player",
        "ja": "ジータ",
    },
    "召喚石": {
        "en": "Summon",
        "ja": "召喚石",
    },
    "キャラ": {
        "en": "Chara",
        "ja": "キャラ",
    },
    "武器": {
        "en": "Weapon",
        "ja": "武器",
    },
    "保存": {
        "en": "Save",
        "ja": "保存",
    },
    "データ名": {
        "en": "Data Name",
        "ja": "データ名",
    },
    "ブラウザデータリスト": {
        "en": "Browser Data List",
        "ja": "ブラウザに保存されたデータ",
    },
    "ブラウザデータ読込": {
        "en": "Load",
        "ja": "読込",
    },
    "ブラウザに保存": {
        "en": "Save to Browser",
        "ja": "保存",
    },
    "データ移行": {
        "en": "Export/Import",
        "ja": "データ移行",
    },
    "移行データ出力": {
        "en": "Export",
        "ja": "データ出力",
    },
    "移行データ入力": {
        "en": "Import",
        "ja": "データ入力",
    },
    "ダウンロード": {
        "en": "Download",
        "ja": "ダウンロード",
    },
    "アップロード": {
        "en": "Upload",
        "ja": "アップロード",
    },
    "なし": {
        "en": "No job",
        "ja": "なし",
    },
    "無し": {
        "en": "none",
        "ja": "無し",
    },
    "火": {
        "en": "Fire",
        "ja": "火",
    },
    "風": {
        "en": "Wind",
        "ja": "風",
    },
    "土": {
        "en": "Earth",
        "ja": "土",
    },
    "水": {
        "en": "Water",
        "ja": "水",
    },
    "光": {
        "en": "Light",
        "ja": "光",
    },
    "闇": {
        "en": "Dark",
        "ja": "闇",
    },
    "光/火": {
        "en": "Light/Fire",
        "ja": "光/火",
    },
    "光/闇": {
        "en": "Light/Dark",
        "ja": "光/闇",
    },
    "闇/土": {
        "en": "Dark/Earth",
        "ja": "闇/土",
    },
    "闇/水": {
        "en": "Dark/Water",
        "ja": "闇/水",
    },
    "闇/火": {
        "en": "Dark/Fire",
        "ja": "闇/火",
    },
    "火/水": {
        "en": "Fire/Water",
        "ja": "火/水",
    },
    "水/光": {
        "en": "Water/Light",
        "ja": "水/光",
    },
    "風/土": {
        "en": "Wind/Earth",
        "ja": "風/土",
    },
    "風/光": {
        "en": "Wind/Light",
        "ja": "風/光",
    },
    "風/火": {
        "en": "Wind/Fire",
        "ja": "風/火",
    },
    "土/光": {
        "en": "Earth/Light",
        "ja": "土/光",
    },
    "全属性": {
        "en": "All",
        "ja": "全属性",
    },
    "無": {
        "en": "Non",
        "ja": "無",
    },
    "無（技巧あり）": {
        "en": "Non (but Crit.)",
        "ja": "無（技巧あり）",
    },
    "バフ": {
        "en": "Buff",
        "ja": "バフ",
    },
    "通常バフ": {
        "en": "Normal Buff",
        "ja": "通常バフ",
    },
    "通常バフ説明": {
        "en": "Normal Buff",
        "ja": "通常枠のバフ",
    },
    "属性バフ": {
        "en": "Element Buff",
        "ja": "属性バフ",
    },
    "属性バフ説明": {
        "en": "Element Buff",
        "ja": "属性枠のバフ",
    },
    "その他バフ": {
        "en": "Other Buff",
        "ja": "その他バフ",
    },
    "その他バフ説明": {
        "en": "Other Buff",
        "ja": "別枠乗算のバフ",
    },
    "その他バフ2": {
        "en": "Other Buff II",
        "ja": "その他バフ2",
    },
    "その他バフ2説明": {
        "en": "Other Buff II",
        "ja": "別枠乗算のバフ(もし別枠バフが2つ以上ある場合用)",
    },
    "HPバフ": {
        "en": "HP Buff",
        "ja": "HPバフ",
    },
    "HPバフ説明": {
        "en": "",
        "ja": "HP上昇のバフ(古戦場スタックとかの計算用)",
    },
    "DAバフ": {
        "en": "Double Attack Buff",
        "ja": "DAバフ",
    },
    "DAバフ説明": {
        "en": "Double Attack Buff for Party. The value will be added to Character's base double attack ratio.",
        "ja": "DA率が上がります。各キャラの基礎DA率に加算されます。",
    },
    "TAバフ": {
        "en": "Triple Attack Buff",
        "ja": "TAバフ",
    },
    "TAバフ説明": {
        "en": "Triple Attack Buff for Party. The value will be added to Character's base triple attack ratio.",
        "ja": "TA率が上がります。各キャラの基礎TA率に加算されます。",
    },
    "追加ダメージ": {
        "en": "Additional Damage ",
        "ja": "追加ダメージ",
    },
    "追加ダメージバフ": {
        "en": "Additional Damage Buff",
        "ja": "追加ダメージバフ",
    },
    "追加ダメージバフ説明": {
        "en": "Additional damage will be added to \"Expected Turn Damage\".",
        "ja": "追加ダメージが発生するとしてダメージを上乗せします。予想ターン毎ダメージの算出に使用されます。",
    },
    "与ダメージ上昇": {
        "en": "Damage UP ",
        "ja": "与ダメージ上昇",
    },
    "個別バフ": {
        "en": "Personal Buff",
        "ja": "個別バフ",
    },
    "残HP割合": {
        "en": "Remain HP Ratio",
        "ja": "残りHP割合",
    },
    "残りHP": {
        "en": "Remain HP",
        "ja": "残りHP",
    },
    "残HP割合説明(ジータのみ)": {
        "en": "Remain HP Ratio of the Player. Use \"Remain HP Ratio\" form in Buff for Party if you want to set the remain HP ratio of all member.",
        "ja": "ジータさんの残りHP割合です。パーティ全体の残りHP割合を一括で指定したい場合は、\"パーティ全体への効果\"側で\”残HP割合\"を指定して下さい。",
    },
    "残HP割合説明": {
        "en": "Remain HP Ratio of all members. (If chara's HP ratio is inputted, lower value is adopted for calculation.)",
        "ja": "パーティ全体の残りHP割合です。(キャラ個別の値が入力されている場合、より低い方を採用します)",
    },
    "奥義ゲージ上昇量": {
        "en": "Ougi Gage Buff",
        "ja": "奥義ゲージ上昇量",
    },
    "奥義ゲージ上昇率アップ": {
        "en": "Ougi Gage Buff",
        "ja": "奥義ゲージ上昇量アップ",
    },
    "奥義ゲージ上昇率アップ説明": {
        "en": "Used on the expected turn damage calculation.",
        "ja": "奥義ゲージ上昇量に影響します。予想ターン毎ダメージの算出に使用されます。",
    },
    "奥義ダメージアップ": {
        "en": "Ougi Damage UP",
        "ja": "奥義ダメージUP",
    },
    "ダメージ上限アップ": {
        "en": "Damage Limit Buff",
        "ja": "ダメージ上限アップ",
    },
    "ダメージ上限アップ説明": {
        "en": "It is used to calc the normal attack damage.",
        "ja": "通常攻撃ダメージの算出に使用されます。",
    },
    "奥義ダメージ上限アップ": {
        "en": "Ougi Damage Limit Buff",
        "ja": "奥義ダメージ上限UP",
    },
    "奥義ダメージ上限アップ説明": {
        "en": "It is used to calc the Ougi damage.",
        "ja": "奥義ダメージの算出に使用されます。",
    },
    "ゼニスパーク": {
        "en": "Zenith Perks",
        "ja": "ゼニスパーク",
    },
    "味方全体のHP": {
        "en": "HP Bonus for All member",
        "ja": "味方HPゼニス",
    },
    "Advanced": {
        "en": "Advanced Settings",
        "ja": "より細かい設定",
    },
    "Advanced 説明": {
        "en": "",
        "ja": "もっともっと詳しく計算したい方向けの項目です。",
    },
    "敵防御固有値": {
        "en": "Enemy's defense",
        "ja": "敵防御固有値",
    },
    "敵防御固有値説明": {
        "en": "Select enemy's defense value.\nIt affects damage calculations.",
        "ja": "想定される敵の防御固有値を設定します。\n単攻撃ダメージ、奥義ダメージ、\n 予想ターン毎ダメージの計算に影響します。\n (単攻撃ダメージに減衰補正がかかる(44万超え) \n ような攻撃力でない限り、編成の順位自体は変化しないと思われます。)",
    },
    "ジータさん基礎DA率説明": {
        "en": "Input base double attack ratio of player.\nIt will be automatically changed when \"Job\" is changed.",
        "ja": "ジータさんの基礎DA率を設定します。\nジョブを変更すると自動的に切り替わります。",
    },
    "奥義倍率": {
        "en": "Ougi Ratio",
        "ja": "奥義倍率",
    },
    "ジータさん基礎TA率説明": {
        "en": "Input base double attack ratio of player.\nIt will be automatically changed when \"Job\" is changed.",
        "ja": "ジータさんの基礎TA率を設定します。\nジョブを変更すると自動的に切り替わります。",
    },
    "ジータさん奥義倍率説明": {
        "en": "Input ougi ratio of player.\nIt affects calculation of Ougi Damage and Expected Turn Damage.",
        "ja": "ジータさんの奥義倍率を設定します。\n奥義ダメージ、予想ターン毎ダメージの計算に影響します。",
    },
    "確保HP": {
        "en": "Minimum Player HP",
        "ja": "確保したい\nジータさんHP",
    },
    "確保HP説明": {
        "en": "Input minimum HP of player.\nWeapon arrangement which HP gets lower than this value will be omitted.",
        "ja": "暴君・守護など混みの最終HPの最低ラインを設定できます。\nこれを下回った編成は表示されません。\n(初期値は0です) ジータさんのHPベースです。",
    },
    "プロフィールタイトル": {
        "en": "Player Infomation",
        "ja": "ジータさん情報 (*: 推奨入力項目)",
    },
    "ランク": {
        "en": "Rank",
        "ja": "ランク",
    },
    "ランク説明": {
        "en": "Base ATK and HP are based on this value.",
        "ja": "基礎攻撃力、基礎HPなどはランクに従って自動で計算されます",
    },
    "ジョブ": {
        "en": "Job",
        "ja": "ジョブ",
    },
    "ジョブ説明": {
        "en": "Job bonuses and Favorite arm bonuses are automatically inclueded in calculation. Select \"none\" if you want no bonuses and favorite arms.",
        "ja": "ジョブごとのボーナス等は自動で反映されます。得意武器補正などを反映したくない場合\"なし\"を選択して下さい。",
    },
    "ゼニス攻撃力": {
        "en": "Zenith Park ATK ",
        "ja": "ゼニス攻撃力",
    },
    "ゼニスHP": {
        "en": "Zenith Park HP ",
        "ja": "ゼニスHP",
    },
    "マスボATK": {
        "en": "Master Bonus ATK ",
        "ja": "マスターボーナスATK",
    },
    "マスボATK説明": {
        "en": "The value of Job Master bonus \"ATK+○○%\"",
        "ja": "ジョブマスターボーナスの\"攻撃力+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
    },
    "マスボHP": {
        "en": "Master Bonus HP",
        "ja": "マスターボーナスHP",
    },
    "マスボHP説明": {
        "en": "The value of Job Master bonus \"HP+○○%\"",
        "ja": "ジョブマスターボーナスの\"HP+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
    },
    "ジータさん属性": {
        "en": "Player's Element",
        "ja": "ジータさん属性",
    },
    "敵の属性": {
        "en": "Enemy's Element",
        "ja": "敵の属性",
    },
    "敵の属性説明": {
        "en": "Element Correlation is automatically judged.",
        "ja": "有利/非有利/不利は、敵の属性に従って自動で判定されます。",
    },
    "武器ゼニス1": {
        "en": "Weapon I ",
        "ja": "武器ゼニスI",
    },
    "武器ゼニス2": {
        "en": "Weapon II ",
        "ja": "武器ゼニスII",
    },
    "武器ゼニス説明": {
        "en": "",
        "ja": "得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。",
    },
    "攻撃ボーナス": {
        "en": "Attack Bonus",
        "ja": "攻撃ボーナス",
    },
    "HPボーナス": {
        "en": "HP Bonus",
        "ja": "HPボーナス",
    },
    "攻刃ボーナス": {
        "en": "Normal Buff Bonus",
        "ja": "攻刃ボーナス",
    },
    "守護ボーナス": {
        "en": "Health Bonus",
        "ja": "守護ボーナス",
    },
    "基礎DA率": {
        "en": "Base DA Ratio",
        "ja": "基礎DA率",
    },
    "基礎TA率": {
        "en": "Base TA Ratio",
        "ja": "基礎TA率",
    },
    "パーティバフタイトル": {
        "en": "Buff for Party",
        "ja": "パーティ全体へのバフ等 (%表記)",
    },
    "パーティバフ説明": {
        "en": "Input buffs for a party.",
        "ja": "パーティメンバ全体にかかるバフ等の情報を入力してください",
    },
    "保存済みリスト名説明": {
        "en": "Input the name of the saved grid.",
        "ja": "保存した編成の名前を設定できます",
    },
    "チェイン数": {
        "en": "Chain Number",
        "ja": "チェイン数",
    },
    "チェイン数説明": {
        "en": "Input the number of Ougi Chain. (1~4)",
        "ja": "チェイン数を指定してください（チェインバーストボーナスの係数が変化します）\n チェイン数1 => 係数0.0, 2 => 0.25, 3 => 0.33.., 4 => 0.5",
    },
    "ジータさんのみ": {
        "en": "(Player only)",
        "ja": "(ジータさんのみ)",
    },
    "ジータさん": {
        "en": "Player",
        "ja": "ジータさん",
    },
    "銃": {
        "en": "Gun",
        "ja": "銃",
    },
    "刀": {
        "en": "Katana",
        "ja": "刀",
    },
    "斧": {
        "en": "Axe",
        "ja": "斧",
    },
    "弓": {
        "en": "Bow",
        "ja": "弓",
    },
    "剣": {
        "en": "Sword",
        "ja": "剣",
    },
    "短剣": {
        "en": "Dagger",
        "ja": "短剣",
    },
    "格闘": {
        "en": "Fist",
        "ja": "格闘",
    },
    "槍": {
        "en": "Spear",
        "ja": "槍",
    },
    "楽器": {
        "en": "Harp",
        "ja": "楽器",
    },
    "杖": {
        "en": "Staff",
        "ja": "杖",
    },
    "得意": {
        "en": "Favorite",
        "ja": "得意",
    },
    "ベルセルク": {
        "en": "Berserker",
        "ja": "ベルセルク",
    },
    "セージ": {
        "en": "Sage",
        "ja": "セージ",
    },
    "スパルタ": {
        "en": "Spartan",
        "ja": "スパルタ",
    },
    "ウォーロック": {
        "en": "Warlock",
        "ja": "ウォーロック",
    },
    "カオスルーダー": {
        "en": "Chaos lewder",
        "ja": "カオスルーダー",
    },
    "義賊": {
        "en": "Bandit Tycoon",
        "ja": "義賊",
    },
    "レスラー": {
        "en": "Luchador",
        "ja": "レスラー",
    },
    "ハウンドドッグ": {
        "en": "Nighthound",
        "ja": "ハウンドドッグ",
    },
    "アプサラス（槍）": {
        "en": "Apsaras(spear)",
        "ja": "アプサラス(槍)",
    },
    "アプサラス(斧)": {
        "en": "Apsaras(axe)",
        "ja": "アプサラス(斧)",
    },
    "エリュシオン": {
        "en": "Elysian",
        "ja": "エリュシオン",
    },
    "ザ・グローリー": {
        "en": "Glorybringer",
        "ja": "ザ・グローリー",
    },
    "剣豪": {
        "en": "Kengo",
        "ja": "剣豪",
    },
    "黒猫道士": {
        "en": "Nekomancer",
        "ja": "黒猫道士",
    },
    "アルケミスト": {
        "en": "Alchemist",
        "ja": "アルケミスト",
    },
    "忍者": {
        "en": "Ninja",
        "ja": "忍者",
    },
    "侍": {
        "en": "Samurai",
        "ja": "侍",
    },
    "剣聖": {
        "en": "Sword Master",
        "ja": "剣聖",
    },
    "ガンスリンガー": {
        "en": "Gunslinger",
        "ja": "ガンスリンガー",
    },
    "賢者": {
        "en": "Mystic",
        "ja": "賢者",
    },
    "アサシン": {
        "en": "Assassin",
        "ja": "アサシン",
    },
    "ウェポンマスター": {
        "en": "Weapon master",
        "ja": "ウェポンマスター",
    },
    "ホーリーセイバー": {
        "en": "Holy saber",
        "ja": "ホーリーセイバー",
    },
    "ダークフェンサー": {
        "en": "Dark Fencer",
        "ja": "ダークフェンサー",
    },
    "ビショップ": {
        "en": "Bishop",
        "ja": "ビショップ",
    },
    "ハーミット": {
        "en": "Hermit",
        "ja": "ハーミット",
    },
    "ホークアイ": {
        "en": "Hawkeye",
        "ja": "ホークアイ",
    },
    "オーガ": {
        "en": "Ogre",
        "ja": "オーガ",
    },
    "サイドワインダー": {
        "en": "Sidewinder",
        "ja": "サイドワインダー",
    },
    "スーパースター": {
        "en": "Superstar",
        "ja": "スーパースター",
    },
    "ヴァルキュリア": {
        "en": "Valkyrie",
        "ja": "ヴァルキュリア",
    },
    "攻撃": {
        "en": "Attack",
        "ja": "攻撃",
    },
    "バランス": {
        "en": "Balance",
        "ja": "バランス",
    },
    "防御": {
        "en": "Defense",
        "ja": "防御",
    },
    "特殊": {
        "en": "Special",
        "ja": "特殊",
    },
    "回復": {
        "en": "Heal",
        "ja": "回復",
    },
    "タイプ": {
        "en": "Type",
        "ja": "タイプ",
    },
    "攻撃力": {
        "en": "ATK",
        "ja": "攻撃力",
    },
    "攻撃力(二手技巧無し)": {
        "en": "Pure ATK",
        "ja": "攻撃力(二手技巧無し)",
    },
    "戦力": {
        "en": "ATK+HP",
        "ja": "戦力",
    },
    "連撃率": {
        "en": "DA/TA Ratio",
        "ja": "連撃率",
    },
    "期待攻撃回数": {
        "en": "Exp. Attack Freq.",
        "ja": "期待攻撃回数\n(期待攻撃力)",
    },
    "技巧期待攻撃力": {
        "en": "ATK with Critical",
        "ja": "技巧期待攻撃力",
    },
    "技巧期待値": {
        "en": "Exp. Critical Ratio",
        "ja": "技巧期待値\n(減衰補正後)",
    },
    "残HP": {
        "en": "Remain HP",
        "ja": "残HP",
    },
    "パーティ平均攻撃力": {
        "en": "Party-Averaged Pure ATK",
        "ja": "パーティ平均攻撃力(二手技巧無し)",
    },
    "技巧平均攻撃力": {
        "en": "Party-Averaged ATK with Critical",
        "ja": "技巧平均攻撃力",
    },
    "総合*回数*技巧": {
        "en": "PureATK*Crit.*Freq.",
        "ja": "総合*回数*技巧",
    },
    "総回技": {
        "en": "PCF value",
        "ja": "総回技",
    },
    "総回技の平均": {
        "en": "Averaged PCF value",
        "ja": "総回技の平均",
    },
    "単攻撃ダメージ(技巧連撃無)": {
        "en": "Single Attack Damage",
        "ja": "単攻撃ダメージ(技巧連撃無)",
    },
    "単攻撃ダメージ(技巧有)": {
        "en": "Single Attack Damage\n(w/ Critical)",
        "ja": "単攻撃ダメージ(技巧有)",
    },
    "単攻撃ダメージ(連撃有)": {
        "en": "Single Attack Damage\n(w/ Multiple)",
        "ja": "単攻撃ダメージ(連撃有)",
    },
    "単攻撃ダメージ(技巧連撃有)": {
        "en": "Single Attack Damage\n(w/ Crit. and Multi.)",
        "ja": "単攻撃ダメージ(技巧連撃有)",
    },
    "ターン毎の奥義ゲージ上昇量": {
        "en": "Ougi Gage Rise per Turn",
        "ja": "ターン毎の\n奥義ゲージ上昇量",
    },
    "奥義ダメージ": {
        "en": "Ougi Damage",
        "ja": "奥義ダメージ",
    },
    "チェインバースト": {
        "en": "Chain Burst",
        "ja": "チェインバースト",
    },
    "予想ターン毎ダメージ": {
        "en": "Exp. Damage per Turn",
        "ja": "予想ターンダメージ",
    },
    "パーティ平均予想ターン毎ダメージ": {
        "en": "Party-Averaged Exp. Turn Damage",
        "ja": "ターン毎ダメージの\nパーティ平均",
    },
    "技巧倍率": {
        "en": "Critical Ratio",
        "ja": "技巧倍率",
    },
    "倍": {
        "en": "x",
        "ja": "倍",
    },
    "発生確率": {
        "en": "Probability",
        "ja": "発生確率",
    },
    "標準偏差": {
        "en": "SD",
        "ja": "標準偏差",
    },
    "四人合計値": {
        "en": "x4",
        "ja": "x四人",
    },
    "スキル合計": {
        "en": "Skill Amount",
        "ja": "スキル合計",
    },
    "弱体耐性率": {
        "en": "Debuff Resistance",
        "ja": "弱体耐性率",
    },
    "有利": {
        "en": "Advantage",
        "ja": "有利",
    },
    "非有利": {
        "en": "Non-advantage",
        "ja": "非有利",
    },
    "不利": {
        "en": "Weak",
        "ja": "不利",
    },
    "背水グラフ": {
        "en": "Open Enmity Graph",
        "ja": "背水渾身グラフを開く",
    },
    "背水渾身グラフ": {
        "en": "Enmity Graph",
        "ja": "背水渾身グラフ",
    },
    "実際のHPで表示": {
        "en": "Based on real HP",
        "ja": "実際のHPで表示",
    },
    "HP割合で表示": {
        "en": "Based on remain HP ratio",
        "ja": "HP割合で表示",
    },
    "初期攻撃力推移グラフを開く": {
        "en": "Open Initial Attack Variation Graph",
        "ja": "初期攻撃力推移グラフを開く",
    },
    "初期攻撃力推移グラフ": {
        "en": "Initial Attack Variation Graph",
        "ja": "初期攻撃力推移グラフ",
    },
    "ダメージシミュレータを開く": {
        "en": "Open Damage Simulator",
        "ja": "ダメージシミュレータを開く",
    },
    "ダメージシミュレータ": {
        "en": "Damage Simulator",
        "ja": "ダメージシミュレータ",
    },
    "結果": {
        "en": "Result",
        "ja": "結果",
    },
    "マグナ": {
        "en": "Magna",
        "ja": "マグナ",
    },
    "属性": {
        "en": "Element ",
        "ja": "属性",
    },
    "EX": {
        "en": "EX",
        "ja": "EX",
    },
    "EX背水": {
        "en": "EX Enmity",
        "ja": "EX背水",
    },
    "属性攻": {
        "en": "Element ",
        "ja": "属性攻",
    },
    "属性(種族数)": {
        "en": "Element(Tesuka) ",
        "ja": "属性(種族数)",
    },
    "属性(経過ターン)": {
        "en": "Element(Sesuransu) ",
        "ja": "属性(経過ターン)",
    },
    "神石系": {
        "en": "Primal ",
        "ja": "神石系",
    },
    "蘭子": {
        "en": "Ranko ",
        "ja": "蘭子",
    },
    "キャラ攻": {
        "en": "Chara",
        "ja": "キャラ攻",
    },
    "属性攻+キャラ攻": {
        "en": "Odin(Element+Chara)",
        "ja": "属性攻+キャラ攻",
    },
    "優先項目": {
        "en": "Sort Key",
        "ja": "優先項目",
    },
    "表示項目": {
        "en": "Display Key",
        "ja": "表示項目",
    },
    "順位": {
        "en": "Rank",
        "ja": "順位",
    },
    "操作": {
        "en": "Option",
        "ja": "操作",
    },
    "HP増加": {
        "en": "Health ",
        "ja": "HP増加",
    },
    "通常攻刃": {
        "en": "Normal Might ",
        "ja": "通常攻刃",
    },
    "通常背水": {
        "en": "Normal Enmity ",
        "ja": "通常背水",
    },
    "通常渾身": {
        "en": "Normal Stamina ",
        "ja": "通常渾身",
    },
    "マグナ背水": {
        "en": "Magna Enmity ",
        "ja": "マグナ背水",
    },
    "マグナ渾身": {
        "en": "Magna Stamina ",
        "ja": "マグナ渾身",
    },
    "アンノウン": {
        "en": "Unknown ",
        "ja": "アンノウン",
    },
    "アンノウン背水": {
        "en": "Unknown Enmity ",
        "ja": "アンノウン背水",
    },
    "キャラ背水": {
        "en": "Chara Enmity ",
        "ja": "キャラ背水",
    },
    "DA上昇(通常)": {
        "en": "DA up (normal) ",
        "ja": "DA上昇(通常)",
    },
    "DA上昇(マグナ)": {
        "en": "DA up (magna) ",
        "ja": "DA上昇(マグナ)",
    },
    "DA上昇(EX)": {
        "en": "DA up (EX) ",
        "ja": "DA上昇(EX)",
    },
    "DA上昇(バハ)": {
        "en": "DA up (bahamut) ",
        "ja": "DA上昇(バハ)",
    },
    "DA上昇(コスモス)": {
        "en": "DA up (cosmos) ",
        "ja": "DA上昇(コスモス)",
    },
    "DA上昇(その他)": {
        "en": "DA up (other) ",
        "ja": "DA上昇(その他)",
    },
    "TA上昇(通常)": {
        "en": "TA up (normal) ",
        "ja": "TA上昇(通常)",
    },
    "TA上昇(マグナ)": {
        "en": "TA up (magna) ",
        "ja": "TA上昇(マグナ)",
    },
    "TA上昇(バハ)": {
        "en": "TA up (bahamut) ",
        "ja": "TA上昇(バハ)",
    },
    "TA上昇(その他)": {
        "en": "TA up (other) ",
        "ja": "TA上昇(その他)",
    },
    "グラフに加える": {
        "en": "Add to \ngraphs",
        "ja": "グラフに\n加える",
    },
    "本": {
        "en": "",
        "ja": "",
    },
    "結果を更新": {
        "en": "Update Results",
        "ja": "結果を更新",
    },
    "自動更新: ON": {
        "en": "Auto Update: ON",
        "ja": "自動更新: ON",
    },
    "自動更新: OFF": {
        "en": "Auto Update: OFF",
        "ja": "自動更新: OFF",
    },
    "属性一括変更": {
        "en": "Change All Element",
        "ja": "属性一括変更",
    },
    "自分の石": {
        "en": "Player",
        "ja": "自分の石",
    },
    "フレの石": {
        "en": "Friend",
        "ja": "フレの石",
    },
    "合計攻撃力": {
        "en": "Total ATK",
        "ja": "合計攻撃力",
    },
    "合計HP": {
        "en": "Total HP",
        "ja": "合計HP",
    },
    "HP加護": {
        "en": "Health UP",
        "ja": "HP加護",
    },
    "DA加護": {
        "en": "Double Attack",
        "ja": "DA加護",
    },
    "TA加護": {
        "en": "Triple Attack",
        "ja": "TA加護",
    },
    "内容を消去": {
        "en": "Delete",
        "ja": "内容を消去",
    },
    "コピー": {
        "en": "Copy",
        "ja": "コピー",
    },
    "下にコピー": {
        "en": "Copy",
        "ja": "下にコピー",
    },
    "追加": {
        "en": "Add",
        "ja": "追加",
    },
    "削除": {
        "en": "Remove",
        "ja": "削除",
    },
    "追加しました": {
        "en": "Added!",
        "ja": "追加しました。",
    },
    "キャラがいっぱい": {
        "en": "Chara list is full.",
        "ja": "キャラがいっぱいです。",
    },
    "キャラテンプレート": {
        "en": "Open Character Template",
        "ja": "キャラテンプレートを開く",
    },
    "キャラ名": {
        "en": "Name",
        "ja": "キャラ名",
    },
    "平均に": {
        "en": "Average?",
        "ja": "平均に",
    },
    "含める": {
        "en": "Include",
        "ja": "含める",
    },
    "種族": {
        "en": "Race",
        "ja": "種族",
    },
    "得意武器": {
        "en": "Favorite",
        "ja": "得意武器",
    },
    "素の攻撃力": {
        "en": "Raw ATK",
        "ja": "素の攻撃力",
    },
    "素のHP": {
        "en": "Raw HP",
        "ja": "素のHP",
    },
    "サポアビ": {
        "en": "Support Abi.",
        "ja": "サポアビ",
    },
    "属性攻撃力": {
        "en": "Element LB",
        "ja": "属性攻撃力",
    },
    "クリティカル": {
        "en": "Critical",
        "ja": "クリティカル",
    },
    "前へ": {
        "en": "Front",
        "ja": "前へ",
    },
    "後へ": {
        "en": "Back",
        "ja": "後へ",
    },
    "武器テンプレート": {
        "en": "Open Weapon Template",
        "ja": "武器テンプレートを開く",
    },
    "武器名": {
        "en": "Name",
        "ja": "武器名",
    },
    "スキル": {
        "en": "Skill",
        "ja": "スキル",
    },
    "種類": {
        "en": "Type",
        "ja": "種類",
    },
    "最小本数": {
        "en": "Minimum",
        "ja": "最小本数",
    },
    "最大本数": {
        "en": "Maximum",
        "ja": "最大本数",
    },
    "何本追加": {
        "en": "How many?",
        "ja": "何本追加しますか？",
    },
    "サーバに保存": {
        "en": "Save to Server",
        "ja": "サーバに保存\n(短縮URLを取得)",
    },
    //定数変換用
    "人間": {
        "en": "Human",
        "ja": "人間",
    },
    "エルーン": {
        "en": "Erune",
        "ja": "エルーン",
    },
    "ドラフ": {
        "en": "Doraf",
        "ja": "ドラフ",
    },
    "ハーヴィン": {
        "en": "Havin",
        "ja": "ハーヴィン",
    },
    "星晶獣": {
        "en": "Primal",
        "ja": "星晶獣",
    },
    "種族不明": {
        "en": "Unknown",
        "ja": "種族不明",
    },
    // sort keys
    "攻撃力(二手技巧無し,ジータさんのみ)": {
        "en": "Pure ATK, Player only",
        "ja": "攻撃力(二手技巧無し,ジータさんのみ)",
    },
    "パーティ平均攻撃力(二手技巧無し)": {
        "en": "Party-Averaged Pure ATK",
        "ja": "平均攻撃力(二手技巧無し)",
    },
    "ジータさんHP": {
        "en": "Player HP",
        "ja": "ジータさんHP",
    },
    "技巧期待値(ジータさんのみ)": {
        "en": "Exp. Critical Ratio (Player only)",
        "ja": "技巧期待値(ジータさんのみ)",
    },
    "技巧期待値(ジータさんのみ)": {
        "en": "Exp. Critical Ratio (Player only)",
        "ja": "技巧期待値(ジータさんのみ)",
    },
    "技巧期待平均攻撃力": {
        "en": "Party-Averaged ATK with Critical",
        "ja": "技巧期待平均攻撃力",
    },
    "総合攻撃*期待回数*技巧期待値(ジータさんのみ)": {
        "en": "PureATK*Crit.*Freq. (Player only)",
        "ja": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
    },
    "総回技のパーティ平均値": {
        "en": "Averaged PCF value",
        "ja": "総回技のパーティ平均値",
    },
    "予想ターン毎ダメージ(ジータさんのみ)": {
        "en": "Exp. Damage per Turn (Player only)",
        "ja": "予想ターンダメージ(ジータさんのみ)",
    },
    "予想ターン毎ダメージのパーティ平均値": {
        "en": "Party-Averaged Exp. Turn Damage",
        "ja": "予想ターン毎ダメージのパーティ平均値",
    },
    "予想ダメージ(ジータさんのみ)": {
        "en": "Exp. Damage (Player only)",
        "ja": "予想ダメージ(ジータさんのみ)",
    },
    "予想ダメージのパーティ平均値": {
        "en": "Party-Averaged Exp. Damage",
        "ja": "予想ダメージのパーティ平均値",
    },
    "予想ダメージ平均の積分値": {
        "en": "Integration of Party-Averaged Exp. Turn Damage",
        "ja": "予想ダメージ平均の積分値",
    },
    "★1": {
        "en": "★1",
        "ja": "★1",
    },
    "★2": {
        "en": "★2",
        "ja": "★2",
    },
    "★3": {
        "en": "★3",
        "ja": "★3",
    },
    "★4": {
        "en": "★4",
        "ja": "★4",
    },
    "★5": {
        "en": "★5",
        "ja": "★5",
    },
    "★6": {
        "en": "★6",
        "ja": "★6",
    },
    "表示項目切替": {
        "en": "Select Display Elements",
        "ja": "表示する項目を選択してください",
    },
    "攻撃力・HP・連撃率": {
        "en": "ATK/HP/etcs",
        "ja": "攻撃力・HP・連撃率",
    },
    "パーティ平均攻撃力": {
        "en": "Party-Averaged ATK",
        "ja": "パーティ平均攻撃力",
    },
    "予測ダメージ": {
        "en": "Expected Damages",
        "ja": "予測ダメージ",
    },
    "キャラ情報・スキル合計値": {
        "en": "Chara Data, Skill Amount",
        "ja": "キャラ情報・スキル合計値",
    },
    // スキル名
    "通常攻刃(小)": {
        "en": "Normal Might (S)",
        "ja": "通常攻刃(小)",
    },
    "通常攻刃(中)": {
        "en": "Normal Might (M)",
        "ja": "通常攻刃(中)",
    },
    "通常攻刃(大)": {
        "en": "Normal Might (L)",
        "ja": "通常攻刃(大)",
    },
    "通常攻刃II": {
        "en": "Normal Might (LL)",
        "ja": "通常攻刃II",
    },
    "通常攻刃III": {
        "en": "Normal Might (LLL)",
        "ja": "通常攻刃III",
    },
    "通常暴君": {
        "en": "Normal Tyranny",
        "ja": "通常暴君",
    },
    "通常暴君II": {
        "en": "Normal Tyranny II",
        "ja": "通常暴君II",
    },
    "通常背水(小)": {
        "en": "Normal Enmity (S)",
        "ja": "通常背水(小)",
    },
    "通常背水(中)": {
        "en": "Normal Enmity (M)",
        "ja": "通常背水(中)",
    },
    "通常背水(大)": {
        "en": "Normal Enmity (L)",
        "ja": "通常背水(大)",
    },
    "通常渾身(中)": {
        "en": "Normal Stamina (M)",
        "ja": "通常渾身(中)",
    },
    "通常渾身(大)": {
        "en": "Normal Stamina (L)",
        "ja": "通常渾身(大)",
    },
    "通常二手(小)": {
        "en": "Normal Dual Edge (S)",
        "ja": "通常二手(小)",
    },
    "通常二手(中)": {
        "en": "Normal Dual Edge (M)",
        "ja": "通常二手(中)",
    },
    "通常二手(大)": {
        "en": "Normal Dual Edge (L)",
        "ja": "通常二手(大)",
    },
    "通常三手(小)": {
        "en": "[UNVERIFIED] Normal Trium (S)",
        "ja": "[未検証] 通常三手(小)",
    },
    "通常三手(大)": {
        "en": "Normal Trium (L)",
        "ja": "通常三手(大)",
    },
    "通常克己(中)": {
        "en": "Normal Restraint (M)",
        "ja": "通常克己(中)",
    },
    "通常神威(小)": {
        "en": "Normal Majesty (S)",
        "ja": "通常神威(小)",
    },
    "通常神威(中)": {
        "en": "Normal Majesty (M)",
        "ja": "通常神威(中)",
    },
    "通常括目": {
        "en": "Normal Heed",
        "ja": "通常括目",
    },
    "通常羅刹": {
        "en": "Normal Haunt",
        "ja": "通常羅刹",
    },
    "通常無双(中)": {
        "en": "[UNVERIFIED] Normal Primacy (M)",
        "ja": "[未検証] 通常無双(中)",
    },
    "通常無双II": {
        "en": "Normal Primacy II",
        "ja": "通常無双II",
    },
    "通常刃界(小)": {
        "en": "[UNVERIFIED] Normal Bladeshield (S)",
        "ja": "[未検証] 通常刃界(小)",
    },
    "通常乱舞(小)": {
        "en": "Normal Fandango (S)",
        "ja": "通常乱舞(小)",
    },
    "通常秘奥(小)": {
        "en": "Normal Hiou? (S)",
        "ja": "通常秘奥(小)",
    },
    "通常秘奥(中)": {
        "en": "Normal Hiou? (M)",
        "ja": "通常秘奥(中)",
    },
    "マグナ攻刃": {
        "en": "Magna Might I",
        "ja": "マグナ攻刃",
    },
    "マグナ攻刃II": {
        "en": "Magna Might II",
        "ja": "マグナ攻刃II",
    },
    "マグナ背水(小)": {
        "en": "Magna Enmity (S)",
        "ja": "マグナ背水(小)",
    },
    "マグナ背水(中)": {
        "en": "Magna Enmity (M)",
        "ja": "マグナ背水(中)",
    },
    "マグナ背水(大)": {
        "en": "Magna Enmity (L)",
        "ja": "マグナ背水(大)",
    },
    "マグナ渾身(中)": {
        "en": "Magna Stamina (M)",
        "ja": "マグナ渾身(中)",
    },
    "マグナ破壊(小)": {
        "en": "Magna Devastation (S)",
        "ja": "マグナ破壊(小)",
    },
    "マグナ三手(大)": {
        "en": "Magna Trium (L)",
        "ja": "マグナ三手(大)",
    },
    "マグナ克己(中)": {
        "en": "Magna Restraint (M)",
        "ja": "マグナ克己(中)",
    },
    "マグナ神威(小)": {
        "en": "Magna Majesty (S)",
        "ja": "マグナ神威(小)",
    },
    "マグナ神威(中)": {
        "en": "Magna Majesty (M)",
        "ja": "マグナ神威(中)",
    },
    "マグナ暴君": {
        "en": "Magna Tyranny",
        "ja": "マグナ暴君",
    },
    "マグナ括目": {
        "en": "Magna Heed",
        "ja": "マグナ括目",
    },
    "マグナ羅刹": {
        "en": "Magna Haunt",
        "ja": "マグナ羅刹",
    },
    "マグナ無双(中)": {
        "en": "Magna Primacy (M)",
        "ja": "マグナ無双(中)",
    },
    "マグナ乱舞(中)": {
        "en": "Magna Fandango (M)",
        "ja": "マグナ乱舞(中)",
    },
    "マグナ軍神(小)": {
        "en": "Magna Gunshin? (S)",
        "ja": "マグナ軍神(小)",
    },
    "マグナ必殺(中)": {
        "en": "Magna Hissatsu? (M)",
        "ja": "マグナ必殺(中)",
    },
    "アンノウンATK・I": {
        "en": "Unknown ATK I",
        "ja": "アンノウンATK・I",
    },
    "アンノウンATK・II": {
        "en": "Unknown ATK II",
        "ja": "アンノウンATK・II",
    },
    "EX背水(中)": {
        "en": "EX Enmity (M)",
        "ja": "EX背水(中)",
    },
    "EX攻刃(小)": {
        "en": "EX Might (S)",
        "ja": "EX攻刃(小)",
    },
    "EX攻刃(中)": {
        "en": "EX Might (M)",
        "ja": "EX攻刃(中)",
    },
    "EX攻刃(大)": {
        "en": "EX Might (L)",
        "ja": "EX攻刃(大)",
    },
    "EX攻刃(特大)": {
        "en": "EX Might (LL)",
        "ja": "EX攻刃(特大)",
    },
    "EX攻刃+守護(中)": {
        "en": "EX Might and Aegis (M)",
        "ja": "EX攻刃+守護(中)",
    },
    "通常守護(小)": {
        "en": "Normal Aegis (S)",
        "ja": "通常守護(小)",
    },
    "通常守護(中)": {
        "en": "Normal Aegis (M)",
        "ja": "通常守護(中)",
    },
    "通常守護(大)": {
        "en": "Normal Aegis (L)",
        "ja": "通常守護(大)",
    },
    "通常守護II": {
        "en": "Normal Aegis (LL)",
        "ja": "通常守護II",
    },
    "マグナ守護(小)": {
        "en": "Magna Aegis (S)",
        "ja": "マグナ守護(小)",
    },
    "マグナ守護(中)": {
        "en": "Magna Aegis I (M)",
        "ja": "マグナ守護(中)",
    },
    "マグナ守護(大)": {
        "en": "Magna Aegis II (L)",
        "ja": "マグナ守護(大)",
    },
    "アンノウン・VIT I(小)": {
        "en": "Unknown VIT I (S)",
        "ja": "アンノウン・VIT I(小)",
    },
    "アンノウン・VIT I(中)": {
        "en": "Unknown VIT I (M)",
        "ja": "アンノウン・VIT I(中)",
    },
    "アンノウン・VIT II(大)": {
        "en": "Unknown VIT II (L)",
        "ja": "アンノウン・VIT II(大)",
    },
    "ミフネ流・極意": {
        "en": "Mifune Style, Zen Impact",
        "ja": "ミフネ流・極意",
    },
    "ミフネ流・双星": {
        "en": "Mifune Style, Binary Star",
        "ja": "ミフネ流・双星",
    },
    "紅蓮の呪印・弐": {
        "en": "Inferno's Second Insignia",
        "ja": "紅蓮の呪印・弐",
    },
    "霧氷の追牙・肆": {
        "en": "Hoarfrost's Fourth Pursuit",
        "ja": "霧氷の追牙・肆",
    },
    "貫きの牙": {
        "en": "Piercing Fang",
        "ja": "貫きの牙",
    },
    "貫きの牙(メイン装備時)": {
        "en": "Piercing Fang (main)",
        "ja": "貫きの牙(メイン装備時)",
    },
    "鷲王の結界": {
        "en": "Royal Wing Barrier",
        "ja": "鷲王の結界",
    },
    "舞姫の演武": {
        "en": "Dancer's Discipline",
        "ja": "舞姫の演武",
    },
    "胡蝶の剣舞": {
        "en": "Fluttering Slash",
        "ja": "胡蝶の剣舞",
    },
    "変幻自在の剣技": {
        "en": "Phantasmagoric Fencer",
        "ja": "変幻自在の剣技",
    },
    "通常技巧(小)": {
        "en": "Normal Verity (S)",
        "ja": "通常技巧(小)",
    },
    "通常技巧(中)": {
        "en": "Normal Verity (M)",
        "ja": "通常技巧(中)",
    },
    "通常技巧(大)": {
        "en": "Normal Verity (L)",
        "ja": "通常技巧(大)",
    },
    "マグナ技巧(小)": {
        "en": "Magna Verity (S)",
        "ja": "マグナ技巧(小)",
    },
    "マグナ技巧(中)": {
        "en": "Magna Verity (M)",
        "ja": "マグナ技巧(中)",
    },
    "マグナ技巧(大)": {
        "en": "Magna Verity (L)",
        "ja": "マグナ技巧(大)",
    },
    "通常刹那(小)": {
        "en": "Normal Celere (S)",
        "ja": "通常刹那(小)",
    },
    "通常刹那(中)": {
        "en": "Normal Celere (M)",
        "ja": "通常刹那(中)",
    },
    "マグナ刹那(小)": {
        "en": "Magna Celere (S)",
        "ja": "マグナ刹那(小)",
    },
    "マグナ刹那(中)": {
        "en": "Magna Celere (M)",
        "ja": "マグナ刹那(中)",
    },
    "コスモス剣": {
        "en": "Cosmos Sword",
        "ja": "コスモス剣",
    },
    "コスモス短剣": {
        "en": "Cosmos Dagger",
        "ja": "コスモス短剣",
    },
    "コスモス槍": {
        "en": "Cosmos Spear",
        "ja": "コスモス槍",
    },
    "コスモス斧": {
        "en": "Cosmos Axe",
        "ja": "コスモス斧",
    },
    "コスモス杖": {
        "en": "Cosmos Staff",
        "ja": "コスモス杖",
    },
    "コスモス銃": {
        "en": "Cosmos Gun",
        "ja": "コスモス銃",
    },
    "コスモス拳": {
        "en": "Cosmos Fist",
        "ja": "コスモス拳",
    },
    "コスモス弓": {
        "en": "Cosmos Bow",
        "ja": "コスモス弓",
    },
    "コスモス刀": {
        "en": "Cosmos Katana",
        "ja": "コスモス刀",
    },
    "コスモス楽器": {
        "en": "Cosmos Harp",
        "ja": "コスモス楽器",
    },
    "コスモスAT": {
        "en": "Cosmos ATK",
        "ja": "コスモスAT",
    },
    "コスモスDF": {
        "en": "Cosmos DF",
        "ja": "コスモスDF",
    },
    "コスモスBL": {
        "en": "Cosmos BL",
        "ja": "コスモスBL",
    },
    "コスモスPC": {
        "en": "Cosmos PC",
        "ja": "コスモスPC",
    },
    "バハ攻-短剣": {
        "en": "Bahamut Dagger",
        "ja": "バハ攻-短剣",
    },
    "バハ攻-斧": {
        "en": "Bahamut Axe",
        "ja": "バハ攻-斧",
    },
    "バハ攻-槍": {
        "en": "Bahamut Spear",
        "ja": "バハ攻-槍",
    },
    "バハ攻-銃": {
        "en": "Bahamut Gun",
        "ja": "バハ攻-銃",
    },
    "バハ攻HP-剣": {
        "en": "Bahamut Sword",
        "ja": "バハ攻-剣",
    },
    "バハ攻HP-杖": {
        "en": "Bahamut Staff",
        "ja": "バハ攻HP-杖",
    },
    "バハHP-格闘": {
        "en": "Bahamut Fist",
        "ja": "バハHP-格闘",
    },
    "バハHP-刀": {
        "en": "Bahamut Sword",
        "ja": "バハHP-刀",
    },
    "バハHP-弓": {
        "en": "Bahamut Bow",
        "ja": "バハHP-弓",
    },
    "バハHP-楽器": {
        "en": "Bahamut Harp",
        "ja": "バハHP-楽器",
    },
    "バハフツ-短剣": {
        "en": "Bahamut Coda Dagger",
        "ja": "バハフツ-短剣",
    },
    "バハフツ-斧": {
        "en": "Bahamut Coda Axe",
        "ja": "バハフツ-斧",
    },
    "バハフツ-槍": {
        "en": "Bahamut Coda Spear",
        "ja": "バハフツ-槍",
    },
    "バハフツ-銃": {
        "en": "Bahamut Coda Gun",
        "ja": "バハフツ-銃",
    },
    "バハフツ-剣": {
        "en": "Bahamut Coda Sword",
        "ja": "バハフツ-剣",
    },
    "バハフツ-杖": {
        "en": "Bahamut Coda Staff",
        "ja": "バハフツ-杖",
    },
    "バハフツHP-格闘": {
        "en": "Bahamut Coda Fist",
        "ja": "バハフツHP-格闘",
    },
    "バハフツHP-刀": {
        "en": "Bahamut Coda Katana",
        "ja": "バハフツHP-刀",
    },
    "バハフツHP-弓": {
        "en": "Bahamut Coda Bow",
        "ja": "バハフツHP-弓",
    },
    "バハフツHP-楽器": {
        "en": "Bahamut Coda Harp",
        "ja": "バハフツHP-楽器",
    },
    "オメガ-未強化": {
        "en": "Ultima (Raw)",
        "ja": "オメガ-未強化",
    },
    "オメガ-戦意": {
        "en": "Ultima (Will)",
        "ja": "オメガ-戦意",
    },
    "オメガ-闘争": {
        "en": "Ultima (Strife)",
        "ja": "オメガ-闘争",
    },
    "オメガ-生命": {
        "en": "Ultima (Vitality)",
        "ja": "オメガ-生命",
    },
    "オメガ-強壮": {
        "en": "Ultima (Strength)",
        "ja": "オメガ-強壮",
    },
    "オメガ-激情": {
        "en": "Ultima (Zeal)",
        "ja": "オメガ-激情",
    },
    "オメガ-勇気": {
        "en": "Ultima (Courage)",
        "ja": "オメガ-勇気",
    },
    "ガフスキー[α]": {
        "en": "Gauph Key α",
        "ja": "ガフスキー[α]",
    },
    "ガフスキー[α]": {
        "en": "Gauph Key α",
        "ja": "ガフスキー[α]",
    },
    "ガフスキー[β]": {
        "en": "Gauph Key β",
        "ja": "ガフスキー[β]",
    },
    "ガフスキー[γ]": {
        "en": "Gauph Key γ",
        "ja": "ガフスキー[γ]",
    },
    "ガフスキー[Δ]": {
        "en": "Gauph Key Δ",
        "ja": "ガフスキー[Δ]",
    },
    "天司の祝福": {
        "en": "Angel's Blessing",
        "ja": "天司の祝福",
    },
    "天司の祝福II": {
        "en": "Angel's Blessing II",
        "ja": "天司の祝福II",
    },
    "通常上限UP(2.5%)": {
        "en": "Damage Limit UP(2.5%)",
        "ja": "通常上限UP(2.5%)",
    },
    "通常上限UP(7.0%)": {
        "en": "Damage Limit UP(7.0%)",
        "ja": "通常上限UP(7.0%)",
    },
    "通常上限UP(10%)": {
        "en": "Damage Limit UP(10%)",
        "ja": "通常上限UP(10%)",
    },
    "奥義上限UP(10%)": {
        "en": "Ougi Limit UP(10%)",
        "ja": "奥義上限UP(10%)",
    },
    "奥義上限UP(イクシード)": {
        "en": "Ougi Limit UP (Exceed)",
        "ja": "奥義上限UP(イクシード)",
    },
    // 拡張スキル
    "通常渾身(大)(神石加護無効)": {
        "en": "Normal Stamina (L) (No Summon Aura)",
        "ja": "通常渾身(大)(神石加護無効)",
    },
    "[ジータのみ] 通常枠DATA 5%": {
        "en": "[DjeetaOnly] Normal DA/TA 5%",
        "ja": "[ジータのみ] 通常枠DATA 5%",
    },
    "[ジータのみ] 通常枠DATA 10%": {
        "en": "[DjeetaOnly] Normal DA/TA 10%",
        "ja": "[ジータのみ] 通常枠DATA 10%",
    },
    "[ジータのみ] 通常枠DATA 15%": {
        "en": "[DjeetaOnly] Normal DA/TA 15%",
        "ja": "[ジータのみ] 通常枠DATA 15%",
    },
    "[ジータのみ] 通常枠DATA 20%": {
        "en": "[DjeetaOnly] Normal DA/TA 20%",
        "ja": "[ジータのみ] 通常枠DATA 20%",
    },
    "[ジータのみ] 通常枠DATA 25%": {
        "en": "[DjeetaOnly] Normal DA/TA 25%",
        "ja": "[ジータのみ] 通常枠DATA 25%",
    },
    "[ジータのみ] 通常枠DATA 30%": {
        "en": "[DjeetaOnly] Normal DA/TA 30%",
        "ja": "[ジータのみ] 通常枠DATA 30%",
    },
    // テンプレート用
    "王道: 竜巻の技巧": {
        "en": "Normal Verity (M)",
        "ja": "王道: 竜巻の技巧",
    },
    "王道: 火の守護": {
        "en": "Normal Aegis (M)",
        "ja": "王道: 火の守護",
    },
    "王道: 大地の技巧": {
        "en": "Normal Verity (M)",
        "ja": "王道: 大地の技巧",
    },
    "王道: 水の二手": {
        "en": "Normal Duel Edge (M)",
        "ja": "王道: 水の二手",
    },
    "邪道: 通常上限UP(7.0%)": {
        "en": "Damage Limit UP(7.0%)",
        "ja": "邪道: 通常上限UP(7.0%)",
    },
    "敵防御10": {
        "en": "10.0(General)",
        "ja": "10.0(一般的な敵)",
    },
    "敵防御8": {
        "en": "8.0(General -20% DEF)",
        "ja": "8.0(一般 防御-20%)",
    },
    "敵防御7": {
        "en": "7.0(General -30% DEF)",
        "ja": "7.0(一般 防御-30%)",
    },
    "敵防御6.5": {
        "en": "6.5(Tia-Magna, Chiva-Magna -50% DEF)",
        "ja": "6.5(ティアシュバ防御-50%)",
    },
    "敵防御5.5": {
        "en": "5.5(Proto Bahamut -50%)",
        "ja": "5.5(プロバハ(防御-50%))",
    },
    "敵防御5": {
        "en": "5.0(General -50% DEF)",
        "ja": "5.0(一般 防御-50%))",
    },
    "敵防御13": {
        "en": "13.0(Tia-Magna, Chiva-Magna)",
        "ja": "13.0(ティアマグ・シュバマグ)",
    },
    "敵防御11": {
        "en": "11.0(Proto Bahamut)",
        "ja": "11.0(プロバハ?)",
    },
    "敵防御20": {
        "en": "20.0(Proto Baha HL)",
        "ja": "20.0(プロバハHL?)",
    },
    // chart sort key
    "ジータさん残りHP": {
        "en": "Player Remain HP",
        "ja": "ジータさん残りHP",
    },
    "まとめて比較": {
        "en": "Compare All",
        "ja": "まとめて比較",
    },
    "保存された編成を編集": {
        "en": "Edit Saved Weapon Setups",
        "ja": "保存された編成を編集",
    },
    "保存された編成を削除": {
        "en": "Delete All Saved Setups",
        "ja": "保存された編成を全て削除",
    },
    "保存済みの編成": {
        "en": "Saved Weapon Setups",
        "ja": "保存済みの編成",
    },
    // send request
    "追加要望を送る": {
        "en": "Send new template request",
        "ja": "追加要望を送る",
    },
    "追加要望を送る": {
        "en": "Send new template request",
        "ja": "追加要望を送る",
    },
    "キャラ追加要望": {
        "en": "New character template request",
        "ja": "キャラ追加要望",
    },
    "武器追加要望": {
        "en": "New weapon template request",
        "ja": "武器追加要望",
    },
    "要望種別": {
        "en": "Request type",
        "ja": "要望種別",
    },
    "名": {
        "en": "name ",
        "ja": "名",
    },
    "メッセージ": {
        "en": "Message ",
        "ja": "詳細",
    },
    "あなたのお名前": {
        "en": "Your name (optional) ",
        "ja": "あなたのお名前（任意）",
    },
    "送信": {
        "en": "SUBMIT",
        "ja": "送信",
    },
    "送信成功": {
        "en": "Your request was sent!",
        "ja": "要望を送信しました!",
    },
    "要望送信メッセージ": {
        "en": "Send a comment to github motocal Issue.",
        "ja": "github/motocalのIssueに要望コメントを送信します.",
    },
    // Simulator Infomation
    "パーティ全体": {
        "en": "Settings for all alies",
        "ja": "パーティ全体設定",
    },
    "通常攻撃": {
        "en": "Attack",
        "ja": "通常攻撃",
    },
    "奥義": {
        "en": "Ougi",
        "ja": "奥義",
    },
    "奥義(ダメージ無し)": {
        "en": "Ougi w/o damage",
        "ja": "奥義(ダメージ無し)",
    },
    "ターン数": {
        "en": "Turn length",
        "ja": "ターン数",
    },
    "ターン": {
        "en": "Turn",
        "ja": "ターン",
    },
    "バフテンプレート": {
        "en": "Open Buff Templates",
        "ja": "バフテンプレートを開く",
    },
    "バフテンプレート説明": {
        "en": "Drag and drop these buttons into a turn.",
        "ja": "追加したいターンにバフボタンをドラッグアンドドロップしてください.",
    },
    "シミュレータ-上にコピー": {
        "en": "Copy all settings to the upper row.",
        "ja": "上の行にバフ設定をコピーします.",
    },
    "シミュレータ-下にコピー": {
        "en": "Copy all settings to the lower row.",
        "ja": "下の行にバフ設定をコピーします.",
    },
    // バフテンプレート
    "レイジIII": {
        "en": "Rage III",
        "ja": "レイジIII",
    },
    "レイジIV": {
        "en": "Rage IV",
        "ja": "レイジIV",
    },
    "ランページ": {
        "en": "Rampage",
        "ja": "ランページ",
    },
    "四天刃バフ": {
        "en": "Four-Sky Blade Buff",
        "ja": "四天刃バフ",
    },
    "属性バフ(30%)": {
        "en": "Element Buff (30%)",
        "ja": "属性バフ(30%)",
    },
    "コルワ1アビフィル10": {
        "en": "Korwa Abi1 Fill 10",
        "ja": "コルワ1アビフィル10",
    },
    "コルワ2アビフィル10": {
        "en": "Korwa Abi2 Fill 10",
        "ja": "コルワ2アビフィル10",
    },
    "SOG 楽器なし": {
        "en": "Sky Realm Song w/o Harp",
        "ja": "ソング・オブ・グランデ 楽器なし",
    },
    "SOG 楽器あり": {
        "en": "Sky Realm Song with Harp",
        "ja": "ソング・オブ・グランデ 楽器あり",
    },
    "コール・オブ・アビス 楽器あり": {
        "en": "Call of the Abyss with Harp",
        "ja": "コール・オブ・アビス 楽器あり",
    },
    "天眼陣(3T)": {
        "en": "Omnipotent Eye (3T)",
        "ja": "天眼陣(3T)",
    },
    "他心陣と奥義": {
        "en": "Splitting Spirit and Ougi",
        "ja": "他心陣と奥義",
    },
    // Notice
    "オメガウェポン注記": {
        "en": "Gauph Key of Strength is not implemented yet.",
        "ja": "ガフスキー強壮(渾身)は未実装です.",
    },
    "天司武器注記": {
        "en": "If you added Angel's weapon in your grid, set the sort key to that based on \'Damage\'.",
        "ja": "天司武器入りで計算する場合、優先項目をダメージベースのものに設定してください.",
    },
    "広告": {
        "en": "Ad.",
        "ja": "広告",
    },
    "notice-20170114-1": {
        "en": "2017/01/14: English Support (partly).",
        "ja": "2017/01/14: 英語対応",
    },
    "notice-20170116-1": {
        "en": "2017/01/16: Fixed HP calculation process missed including Job HP bonus and Health Bonus.",
        "ja": "2017/01/16: ジョブのHPボーナスと守護ボーナスを計算に入れ忘れていたのを修正",
    },
    "notice-20170116-2": {
        "en": "2017/01/16: Fixed a bug that \"Character Favorite Weapon\" also affect their HP.",
        "ja": "2017/01/16: キャラの得意武器補正がHPにも乗っていたのを修正",
    },
    "notice-20170118-1": {
        "en": "2017/01/18: Added some advertisements to make myself motivate.",
        "ja": "2017/01/18: 開発意欲を出すため広告を追加.",
    },
    "notice-20170121-1": {
        "en": "2017/01/21: Fixed a bug that \"Inferno's Seconda Insignia\" is not affected by Agnis.",
        "ja": "2017/01/21: 紅蓮の呪印・弐にアグニス石が影響するように戻した.",
    },
    "notice-20170121-2": {
        "en": "2017/01/21: Implemennted Zaruhamerina Enmity.",
        "ja": "2017/01/21: ザルハメリナ背水の実装.",
    },
    "notice-20170121-3": {
        "en": "2017/01/21: Display Health Bonus amount in skill amount info.",
        "ja": "2017/01/21: 守護ボーナス分がスキル情報として表示されるようにした。",
    },
    "notice-20170121-4": {
        "en": "2017/01/21: Added Zenith Perk for Party HP Bonus",
        "ja": "2017/01/21: パーティHPボーナスのゼニス入力欄を追加",
    },
    "notice-20170121-5": {
        "en": "2017/01/21: Added Send new tempalte request button.",
        "ja": "2017/01/21: テンプレート追加要望ボタンを追加.",
    },
    "notice-20170122-1": {
        "en": "2017/01/22: Fixed a bug that some weapon which have element changes cannot add. / Added new weapons",
        "ja": "2017/01/22: 属性変更武器が追加できなくなっていた不具合を修正 / 武器追加",
    },
    "notice-20170122-2": {
        "en": "2017/01/22: Fixed invalid Open Enmity-Graph call if character length > 3.",
        "ja": "2017/01/22: キャラ数が4人以上の場合に背水グラフが開けなくなっていた不具合を修正",
    },
    "notice-20170123-1": {
        "en": "2017/01/23: Added new templates. / Changed the standard sortkey.",
        "ja": "2017/01/23: 新規キャラと武器追加 / 標準のソートキーを変更",
    },
    "notice-20170129-1": {
        "en": "2017/01/29: Implemented personal buff inputs. (and tweaked character tab style.) / Additional Damage buff gets displayed in skill information.",
        "ja": "2017/01/29: キャラ個別バフ欄の追加 (キャラ欄の見た目調整) / 追加ダメージバフがスキル情報に表示されるように修正.",
    },
    "notice-20170202-1": {
        "en": "2017/02/02: Added new two weapons.",
        "ja": "2017/02/02: カースドブレイドとマシンボウ追加.",
    },
    "notice-20170204-1": {
        "en": "2017/02/04: Added Rosamia.",
        "ja": "2017/02/04: ロザミア(SSR)が抜けていたので追加.",
    },
    "notice-20170204-2": {
        "en": "2017/02/04: Weapons which have element variation become displayed regardless of the filter element.",
        "ja": "2017/02/04: 属性変更武器が、属性フィルターに関わらず表示されるようにした.",
    },
    "notice-20170208-1": {
        "en": "2017/02/08: Implemented \"Enmity Graph based on real HP\" / Changed input behavior, open templates when a user begins name input.",
        "ja": "2017/02/08: 実HPベースの背水グラフ表示を実装 / 武器とキャラの名前が空欄の時に入力を開始するとテンプレートが自動的に開かれるようにした.",
    },
    "notice-20170212-1": {
        "en": "2017/02/12: Fixed a bug that cannot open enmity graph if there is only one summon setup.",
        "ja": "2017/02/12: 召喚石組み合わせが1組のみの場合に背水グラフが開けないバグを修正.",
    },
    "notice-20170212-2": {
        "en": "2017/02/12: Added coco&mimi Lv150.",
        "ja": "2017/02/12: ココミミとペルソスの最終上限解放ステータスを追加. (スキル対応はまだ).",
    },
    "notice-20170212-3": {
        "en": "2017/02/12: Added Job Masterpieces tempalte.",
        "ja": "2017/02/12: 属性変更後のジョブマスターピースのテンプレートを追加.",
    },
    "notice-20170216-1": {
        "en": "2017/02/16: Addded Xeno Ifrit Axes.",
        "ja": "2017/02/16: ゼノイフリート斧とEX特大の計算を追加 / ジョブの守護ボーナスの計算タイミングがおかしいのを修正.",
    },
    "notice-20170217-1": {
        "en": "17/02/2017: Currently, there is a invalid data loading bug when you load the setup from a browser. When it happened, change an value in Profile Tab. It will fix the result.",
        "ja": "2017/02/17: 現在、ブラウザ保存したデータ読み込み時にプロフィール欄が正しく読み込まれない場合があるようです. その場合、プロフィール欄の入力値をどこでもいいので適当に変更すると正しい計算結果になるはずです.",
    },
    "notice-20170218-1": {
        "en": "18/02/2017: Added charas and weapons, apsaras.",
        "ja": "2017/02/18: 武器とキャラ追加 / アプサラス追加.",
    },
    "notice-20170218-2": {
        "en": "18/02/2017: Added English Name of Romeo, Yngwei, Yuisis, Rastina and Implemented English name searching for these charas.",
        "ja": "2017/02/18: ロミオ、イングヴェイ、ユイシス、ラスティナの連撃率更新 / 英語名表示と英語名検索を実装.",
    },
    "notice-20170302-1": {
        "en": "02/03/2017: Display chara elements and enemy's element in result tab. Do not display Exp. Critical Ratio in number when djeeta's element is Non-advantage.",
        "ja": "2017/03/02: キャラ属性と敵属性を結果欄に表示するように変更 / 非有利の時は技巧期待値を数値で表示しないように変更",
    },
    "notice-20170305-1": {
        "en": "05/03/2017: Disabled swipe tab switching. Modified the graph add bution.",
        "ja": "2017/03/05: スワイプによるタブ移動を無効化. グラフ追加ボタンを元に戻した.",
    },
    "notice-20170305-2": {
        "en": "05/03/2017: Added new weapons.",
        "ja": "2017/03/05: 4凸ブリューナク追加. スキル「貫きの牙」追加. ブリューナク追加時にメイン装備かどうかの切り替えができるようにした.",
    },
    "notice-20170306-1": {
        "en": "06/03/2017: Implemented piram's 2nd skill.",
        "ja": "2017/03/06: 4凸ピラムのスキル「鷲王の結界」実装. 効果量はジータのみDA+13%（SLv15の時）で、SLv14以下は適当に0.5%ごと減少にしています.",
    },
    "notice-20170308-1": {
        "en": "08/03/2017: Changed the maximum rank to 200.",
        "ja": "2017/03/08: ランクの上限値を200に変更.",
    },
    "notice-20170310-1": {
        "en": "10/03/2017: Implemented new \"Damage UP\" skill (Angel's blessing).",
        "ja": "2017/03/10: 天司の祝福スキルを実装. 与ダメージ上昇を計算できるようにした. (スキル情報にも表示されます)",
    },
    "notice-20170311-1": {
        "en": "11/03/2017: Added new weapons.",
        "ja": "2017/03/11: 新武器などを追加",
    },
    "notice-20170312-1": {
        "en": "12/03/2017: Modified Enmity (M) and Enmity (L) values.",
        "ja": "2017/03/12: 背水(中)と背水(大)の効果量を微修正.",
    },
    "notice-20170312-2": {
        "en": "12/03/2017: Separated \"Single Attack Damage\" columns and added new sort keys.",
        "ja": "2017/03/12: \"単攻撃ダメージ\"を4つに分類し、ソートキーを追加.",
    },
    "notice-20170315-1": {
        "en": "15/03/2017: Implemented Critical UP support abilities.",
        "ja": "2017/03/15: キャラサポアビのクリティカル計算を実装",
    },
    "notice-20170317-1": {
        "en": "17/03/2017: Implemented Angel's blessing II. / Added Seraphim weapon (SSR) templates",
        "ja": "2017/03/17: 天司の祝福II(与ダメージアップ20%)を実装. / 天司武器SSRを追加.",
    },
    "notice-20170328-1": {
        "en": "28/03/2017: Fixed problems on data loading from browser.",
        "ja": "2017/03/28: ブラウザデータロード時に正しく読み込まれないことがあるバグを修正.",
    },
    "notice-20170329-1": {
        "en": "29/03/2017: Fixed bugs.",
        "ja": "2017/03/29: 霧氷の追牙に神石効果が乗らない不具合を修正 / 天司スキルが非有利の場合でも計算されてしまう不具合を修正.",
    },
    "notice-20170329-3": {
        "en": "29/03/2017: Fixed invalid loading if the weapon or summon number is not matched their default number. / Fixed that the server save function was corrupted.",
        "ja": "2017/03/29: 武器数と召喚石組数が変更されたデータが読み込まれた際に表示がおかしくなるバグを修正 / サーバーに保存機能が動いていなかったバグを修正.",
    },
    "notice-20170331-1": {
        "en": "31/03/2017: Fixed values of normal and magna criticals (M). / Added Elysian. / Improved buff input interfaces.",
        "ja": "2017/03/31: 技巧(中)の効果量修正 / エリュシオン追加 / バフ入力欄の利便性向上.",
    },
    "notice-20170409-1": {
        "en": "09/04/2017: Improved An Interface of Damage Simulator. / Implemented name editing of saved grids.",
        "ja": "2017/04/09: ダメージシミュレータのインターフェースの改善 / 保存した編成の名前を編集できるようにした.",
    },
    "notice-20170410-1": {
        "en": "10/04/2017: Added a new skill Normal Tyranny II and Implemented the additional skill selection for Four beast weapons.",
        "ja": "2017/04/09: 通常暴君IIを追加 / 新四象武器選択時に追加スキルを追加するか選択可能に.",
    },
    "notice-20170414-1": {
        "en": "14/04/2017: Added a skill Normal Aegis (LL).",
        "ja": "2017/04/14: 通常守護IIを追加.",
    },
    "notice-20170415-1": {
        "en": "15/04/2017: Partly added English Templates! Thanks theorycrafting guys.",
        "ja": "2017/04/15: 武器とキャラテンプレートの一部を英語化.",
    },
    "notice-20170501-1": {
        "en": "01/05/2017: Added new weapons and skills.",
        "ja": "2017/05/01: 武器追加、通常攻刃IIIと通常三手(小)[未検証]を追加.",
    },
    "notice-20170516-1": {
        "en": "16/05/2017: Fixed the invalid value of Health Bonus by Majesty skills.",
        "ja": "2017/05/16: 神威スキルのHP上昇量が通常守護のものとなっていたので修正.",
    },
    "notice-20170517-1": {
        "en": "17/05/2017: Implemented Chain Burst calculation.",
        "ja": "2017/05/17: チェインバーストダメージの計算を実装.",
    },
    "notice-20170525-1": {
        "en": "25/05/2017: Implemented Damage Limit UP calculation.",
        "ja": "2017/05/25: ダメージ上限UPの計算を実装.",
    },
    "notice-20170531-1": {
        "en": "31/05/2017: Fixed an invalid status of Murgles / Modified the skill amount of Andalis 4* damage limit up to 7%.",
        "ja": "2017/05/31: ミュルグレス4凸の武器ステータスが+99のものになっていたので修正 / アンダリス4凸の上限UP効果を7%に.",
    },
    "notice-20170617-1": {
        "en": "17/06/2017: Fixed Base ATK and HP calculation above Rank 175.",
        "ja": "2017/06/17: Rank175以上の基礎攻撃力/HP計算式を修正.",
    },
    "notice-20170704-1": {
        "en": "04/07/2017: Added new weapons. Implemented 'Non' element type. Implemented critical ratio array displaying.",
        "ja": "2017/07/04: 武器追加. 無属性と無属性（技巧あり）を実装. 技巧倍率毎の発生確率表示を実装.",
    },
    "notice-20170725-1": {
        "en": "25/07/2017: Added new weapons. Implemented Ougi Damage Limit UP calculation. Added Primacy skill.",
        "ja": "2017/07/25: 武器追加. 奥義上限UP計算の実装. 無双スキルと奥義上限UPと舞姫の演武の実装.",
    },
    "notice-20170802-1": {
        "en": "02/08/2017: Changed damage calculation ceiling timing to match the value shown in GBF game.",
        "ja": "2017/08/02: ダメージ計算の切り上げタイミングの調整(ゲーム内予測ダメージと一致するようになりました)",
    },
    "notice-20170805-1": {
        "en": "05/08/2017: Implemented Ultima Weapons.",
        "ja": "2017/08/05: オメガウェポンスキルを実装."
    },
    "notice-20170817-1": {
        "en": "17/08/2017: Implemented Rose weapons II. Added new charas. Implemented 'Primal' race.",
        "ja": "2017/08/17: EX攻刃守護(中)を実装. ローズ武器2を追加. 水着キャラ追加. 種族: 星晶獣を追加."
    },
    "notice-20170819-1": {
        "en": "19/08/2017: Fixed some character data without favorite weapons. Applied new Ougi Damage Limitation Range. Fixed stopping bug when the ChainBurst Number was changed.",
        "ja": "2017/08/19: 得意武器が抜けていたキャラを修正. 新奥義上限を適用. チェインバースト数を弄ると計算が止まる不具合を修正."
    },
    "notice-20170907-1": {
        "en": "07/09/2017: Added new weapons and characters.",
        "ja": "2017/09/07: 武器とキャラ追加."
    },
    "notice-20171011-1": {
        "en": "11/10/2017: Added new weapons and characters.",
        "ja": "2017/10/11: 武器とキャラ追加."
    },
    "notice-20171011-2": {
        "en": "11/10/2017: Implemented second `other buff` input forms.",
        "ja": "2017/10/11: 2つ目の`その他バフ`を入力する欄を追加."
    },
    "notice-20171117-1": {
        "en": "17/11/2017: Added the new skill 'Normal Celere (S)' / Added new weapons and charas.",
        "ja": "2017/11/17: 通常刹那(小)追加 / キャラと武器追加."
    },
    "notice-20171211-1": {
        "en": "11/12/2017: Added new weapons.",
        "ja": "2017/12/11: 武器追加."
    },
    "notice-20171229-1": {
        "en": "29/12/2017: Implemented Chara Limit Bonus Calculation and Ultima (Zeal) skill.",
        "ja": "2017/12/29: キャラLBの計算を実装 / オメガ激情の計算を実装."
    },
    "notice-20180102-1": {
        "en": "02/01/2018: Implemented Fandango skill.",
        "ja": "2018/01/02: 乱舞(小)の計算を実装 / ダメージ上限上昇が奥義ダメージ上限へ影響していなかった不具合を修正."
    },
    "notice-20180205-1": {
        "en": "05/02/2018: Implemented Stamina (M).",
        "ja": "2018/02/05: 渾身(中)の計算を実装 / 武器テンプレート追加."
    },
    "notice-20180311-1": {
        "en": "11/03/2018: Implemented Magna Stamina (M), Ultima Strength, and added new magna II Weapons.",
        "ja": "2018/03/11: 方陣渾身(中)、オメガ強壮の計算を実装 / マグナII武器テンプレート追加(スキルは未対応)."
    },
}

// 言語設定
module.exports.getLocale = function () {
    var lang = (
        (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage);
    if (lang == "ja-jp" || lang == "ja-JP") lang = "ja";
    if (lang != "ja") lang = "en";

    return lang;
}

module.exports.translate = function (key, locale) {
    if (key == undefined || key == "") return "";
    if (locale != "ja" && locale != "en") return multiLangData[key]["ja"];

    return multiLangData[key][locale];
}
