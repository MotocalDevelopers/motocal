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
        "ja": "別枠乗算のバフ(乗算を複数加味したい場合は乗算後の値を入力してください)",
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
    "奥義ゲージ上昇率アップ": {
        "en": "Ougi Gage Buff",
        "ja": "奥義ゲージ上昇量アップ",
    },
    "奥義ゲージ上昇率アップ説明": {
        "en": "Used on the expected turn damage calculation.",
        "ja": "奥義ゲージ上昇量に影響します。予想ターン毎ダメージの算出に使用されます。",
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
    "アプサラス": {
        "en": "Apsaras",
        "ja": "アプサラス",
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
    "単攻撃ダメージ": {
        "en": "Single Attack Damage\n(Freq.*Single Damage)",
        "ja": "単攻撃ダメージ\n(期待回数*単ダメージ)",
    },
    "ターン毎の奥義ゲージ上昇量": {
        "en": "Ougi Gage Rise per Turn",
        "ja": "ターン毎の\n奥義ゲージ上昇量",
    },
    "奥義ダメージ": {
        "en": "Ougi Damage",
        "ja": "奥義ダメージ",
    },
    "予想ターン毎ダメージ": {
        "en": "Exp. Damage per Turn",
        "ja": "予想ターンダメージ",
    },
    "パーティ平均予想ターン毎ダメージ": {
        "en": "Party-Averaged Exp. Turn Damage",
        "ja": "ターン毎ダメージの\nパーティ平均",
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
        "en": "Open Damage Simulator (Beta)",
        "ja": "ダメージシミュレータ (Beta)",
    },
    "ダメージシミュレータ": {
        "en": "Damage Simulator (Beta)",
        "ja": "ダメージシミュレータ (Beta)",
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
    "ゼウス系": {
        "en": "Zeus ",
        "ja": "ゼウス系",
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
    "平均に含める": {
        "en": "In Average",
        "ja": "平均に含める",
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
    "通常暴君": {
        "en": "Normal Tyranny",
        "ja": "通常暴君",
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
    "通常三手(大)": {
        "en": "Normal Trium (L)",
        "ja": "通常三手(大)",
    },
    "通常克己(中)": {
        "en": "Normal Restraint (M)",
        "ja": "通常克己(中)",
    },
    "通常神威": {
        "en": "Normal Majesty",
        "ja": "通常神威",
    },
    "通常括目": {
        "en": "Normal Heed",
        "ja": "通常括目",
    },
    "通常羅刹": {
        "en": "Normal Haunt",
        "ja": "通常羅刹",
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
    "マグナ三手(大)": {
        "en": "Magna Trium (L)",
        "ja": "マグナ三手(大)",
    },
    "マグナ克己(中)": {
        "en": "Magna Restraint (M)",
        "ja": "マグナ克己(中)",
    },
    "マグナ神威": {
        "en": "Magna Majesty",
        "ja": "マグナ神威",
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
    "マグナ守護": {
        "en": "Magna Aegis I",
        "ja": "マグナ守護",
    },
    "マグナ守護II": {
        "en": "Magna Aegis II",
        "ja": "マグナ守護II",
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
    "通常刹那": {
        "en": "Normal Celere",
        "ja": "通常刹那",
    },
    "マグナ刹那": {
        "en": "Magna Celere",
        "ja": "マグナ刹那",
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
    // Notice
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
}

// 言語設定
module.exports.getLocale = function() {
    var lang = (
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage);
    if(lang == "ja-jp") lang = "ja";
    if(lang != "ja") lang = "en";

    return lang;
}

module.exports.translate = function(key, locale) {
    // console.log("key = ", key)
    if(key == undefined || key == "") return "";
    if(locale != "ja" && locale != "en") return multiLangData[key]["ja"];

    return multiLangData[key][locale];
}
