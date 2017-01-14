var React = require('react');

var multiLangData = {
    "motocal": {
        "en": "motocal / Granblue Fantasy ATK Calculator",
        "ja": "元カレ計算機(グラブル攻撃力計算機)",
    },
    "使い方": {
        "en": "How To Use",
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
    "追加ダメージバフ": {
        "en": "Additional Damage Buff",
        "ja": "追加ダメージバフ",
    },
    "追加ダメージバフ説明": {
        "en": "Additional damage will be added to \"Expected Turn Damage\".",
        "ja": "追加ダメージが発生するとしてダメージを上乗せします。予想ターン毎ダメージの算出に使用されます。",
    },
    "残HP割合": {
        "en": "Remain HP Ratio",
        "ja": "残HP割合",
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
        "en": "Zenith Park ATK",
        "ja": "ゼニス攻撃力",
    },
    "ゼニスHP": {
        "en": "Zenith Park HP",
        "ja": "ゼニスHP",
    },
    "マスボATK": {
        "en": "Master Bonus ATK",
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
        "en": "Arm Zenith Park I",
        "ja": "武器ゼニスI",
    },
    "武器ゼニス2": {
        "en": "Arm Zenith Park II",
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
        "en": "Berserk",
        "ja": "ベルセルク",
    },
    "セージ": {
        "en": "Sage",
        "ja": "セージ",
    },
    "スパルタ": {
        "en": "Sparta",
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
        "en": "Gizoku",
        "ja": "義賊",
    },
    "レスラー": {
        "en": "Wrestler",
        "ja": "レスラー",
    },
    "ハウンドドッグ": {
        "en": "Hound dog",
        "ja": "ハウンドドッグ",
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
        "en": "Sword Holy",
        "ja": "剣聖",
    },
    "ガンスリンガー": {
        "en": "Gunsringer",
        "ja": "ガンスリンガー",
    },
    "賢者": {
        "en": "Wiseman",
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
        "en": "Bisshop",
        "ja": "ビショップ",
    },
    "ハーミット": {
        "en": "Hermit",
        "ja": "ハーミット",
    },
    "ホークアイ": {
        "en": "Hork eye",
        "ja": "ホークアイ",
    },
    "オーガ": {
        "en": "Oga",
        "ja": "オーガ",
    },
    "サイドワインダー": {
        "en": "Side winder",
        "ja": "サイドワインダー",
    },
    "スーパースター": {
        "en": "Super star",
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
        "en": "Peculiar",
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
    "初期攻撃力推移グラフ": {
        "en": "Open Initial Attack Variation Graph",
        "ja": "初期攻撃力推移グラフを開く",
    },
    "ダメージシミュレータ": {
        "en": "Open Damage Simulator (Beta)",
        "ja": "ダメージシミュレータ (Beta)",
    },
    "結果": {
        "en": "Result No. ",
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
    "通常攻刃": {
        "en": "Attack ",
        "ja": "通常攻刃",
    },
    "通常背水": {
        "en": "Enmity ",
        "ja": "通常背水",
    },
    "通常渾身": {
        "en": "Konshin ",
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
    "グラフに加える": {
        "en": "Add to \ngraphs",
        "ja": "グラフに\n加える",
    },
    "本": {
        "en": "",
        "ja": "本",
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
        "en": "Include in Average",
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
        "en": "Select Display Element",
        "ja": "表示項目切替",
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
    }
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
    if(key == undefined || key == "") return "";
    if(locale != "ja" && locale != "en") return multiLangData[key]["ja"];

    return multiLangData[key][locale];
}
