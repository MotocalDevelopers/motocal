var React = require('react');

var multiLangData = {
    "motocal": {
        "en": "motocal / Granblue Fantasy ATK Calculator",
        "ja": "元カレ計算機(グラブル攻撃力計算機)",
        "zh": "前男友计算器(碧蓝幻想攻击力计算器)",
    },
    "応援テキスト": {
        "en": "Kanpa to Me",
        "ja": "製作者を応援する",
        "zh": "支持制作者",
    },
    "メイン装備yes": {
        "en": "Main",
        "ja": "メイン武器である",
        "zh": "是主手武器",
    },
    "メイン装備no": {
        "en": "Sub",
        "ja": "メイン武器ではない",
        "zh": "不是主手武器",
    },
    "グラフ": {
        "en": "Graph",
        "ja": "グラフ",
        "zh": "图表",
    },
    "使い方": {
        "en": "Manual(JP)",
        "ja": "使い方",
        "zh": "使用方法(日语)",
    },
    "ジータ": {
        "en": "Player",
        "ja": "ジータ",
        "zh": "主角",
    },
    "召喚石": {
        "en": "Summon",
        "ja": "召喚石",
        "zh": "召唤石",
    },
    "キャラ": {
        "en": "Chara",
        "ja": "キャラ",
        "zh": "角色",
    },
    "武器": {
        "en": "WPN",
        "ja": "武器",
        "zh": "武器",
    },
    "武器(タブ)": {
        "en": "Weapon",
        "ja": "武器",
        "zh": "武器",
    },
    "保存": {
        "en": "Save",
        "ja": "保存",
        "zh": "保存",
    },
    "データ名": {
        "en": "Data Name",
        "ja": "データ名",
        "zh": "数据名",
    },
    "ブラウザデータリスト": {
        "en": "Browser Data List",
        "ja": "ブラウザに保存されたデータ",
        "zh": "保存在浏览器中的数据",
    },
    "ブラウザデータ読込": {
        "en": "Load",
        "ja": "読込",
        "zh": "读取",
    },
    "ブラウザに保存": {
        "en": "Save",
        "ja": "保存",
        "zh": "保存",
    },
    "データ移行": {
        "en": "Export/Import",
        "ja": "データ移行",
        "zh": "导入/导出",
    },
    "移行データ出力": {
        "en": "Export",
        "ja": "データ出力",
        "zh": "数据导出",
    },
    "移行データ入力": {
        "en": "Import",
        "ja": "データ入力",
        "zh": "数据导入",
    },
    "ダウンロード": {
        "en": "Download",
        "ja": "ダウンロード",
        "zh": "下载",
    },
    "アップロード": {
        "en": "Upload",
        "ja": "アップロード",
        "zh": "上传",
    },
    "なし": {
        "en": "No job",
        "ja": "なし",
        "zh": "无职业",
    },
    "無し": {
        "en": "none",
        "ja": "無し",
        "zh": "无",
    },
    "火": {
        "en": "Fire",
        "ja": "火",
        "zh": "火",
    },
    "風": {
        "en": "Wind",
        "ja": "風",
        "zh": "风",
    },
    "土": {
        "en": "Earth",
        "ja": "土",
        "zh": "土",
    },
    "水": {
        "en": "Water",
        "ja": "水",
        "zh": "水",
    },
    "光": {
        "en": "Light",
        "ja": "光",
        "zh": "光",
    },
    "闇": {
        "en": "Dark",
        "ja": "闇",
        "zh": "暗",
    },
    "光/火": {
        "en": "Light/Fire",
        "ja": "光/火",
        "zh": "光/火",
    },
    "光/闇": {
        "en": "Light/Dark",
        "ja": "光/闇",
        "zh": "光/暗",
    },
    "闇/土": {
        "en": "Dark/Earth",
        "ja": "闇/土",
        "zh": "暗/土",
    },
    "闇/水": {
        "en": "Dark/Water",
        "ja": "闇/水",
        "zh": "暗/水",
    },
    "闇/火": {
        "en": "Dark/Fire",
        "ja": "闇/火",
        "zh": "暗/火",
    },
    "火/水": {
        "en": "Fire/Water",
        "ja": "火/水",
        "zh": "火/水",
    },
    "水/光": {
        "en": "Water/Light",
        "ja": "水/光",
        "zh": "水/光",
    },
    "風/土": {
        "en": "Wind/Earth",
        "ja": "風/土",
        "zh": "风/土",
    },
    "風/光": {
        "en": "Wind/Light",
        "ja": "風/光",
        "zh": "风/光",
    },
    "風/火": {
        "en": "Wind/Fire",
        "ja": "風/火",
        "zh": "风/火",
    },
    "土/光": {
        "en": "Earth/Light",
        "ja": "土/光",
        "zh": "土/光",
    },
    "全属性": {
        "en": "All",
        "ja": "全属性",
        "zh": "全属性",
    },
    "無": {
        "en": "Non",
        "ja": "無",
        "zh": "无",
    },
    "無（技巧あり）": {
        "en": "Non (but Crit.)",
        "ja": "無（技巧あり）",
        "zh": "无 (有技巧)",
    },
    "バフ": {
        "en": "Buff",
        "ja": "バフ",
        "zh": "Buff",
    },
    "通常バフ": {
        "en": "ATK Buff",
        "ja": "攻撃バフ",
        "zh": "通常Buff",
    },
    "通常バフ説明": {
        "en": "ATK Buff. ",
        "ja": "攻撃(攻刃)バフ。レイジIII(30%)、レイジIV(40%)など。",
        "zh": "通常攻刃Buff",
    },
    "属性バフ": {
        "en": "Element Buff",
        "ja": "属性バフ",
        "zh": "属性Buff",
    },
    "属性バフ説明": {
        "en": "Element Buff. Ultima Weapon(30%) etc.",
        "ja": "属性枠のバフ。オメガ武器(30%)など",
        "zh": "属性Buff",
    },
    "その他バフ": {
        "en": "Other Buff",
        "ja": "別枠バフ",
        "zh": "其他Buff",
    },
    "その他バフ説明": {
        "en": "Other Buff(GW Buff etc.)",
        "ja": "別枠乗算のバフ。騎空艇効果(10%)、騎空団炉サポ効果(10%)、副団アビ(5%)、攻撃アビ(20%)など。",
        "zh": "独立乘算Buff",
    },
    "その他バフ2": {
        "en": "Other Buff II",
        "ja": "別枠バフ2",
        "zh": "其他Buff2",
    },
    "その他バフ2説明": {
        "en": "Other Buff II",
        "ja": "別枠乗算のバフ(もし別枠バフが2つ以上ある場合用)",
        "zh": "独立乘算Buff(独立Buff有2个以上时用)",
    },
    "クリティカルバフ": {
        "en": "Critical Buff",
        "ja": "クリティカルバフ",
        "zh": "Critical Buff",
    },
    "クリティカルバフ説明": {
        "en": "Critical Buffs.",
        "ja": "クリティカルバフ",
        "zh": "Critical Buffs.",
    },
    "発動率": {
        "en": "Hit Rate ",
        "ja": "発動率 ",
        "zh": "Hit Rate ",
    },
    "倍率": {
        "en": "Damage Multiplier ",
        "ja": "倍率 ",
        "zh": "Damage Multiplier ",
    },
    "数": {
        "en": "Count:",
        "ja": "数",
        "zh": "Count:",
    },
    "HPバフ": {
        "en": "HP Buff",
        "ja": "HPバフ",
        "zh": "HP Buff",
    },
    "HPバフ説明": {
        "en": "HP Buff(GW Buff etc.)",
        "ja": "HP上昇のバフ。副団長アビ(10%)、防衛アビ(20%)など。",
        "zh": "HP上升Buff(古战场等计算用)",
    },
    "DAバフ": {
        "en": "DA Buff",
        "ja": "DAバフ",
        "zh": "DA Buff",
    },
    "DAバフ説明": {
        "en": "Double Attack Buff for Party. The value will be added to Character's base double attack ratio. Four-Sky Blade(30%), Love Eternal(35%), Ultima Weapon(20%) etc.",
        "ja": "DA率が上がります。各キャラの基礎DA率に加算されます。四天刃(30%)、エタラブ(35%)、オメガ武器(20%)など。",
        "zh": "DA率上升。加在每个角色的基础DA率上。",
    },
    "TAバフ": {
        "en": "TA Buff",
        "ja": "TAバフ",
        "zh": "TA Buff",
    },
    "TAバフ説明": {
        "en": "Triple Attack Buff for Party. The value will be added to Character's base triple attack ratio. Four-Sky Blade(30%), Love Eternal(35%) etc.",
        "ja": "TA率が上がります。各キャラの基礎TA率に加算されます。四天刃(30%)、エタラブ(35%)など。",
        "zh": "TA率上升。加在每个角色的基础DA率上。",
    },
    "効果量": {
        "en": "Amount",
        "ja": "効果量",
        "zh": "Amount",
    },
    "追加ダメージXA": { // additionalDamageXA
        "en": "Bonus DMG XA",
        "ja": "連撃時追加ダメージ",
        "zh": "追加伤害 XA",
    },
    "追加ダメージ": {
        "en": "Bonus DMG", //a.k.a: additionalDamage
        "ja": "追加ダメージ",
        "zh": "追加伤害",
    },
    "追加ダメージバフ": {
        "en": "Bonus DMG Buff", //a.k.a: additionalDamageBuff
        "ja": "追撃バフ",
        "zh": "追加伤害Buff",
    },
    "追加ダメージバフ説明": {
        "en": "Bonus Damage will be added to \"Expected Turn Damage\". Chaser of Warlock(20%), Parazonium(15%) etc.",
        "ja": "通常攻撃に割合分の追加ダメージを上乗せします。予想ターン毎ダメージの算出に使用されます。ウォーロックのチェイサー(20%)、パラゾ(15%)など。",
        "zh": "视作追加伤害，额外加在伤害上。用在预想DPT的计算中。",
    },
    "supplementalDamageBuff": {
        "en": "Supplemental Damage Buff",
        "ja": "与ダメージ上昇効果バフ",
        "zh": "Supplemental Damage Buff",
    },
    "supplementalDamageBuff-tooltip": {
        "en": "DMG Boosted status effect. Hollowsky Axe's C.A. (10000), etc.",
        "ja": "与ダメージ上昇効果。虚空斧奥義(10000)など。",
        "zh": "DMG Boosted status effect. Hollowsky Axe's C.A. (10000), etc.",
    },
    "奥義ダメージバフ": {
        "en": "C.A. DMG Buff",
        "ja": "奥義ダメージバフ",
        "zh": "C.A. DMG Buff",
    },
    "奥義ゲージ上昇量バフ": {
        "en": "Charge Bar Speed UP Buff",
        "ja": "奥義ゲージ上昇量バフ",
        "zh": "Charge Bar Speed UP Buff",
    },
    "ダメージ上限バフ": {
        "en": "DMG Cap Buff",
        "ja": "ダメージ上限バフ",
        "zh": "DMG Cap Buff",
    },
    "奥義ダメージ上限バフ": {
        "en": "C.A. DMG Buff",
        "ja": "奥義ダメージ上限バフ",
        "zh": "C.A. DMG Buff",
    },

    "与ダメージ上昇": {
        "en": "Damage UP ",
        "ja": "与ダメージ上昇",
        "zh": "造成伤害上升",
    },
    "個別バフ": {
        "en": "Indiv Buff", //a.k.a: Personal buff
        "ja": "個別バフ",
        "zh": "个别Buff",
    },
    "残HP割合": {
        "en": "Remain HP Ratio",
        "ja": "残りHP割合",
        "zh": "剩余HP比例",
    },
    "残りHP": {
        "en": "Remain HP",
        "ja": "残りHP",
        "zh": "剩余HP",
    },
    "残HP割合説明(ジータのみ)": {
        "en": "Remain HP Ratio of the Player. Use \"Remain HP Ratio\" form in Buff for Party if you want to set the remain HP ratio of all member.",
        "ja": "ジータさんの残りHP割合です。パーティ全体の残りHP割合を一括で指定したい場合は、\"パーティ全体への効果\"側で\”残HP割合\"を指定して下さい。",
        "zh": "主角的剩余HP比例。要同时指定全队的剩余HP比例的时候，请指定\"对全队的效果\"中的\"剩余HP比例\"。 ",
    },
    "残HP割合説明": {
        "en": "Remain HP Ratio of all members. (If chara's HP ratio is inputted, lower value is adopted for calculation.)",
        "ja": "パーティ全体の残りHP割合です。(キャラ個別の値が入力されている場合、より低い方を採用します)",
        "zh": "全队的剩余HP比例。(角色个别的值也有输入的话适用更低的)",
    },
    "奥義ゲージ上昇量": {
        "en": "Charge Bar Buff", //a.k.a: ougiGageBuff
        "ja": "奥義ゲージ上昇量",
        "zh": "奥义槽上升量",
    },
    "奥義ゲージ上昇率アップ": {
        "en": "Charge Bar\nSpeed UP",
        "ja": "奥義ゲージ\n上昇量",
        "zh": "奥义槽上升量上升",
    },
    "奥義ゲージ上昇率アップ説明": {
        "en": "Used on the expected turn damage calculation.",
        "ja": "攻撃等の奥義ゲージ上昇量に影響します。予想ターン毎ダメージの算出に使用されます。",
        "zh": "影响奥义槽上升量。在预想DPT计算中有用到。",
    },
    "チェインダメージアップ": {
        "en": "Chain DMG UP", //a.k.a: chainDamageUP
        "ja": "チェインダメージUP",
        "zh": "チェイン义伤害上升",
    },
    "ダメージ上限アップ": {
        "en": "DMG Cap", //a.k.a: damagelimit
        "ja": "ダメージ上限",
        "zh": "伤害上限上升",
    },
    "ダメージ上限アップ説明": {
        "en": "It is used to calc the normal attack damage. Unlike the game specification, C.A. Damage Cap does not go up.",
        "ja": "通常攻撃ダメージの算出に使用されます。グラブルの仕様とは異なり奥義ダメージ上限は上がりません。",
        "zh": "通常攻击伤害的计算中有用到。",
    },
    "チェインダメージ上限アップ": {
        "en": "Chain DMG Cap",  //a.k.a: chainDamageLimit
        "ja": "チェインダメージ上限UP",
        "zh": "链义伤害上限上升",
    },
    "奥義ダメージ上限アップ": {
        "en": "C.A. DMG Cap", //a.k.a: ougiDamageLimit
        "ja": "奥義ダメージ\n上限",
        "zh": "奥义伤害上限上升",
    },
    "奥義ダメージ上限アップ説明": {
        "en": "It is used to calc the C.A damage.",
        "ja": "奥義ダメージの算出に使用されます。",
        "zh": "奥义伤害的计算中有用到。",
    },
    "奥義ゲージ上昇奥義": {
        "en": "Charge Boost C.A.",
        "ja": "奥義時の奥義ゲージ上昇効果",
        "zh": "Charge Boost C.A.",
    },
    "奥義ゲージ上昇奥義説明": {
        "en": "Decrease the maximum Charge Bar value by the effect size. Unsigned Kaneshige(10%) etc.",
        "ja": "奥義ゲージ最大値を効果分マイナスして擬似的に再現します(奥義ゲージ上昇率バフも加味)。無銘金重(10%)など",
        "zh": "Decrease the maximum Charge Bar value by the effect size. Unsigned Kaneshige(10%) etc.",
    },
    "高揚": {
        "en": "Uplift",
        "ja": "高揚",
        "zh": "Uplift",
    },
    "高揚説明": {
        "en": "Increase charge bar each turn. True Purity Sunblade C.A.(10%) and likes-",
        "ja": "毎ターン奥義ゲージが上昇する状態。真・道天浄土の奥義(10%)など",
        "zh": "Increase charge bar each turn. True Purity Sunblade C.A.(10%) and likes-",
    },
    "Advanced": {
        "en": "Advanced Settings",
        "ja": "より細かい設定",
        "zh": "高级设置",
    },
    "Advanced 説明": {
        "en": "For people willing to calculate more particularly.",
        "ja": "もっともっと詳しく計算したい方向けの項目です。",
        "zh": "适合想要进行更加详细的计算的人。",
    },
    "敵防御固有値": {
        "en": "Enemy Innate DEF",
        "ja": "敵防御固有値",
        "zh": "敌人的防御值",
    },
    "敵防御固有値説明": {
        "en": "Select enemy's defense value.\nIt affects damage calculations.",
        "ja": "想定される敵の防御固有値を設定します。\n単攻撃ダメージ、奥義ダメージ、\n 予想ターン毎ダメージの計算に影響します。\n (単攻撃ダメージに減衰補正がかかる(44万超え) \n ような攻撃力でない限り、編成の順位自体は変化しないと思われます。)",
        "zh": "设定假想敌的防御值。\n影响攻击伤害、奥义伤害、预想DPT。",
    },
    "防御デバフ合計": {
        "en": "DEF Debuff",
        "ja": "防御デバフ",
        "zh": "DEF Debuff",
    },
    "防御デバフ合計説明": {
        "en": "Set sums of defense debuff values.The normal lower limit is 50%. Forfeit category is 60%.",
        "ja": "防御デバフの合計をパーセントで設定。通常の下限が50%。喪失枠を付与すると60%になります。",
        "zh": "Set sums of defense debuff values.The normal lower limit is 50%. Forfeit category is 60%.",
    },
    "特殊効果": {
        "en": "Special Effects",
        "ja": "特殊効果",
        "zh": "Special Effects",
    },
    "烈日の楽園": {
        "en": "Sun-Touched Paradise",
        "ja": "烈日の楽園",
        "zh": "烈日の楽園",
    },
    "烈日の楽園説明": {
        "en": "All Allies gain 20% unique buff, and can deal critical hits regardless of element. (Alanaan)",
        "ja": "対象の属性に関係なく味方のクリティカルが発生し、味方の攻撃力上昇 別枠乗算20% (アラナン)",
        "zh": "All Allies gain 20% unique buff, and can deal critical hits regardless of element. (Alanaan)",
    },
    "死ト愛ノ世界": {
        "en": "World of Death and Love",
        "ja": "死ト愛ノ世界",
        "zh": "死ト愛ノ世界",
    },
    "死ト愛ノ世界説明": {
        "en": "All Allies gain 20% unique buff, and deal 30% bonus DMG for one-foe attacks. (Nier)",
        "ja": "パーティ全体に別枠20%、追撃30%を付与 (ニーア)",
        "zh": "All Allies gain 20% unique buff, and deal 30% bonus DMG for one-foe attacks. (Nier)",
    },
    "アクティブ": {
        "en": ": Active",
        "ja": ": アクティブ",
        "zh": ": Active",
    },
    "無効": {
        "en": ": Inactive",
        "ja": ": 無効",
        "zh": ": Inactive",
    },
    "敵非有利耐性": {
        "en": "Enemy Resistance",
        "ja": "敵非有利耐性",
        "zh": "Enemy Resistance",
    },
    "敵非有利耐性説明": {
        "en": "Enemy's damage reduction for elements they are not weak to. Unite and Fight's NIGHTMARE(25%), EX+(50%) and likes-",
        "ja": "敵の非有利属性時に生じる耐性を設定します。古戦場HELL(20%)、犬EX+(50%)など。",
        "zh": "Enemy's damage reduction for elements they are not weak to. Unite and Fight's NIGHTMARE(25%), EX+(50%) and likes-",
    },
    "ジータさん基礎DA率説明": {
        "en": "Input base double attack ratio of player.\nIt will be automatically changed when \"Job\" is changed.",
        "ja": "ジータさんの基礎DA率を設定します。\nジョブを変更すると自動的に切り替わります。",
        "zh": "设定主角的基础DA率。\n随着职业变更会自动切换。",
    },
    "奥義倍率": {
        "en": "C.A. Multiplier", //a.k.a: ougiRatio
        "ja": "奥義倍率",
        "zh": "奥义倍率",
    },
    "奥義追加ダメージ(無属性固定)": {
        "en": "C.A. Bonus DMG (Plain)",
        "ja": "奥義追加ダメージ(無属性固定)",
        "zh": "C.A. Bonus DMG (Plain)",
    },
    "ジータさん基礎TA率説明": {
        "en": "Input base double attack ratio of player.\nIt will be automatically changed when \"Job\" is changed.",
        "ja": "ジータさんの基礎TA率を設定します。\nジョブを変更すると自動的に切り替わります。",
        "zh": "设定主角的基础TA率。\n随着职业变更会自动切换。",
    },
    "ジータさん奥義倍率説明": {
        "en": "Input C.A. ratio of player.\nIt affects calculation of C.A. Damage and Expected Turn Damage.",
        "ja": "ジータさんの奥義倍率を設定します。\n奥義ダメージ、予想ターン毎ダメージの計算に影響します。",
        "zh": "设定主角的奥义倍率。\n影响奥义伤害和预测DPT。",
    },
    "確保HP": {
        "en": "Minimum\nPlayer HP",
        "ja": "確保したい\nジータさんHP",
        "zh": "希望确保的主角HP量",
    },
    "確保HP説明": {
        "en": "Input minimum HP of player.\nWeapon arrangement which HP gets lower than this value will be omitted.",
        "ja": "暴君・守護など混みの最終HPの最低ラインを設定できます。\nこれを下回った編成は表示されません。\n(初期値は0です) ジータさんのHPベースです。",
        "zh": "设定暴君・守护之类武器放入后最终HP的最低值。\n不会显示比这个值更低的编成。\n(初始值为0)以主角的HP作为基准。",
    },
    "プロフィールタイトル": {
        "en": "Player Infomation",
        "ja": "ジータさん情報 (*: 推奨入力項目)",
        "zh": "主角情报(*: 推荐输入)",
    },
    "ランク": {
        "en": "Rank",
        "ja": "ランク",
        "zh": "Rank",
    },
    "ランク説明": {
        "en": "Base ATK and HP are based on this value.",
        "ja": "基礎攻撃力、基礎HPなどはランクに従って自動で計算されます",
        "zh": "基础攻击力、基础HP等会跟着Rank自动计算出。",
    },

    "ジータさん性別": {
        "en": "Player's Sex",
        "ja": "ジータさん\n性別",
        "zh": "主角的性別",
    },

    "ジョブ": {
        "en": "Classes", //a.k.a: job
        "ja": "ジョブ",
        "zh": "职业",
    },
    "ジョブ説明": {
        "en": "Classes bonuses and Specialty weapons bonuses are automatically inclueded in calculation. Select \"none\" if you want no bonuses and Specialty weapons.",
        "ja": "ジョブごとのボーナス等は自動で反映されます。得意武器補正などを反映したくない場合\"なし\"を選択して下さい。",
        "zh": "不同职业的Bonus会自动反映。不想让得意武器补正之类反映出的话请选择\"无\"。",
    },
    "攻撃ボーナス": {
        "en": "ATK Bonus",
        "ja": "攻撃ボーナス",
        "zh": "攻击Bonus",
    },
    "HPボーナス": {
        "en": "HP Bonus",
        "ja": "HPボーナス",
        "zh": "HP Bonus",
    },
    "攻刃ボーナス": {
        "en": "Might Bonus",
        "ja": "攻刃ボーナス",
        "zh": "攻刃Bonus",
    },
    "守護ボーナス": {
        "en": "Aegis Bonus",
        "ja": "守護ボーナス",
        "zh": "守护Bonus",
    },

    "ジータさんリミットボーナス": {
        "en": "Player's Extended Mastery",
        "ja": "ジータさんリミットボーナス",
        "zh": "Player's Extended Mastery",
    },
    "ジータさんリミットボーナス説明": {
        "en": "Enter the Extended Mastery for each Class.",
        "ja": "ジョブごとのリミットボーナス(LB)を入力して下さい。",
        "zh": "Enter the Extended Mastery for each Class.",
    },
    "味方全体のHP": {
        "en": "Total Party HP",
        "ja": "味方全体HP",
        "zh": "己方全体HP LB",
    },
    "LB 久遠の指輪": {
        "en": "Perpetuity Ring",
        "ja": "久遠の指輪",
        "zh": "久遠の指輪",
    },
    "LB 攻撃力": {
        "en": "ATK ",
        "ja": "攻撃力",
        "zh": "攻击力",
    },
    "LB HP": {
        "en": "HP",
        "ja": "HP",
        "zh": "HP",
    },
    "得意武器攻撃1": {
        "en": "Specialty WPN I\n",
        "ja": "得意武器攻撃I",
        "zh": "武器LB 1",
    },
    "得意武器攻撃2": {
        "en": "Specialty WPN II\n",
        "ja": "得意武器攻撃II",
        "zh": "武器LB 2",
    },
    "得意武器攻撃の説明": {
        "en": "Specialty WPN Ⅱ (Over ★4) is calculated as 6%, 8%, 10% on the assumption that Ⅰ is all mastered.",
        "ja": "得意武器IIのLB（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。",
        "zh": "得意武器II的LB(★4以上)在I全部取得的前提下按6%, 8%, 10%计算。",
    },
    "LB DA": {
        "en": "DA",
        "ja": "DA",
        "zh": "DA",
    },
    "LB DAの説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB TA": {
        "en": "TA",
        "ja": "TA",
        "zh": "TA",
    },
    "LB TAの説明": {
        "en": "TA",
        "ja": "TA",
        "zh": "TA",
    },
    "LB ダメージ上限UP": {
        "en": "DMG Cap",
        "ja": "ダメージ上限UP",
        "zh": "DMG Cap",
    },
    "LB ダメージ上限UPの説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB 奥義": {
        "en": "C.A. DMG",
        "ja": "奥義ダメージ",
        "zh": "C.A. DMG",
    },
    "LB 奥義の説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB 属性攻撃": {
        "en": "Element ATK",
        "ja": "属性攻撃",
        "zh": "Element ATK",
    },
    "LB 属性攻撃の説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB チェンバ": {
        "en": "Chain Burst DMG",
        "ja": "チェンバ",
        "zh": "Chain Burst DMG",
    },
    "LB チェンバの説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB チェンバ上限": {
        "en": "Chain Burst DMG Cap",
        "ja": "チェンバ上限",
        "zh": "Chain Burst DMG Cap",
    },
    "LB チェンバ上限の説明": {
        "en": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
        "ja": "II以降はIを★3まで取得していること前提です。",
        "zh": "It is assumed that Ⅰ has been acquired to ★3 since Ⅱ.",
    },
    "LB クリティカル": {
        "en": "Critical",
        "ja": "クリティカル",
        "zh": "Critical",
    },
    "小": {
        "en": "Small",
        "ja": "小",
        "zh": "小",
    },
    "中": {
        "en": "Medium",
        "ja": "中",
        "zh": "中",
    },
    "大": {
        "en": "Big",
        "ja": "大",
        "zh": "大",
    },
    "LB クリティカルの説明": {
        "en": "",
        "ja": "発生率と倍率共にの%",
        "zh": "",
    },
    "その他ジータさんLB": {
        "en": "Other Perk",
        "ja": "他LB",
        "zh": "Other Perk",
    },

    "指輪": {
        "en": "Over Mastery",
        "ja": "EXLB",
        "zh": "Over Mastery",
    },
    "奥義ダメージ上限": {
        "en": "C.A. DMG Cap",
        "ja": "奥義ダメージ上限",
        "zh": "奧義上限",
    },
    "クリティカル確率": {
        "en": "Critical Hit",
        "ja": "クリティカル確率",
        "zh": "暴擊率",
    },
    "背水": {
        "en": "Enmity",
        "ja": "背水",
        "zh": "背水",
    },
    "渾身": {
        "en": "Stamina",
        "ja": "渾身",
        "zh": "渾身",
    },
    "DA": {
        "en": "DA",
        "ja": "DA",
        "zh": "DA",
    },
    "TA": {
        "en": "TA",
        "ja": "TA",
        "zh": "TA",
    },


    "ジータさんマスターボーナス": {
        "en": "Player's Master Bonuses",
        "ja": "ジータさんマスターボーナス",
        "zh": "主角的职业满级Bonu",
    },
    "ジータさんマスターボーナス説明": {
        "en": "Enter the total value of Master Bonuses to be acquired when you make Class Lv20.\n(GBF Party screen > Classes > Bonuses tab)",
        "ja": "ジョブLv20になると取得するマスターボーナスの合計値を入力して下さい\n(グラブル編成画面>ジョブ詳細>ボーナスタブ)",
        "zh": "Enter the total value of Master Bonuses to be acquired when you make Class Lv20.\n(GBF Party screen > Classes > Bonuses tab)",
    },
    "マスボATK": {
        "en": "ATK",
        "ja": "攻撃力",
        "zh": "攻击力",
    },
    "マスボATK説明": {
        "en": "The value of Job Master bonus \"ATK+○○%\"",
        "ja": "ジョブマスターボーナスの\"攻撃力+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
        "zh": "职业满级Bonus中\"攻击力+○○％\"中的值\n(和各职业的Bonus是独立的)",
    },
    "マスボHP": {
        "en": "HP",
        "ja": "HP",
        "zh": "HP",
    },
    "マスボHP説明": {
        "en": "The value of Job Master bonus \"HP+○○%\"",
        "ja": "ジョブマスターボーナスの\"HP+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
        "zh": "职业满级Bonus中\"HP+○○％\"中的值\n(和各职业的Bonus是独立的)",
    },
    "マスボDA": {
        "en": "DA",
        "ja": "DA",
        "zh": "DA",
    },
    "マスボDA説明": {
        "en": "The value of Job Master bonus \"DA+○○%\"",
        "ja": "ジョブマスターボーナスの\"DA+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
        "zh": "职业满级Bonus中\"DA+○○％\"中的值\n(和各职业的Bonus是独立的)",
    },
    "マスボTA": {
        "en": "TA",
        "ja": "TA",
        "zh": "TA",
    },
    "マスボTA説明": {
        "en": "The value of Job Master bonus \"TA+○○%\"",
        "ja": "ジョブマスターボーナスの\"TA+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
        "zh": "职业满级Bonus中\"TA+○○％\"中的值\n(和各职业的Bonus是独立的)",
    },
    "マスボダメ上限": {
        "en": "DMG Cap",
        "ja": "ダメージ上限",
        "zh": "DMG Cap",
    },
    "マスボダメ上限説明": {
        "en": "The value of Job Master bonus \"DMG Cap+○○%\"",
        "ja": "ジョブマスターボーナスの\"ダメージ上限+○○％\"の値です\n(各ジョブごとのボーナスとは別です)",
        "zh": "职业满级Bonus中\"DMG Cap+○○％\"中的值\n(和各职业的Bonus是独立的)",
    },

    "ジータさん属性": {
        "en": "Player's Element",
        "ja": "ジータさん\n属性",
        "zh": "主角的属性",
    },
    "敵の属性": {
        "en": "Enemy's Element",
        "ja": "敵の属性",
        "zh": "敌人的属性",
    },
    "敵の属性説明": {
        "en": "Element Correlation is automatically judged.",
        "ja": "有利/非有利/不利は、敵の属性に従って自動で判定されます。",
        "zh": "有利/非有利/不利会随着敌人的属性自动判定出。",
    },
    "基礎DA率": {
        "en": "Base DA",
        "ja": "基礎DA率",
        "zh": "基础DA率",
    },
    "基礎TA率": {
        "en": "Base TA",
        "ja": "基礎TA率",
        "zh": "基础TA率",
    },
    "パーティバフタイトル": {
        "en": "Buff for Party",
        "ja": "パーティ全体へのバフ等",
        "zh": "全队Buff",
    },
    "パーティバフ説明": {
        "en": "Input buffs for a party.(There is no Duration and it will be reflected permanently.)",
        "ja": "パーティメンバー全体にかかるバフ等の情報を入力してください。(効果ターンはなく永続的に反映されます)",
        "zh": "输入全队Buff",
    },
    "保存済みリスト名説明": {
        "en": "Input the name of the saved grid.",
        "ja": "保存した編成の名前を設定できます",
        "zh": "设定保存到编成的名字",
    },
    "チェイン数": {
        "en": "Chain Burst\nNumber",
        "ja": "チェイン数",
        "zh": "Chain数",
    },
    "チェイン数説明": {
        "en": "Input the number of C.A. Chain. (1~4)",
        "ja": "チェイン数を指定してください（チェインバーストボーナスの係数が変化します）\n チェイン数1 → 0倍\n 2 → 1.25倍\n 3 → 1.33…倍\n 4 → 1.5倍",
        "zh": "设定Chain数(Chain Burst的系数会变化)",
    },
    "弱い編成を隠す": {
        "en": "Hide Weaker Grids",
        "ja": "弱い編成を隠す",
        "zh": "Hide Weaker Grids"
    },
    "ジータさんのみ": {
        "en": "(Player only)",
        "ja": "(ジータさんのみ)",
        "zh": "(主角限定)",
    },
    "ジータさん": {
        "en": "Player",
        "ja": "ジータさん",
        "zh": "主角",
    },
    "銃": {
        "en": "Gun",
        "ja": "銃",
        "zh": "铳",
    },
    "刀": {
        "en": "Katana",
        "ja": "刀",
        "zh": "刀",
    },
    "斧": {
        "en": "Axe",
        "ja": "斧",
        "zh": "斧",
    },
    "弓": {
        "en": "Bow",
        "ja": "弓",
        "zh": "弓",
    },
    "剣": {
        "en": "Sword",
        "ja": "剣",
        "zh": "剑",
    },
    "短剣": {
        "en": "Dagger",
        "ja": "短剣",
        "zh": "短剑",
    },
    "格闘": {
        "en": "Melee", //a.k.a: Fist
        "ja": "格闘",
        "zh": "格斗",
    },
    "槍": {
        "en": "Spear",
        "ja": "槍",
        "zh": "枪",
    },
    "楽器": {
        "en": "Music",
        "ja": "楽器",
        "zh": "乐器",
    },
    "杖": {
        "en": "Staff",
        "ja": "杖",
        "zh": "杖",
    },
    "得意": {
        "en": "Specialty", //a.k.a: Favorite
        "ja": "得意",
        "zh": "得意",
    },
    "ベルセルク": {
        "en": "Berserker",
        "ja": "ベルセルク",
        "zh": "Berserker",
    },
    "セージ": {
        "en": "Sage",
        "ja": "セージ",
        "zh": "Sage",
    },
    "スパルタ": {
        "en": "Spartan",
        "ja": "スパルタ",
        "zh": "Spartan",
    },
    "ウォーロック": {
        "en": "Warlock",
        "ja": "ウォーロック",
        "zh": "Warlock",
    },
    "カオスルーダー": {
        "en": "Chaos lewder",
        "ja": "カオスルーダー",
        "zh": "Chaos Lewder",
    },
    "義賊": {
        "en": "Bandit Tycoon",
        "ja": "義賊",
        "zh": "义贼",
    },
    "レスラー": {
        "en": "Luchador",
        "ja": "レスラー",
        "zh": "Luchador",
    },
    "ハウンドドッグ": {
        "en": "Nighthound",
        "ja": "ハウンドドッグ",
        "zh": "Nighthound",
    },
    "アプサラス(槍)": {
        "en": "Apsaras (Spear)",
        "ja": "アプサラス(槍)",
        "zh": "Apsaras (枪)",
    },
    "アプサラス(斧)": {
        "en": "Apsaras (Axe)",
        "ja": "アプサラス(斧)",
        "zh": "Apsaras (斧)",
    },
    "エリュシオン": {
        "en": "Elysian",
        "ja": "エリュシオン",
        "zh": "Elysian",
    },
    "グラディエーター": {
        "en": "Gladiator",
        "ja": "グラディエーター",
        "zh": "Gladiator",
    },
    "クリュサオル": {
        "en": "Chrysaor",
        "ja": "クリュサオル",
        "zh": "Chrysaor",
    },
    "クリュサオル(二刀)": {
        "en": "Chrysaor(Dual)",
        "ja": "クリュサオル(二刀)",
        "zh": "Chrysaor(Dual)",
    },
    "ザ・グローリー": {
        "en": "Glorybringer",
        "ja": "ザ・グローリー",
        "zh": "Glorybringer",
    },
    "魔法戦士": {
        "en": "Runeslayer",
        "ja": "魔法戦士",
        "zh": "魔法戦士",
    },
    "剣豪": {
        "en": "Kengo",
        "ja": "剣豪",
        "zh": "剑豪",
    },
    "ドクター": {
        "en": "Doctor",
        "ja": "ドクター",
        "zh": "ドクター",
    },
    "ソルジャー": {
        "en": "Soldier",
        "ja": "ソルジャー",
        "zh": "ソルジャー",
    },
    "黒猫道士": {
        "en": "Nekomancer",
        "ja": "黒猫道士",
        "zh": "黑猫道士",
    },
    "アルケミスト": {
        "en": "Alchemist",
        "ja": "アルケミスト",
        "zh": "炼金术师",
    },
    "忍者": {
        "en": "Ninja",
        "ja": "忍者",
        "zh": "忍者",
    },
    "侍": {
        "en": "Samurai",
        "ja": "侍",
        "zh": "侍",
    },
    "剣聖": {
        "en": "Sword Master",
        "ja": "剣聖",
        "zh": "剑圣",
    },
    "ガンスリンガー": {
        "en": "Gunslinger",
        "ja": "ガンスリンガー",
        "zh": "Gunslinger",
    },
    "賢者": {
        "en": "Mystic",
        "ja": "賢者",
        "zh": "贤者",
    },
    "アサシン": {
        "en": "Assassin",
        "ja": "アサシン",
        "zh": "刺客",
    },
    "ドラムマスター": {
        "en": "Drum Master",
        "ja": "ドラムマスター",
        "zh": "Drum Master",
    },
    "ダンサー": {
        "en": "Dancer",
        "ja": "ダンサー",
        "zh": "Dancer",
    },
    "メカニック": {
        "en": "Mechanic",
        "ja": "メカニック",
        "zh": "Mechanic",
    },
    "ウェポンマスター": {
        "en": "Weapon Master",
        "ja": "ウェポンマスター",
        "zh": "Weapon Master",
    },
    "ホーリーセイバー": {
        "en": "Holy Saber",
        "ja": "ホーリーセイバー",
        "zh": "Holy Saber",
    },
    "ダークフェンサー": {
        "en": "Dark Fencer",
        "ja": "ダークフェンサー",
        "zh": "Dark Fencer",
    },
    "ビショップ": {
        "en": "Bishop",
        "ja": "ビショップ",
        "zh": "Bishop",
    },
    "ハーミット": {
        "en": "Hermit",
        "ja": "ハーミット",
        "zh": "Hermit",
    },
    "ホークアイ": {
        "en": "Hawkeye",
        "ja": "ホークアイ",
        "zh": "Hawkeye",
    },
    "オーガ": {
        "en": "Ogre",
        "ja": "オーガ",
        "zh": "Ogre",
    },
    "サイドワインダー": {
        "en": "Sidewinder",
        "ja": "サイドワインダー",
        "zh": "Sidewinder",
    },
    "スーパースター": {
        "en": "Superstar",
        "ja": "スーパースター",
        "zh": "Superstar",
    },
    "ヴァルキュリア": {
        "en": "Valkyrie",
        "ja": "ヴァルキュリア",
        "zh": "Valkyrie",
    },
    "攻撃": {
        "en": "Attack",
        "ja": "攻撃",
        "zh": "攻击",
    },
    "バランス": {
        "en": "Balance",
        "ja": "バランス",
        "zh": "平衡",
    },
    "防御": {
        "en": "Defense",
        "ja": "防御",
        "zh": "防御",
    },
    "特殊": {
        "en": "Special",
        "ja": "特殊",
        "zh": "特殊",
    },
    "回復": {
        "en": "Heal",
        "ja": "回復",
        "zh": "回复",
    },
    "タイプ": {
        "en": "Type",
        "ja": "タイプ",
        "zh": "类型",
    },
    "攻撃力": {
        "en": "ATK",
        "ja": "攻撃力",
        "zh": "攻击力",
    },
    "攻撃力(二手技巧無し)": {
        "en": "Pure ATK",
        "ja": "攻撃力(二手技巧無し)",
        "zh": "攻击力(不考虑连击和技巧)",
    },
    "戦力": {
        "en": "ATK+HP",
        "ja": "戦力",
        "zh": "战力",
    },
    "連撃率": {
        "en": "DA/TA Ratio",
        "ja": "連撃率",
        "zh": "连击率",
    },
    "期待攻撃回数": {
        "en": "Exp. Attack Freq.",
        "ja": "期待攻撃回数\n(期待攻撃力)",
        "zh": "攻击次数期望",
    },
    "技巧期待攻撃力": {
        "en": "ATK with Critical",
        "ja": "技巧期待攻撃力",
        "zh": "考虑技巧的攻击力期望",
    },
    "技巧期待値": {
        "en": "Exp. Critical Ratio",
        "ja": "技巧期待値\n(減衰補正後)",
        "zh": "技巧期望\n(考虑上限)",
    },
    "残HP": {
        "en": "Remain HP",
        "ja": "残HP",
        "zh": "剩余HP",
    },
    "キャラ(result)": {
        "en": "Chara ",
        "ja": "キャラ",
        "zh": "角色",
    },
    "パーティ平均攻撃力": {
        "en": "Party-Averaged Pure ATK",
        "ja": "パーティ平均攻撃力(二手技巧無し)",
        "zh": "全队平均攻击力(不考虑连击技巧)",
    },
    "技巧平均攻撃力": {
        "en": "Party-Averaged ATK with Critical",
        "ja": "技巧平均攻撃力",
        "zh": "全队平均攻击力(考虑连击技巧)",
    },
    "総合*回数*技巧": {
        "en": "PureATK*Crit.*Freq.",
        "ja": "総合*回数*技巧",
        "zh": "综合攻击力*攻击次数*技巧",
    },
    "総回技": {
        "en": "PCF value",
        "ja": "総回技",
        "zh": "期望伤害(考虑连击技巧)",
    },
    "総回技の平均": {
        "en": "Averaged PCF value",
        "ja": "総回技の平均",
        "zh": "平均期望伤害(考虑连击技巧)",
    },
    "単攻撃ダメージ(技巧連撃無)": {
        "en": "Single Attack Damage",
        "ja": "単攻撃ダメージ(技巧連撃無)",
        "zh": "单次攻击伤害(不考虑连击技巧)",
    },
    "単攻撃ダメージ(技巧有)": {
        "en": "Single Attack Damage\n(w/ Critical)",
        "ja": "単攻撃ダメージ(技巧有)",
        "zh": "单次攻击伤害(考虑技巧)",
    },
    "単攻撃ダメージ(連撃有)": {
        "en": "Single Attack Damage\n(w/ Multiple)",
        "ja": "単攻撃ダメージ(連撃有)",
        "zh": "单词攻击伤害(考虑连击)",
    },
    "単攻撃ダメージ(技巧連撃有)": {
        "en": "Single Attack Damage\n(w/ Crit. and Multi.)",
        "ja": "単攻撃ダメージ(技巧連撃有)",
        "zh": "单次攻击伤害(考虑连击技巧)",
    },
    "ターン毎の奥義ゲージ上昇量": {
        "en": "Charge Bar Rise per Turn",
        "ja": "ターン毎の\n奥義ゲージ上昇量",
        "zh": "每回合奥义槽上升量",
    },
    "奥義ダメージUP": {
        "en": "C.A. DMG", //a.k.a: ougiDamage
        "ja": "奥義ダメージUP",
        "zh": "奥义伤害",
    },
    "チェインバースト": {
        "en": "Chain Burst",
        "ja": "チェインバースト",
        "zh": "Chain Burst",
    },
    "予想ターン毎ダメージ": {
        "en": "Exp. Damage per Turn", //a.k.a: expectedCycleDamagePerTurn
        "ja": "予想ターンダメージ",
        "zh": "期望DPT",
    },
    "パーティ平均予想ターン毎ダメージ": {
        "en": "Party-Averaged Exp. Turn Damage",
        "ja": "ターン毎ダメージの\nパーティ平均",
        "zh": "期望DPT/人",
    },
    "技巧倍率": {
        "en": "Critical Ratio",
        "ja": "技巧倍率",
        "zh": "技巧倍率",
    },
    "倍": {
        "en": "x",
        "ja": "倍",
        "zh": "倍",
    },
    "発生確率": {
        "en": "Probability",
        "ja": "発生確率",
        "zh": "发生概率",
    },
    "標準偏差": {
        "en": "SD",
        "ja": "標準偏差",
        "zh": "标准差",
    },
    "与ダメージ上昇効果のソース": {
        "en": "Supplemental Damage Source",
        "ja": "与ダメージ上昇効果の種類",
        "zh": "Supplemental Damage Source",
    },
    "合計": {
        "en": "Total",
        "ja": "合計",
        "zh": "Total",
    },
    "ダメージ": {
        "en": "Damage (incl. Damage UP and Enemy Resistance)",
        "ja": "ダメージ  (与ダメージ上昇と敵非有利耐性が反映済み)",
        "zh": "伤害 (incl. Damage UP and Enemy Resistance)",
    },
    "サポアビ": {
        "en": "Support Ability",
        "ja": "サポアビ",
        "zh": "Support Ability",
    },
    "supplemental_other": { //left empty intentionally
        "en": "",
        "ja": "",
        "zh": "",
    },
    "supplemental_hp_based": { //left empty intentionally
        "en": "",
        "ja": "",
        "zh": "",
    },
    "supplemental_third_hit": {
        "en": " (Applies to third hit)",
        "ja": " (3回目の攻撃に)",
        "zh": " (Applies to third hit)",
    },
    "supplemental_on_critical": {
        "en": " (Applies to critical hit, {value}%)",
        "ja": " (クリティカル攻撃に、 {value}%)",
        "zh": " (Applies to critical hit, {value}%)",
    },
    "supplemental_boss_debuff_based": {
        "en": " (Enemy Debuff: {value})",
        "ja": " (敵の弱体効果: {value})",
        "zh": " (Enemy Debuff: {value})",
    },
    "supplemental_djeeta_buff_based": {
        "en": " (Djeeta Buff: {value})",
        "ja": " (ジータのバフ: {value})",
        "zh": " (Djeeta Buff: {value})",
    },
    "四人合計値": {
        "en": "x4",
        "ja": "x四人",
        "zh": "x四人",
    },
    "スキル合計": {
        "en": "Skill Amount",
        "ja": "スキル合計",
        "zh": "技能合计",
    },
    "弱体耐性率": {
        "en": "Debuff Resistance",
        "ja": "弱体耐性率",
        "zh": "弱体耐性率",
    },
    "有利": {
        "en": "Advantage",
        "ja": "有利",
        "zh": "有利",
    },
    "非有利": {
        "en": "Non-advantage",
        "ja": "非有利",
        "zh": "非有利",
    },
    "不利": {
        "en": "Weak",
        "ja": "不利",
        "zh": "不利",
    },
    "背水グラフ": {
        "en": "Open Enmity Graph",
        "ja": "背水渾身グラフを開く",
        "zh": "打开背水浑身图表",
    },
    "背水渾身グラフ": {
        "en": "Enmity Graph",
        "ja": "背水渾身グラフ",
        "zh": "背水浑身图表",
    },
    "実際のHPで表示": {
        "en": "Based on real HP",
        "ja": "実際のHPで表示",
        "zh": "显示实际HP",
    },
    "HP割合で表示": {
        "en": "Based on remain HP ratio",
        "ja": "HP割合で表示",
        "zh": "显示HP比例",
    },
    "初期攻撃力推移グラフを開く": {
        "en": "Open Initial Attack Variation Graph",
        "ja": "初期攻撃力推移グラフを開く",
        "zh": "打开初始攻击变化图表",
    },
    "初期攻撃力推移グラフ": {
        "en": "Initial Attack Variation Graph",
        "ja": "初期攻撃力推移グラフ",
        "zh": "初始攻击变化图表",
    },
    "ダメージシミュレータを開く": {
        "en": "Open Damage Simulator",
        "ja": "ダメージシミュレータを開く",
        "zh": "打开伤害模拟器",
    },
    "ダメージシミュレータ": {
        "en": "Damage Simulator",
        "ja": "ダメージシミュレータ",
        "zh": "伤害模拟器",
    },
    "結果": {
        "en": "Result",
        "ja": "結果",
        "zh": "结果",
    },
    "マグナ": {
        "en": "Magna",
        "ja": "マグナ",
        "zh": "方阵",
    },
    "属性": {
        "en": "Element ",
        "ja": "属性",
        "zh": "属性",
    },
    "EX": {
        "en": "EX",
        "ja": "EX",
        "zh": "EX",
    },
    "EX背水": {
        "en": "EX Enmity",
        "ja": "EX背水",
        "zh": "EX背水",
    },
    "属性攻": {
        "en": "Element ",
        "ja": "属性攻",
        "zh": "属性攻击",
    },
    "属性(種族数)": {
        "en": "Element(Tesuka) ",
        "ja": "属性(種族数)",
        "zh": "属性(种族数)",
    },
    "属性(経過ターン)": {
        "en": "Element(Sesuransu) ",
        "ja": "属性(経過ターン)",
        "zh": "属性(经过回合)",
    },
    "神石系": {
        "en": "Primal",
        "ja": "神石系",
        "zh": "神石系",
    },
    "蘭子": {
        "en": "Ranko ",
        "ja": "蘭子",
        "zh": "兰子",
    },
    "キャラ攻": {
        "en": "Chara",
        "ja": "キャラ攻",
        "zh": "角色攻击",
    },
    "属性攻+キャラ攻": {
        "en": "Odin(Element+Chara)",
        "ja": "属性攻+キャラ攻",
        "zh": "属性攻击+角色攻击",
    },
    "優先項目": {
        "en": "Sort Key",
        "ja": "優先項目",
        "zh": "优先项目",
    },
    "表示項目": {
        "en": "Display Key",
        "ja": "表示項目",
        "zh": "显示项目",
    },
    "順位": {
        "en": "Rank",
        "ja": "順位",
        "zh": "顺序",
    },
    "操作": {
        "en": "Option",
        "ja": "操作",
        "zh": "操作",
    },
    "HP増加": {
        "en": "Health",
        "ja": "HP増加",
        "zh": "HP增加",
    },
    "通常攻刃": {
        "en": "Normal Might",
        "ja": "通常攻刃",
        "zh": "通常攻刃",
    },
    "通常背水": {
        "en": "Normal Enmity",
        "ja": "通常背水",
        "zh": "通常背水",
    },
    "通常渾身": {
        "en": "Normal Stamina",
        "ja": "通常渾身",
        "zh": "通常浑身",
    },
    "マグナ背水": {
        "en": "Magna Enmity",
        "ja": "マグナ背水",
        "zh": "方阵背水",
    },
    "マグナ渾身": {
        "en": "Magna Stamina",
        "ja": "マグナ渾身",
        "zh": "方针浑身",
    },
    "通常進境(大)(最大時)": {
        "en": "Normal Element ATK L",
        "ja": "通常進境(大)(最大時)",
        "zh": "通常属性攻击力(大)",
    },
    "マグナ進境(大)(最大時)": {
        "en": "Magna Element ATK L",
        "ja": "マグナ進境(大)(最大時)",
        "zh": "方阵属性攻击力(大)",
    },
    "アンノウン": {
        "en": "Unknown",
        "ja": "アンノウン",
        "zh": "UNK",
    },
    "アンノウン背水": {
        "en": "Unknown Enmity",
        "ja": "アンノウン背水",
        "zh": "UNK背水",
    },
    "キャラ背水": {
        "en": "Chara Enmity",
        "ja": "キャラ背水",
        "zh": "角色背水",
    },
    "攻撃力減少(特殊)": {
        "en": "ATK Debuff (Special)",
        "ja": "攻撃力減少(特殊)",
        "zh": "攻击力減少(特殊)",
    },
    "DA上昇(通常)": {
        "en": "DA Up (Normal)",
        "ja": "DA上昇(通常)",
        "zh": "DA上升(通常)",
    },
    "DA上昇(マグナ)": {
        "en": "DA Up (Magna)",
        "ja": "DA上昇(マグナ)",
        "zh": "DA上升(方针)",
    },
    "DA上昇(EX)": {
        "en": "DA Up (EX)",
        "ja": "DA上昇(EX)",
        "zh": "DA上升(EX)",
    },
    "DA上昇(バハ)": {
        "en": "DA Up (Bahamut)",
        "ja": "DA上昇(バハ)",
        "zh": "DA上升(巴哈)",
    },
    "DA上昇(コスモス)": {
        "en": "DA Up (Cosmos)",
        "ja": "DA上昇(コスモス)",
        "zh": "DA上升(Cosmos)",
    },
    "DA上昇(その他)": {
        "en": "DA Up (Other)",
        "ja": "DA上昇(その他)",
        "zh": "DA上升(其他)",
    },
    "TA上昇(通常)": {
        "en": "TA Up (Normal)",
        "ja": "TA上昇(通常)",
        "zh": "TA上升(通常)",
    },
    "TA上昇(マグナ)": {
        "en": "TA Up (Magna)",
        "ja": "TA上昇(マグナ)",
        "zh": "TA上升(方阵)",
    },
    "TA上昇(バハ)": {
        "en": "TA Up (Bahamut)",
        "ja": "TA上昇(バハ)",
        "zh": "TA上升(巴哈)",
    },
    "TA上昇(その他)": {
        "en": "TA Up (Other)",
        "ja": "TA上昇(その他)",
        "zh": "TA上升(其他)",
    },
    "LB背水ラベル": {
        "en": "Enmity Perk",
        "ja": "LB背水",
        "zh": "LB背水",
    },
    "LB渾身ラベル": {
        "en": "Stamina Perk",
        "ja": "LB渾身",
        "zh": "LB渾身",
    },
    "CriticalDamageLimit (effective)": {
        "en": "CriticalDamageLimit (effective)",
        "ja": "CriticalDamageLimit (effective)",
        "zh": "CriticalDamageLimit (effective)",
    },
    "奥義固定ダメージ": {
        "en": "C.A. Fixd DMG",
        "ja": "奥義固定",
        "zh": "奥義固定",
    },
    "グラフに加える": {
        "en": "Add to \ngraphs",
        "ja": "グラフに\n加える",
        "zh": "加入图表",
    },
    "本": {
        "en": "",
        "ja": "",
        "zh": "",
    },
    "パーティ全体バフ": {
        "en": "Buff for Party",
        "ja": "パーティ全体バフ",
        "zh": "Buff for Party",
    },
    "敵": {
        "en": "Enemy",
        "ja": "敵",
        "zh": "敵",
    },
    "結果を更新": {
        "en": "Update Results",
        "ja": "結果を更新",
        "zh": "更新结果",
    },
    "自動更新: ON": {
        "en": "Auto Update: ON",
        "ja": "自動更新: ON",
        "zh": "自动更新: ON",
    },
    "自動更新: OFF": {
        "en": "Auto Update: OFF",
        "ja": "自動更新: OFF",
        "zh": "自动更新: OFF",
    },
    "属性一括変更": {
        "en": "Change All Element",
        "ja": "属性一括変更",
        "zh": "所有属性一起更改",
    },
    "自分の石": {
        "en": "Player Summon",
        "ja": "自石の加護",
        "zh": "自己的召唤石",
    },
    "フレの石": {
        "en": "Friend Summon",
        "ja": "フレ石の加護",
        "zh": "好友的召唤石",
    },
    "合計攻撃力": {
        "en": "Total ATK",
        "ja": "合計攻撃力",
        "zh": "合计攻击力",
    },
    "合計HP": {
        "en": "Total HP",
        "ja": "合計HP",
        "zh": "合计HP",
    },
    "HP加護": {
        "en": "Health UP",
        "ja": "HP加護",
        "zh": "HP加护",
    },
    "DA加護": {
        "en": "Double Attack",
        "ja": "DA加護",
        "zh": "DA加护",
    },
    "DA加護の説明": {
        "en": "Halluel and Malluel(5~10%)etc.",
        "ja": "ハーマー(5~10%)など",
        "zh": "Halluel and Malluel(5~10%)etc.",
    },
    "TA加護": {
        "en": "Triple Attack",
        "ja": "TA加護",
        "zh": "TA加护",
    },
    "奥義ダメージアップ": {
        "en": "C.A. Damage UP", //a.k.a: OugiDamageUP
        "ja": "奥義ダメージUP",
        "zh": "奥义伤害上升",
    },
    "与ダメージ加護": {
        "en": "Boost Damage", //a.k.a: tenshiDamageUP
        "ja": "与ダメ加護",
        "zh": "Boost Damage",
    },
    "与ダメージ加護説明": {
        "en": "Boosts final damage. Arcarum summons(SR3~5%, SSR7~10%) etc.",
        "ja": "最終的な与ダメージが上昇します。アーカルム石(SR3~5%, SSR7~10%)など",
        "zh": "Boosts final damage. Arcarum summons(SR3~5%, SSR7~10%) etc.",
    },
    "ダメージ上限加護": {
        "en": "Damage Cap", //a.k.a: damageLimit
        "ja": "ダメージ上限加護",
        "zh": "Damage Cap",
    },
    "ダメージ上限加護説明": {
        "en": "Increases the damage cap. Primarch summons(5~10%) etc.",
        "ja": "ダメージ上限に加算されます。天司石(5~10%)など",
        "zh": "Increases the damage cap. Primarch summons(5~10%) etc.",
    },
    "奥義ダメージ": {
        "en": "C.A. Damage", //a.k.a: ougiDamage
        "ja": "奥義ダメージ",
        "zh": "奥義ダメージ",
    },
    "内容を消去": {
        "en": "Delete",
        "ja": "内容を消去",
        "zh": "删除内容",
    },
    "コピー": {
        "en": "Copy",
        "ja": "コピー",
        "zh": "复制",
    },
    "下にコピー": {
        "en": "Copy",
        "ja": "下にコピー",
        "zh": "向下复制",
    },
    "追加": {
        "en": "Add",
        "ja": "追加",
        "zh": "追加",
    },
    "削除": {
        "en": "Remove",
        "ja": "削除",
        "zh": "删除",
    },
    "追加しました": {
        "en": "Added!",
        "ja": "追加しました。",
        "zh": "追加成功。",
    },
    "キャラがいっぱい": {
        "en": "Chara list is full.",
        "ja": "キャラがいっぱいです。",
        "zh": "角色满了。",
    },
    "キャラテンプレート": {
        "en": "Open Character Template",
        "ja": "キャラテンプレートを開く",
        "zh": "打开角色列表。",
    },
    "キャラ名": {
        "en": "Name",
        "ja": "キャラ名",
        "zh": "角色名",
    },
    "平均に": {
        "en": "Average",
        "ja": "平均に",
        "zh": "平均",
    },
    "含める": {
        "en": "Include",
        "ja": "含める",
        "zh": "包含在平均计算中？"
        ,
    },
    "種族": {
        "en": "Race",
        "ja": "種族",
        "zh": "种族",
    },
    "性別": {
        "en": "Sex",
        "ja": "性別",
        "zh": "性別",
    },
    "得意武器": {
        "en": "Specialty weapons",
        "ja": "得意武器",
        "zh": "得意武器",
    },
    "素の攻撃力": {
        "en": "Raw ATK",
        "ja": "素の攻撃力",
        "zh": "基本攻击力",
    },
    "素のHP": {
        "en": "Raw HP",
        "ja": "素のHP",
        "zh": "基本HP",
    },
    "プラスボーナス": {
        "en": "Plus Bonus",
        "ja": "+ボーナス",
        "zh": "Plus Bonus",
    },
    "サポアビ": {
        "en": "Support Abi.",
        "ja": "サポアビ",
        "zh": "被动技能",
    },
    "属性攻撃力": {
        "en": "Element ATK",
        "ja": "属性攻撃力",
        "zh": "属性攻击力",
    },
    "クリティカル": {
        "en": "Critical",
        "ja": "クリティカル",
        "zh": "暴击",
    },
    "前へ": {
        "en": "Front",
        "ja": "前へ",
        "zh": "向前",
    },
    "後へ": {
        "en": "Back",
        "ja": "後へ",
        "zh": "向后",
    },
    "武器テンプレート": {
        "en": "Open Weapon Template",
        "ja": "武器テンプレートを開く",
        "zh": "打开武器列表",
    },
    "武器名": {
        "en": "Name",
        "ja": "武器名",
        "zh": "武器名",
    },
    "スキル": {
        "en": "Skill",
        "ja": "スキル",
        "zh": "技能",
    },
    "種類": {
        "en": "Type",
        "ja": "種類",
        "zh": "种类",
    },
    "最小本数": {
        "en": "Minimum",
        "ja": "最小本数",
        "zh": "最少数量",
    },
    "最大本数": {
        "en": "Maximum",
        "ja": "最大本数",
        "zh": "最多数量",
    },
    "何本追加": {
        "en": "How many?",
        "ja": "何本追加しますか？",
        "zh": "添加多少把？",
    },
    "サーバに保存": {
        "en": "Save to Server",
        "ja": "サーバに保存\n(短縮URLを取得)",
        "zh": "保存到服务器",
    },
    // For constant conversion
    "人間": {
        "en": "Human",
        "ja": "人間",
        "zh": "人类",
    },
    "エルーン": {
        "en": "Erune",
        "ja": "エルーン",
        "zh": "Erune",
    },
    "ドラフ": {
        "en": "Draph", //a.k.a: Doraf
        "ja": "ドラフ",
        "zh": "Draph",
    },
    "ハーヴィン": {
        "en": "Harvin", //a.k.a: Havin
        "ja": "ハーヴィン",
        "zh": "Harvin",
    },
    "星晶獣": {
        "en": "Primal",
        "ja": "星晶獣",
        "zh": "星晶兽",
    },
    "種族不明": {
        "en": "Unknown",
        "ja": "種族不明",
        "zh": "种族不明",
    },

    "男": {
        "en": "Male",
        "ja": "男",
        "zh": "男",
    },
    "女": {
        "en": "Female",
        "ja": "女",
        "zh": "女",
    },
    "不詳": {
        "en": "Other",
        "ja": "不詳",
        "zh": "不詳",
    },
    //support abilities
    "なし": {
        "en": "None",
        "ja": "なし",
        "zh": "なし",
    },
    "全体DA率10%UP(ランスロット)": {
        "en": "10% boost to double attack rate for all allies. (Lancelot)",
        "ja": "全体DA率10%UP(ランスロット)",
        "zh": "全体DA率10%UP(ランスロット)",
    },
    "全体TA率5%UP(ネツァ)": {
        "en": "5% boost to TA rate for all allies (Nezahualpilli)",
        "ja": "全体TA率5%UP(ネツァ)",
        "zh": "全体TA率5%UP(ネツァ)",
    },
    "全体風DA率10%UP&TA率5%UP(コッコロ)": {
        "en": "10% boost to DA rate and 5% boost to TA rate for wind allies. (Kokkoro)",
        "ja": "全体風DA率10%UP&TA率5%UP(コッコロ)",
        "zh": "全体風DA率10%UP&TA率5%UP(コッコロ)",
    },
    "全体水DA率10%UP&TA率5%UP(水着ディアンサ)": {
        "en": "10% boost to DA rate and 5% boost to TA rate for water allies. (Diantha (Summer))",
        "ja": "全体水DA率10%UP&TA率5%UP(水着ディアンサ)",
        "zh": "全体水DA率10%UP&TA率5%UP(水着ディアンサ)",
    },
    "格闘キャラDA率10%UP(ガンダゴウザ)": {
        "en": "10% boost to melee-specialty allies' double attack rate. (Ghandagoza)",
        "ja": "格闘キャラDA率10%UP(ガンダゴウザ)",
        "zh": "格闘キャラDA率10%UP(ガンダゴウザ)",
    },
    "HP15%DOWN(水着イシュ, マルキ, ロザミア)": {
        "en": "15% reduced max HP. (Izmir (Summer), Marquiares, Rosamia)",
        "ja": "HP15%DOWN(水着イシュ, マルキ, ロザミア)",
        "zh": "HP15%DOWN(水着イシュ, マルキ, ロザミア)",
    },
    "HP10%UP(黒騎士)": {
        "en": "15% boost to max HP. (Black Knight)",
        "ja": "HP10%UP(黒騎士)",
        "zh": "HP10%UP(黒騎士)",
    },
    "HP15%UP(ペコリーヌ)": {
        "en": "15% boost to max HP. (Pecorine)",
        "ja": "HP15%UP(ペコリーヌ)",
        "zh": "HP15%UP(ペコリーヌ)",
    },
    "HP20%UP(ソリッズ, ファスティバ(SSR))": {
        "en": "20% boost to max HP. (Soriz, Ladiva(SSR))",
        "ja": "HP20%UP(ソリッズ, ファスティバ(SSR))",
        "zh": "HP20%UP(ソリッズ, ファスティバ(SSR))",
    },
    "攻撃5%UP(レディグレイ)": {
        "en": "5% boost to ATK. (Lady Grey)",
        "ja": "攻撃5%UP",
        "zh": "攻撃5%UP",
    },
    "全体攻撃5%UP(クリスティーナ)": {
        "en": "5% boost to all allies' ATK. (Christina)",
        "ja": "全体攻撃5%UP(クリスティーナ)",
        "zh": "全体攻撃5%UP(クリスティーナ)",
    },
    "全体攻撃10%UP(アニラ)": {
        "en": "10% ATK boost for all allies. (Anila)",
        "ja": "全体攻撃10%UP(アニラ)",
        "zh": "全体攻撃10%UP(アニラ)",
    },
    "ドラフと種族不明の攻撃UP(ナルメア)": {
        "en": "10% boost to ATK for all Draph, Primal, and Unknown allies. (Narmaya)",
        "ja": "ドラフと種族不明の攻撃UP(ナルメア)", //to seishou
        "zh": "ドラフと種族不明の攻撃UP(ナルメア)",
    },
    "バトルメンバーの種族数に応じて攻撃力UP(リリィ)": {
        "en": "Boost to ATK based on number of main allies' races. (Lily)",
        "ja": "バトルメンバーの種族数に応じて攻撃力UP(リリィ)",
        "zh": "バトルメンバーの種族数に応じて攻撃力UP(リリィ)",
    },
    "属性バフ付与時に属性攻撃30%UP(パーシヴァル,アグロヴァル)": {
        "en": "Gain an additional 30% boost to Elemental buffs when affected by Elemental Buff (Percival,Agloval)",
        "ja": "属性バフ付与時に属性攻撃30%UP(パーシヴァル,アグロヴァル)",
        "zh": "属性バフ付与時に属性攻撃30%UP(パーシヴァル,アグロヴァル)",
    },
    "属性バフ付与時にステータスUP(スカーサハ)": {
        "en": "Boost to ATK and multiattack rate when buffed by Elemental Buff (Scathacha)",
        "ja": "属性バフ付与時にステータスUP(スカーサハ)",
        "zh": "属性バフ付与時にステータスUP(スカーサハ)",
    },
    "奥義ゲージ上昇量10%UP(アルタイル)": {
        "en": "Charge bar fills up 10% faster. (Altair)",
        "ja": "奥義ゲージ上昇量10%UP(アルタイル)",
        "zh": "奥義ゲージ上昇量10%UP(アルタイル)",
    },
    "奥義ゲージ上昇量20%UP(アレ爺,シルヴァ,アーミラ)": {
        "en": "Charge bar fills up 20% faster. (Aletheia, Silva, Amira)",
        "ja": "奥義ゲージ上昇量20%UP(アレ爺,シルヴァ,アーミラ)",
        "zh": "奥義ゲージ上昇量20%UP(アレ爺,シルヴァ,アーミラ)",
    },
    "奥義ゲージ上昇量100%UP(オクトー)": {
        "en": "Charge bar fills up 100% faster. (Eahta)",
        "ja": "奥義ゲージ上昇量100%UP(オクトー)",
        "zh": "奥義ゲージ上昇量100%UP(オクトー)",
    },
    "奥義ゲージ上昇量35%DOWN。(ガイゼンボーガ)": {
        "en": "Charge bar fills up 35% slower. (Geisenborger)",
        "ja": "奥義ゲージ上昇量35%DOWN。(ガイゼンボーガ)",
        "zh": "Charge bar fills up 35% slower. (Geisenborger)",
    },
    "奥義ゲージ上昇量35%DOWN。(ウーフとレニー,プレデター(SR))": {
        "en": "Charge bar fills up 35% slower. (Wulf and Renie,Predator(SR))",
        "ja": "奥義ゲージ上昇量35%DOWN。(ウーフとレニー,プレデター(SR))",
        "zh": "Charge bar fills up 35% slower. (Wulf and Renie,Predator(SR))",
    },
    "主人公の奥義ゲージ上昇量20%UP。(クラリス(バレンタインver))": {
        "en": "MC's charge bar fills up 20% faster. (Clarisse (Valentine))",
        "ja": "主人公の奥義ゲージ上昇量20%UP。(クラリス(バレンタインver))",
        "zh": "MC's charge bar fills up 20% faster. (Clarisse (Valentine))",
    },
    "全体奥義ダメージ50%UP(シエテ)": {
        "en": "50% boost to C.A. DMG for all allies. (Seofon)",
        "ja": "全体奥義ダメージ50%UP(シエテ)",
        "zh": "全体奥義ダメージ50%UP(シエテ)",
    },
    "全体奥義ダメージ50%UP&奥義上限10%UP(最終シエテ)": {
        "en": "50% boost to C.A. DMG and 10% boost to C.A. DMG cap for all allies. (5★ Seofon)",
        "ja": "全体奥義ダメージ50%UP&奥義上限10%UP(最終シエテ)",
        "zh": "全体奥義ダメージ50%UP&奥義上限10%UP(最終シエテ)",
    },
    "全体背水効果(ザルハメリナ)": {
        "en": "Increases ATK for all allies based on how low (me)'s HP is. (Zahlhamelina)",
        "ja": "全体背水効果(ザルハメリナ)",
        "zh": "全体背水効果(ザルハメリナ)",
    },
    "背水効果(闇ジャンヌダルク, 黒騎士)": {
        "en": "Boost to ATK based on how low HP is. (Jeanne D'Ark (Dark), Black Knight)",
        "ja": "背水効果(闇ジャンヌダルク, 黒騎士)",
        "zh": "背水効果(闇ジャンヌダルク, 黒騎士)",
    },
    "バトルメンバーの属性の数に応じて自分のステータスUP(水着ゾーイ)": {
        "en": "Boost to stats based on number of different elements among allies. (Zooey (Promo), Zooey (Grand))",
        "ja": "バトルメンバーの属性の数に応じて自分のステータスUP(水着ゾーイ)",
        "zh": "バトルメンバーの属性の数に応じて自分のステータスUP(水着ゾーイ)",
    },
    "バトルメンバーの数が多い程自分のステータスUP(パーシヴァル)": {
        "en": "Boost to ATK, double attack rate, and triple attack rate based on number of allies in battle. (Percival)",
        "ja": "バトルメンバーの数が多い程自分のステータスUP(パーシヴァル)",
        "zh": "バトルメンバーの数が多い程自分のステータスUP(パーシヴァル)",
    },
    "奥義ゲージ上昇量35%DOWN&与ダメージ上昇15%UP(シヴァ)": {
        "en": "Charge bar fills up 35% slower and 15% boost to one-foe attack damage. (Shiva)",
        "ja": "奥義ゲージ上昇量35%DOWN&与ダメージ上昇15%UP(シヴァ)",
        "zh": "奥義ゲージ上昇量35%DOWN&与ダメージ上昇15%UP(シヴァ)",
    },
    "奥義ゲージ上昇量35%DOWN&与ダメージ15%UP&HP20%UP(クビラ)": {
        "en": "Charge bar fills up 35% slower, 15% boost to one-foe attack damage and 20% boost to max HP. (Kumbhira)",
        "ja": "奥義ゲージ上昇量35%DOWN&与ダメージ15%UP&HP20%UP(クビラ)",
        "zh": "奥義ゲージ上昇量35%DOWN&与ダメージ15%UP&HP20%UP(クビラ)",
    },
    "HP15%UP&DEF10%UP&奥義ゲージ上昇量25%DOWN(ルルーシュ・ランペルージ, 枢木スザク, 紅月カレン)": {
        "en": "15% boost to max HP, 10% boost to DEF and Charge bar fills up 25% slower. (Lelouch Lamperouge, Suzaku Kururugi, Kallen Kouzuki)",
        "ja": "HP15%UP&DEF10%UP&奥義ゲージ上昇量25%DOWN(ルルーシュ・ランペルージ, 枢木スザク, 紅月カレン)",
        "zh": "HP15%UP&DEF10%UP&奥義ゲージ上昇量25%DOWN(ルルーシュ・ランペルージ, 枢木スザク, 紅月カレン)",
    },
    "クリティカル確率UP(発動率10%, 倍率30%)(ヴァンピィ, ジャンヌダルク)": {
        "en": "Boost to critical hit rate (10% chance, 30% damage). (Vania, Jeanne D'Ark)",
        "ja": "クリティカル確率UP(発動率10%, 倍率30%)(ヴァンピィ, ジャンヌダルク)",
        "zh": "クリティカル確率UP(発動率10%, 倍率30%)(ヴァンピィ, ジャンヌダルク)",
    },
    "クリティカル確率UP(発動率20%, 倍率20%)(水着ジャンヌ)": {
        "en": "Boost to critical hit rate (10% chance, 30% damage). (Jeanne D'Ark (Themed))",
        "ja": "クリティカル確率UP(発動率20%, 倍率20%)(水着ジャンヌ)",
        "zh": "クリティカル確率UP(発動率20%, 倍率20%)(水着ジャンヌ)",
    },
    "全体クリティカル確率UP(発動率5%, 倍率30%)(フェリ)": {
        "en": "Boost to critical hit rate for all allies (5% chance, 30% damage). (Ferry)",
        "ja": "全体クリティカル確率UP(発動率5%, 倍率30%)(フェリ)",
        "zh": "全体クリティカル確率UP(発動率5%, 倍率30%)(フェリ)",
    },
    "クリティカル確率UP(発動率40%, 倍率50%)(キャル)": {
        "en": "Boost to critical hit rate (40% chance, 50% damage). (Karyl)",
        "ja": "クリティカル確率UP(発動率40%, 倍率50%)(キャル)",
        "zh": "クリティカル確率UP(発動率40%, 倍率50%)(キャル)",
    },
    "自分以外の味方のクリティカル確率UP(発動率20%, 倍率20%)。(ヤイア(クリスマスver))": {
        "en": "Boost to All Other Allies critical hit rate (20% chance, 20% damage). (Yaia Crismas Ver.)",
        "ja": "自分以外の味方のクリティカル確率UP(発動率20%, 倍率20%)。(ヤイア(クリスマスver))",
        "zh": "",
    },
    "全体クリティカル確率UP(発動率100%, 倍率50%)(最終ソーン奥義)": {
        "en": "Boost to critical hit rate for all allies (100% chance, 50% damage). (5★ Tweyen C.A.)",
        "ja": "全体クリティカル確率UP(発動率100%, 倍率50%)(最終ソーン奥義)",
        "zh": "全体クリティカル確率UP(発動率100%, 倍率50%)(最終ソーン奥義)",
    },
    "与ダメージ上昇5%UP(アビー)": {
        "en": "5% Boost to Damage. (Abby)",
        "ja": "与ダメージ上昇5%UP(アビー)",
        "zh": "与ダメージ上昇5%UP(アビー)",
    },
    "与ダメージ上昇10%UP": {
        "en": "10% Boost to Damage.",
        "ja": "与ダメージ上昇10%UP",
        "zh": "与ダメージ上昇10%UP",
    },
    "与ダメージ上昇20%UP(色々)": {
        "en": "20% Boost to Damage. (various)",
        "ja": "与ダメージ上昇20%UP(色々)",
        "zh": "与ダメージ上昇20%UP(色々)",
    },
    "与ダメージ上昇20%UP&奥義ダメージ上限20%UP(最終十天衆)": {
        "en": "20% Boost to Damage and C.A. DMG Cap. (5★ Eternals)",
        "ja": "与ダメージ上昇20%UP&奥義ダメージ上限20%UP(最終十天衆)",
        "zh": "与ダメージ上昇20%UP&奥義ダメージ上限20%UP(最終十天衆)",
    },
    "奥義ダメージ上限20%UP(最終十天衆)": {
        "en": "20% Boost to C.A. DMG Cap. (5★ Eternals)",
        "ja": "奥義ダメージ上限20%UP(最終十天衆)",
        "zh": "奥義ダメージ上限20%UP(最終十天衆)",
    },
    "奥義ダメージ上限25%UP(ルリア,SSRロボミ)": {
        "en": "25% Boost to C.A. DMG Cap. (Robomi (SSR), Lyria)",
        "ja": "奥義ダメージ上限25%UP(ルリア,SSRロボミ)",
        "zh": "奥義ダメージ上限25%UP(ルリア,SSRロボミ)",
    },
    "奥義ダメージ上限100%UP(シャリオス17世)": {
        "en": "100% Boost to C.A. DMG Cap. (Charioce XVII)",
        "ja": "奥義ダメージ上限100%UP(シャリオス17世)",
        "zh": "奥義ダメージ上限100%UP(シャリオス17世)",
    },
    "武器スキルの得意武器/タイプ/種族の発動条件を全て満たす(カイム)": {
        "en": "Subject to all specialty weapon-, style-, and race-related weapon skills. (Caim)",
        "ja": "武器スキルの得意武器/タイプ/種族の発動条件を全て満たす(カイム)",
        "zh": "武器スキルの得意武器/タイプ/種族の発動条件を全て満たす(カイム)",
    },
    "スキル「守護」と「神威」の効果による自分のHP上昇量UP。(白竜の双騎士 ランスロット＆ヴェイン)": {
        "en": "Increase Aegis-type and Majesty-type weapon skills' 'Boost to max HP' effect by 30%. (Lancelot and Vane)",
        "ja": "スキル「守護」と「神威」の効果による自分のHP上昇量UP。(白竜の双騎士 ランスロット＆ヴェイン)",
        "zh": "Increase Aegis-type and Majesty-type weapon skills' 'Boost to max HP' effect by 30%. (Lancelot and Vane)",
    },
    "味方全体の強化効果「火属性攻撃UP」の効果30%UP。(シヴァ)": {
        "en": "Fire Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Shiva)",
        "ja": "味方全体の強化効果「火属性攻撃UP」の効果30%UP。(シヴァ)",
        "zh": "Allies gain an additional 30% boost to Fire ATK when affected by Fire ATK Up. (Shiva)",
    },
    "味方全体の強化効果「水属性攻撃UP」の効果30%UP。(エウロペ)": {
        "en": "Water Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Europa)",
        "ja": "味方全体の強化効果「水属性攻撃UP」の効果30%UP。(エウロペ)",
        "zh": "Water Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Europa)",
    },
    "味方全体の強化効果「土属性攻撃UP」の効果30%UP。(ブローディア)": {
        "en": "Earth Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Alexiel)",
        "ja": "味方全体の強化効果「土属性攻撃UP」の効果30%UP。(ブローディア)",
        "zh": "Earth Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Alexiel)",
    },
    "味方全体の強化効果「風属性攻撃UP」の効果30%UP。(グリームニル)": {
        "en": "Wind Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff. (Grimnir)",
        "ja": "味方全体の強化効果「風属性攻撃UP」の効果30%UP。(グリームニル)",
        "zh": "",
    },
    "味方全体の強化効果「風属性攻撃UP」の効果15%UP。(コッコロ)": {
        "en": "Wind Allies gain an additional 15% boost to Element ATK when affected by Element ATK Buff. (Kokkoro)",
        "ja": "味方全体の強化効果「風属性攻撃UP」の効果15%UP。(コッコロ)",
        "zh": "Wind Allies gain an additional 15% boost to Element ATK when affected by Element ATK Buff. (Kokkoro)",
    },
    "味方全体の強化効果「光属性攻撃UP」の効果30%UP。": {
        "en": "Light Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
        "ja": "味方全体の強化効果「光属性攻撃UP」の効果30%UP。",
        "zh": "Light Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
    },
    "味方全体の強化効果「闇属性攻撃UP」の効果30%UP。": {
        "en": "Dark Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
        "ja": "味方全体の強化効果「闇属性攻撃UP」の効果30%UP。",
        "zh": "Dark Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
    },
    "味方全体の強化効果「属性攻撃UP」の効果30%UP。": {
        "en": "All Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
        "ja": "味方全体の強化効果「属性攻撃UP」の効果30%UP。",
        "zh": "All Allies gain an additional 30% boost to Element ATK when affected by Element ATK Buff.",
    },
    "属性攻撃UPが付与されている時、自分の攻撃UP。(ヘルエス(風属性ver))": {
        "en": "30% boost to ATK when affected by Element ATK Buff (Heles (Wind))",
        "ja": "属性攻撃UPが付与されている時、自分の攻撃UP。(ヘルエス(風属性ver))",
        "zh": "30% boost to ATK when affected by Element ATK Buff (Heles (Wind))",
    },
    "自分以外の味方の攻5%UPとクリティカル確率UP(発動率20%, 倍率20%)。(ヤイア)": {
        "en": "All Other Allies gain gain 5% ATK UP and Boost to critical hit rate (20% chance, 20% damage). (Yaia)",
        "ja": "自分以外の味方の攻5%UPとクリティカル確率UP(発動率20%, 倍率20%)。(ヤイア)",
        "zh": "All Other Allies gain gain 5% ATK UP and Boost to critical hit rate (20% chance, 20% damage). (Yaia)",
    },
    "自分の残りHPが少ないほどクリティカル確率UP。(ベアトリクス(水着ver))": {
        "en": "Boost to critical hit rate based on how low HP is (Only activates when below 60%HP). (Beatrix (Themed))",
        "ja": "自分の残りHPが少ないほどクリティカル確率UP。(ベアトリクス(水着ver))",
        "zh": "Boost to critical hit rate based on how low HP is (Only activates when below 60%HP). (Beatrix (Themed))",
    },
    "1回攻撃と2回攻撃時に火属性追加ダメージ発生(1回:80%、 2回:30%)。(スツルム)": {
        "en": "80% bonus damage for single attacks and 30% bonus damage for double attacks. (Sturm)",
        "ja": "1回攻撃と2回攻撃時に追加ダメージ発生(1回:80%、 2回:30%)。(スツルム)",
        "zh": "80% bonus damage for single attacks and 30% bonus damage for double attacks. (Sturm)",
    },
    "3回攻撃時に追加ダメージ発生(15%)。(レヴィオン姉妹 マイム＆ミイム＆メイム)": {
        "en": "15% Bonus damage for triple attack. (Levin Sisters)",
        "ja": "3回攻撃時に追加ダメージ発生(15%)。(レヴィオン姉妹 マイム＆ミイム＆メイム)",
        "zh": "15% Bonus damage for triple attack. (Levin Sisters)",
    },
    "属性攻撃力UPが付与されている時、与ダメージ上昇10%UP。(オリヴィエ)": {
        "en": "10% boost to Damage when affected by Element ATK Buff. (Olivia)",
        "ja": "属性攻撃力UPが付与されている時、与ダメージ上昇10%UP。(オリヴィエ)",
        "zh": "10% boost to Damage when affected by Element ATK Buff. (Olivia)",
    },
    "自分の残りHPが少ないほどダブルアタック確率UP/ダメージ上限UP。(アイル)": {
        "en": "Boost to multi attack rate and damage cap based on how low HP is. (Ayer)",
        "ja": "自分の残りHPが少ないほどダブルアタック確率UP/ダメージ上限UP。(アイル)",
        "zh": "Boost to multi attack rate and damage cap based on how low HP is. (Ayer)",
    },
    "光属性キャラがクリティカル発動時にダメージ上限3%UP。(シルヴァ(光属性ver))": {
        "en": "3% boost to Light characters' critical hit damage cap. (Silva (Light))",
        "ja": "光属性キャラがクリティカル発動時にダメージ上限3%UP。(シルヴァ(光属性ver))",
        "zh": "3% boost to Light characters' critical hit damage cap. (Silva (Light))",
    },
    "クリティカル発動時にダメージ上限10%UP。(オイゲン(リミテッドver))": {
        "en": "10% boost to critical hit damage cap. (Eugen (Grand))",
        "ja": "クリティカル発動時にダメージ上限10%UP。(オイゲン(リミテッドver))",
        "zh": "10% boost to critical hit damage cap. (Eugen (Grand))",
    },
    "弱体耐性15%UP。(レナ、カルメリーナ)": {
        "en": "15% boost to debuff resistance. (Lennah, Carmelina)",
        "ja": "弱体耐性15%UP。(レナ、カルメリーナ)",
        "zh": "15% boost to debuff resistance. (Lennah, Carmelina)",
    },
    "弱体耐性80%UP。(フュンフ)": {
        "en": "80% boost to debuff resistance. (Fif)",
        "ja": "弱体耐性80%UP。(フュンフ)",
        "zh": "80% boost to debuff resistance. (Fif)",
    },
    "HP10%UP": {
        "en": "10% boost to max HP",
        "ja": "HP10%UP",
        "zh": "10% boost to max HP",
    },
    "通常攻撃を行わない": {
        "en": "Doesn't attack",
        "ja": "通常攻撃を行わない",
        "zh": "Doesn't attack",
    },
    "通常攻撃を行わないが木之本桜の残りHPが多いほど味方全体の攻撃が大きくUP": {
        "en": "15% boost to all allies ATK based on how high character HP is (various)",
        "ja": "通常攻撃を行わないが木之本桜の残りHPが多いほど味方全体の攻撃が大きくUP",
        "zh": "通常攻撃を行わないが木之本桜の残りHPが多いほど味方全体の攻撃が大きくUP",
    },
    "ルルーシュの残りHPが多いほど味方全体の攻撃が大きくUP": {
        "en": "10% boost to all allies ATK based on how high character HP is (Lelouch Lamperouge)",
        "ja": "ルルーシュの残りHPが多いほど味方全体の攻撃が大きくUP",
        "zh": "ルルーシュの残りHPが多いほど味方全体の攻撃が大きくUP",
    },
    "最大HPが15%減少 防御力が低いがイシュミールの残りHPが多いほど味方全体の攻撃が大きくUP": {
        "en": "Has 15% less HP. %15 boost to all allies' ATK based on how high character HP is (various)",
        "ja": "最大HPが15%減少 防御力が低いがイシュミールの残りHPが多いほど味方全体の攻撃が大きくUP",
        "zh": "最大HPが15%減少 防御力が低いがイシュミールの残りHPが多いほど味方全体の攻撃が大きくUP",
    },
    "トリプルアタック発動時に3回目の攻撃の5万与ダメージ上昇(ハレゼナ)": {
        "en": "50,000 Supplemental DMG to the third hit of triple attacks. (Hallessena)",
        "ja": "トリプルアタック発動時に3回目の攻撃の5万与ダメージ上昇(ハレゼナ)",
        "zh": "トリプルアタック発動時に3回目の攻撃の5万与ダメージ上昇(ハレゼナ)",
    },
    // sort keys
    "攻撃力(二手技巧無し,ジータさんのみ)": {
        "en": "Pure ATK, Player only",
        "ja": "攻撃力(二手技巧無し,ジータさんのみ)",
        "zh": "攻击力(不考虑连击技巧,只有主角)",
    },
    "パーティ平均攻撃力(二手技巧無し)": {
        "en": "Party-Averaged Pure ATK",
        "ja": "平均攻撃力(二手技巧無し)",
        "zh": "平均攻击力(不考虑连击技巧)",
    },
    "ジータさんHP": {
        "en": "Player HP",
        "ja": "ジータさんHP",
        "zh": "主角HP",
    },
    "技巧期待値(ジータさんのみ)": {
        "en": "Exp. Critical Ratio (Player only)",
        "ja": "技巧期待値(ジータさんのみ)",
        "zh": "技巧期望(只考虑主角)",
    },
    "技巧期待値(ジータさんのみ)": {
        "en": "Exp. Critical Ratio (Player only)",
        "ja": "技巧期待値(ジータさんのみ)",
        "zh": "技巧期望(只考虑主角)",
    },
    "技巧期待平均攻撃力": {
        "en": "Party-Averaged ATK with Critical",
        "ja": "技巧期待平均攻撃力",
        "zh": "平均期望攻击力(含技巧)",
    },
    "総合攻撃*期待回数*技巧期待値(ジータさんのみ)": {
        "en": "PureATK*Crit.*Freq. (Player only)",
        "ja": "総合攻撃*期待回数*技巧期待値(ジータさんのみ)",
        "zh": "综合攻击力*期望次数*技巧期望(只考虑主角)",
    },
    "総回技のパーティ平均値": {
        "en": "Averaged PCF value",
        "ja": "総回技のパーティ平均値",
        "zh": "综合期望全队平均值",
    },
    "予想ターン毎ダメージ(ジータさんのみ)": {
        "en": "Exp. Damage per Turn (Player only)",
        "ja": "予想ターンダメージ(ジータさんのみ)",
        "zh": "预测DPT(只考虑主角)",
    },
    "予想ターン毎ダメージのパーティ平均値": {
        "en": "Party-Averaged Exp. Turn Damage",
        "ja": "予想ターン毎ダメージのパーティ平均値",
        "zh": "预测DPT(全队平均值)",
    },
    "予想ダメージ(ジータさんのみ)": {
        "en": "Exp. Damage (Player only)",
        "ja": "予想ダメージ(ジータさんのみ)",
        "zh": "预测伤害(只考虑主角)",
    },
    "予想ダメージのパーティ平均値": {
        "en": "Party-Averaged Exp. Damage",
        "ja": "予想ダメージのパーティ平均値",
        "zh": "预测伤害(全队平均值",
    },
    "予想ダメージ平均の積分値": {
        "en": "Integration of Party-Averaged Exp. Turn Damage",
        "ja": "予想ダメージ平均の積分値",
        "zh": "预测伤害平均积分值",
    },
    "奥義+チェンバダメージ": {
        "en": "C.A.+Chain Damage",
        "ja": "奥義+チェンバダメージ",
        "zh": "C.A.+Chain Damage",
    },
    "★1": {
        "en": "★1",
        "ja": "★1",
        "zh": "★1",
    },
    "★2": {
        "en": "★2",
        "ja": "★2",
        "zh": "★2",
    },
    "★3": {
        "en": "★3",
        "ja": "★3",
        "zh": "★3",
    },
    "★4": {
        "en": "★4",
        "ja": "★4",
        "zh": "★4",
    },
    "★5": {
        "en": "★5",
        "ja": "★5",
        "zh": "★5",
    },
    "★6": {
        "en": "★6",
        "ja": "★6",
        "zh": "★6",
    },
    "★7": {
        "en": "★7",
        "ja": "★7",
        "zh": "★7",
    },
    "★8": {
        "en": "★8",
        "ja": "★8",
        "zh": "★8",
    },
    "★9": {
        "en": "★9",
        "ja": "★9",
        "zh": "★9",
    },
    "★10": {
        "en": "★10",
        "ja": "★10",
        "zh": "★10",
    },
    "★11": {
        "en": "★11",
        "ja": "★11",
        "zh": "★11",
    },
    "★12": {
        "en": "★12",
        "ja": "★12",
        "zh": "★12",
    },
    "表示項目切替": {
        "en": "Select Display Elements",
        "ja": "表示する項目を選択してください",
        "zh": "请选择要显示的项目",
    },
    "攻撃力・HP・連撃率": {
        "en": "ATK/HP/etcs",
        "ja": "攻撃力・HP・連撃率",
        "zh": "攻击力・HP・连击率",
    },
    "パーティ平均攻撃力": {
        "en": "Party-Averaged ATK",
        "ja": "パーティ平均攻撃力",
        "zh": "全队平均攻击力",
    },
    "予測ダメージ": {
        "en": "Expected Damages",
        "ja": "予測ダメージ",
        "zh": "预测伤害",
    },
    "キャラ情報・スキル合計値": {
        "en": "Chara Data, Skill Amount",
        "ja": "キャラ情報・スキル合計値",
        "zh": "角色情报・技能合计值",
    },
    // Skill name
    "通常攻刃(小)": {
        "en": "Normal Might (S)",
        "ja": "通常攻刃(小)",
        "zh": "通常攻刃(小)",
    },
    "通常攻刃(中)": {
        "en": "Normal Might (M)",
        "ja": "通常攻刃(中)",
        "zh": "通常攻刃(中)",
    },
    "通常攻刃(大)": {
        "en": "Normal Might (L)",
        "ja": "通常攻刃(大)",
        "zh": "通常攻刃(大)",
    },
    "通常攻刃II": {
        "en": "Normal Might (LL)",
        "ja": "通常攻刃II",
        "zh": "通常攻刃II",
    },
    "通常攻刃III": {
        "en": "Normal Might (LLL)",
        "ja": "通常攻刃III",
        "zh": "通常攻刃III",
    },
    "通常楚歌": {
        "en": "Normal Betrayal",
        "ja": "通常楚歌(永続)",
        "zh": "通常楚歌",
    },
    "通常暴君": {
        "en": "Normal Tyranny",
        "ja": "通常暴君",
        "zh": "通常暴君",
    },
    "通常暴君II": {
        "en": "Normal Tyranny II",
        "ja": "通常暴君II",
        "zh": "通常暴君II",
    },
    "通常背水(小)": {
        "en": "Normal Enmity (S)",
        "ja": "通常背水(小)",
        "zh": "通常背水(小)",
    },
    "通常背水(中)": {
        "en": "Normal Enmity (M)",
        "ja": "通常背水(中)",
        "zh": "通常背水(中)",
    },
    "通常背水(大)": {
        "en": "Normal Enmity (L)",
        "ja": "通常背水(大)",
        "zh": "通常背水(大)",
    },
    "通常渾身(小)": {
        "en": "Normal Stamina (S)",
        "ja": "通常渾身(小)",
        "zh": "通常渾身(小)",
    },
    "通常渾身(中)": {
        "en": "Normal Stamina (M)",
        "ja": "通常渾身(中)",
        "zh": "通常渾身(中)",
    },
    "通常渾身(大)": {
        "en": "Normal Stamina (L)",
        "ja": "通常渾身(大)",
        "zh": "通常渾身(大)",
    },
    "通常二手(小)": {
        "en": "Normal Dual Edge (S)",
        "ja": "通常二手(小)",
        "zh": "通常二手(小)",
    },
    "通常二手(中)": {
        "en": "Normal Dual Edge (M)",
        "ja": "通常二手(中)",
        "zh": "通常二手(中)",
    },
    "通常二手(大)": {
        "en": "Normal Dual Edge (L)",
        "ja": "通常二手(大)",
        "zh": "通常二手(大)",
    },
    "通常三手(小)": {
        "en": "Normal Trium (S)",
        "ja": "通常三手(小)",
        "zh": "通常三手(小)",
    },
    "通常三手(中)": {
        "en": "Normal Trium (M)",
        "ja": "通常三手(中)",
        "zh": "通常三手(中)",
    },
    "通常三手(大)": {
        "en": "Normal Trium (L)",
        "ja": "通常三手(大)",
        "zh": "通常三手(大)",
    },
    "通常克己(小)": {
        "en": "Normal Restraint (S)",
        "ja": "通常克己(小)",
        "zh": "通常克己(小)",
    },
    "通常克己(中)": {
        "en": "Normal Restraint (M)",
        "ja": "通常克己(中)",
        "zh": "通常克己(中)",
    },
    "通常神威(小)": {
        "en": "Normal Majesty (S)",
        "ja": "通常神威(小)",
        "zh": "通常神威(小)",
    },
    "通常神威(中)": {
        "en": "Normal Majesty (M)",
        "ja": "通常神威(中)",
        "zh": "通常神威(中)",
    },
    "通常神威(大)": {
        "en": "Normal Majesty (L)",
        "ja": "通常神威(大)",
        "zh": "通常神威(大)",
    },
    "通常括目": {
        "en": "Normal Heed",
        "ja": "通常括目",
        "zh": "通常括目",
    },
    "通常羅刹": {
        "en": "Normal Haunt",
        "ja": "通常羅刹",
        "zh": "通常罗刹",
    },
    "通常無双(中)": {
        "en": "Normal Primacy (M)",
        "ja": "通常無双(中)",
        "zh": "通常无双(中)",
    },
    "通常無双II": {
        "en": "Normal Primacy II",
        "ja": "通常無双II",
        "zh": "通常无双II",
    },
    "通常刃界(小)": {
        "en": "Normal Bladeshield (S)",
        "ja": "通常刃界(小)",
        "zh": "通常刃界(小)",
    },
    "通常乱舞(小)": {
        "en": "Normal Fandango (S)",
        "ja": "通常乱舞(小)",
        "zh": "通常乱舞(小)",
    },
    "通常秘奥(小)": {
        "en": "Normal Mystery (S)",
        "ja": "通常秘奥(小)",
        "zh": "通常秘奥(小)",
    },
    "通常秘奥(中)": {
        "en": "Normal Mystery (M)",
        "ja": "通常秘奥(中)",
        "zh": "通常秘奥(中)",
    },
    "通常秘奥(大)": {
        "en": "Normal Mystery (L)",
        "ja": "通常秘奥(大)",
        "zh": "通常秘奥(大)",
    },
    "通常必殺(中)": {
        "en": "Normal Sentence (M)",
        "ja": "通常必殺(中)",
        "zh": "通常必杀(中)",
    },
    "通常必殺(大)": {
        "en": "Normal Sentence (L)",
        "ja": "通常必殺(大)",
        "zh": "通常必杀(大)",
    },
    "通常英傑(大)": {
        "en": "Normal Glory (L)",
        "ja": "通常英傑(大)",
        "zh": "通常英傑(大)",
    },
    "通常恩寵(中)": {
        "en": "Normal Grace (M)",
        "ja": "通常恩寵(中)",
        "zh": "通常恩寵(中)",
    },
    "通常本質(中)": {
        "en": "Normal Essence (M)",
        "ja": "通常本質(中)",
        "zh": "通常本質(中)",
    },
    "通常庇護(小)": {
        "en": "Normal Refuge (S)",
        "ja": "通常庇護(小)",
        "zh": "通常庇護(小)",
    },
    "先制": {
        "en": "Preemptive",
        "ja": "先制(永続)",
        "zh": "先制",
    },
    "マグナ攻刃": {
        "en": "Magna Might I",
        "ja": "マグナ攻刃",
        "zh": "方阵攻刃",
    },
    "マグナ攻刃II": {
        "en": "Magna Might II",
        "ja": "マグナ攻刃II",
        "zh": "方阵攻刃II",
    },
    "マグナ楚歌": {
        "en": "Magna Betrayal",
        "ja": "マグナ楚歌(永続)",
        "zh": "方阵楚歌",
    },
    "マグナ背水(小)": {
        "en": "Magna Enmity (S)",
        "ja": "マグナ背水(小)",
        "zh": "方阵背水(小)",
    },
    "マグナ背水(中)": {
        "en": "Magna Enmity (M)",
        "ja": "マグナ背水(中)",
        "zh": "方阵背水(中)",
    },
    "マグナ背水(大)": {
        "en": "Magna Enmity (L)",
        "ja": "マグナ背水(大)",
        "zh": "方阵背水(大)",
    },
    "マグナ渾身(中)": {
        "en": "Magna Stamina (M)",
        "ja": "マグナ渾身(中)",
        "zh": "方阵浑身(中)",
    },
    "マグナ渾身(大)": {
        "en": "Magna Stamina (L)",
        "ja": "マグナ渾身(大)",
        "zh": "方阵浑身(大)",
    },
    "マグナ破壊(小)": {
        "en": "Magna Devastation (S)",
        "ja": "マグナ破壊(小)",
        "zh": "方阵破坏(小)",
    },
    "マグナ不可侵(小)": {
        "en": "Magna Truce (S)",
        "ja": "マグナ不可侵(小)",
        "zh": "方阵不可侵(小)",
    },
    "マグナ三手(小)": {
        "en": "Magna Trium (S)",
        "ja": "マグナ三手(小)",
        "zh": "方阵三手(小)",
    },
    "マグナ三手(中)": {
        "en": "Magna Trium (M)",
        "ja": "マグナ三手(中)",
        "zh": "方阵三手(中)",
    },
    "マグナ三手(大)": {
        "en": "Magna Trium (L)",
        "ja": "マグナ三手(大)",
        "zh": "方阵三手(大)",
    },
    "マグナ克己(中)": {
        "en": "Magna Restraint (M)",
        "ja": "マグナ克己(中)",
        "zh": "方阵克己(中)",
    },
    "マグナ神威(小)": {
        "en": "Magna Majesty (S)",
        "ja": "マグナ神威(小)",
        "zh": "方阵神威(小)",
    },
    "マグナ神威(中)": {
        "en": "Magna Majesty (M)",
        "ja": "マグナ神威(中)",
        "zh": "方阵神威(中)",
    },
    "マグナ神威(大)": {
        "en": "Magna Majesty (L)",
        "ja": "マグナ神威(大)",
        "zh": "方阵神威(大)",
    },
    "マグナ暴君": {
        "en": "Magna Tyranny",
        "ja": "マグナ暴君",
        "zh": "方阵暴君",
    },
    "マグナ括目": {
        "en": "Magna Heed",
        "ja": "マグナ括目",
        "zh": "方阵括目",
    },
    "マグナ羅刹": {
        "en": "Magna Haunt",
        "ja": "マグナ羅刹",
        "zh": "方阵罗刹",
    },
    "マグナ無双(中)": {
        "en": "Magna Primacy (M)",
        "ja": "マグナ無双(中)",
        "zh": "方阵无双(中)",
    },
    "マグナ乱舞(中)": {
        "en": "Magna Fandango (M)",
        "ja": "マグナ乱舞(中)",
        "zh": "方阵乱舞(中)",
    },
    "マグナ軍神(小)": {
        "en": "Magna Heroism (S)",
        "ja": "マグナ軍神(小)",
        "zh": "方阵军神(小)",
    },
    "マグナ軍神(中)": {
        "en": "Magna Heroism (M)",
        "ja": "マグナ軍神(中)",
        "zh": "方阵军神(中)",
    },
    "マグナ必殺(中)": {
        "en": "Magna Sentence (M)",
        "ja": "マグナ必殺(中)",
        "zh": "方阵必杀(中)",
    },
    "マグナ拳武(大)": {
        "en": "Magna Fist (L)",
        "ja": "マグナ拳武(大)",
        "zh": "方阵拳武(大)",
    },
    "マグナ杖術(大)": {
        "en": "Magna Wand (L)",
        "ja": "マグナ杖術(大)",
        "zh": "方阵杖術(大)",
    },
    "マグナ本質(中)": {
        "en": "Magna Essence (M)",
        "ja": "マグナ星晶(中)",
        "zh": "方阵本質(中)",
    },
    "アンノウンATK・I": {
        "en": "Unknown ATK I",
        "ja": "アンノウンATK・I",
        "zh": "UNK攻刃I",
    },
    "アンノウンATK・II": {
        "en": "Unknown ATK II",
        "ja": "アンノウンATK・II",
        "zh": "UNK攻刃II",
    },
    "EX背水(中)": {
        "en": "EX Enmity (M)",
        "ja": "EX背水(中)",
        "zh": "EX背水(中)",
    },
    "EX攻刃(小)": {
        "en": "EX Might (S)",
        "ja": "EX攻刃(小)",
        "zh": "EX攻刃(小)",
    },
    "EX攻刃(中)": {
        "en": "EX Might (M)",
        "ja": "EX攻刃(中)",
        "zh": "EX攻刃(中)",
    },
    "EX攻刃(大)": {
        "en": "EX Might (L)",
        "ja": "EX攻刃(大)",
        "zh": "EX攻刃(大)",
    },
    "EX攻刃(特大)": {
        "en": "EX Might (LL)",
        "ja": "EX攻刃(特大)",
        "zh": "EX攻刃(特大)",
    },
    "EX攻刃+守護(中)": {
        "en": "EX Might and Aegis (M)",
        "ja": "EX攻刃+守護(中)",
        "zh": "EX攻刃+守护(中)",
    },
    "通常守護(小)": {
        "en": "Normal Aegis (S)",
        "ja": "通常守護(小)",
        "zh": "通常守护(小)",
    },
    "通常守護(中)": {
        "en": "Normal Aegis (M)",
        "ja": "通常守護(中)",
        "zh": "通常守护(中)",
    },
    "通常守護(大)": {
        "en": "Normal Aegis (L)",
        "ja": "通常守護(大)",
        "zh": "通常守护(大)",
    },
    "通常守護II": {
        "en": "Normal Aegis (LL)",
        "ja": "通常守護II",
        "zh": "通常守护II",
    },
    "マグナ守護(小)": {
        "en": "Magna Aegis (S)",
        "ja": "マグナ守護(小)",
        "zh": "方阵守护(小)",
    },
    "マグナ守護(中)": {
        "en": "Magna Aegis I (M)",
        "ja": "マグナ守護(中)",
        "zh": "方阵守护(中)",
    },
    "マグナ守護(大)": {
        "en": "Magna Aegis II (L)",
        "ja": "マグナ守護(大)",
        "zh": "方阵守护(大)",
    },
    "アンノウン・VIT I(小)": {
        "en": "Unknown VIT I (S)",
        "ja": "アンノウン・VIT I(小)",
        "zh": "UNK守护(小)",
    },
    "アンノウン・VIT I(中)": {
        "en": "Unknown VIT I (M)",
        "ja": "アンノウン・VIT I(中)",
        "zh": "UNK守护(中)",
    },
    "アンノウン・VIT II(大)": {
        "en": "Unknown VIT II (L)",
        "ja": "アンノウン・VIT II(大)",
        "zh": "UNK守护(大)",
    },
    "ミフネ流・極意": {
        "en": "Mifune Style, Zen Impact",
        "ja": "ミフネ流・極意",
        "zh": "ミフネ流・極意",
    },
    "ミフネ流・双星": {
        "en": "Mifune Style, Binary Star",
        "ja": "ミフネ流・双星",
        "zh": "ミフネ流・双星",
    },
    "乱気の疾駆・壱": {
        "en": "Ventosus's First Dash",
        "ja": "乱気の疾駆・壱",
        "zh": "Ventosus's First Dash",
    },
    "紅蓮の呪印・弐": {
        "en": "Inferno's Second Insignia",
        "ja": "紅蓮の呪印・弐",
        "zh": "红莲的咒印・叁",
    },
    "地裂の煽惑・参": {
        "en": "Terra's Third Spur",
        "ja": "地裂の煽惑・参",
        "zh": "Terra's Third Spur",
    },
    "霧氷の追牙・肆": {
        "en": "Hoarfrost's Fourth Pursuit",
        "ja": "霧氷の追牙・肆",
        "zh": "雾冰的追牙・肆",
    },
    "貫きの牙": {
        "en": "Piercing Fang",
        "ja": "貫きの牙",
        "zh": "貫きの牙",
    },
    "貫きの牙(メイン装備時)": {
        "en": "Piercing Fang (main)",
        "ja": "貫きの牙(メイン装備時)",
        "zh": "貫きの牙(主手装备时)",
    },
    "鷲王の結界": {
        "en": "Royal Wing Barrier",
        "ja": "鷲王の結界",
        "zh": "鷲王の結界",
    },
    "舞姫の演武": {
        "en": "Dancer's Discipline",
        "ja": "舞姫の演武",
        "zh": "舞姫の演武",
    },
    "胡蝶の剣舞": {
        "en": "Fluttering Slash",
        "ja": "胡蝶の剣舞",
        "zh": "舞姫の演武",
    },
    "変幻自在の剣技": {
        "en": "Phantasmagoric Fencer",
        "ja": "変幻自在の剣技",
        "zh": "変幻自在の剣技",
    },
    "理外の美少女": {
        "en": "Transcendent Cuteness",
        "ja": "理外の美少女",
        "zh": "理外の美少女",
    },
    "通常技巧(小)": {
        "en": "Normal Verity (S)",
        "ja": "通常技巧(小)",
        "zh": "通常技巧(小)",
    },
    "通常技巧(中)": {
        "en": "Normal Verity (M)",
        "ja": "通常技巧(中)",
        "zh": "通常技巧(中)",
    },
    "通常技巧(大)": {
        "en": "Normal Verity (L)",
        "ja": "通常技巧(大)",
        "zh": "通常技巧(大)",
    },
    "マグナ技巧(小)": {
        "en": "Magna Verity (S)",
        "ja": "マグナ技巧(小)",
        "zh": "方阵技巧(小)",
    },
    "マグナ技巧(中)": {
        "en": "Magna Verity (M)",
        "ja": "マグナ技巧(中)",
        "zh": "方阵技巧(中)",
    },
    "マグナ技巧(大)": {
        "en": "Magna Verity (L)",
        "ja": "マグナ技巧(大)",
        "zh": "方阵技巧(大)",
    },
    "通常刹那(小)": {
        "en": "Normal Celere (S)",
        "ja": "通常刹那(小)",
        "zh": "通常刹那(小)",
    },
    "通常刹那(中)": {
        "en": "Normal Celere (M)",
        "ja": "通常刹那(中)",
        "zh": "通常刹那(中)",
    },
    "マグナ刹那(小)": {
        "en": "Magna Celere (S)",
        "ja": "マグナ刹那(小)",
        "zh": "マグナ刹那(小)",
    },
    "マグナ刹那(中)": {
        "en": "Magna Celere (M)",
        "ja": "マグナ刹那(中)",
        "zh": "マグナ刹那(中)",
    },
    "コスモス剣": {
        "en": "Cosmos Sword",
        "ja": "コスモス-剣",
        "zh": "Cosmos剑",
    },
    "コスモス短剣": {
        "en": "Cosmos Dagger",
        "ja": "コスモス-短剣",
        "zh": "Cosmos短剑",
    },
    "コスモス槍": {
        "en": "Cosmos Spear",
        "ja": "コスモス-槍",
        "zh": "Cosmos枪",
    },
    "コスモス斧": {
        "en": "Cosmos Axe",
        "ja": "コスモス-斧",
        "zh": "Cosmos斧",
    },
    "コスモス杖": {
        "en": "Cosmos Staff",
        "ja": "コスモス-杖",
        "zh": "Cosmos杖",
    },
    "コスモス銃": {
        "en": "Cosmos Gun",
        "ja": "コスモス-銃",
        "zh": "Cosmos铳",
    },
    "コスモス拳": {
        "en": "Cosmos Fist",
        "ja": "コスモス-拳",
        "zh": "Cosmos拳",
    },
    "コスモス弓": {
        "en": "Cosmos Bow",
        "ja": "コスモス-弓",
        "zh": "Cosmos弓",
    },
    "コスモス刀": {
        "en": "Cosmos Katana",
        "ja": "コスモス-刀",
        "zh": "Cosmos刀",
    },
    "コスモス楽器": {
        "en": "Cosmos Harp",
        "ja": "コスモス-楽器",
        "zh": "Cosmos乐器",
    },
    "コスモスAT": {
        "en": "Cosmos ATK",
        "ja": "コスモス-AT",
        "zh": "Cosmos AT",
    },
    "コスモスDF": {
        "en": "Cosmos DF",
        "ja": "コスモス-DF",
        "zh": "Cosmos DF",
    },
    "コスモスBL": {
        "en": "Cosmos BL",
        "ja": "コスモス-BL",
        "zh": "Cosmos BL",
    },
    "コスモスPC": {
        "en": "Cosmos PC",
        "ja": "コスモス-PC",
        "zh": "Cosmos PC",
    },
    "バハ攻-短剣": {
        "en": "Bahamut Dagger",
        "ja": "バハムート-短剣",
        "zh": "巴哈攻刃-短剑",
    },
    "バハ攻-斧": {
        "en": "Bahamut Axe",
        "ja": "バハムート-斧",
        "zh": "巴哈攻刃-斧",
    },
    "バハ攻-槍": {
        "en": "Bahamut Spear",
        "ja": "バハムート-槍",
        "zh": "巴哈攻刃-枪",
    },
    "バハ攻-銃": {
        "en": "Bahamut Gun",
        "ja": "バハムート-銃",
        "zh": "巴哈攻刃-铳",
    },
    "バハ攻HP-剣": {
        "en": "Bahamut Sword",
        "ja": "バハムート-剣",
        "zh": "巴哈攻刃-剑",
    },
    "バハ攻HP-杖": {
        "en": "Bahamut Staff",
        "ja": "バハムート-杖",
        "zh": "巴哈攻刃-杖",
    },
    "バハHP-格闘": {
        "en": "Bahamut Fist",
        "ja": "バハムート-格闘",
        "zh": "巴哈守护-拳",
    },
    "バハHP-刀": {
        "en": "Bahamut Sword",
        "ja": "バハムート-刀",
        "zh": "巴哈守护-刀",
    },
    "バハHP-弓": {
        "en": "Bahamut Bow",
        "ja": "バハムート-弓",
        "zh": "巴哈守护-弓",
    },
    "バハHP-楽器": {
        "en": "Bahamut Harp",
        "ja": "バハムート-楽器",
        "zh": "巴哈守护-乐器",
    },
    "バハフツ-短剣": {
        "en": "Bahamut Coda Dagger",
        "ja": "バハムート-フツルス-短剣",
        "zh": "紫化巴哈-短剑",
    },
    "バハフツ-斧": {
        "en": "Bahamut Coda Axe",
        "ja": "バハムート-フツルス-斧",
        "zh": "紫化巴哈-斧",
    },
    "バハフツ-槍": {
        "en": "Bahamut Coda Spear",
        "ja": "バハムート-フツルス-槍",
        "zh": "紫化巴哈-枪",
    },
    "バハフツ-銃": {
        "en": "Bahamut Coda Gun",
        "ja": "バハムート-フツルス-銃",
        "zh": "紫化巴哈-铳",
    },
    "バハフツ-剣": {
        "en": "Bahamut Coda Sword",
        "ja": "バハムート-フツルス-剣",
        "zh": "紫化巴哈-剑",
    },
    "バハフツ-杖": {
        "en": "Bahamut Coda Staff",
        "ja": "バハムート-フツルス-杖",
        "zh": "紫化巴哈-杖",
    },
    "バハフツHP-格闘": {
        "en": "Bahamut Coda Fist",
        "ja": "バハムート-フツルス-格闘",
        "zh": "紫化巴哈-格斗",
    },
    "バハフツHP-刀": {
        "en": "Bahamut Coda Katana",
        "ja": "バハムート-フツルス-刀",
        "zh": "紫化巴哈-刀",
    },
    "バハフツHP-弓": {
        "en": "Bahamut Coda Bow",
        "ja": "バハムート-フツルス-弓",
        "zh": "紫化巴哈-弓",
    },
    "バハフツHP-楽器": {
        "en": "Bahamut Coda Harp",
        "ja": "バハムート-フツルス-楽器",
        "zh": "紫化巴哈-乐器",
    },
    "オメガ-未強化": {
        "en": "Ultima (Raw)",
        "ja": "オメガ-未強化",
        "zh": "Omega-未强化",
    },
    "オメガ-戦意": {
        "en": "Ultima (Will)",
        "ja": "オメガ-戦意(通常攻刃10%UP)",
        "zh": "Omega-战意",
    },
    "オメガ-闘争": {
        "en": "Ultima (Strife)",
        "ja": "オメガ-闘争(DATA20%UP)",
        "zh": "Omega-斗争",
    },
    "オメガ-生命": {
        "en": "Ultima (Vitality)",
        "ja": "オメガ-生命(HP10%UP)",
        "zh": "Omega-生命",
    },
    "オメガ-強壮": {
        "en": "Ultima (Strength)",
        "ja": "オメガ-強壮(渾身(大))",
        "zh": "Omega-强壮",
    },
    "オメガ-激情": {
        "en": "Ultima (Zeal)",
        "ja": "オメガ-激情(背水(大))",
        "zh": "Omega-激情",
    },
    "オメガ-勇気": {
        "en": "Ultima (Courage)",
        "ja": "オメガ-勇気(クリティカルUP(発動率10%,倍率50%))",
        "zh": "Omega-勇气",
    },
    "ガフスキー[α]": {
        "en": "Gauph Key α (Normal Attack Cap 10%)",
        "ja": "ガフスキー[α](通常上限10%UP)",
        "zh": "1技能插件[α]",
    },
    "ガフスキー[β]": {
        "en": "Gauph Key β (Skill Cap 50%)",
        "ja": "ガフスキー[β](アビ上限50%UP)",
        "zh": "1技能插件[β]",
    },
    "ガフスキー[γ]": {
        "en": "Gauph Key γ (C.A. Cap 15%)",
        "ja": "ガフスキー[γ](奥義上限15%UP)",
        "zh": "1技能插件[γ]",
    },
    "ガフスキー[Δ]": {
        "en": "Gauph Key Δ (CB Cap 50%)",
        "ja": "ガフスキー[Δ](CB上限50%UP)",
        "zh": "1技能插件[Δ]",
    },
    "アーカーシャ-斧": {
        "en": "Akasha (Axe)",
        "ja": "アーカーシャ-斧",
        "zh": "アーカーシャ-斧",
    },
    "アーカーシャ-剣": {
        "en": "Akasha (Sword)",
        "ja": "アーカーシャ-剣",
        "zh": "アーカーシャ-剣",
    },
    "アーカーシャ-弓": {
        "en": "Akasha (Bow)",
        "ja": "アーカーシャ-弓",
        "zh": "アーカーシャ-弓",
    },
    "アーカーシャ-杖": {
        "en": "Akasha (Staff)",
        "ja": "アーカーシャ-杖",
        "zh": "アーカーシャ-杖",
    },
    "アーカーシャ-槍": {
        "en": "Akasha (Spear)",
        "ja": "アーカーシャ-槍",
        "zh": "アーカーシャ-槍",
    },
    "不壊の誓約": {
        "en": "Impervious Covenant",
        "ja": "不壊の誓約",
        "zh": "不壊の誓約",
    },
    "凱歌の誓約": {
        "en": "Victorious Covenant",
        "ja": "凱歌の誓約",
        "zh": "凱歌の誓約",
    },
    "修羅の誓約": {
        "en": "Contentious Covenant",
        "ja": "修羅の誓約",
        "zh": "修羅の誓約",
    },
    "致命の誓約": {
        "en": "Deleterious Covenant",
        "ja": "致命の誓約",
        "zh": "致命の誓約",
    },
    "災禍の誓約": {
        "en": "Calamitous Covenant",
        "ja": "災禍の誓約",
        "zh": "災禍の誓約",
    },
    "ペンデュラム[α]": {
        "en": "Pendulum Key α (Normal Attack Cap 10%)",
        "ja": "ペンデュラム[α](通常上限10%UP)",
        "zh": "ペンデュラム[α](通常上限10%UP)",
    },
    "ペンデュラム[β]": {
        "en": "Pendulum Key β (Skill Cap 50%)",
        "ja": "ペンデュラム[β](アビ上限50%UP)",
        "zh": "ペンデュラム[β](アビ上限50%UP)",
    },
    "ペンデュラム[γ]": {
        "en": "Pendulum Key γ (C.A. Cap 15%)",
        "ja": "ペンデュラム[γ](奥義上限15%UP)",
        "zh": "ペンデュラム[γ](奥義上限15%UP)",
    },
    "ペンデュラム[Δ]": {
        "en": "Pendulum Key Δ (CB Cap 50%)",
        "ja": "ペンデュラム[Δ](CB上限50%UP)",
        "zh": "ペンデュラム[Δ](CB上限50%UP)",
    },
    "天司の祝福": {
        "en": "Angel's Blessing",
        "ja": "天司の祝福",
        "zh": "天司的祝福",
    },
    "天司の祝福II": {
        "en": "Angel's Blessing II",
        "ja": "天司の祝福II",
        "zh": "天司的祝福II",
    },
    "天司の祝福III": {
        "en": "Angel's Blessing III",
        "ja": "天司の祝福III",
        "zh": "天司的祝福III",
    },
    "通常上限UP(2.5%)": {
        "en": "Damage Cap UP(2.5%)",
        "ja": "通常上限UP(2.5%)",
        "zh": "通常上限UP(2.5%)",
    },
    "通常上限UP(7.0%)": {
        "en": "Damage Cap UP(7.0%)",
        "ja": "通常上限UP(7.0%)",
        "zh": "通常上限UP(7.0%)",
    },
    "通常上限UP(10%)": {
        "en": "Damage Cap UP(10%)", //a.k.a:damageLimit
        "ja": "通常上限UP(10%)",
        "zh": "通常上限UP(10%)",
    },
    "奥義上限UP(10%)": {
        "en": "C.A. Cap UP(10%)",  //a.k.a:ougiDamageLimit
        "ja": "奥義上限UP(10%)",
        "zh": "奥义上限UP(10%)",
    },
    "黄龍槍 (メイン装備時)": {
        "en": "Huanglong spear (main)",
        "ja": "黄龍槍 (メイン装備時)",
        "zh": "Huanglong spear (main)",
    },
    "ケルヴィム (メイン装備時)": {
        "en": "Cherubim Lance (main)",
        "ja": "ケルヴィム (メイン装備時)",
        "zh": "ケルヴィム (メイン装備時)",
    },
    "真・道天浄土 (メイン装備時)": {
        "en": "True Purity Sunblade (main)",
        "ja": "真・道天浄土 (メイン装備時)",
        "zh": "真・道天浄土 (メイン装備時)",
    },
    "奥義上限UP(イクシード)": {
        "en": "C.A. Cap UP (Exceed)",  //a.k.a:ougiDamageLimitByExceed
        "ja": "奥義上限UP(イクシード)",
        "zh": "奥义上限UP(Exceed)",
    },
    "チェインフォース": {
        "en": "Chain Force",
        "ja": "チェインフォース",
        "zh": "チェインフォース",
    },
    // Extended skills
    "通常渾身(大)(神石加護無効)": {
        "en": "Normal Stamina (L) (No Summon Aura)",
        "ja": "通常渾身(大)(神石加護無効)",
        "zh": "通常浑身(大)(不受加护影响)",
    },
    "[ジータのみ] 通常枠DATA 5%": {
        "en": "[DjeetaOnly] Normal DA/TA 5%",
        "ja": "[ジータのみ] 通常枠DATA 5%",
        "zh": "[只限主角] 通常DATA 5%",
    },
    "[ジータのみ] 通常枠DATA 10%": {
        "en": "[DjeetaOnly] Normal DA/TA 10%",
        "ja": "[ジータのみ] 通常枠DATA 10%",
        "zh": "[只限主角] 通常DATA 10%",
    },
    "[ジータのみ] 通常枠DATA 15%": {
        "en": "[DjeetaOnly] Normal DA/TA 15%",
        "ja": "[ジータのみ] 通常枠DATA 15%",
        "zh": "[只限主角] 通常DATA 15%",
    },
    "[ジータのみ] 通常枠DATA 20%": {
        "en": "[DjeetaOnly] Normal DA/TA 20%",
        "ja": "[ジータのみ] 通常枠DATA 20%",
        "zh": "[只限主角] 通常DATA 20%",
    },
    "[ジータのみ] 通常枠DATA 25%": {
        "en": "[DjeetaOnly] Normal DA/TA 25%",
        "ja": "[ジータのみ] 通常枠DATA 25%",
        "zh": "[只限主角] 通常DATA 25%",
    },
    "[ジータのみ] 通常枠DATA 30%": {
        "en": "[DjeetaOnly] Normal DA/TA 30%",
        "ja": "[ジータのみ] 通常枠DATA 30%",
        "zh": "[只限主角] 通常DATA 30%",
    },
    // For templates
    "王道: 竜巻の技巧": {
        "en": "Normal Verity (M)",
        "ja": "王道: 竜巻の技巧",
        "zh": "王道: 龙卷的技巧",
    },
    "王道: 火の守護": {
        "en": "Normal Aegis (M)",
        "ja": "王道: 火の守護",
        "zh": "王道: 火的守護",
    },
    "王道: 大地の技巧": {
        "en": "Normal Verity (M)",
        "ja": "王道: 大地の技巧",
        "zh": "王道: 大地的技巧",
    },
    "王道: 水の二手": {
        "en": "Normal Duel Edge (M)",
        "ja": "王道: 水の二手",
        "zh": "王道: 水的二手",
    },
    "邪道: 通常上限UP(7.0%)": {
        "en": "Damage Cap UP(7.0%)",
        "ja": "邪道: 通常上限UP(7.0%)",
        "zh": "邪道: 通常上限UP(7.0%)",
    },
    "敵防御10.0": {
        "en": "10.0 (General)",
        "ja": "10.0 (一般的な敵)",
        "zh": "10.0 (一般的敌人)",
    },
    "敵防御10.5": {
        "en": "10.5 (Ul Baha N)",
        "ja": "10.5 (アルバハN)",
        "zh": "10.5 (Ul Baha N)",
    },
    "敵防御11.0": {
        "en": "11.0 (GW Nightmare/Ul Baha HL/Proto Baha N)",
        "ja": "11.0 (通常古戦場HELL/アルバハHL/プロバハN)",
        "zh": "11.0 (GW Nightmare/Ul Baha HL/Proto Baha N)",
    },
    "敵防御12.0": {
        "en": "12.0 (Omega II(Light&Dark)/Omega HL/Huanglong&Qilin HL)",
        "ja": "12.0 (マグナⅡ光闇/マグナHL/黄龍・黒麒麟HL)",
        "zh": "12.0 (Omega II(Light&Dark)/Omega HL/Huanglong&Qilin HL)",
    },
    "敵防御13.0": {
        "en": "13.0 (Omega II(4 Elements))",
        "ja": "13.0 (マグナⅡ4属性)",
        "zh": "13.0 (Omega II(4 Elements))",
    },
    "敵防御14.0": {
        "en": "14.0 (Freyr)",
        "ja": "14.0 (フレイ)",
        "zh": "14.0 (Freyr)",
    },
    "敵防御15.0": {
        "en": "15.0 (Malice/Akasha/Lucilius N)",
        "ja": "15.0 (マリス/アーカーシャ/ルシファーN)",
        "zh": "15.0 (Malice/Akasha/Lucilius N)",
    },
    "敵防御20.0": {
        "en": "20.0 (Proto Baha HL/Lucilius H)",
        "ja": "20.0 (プロトバハムートHL/ルシファーH)",
        "zh": "20.0 (Proto Baha HL/Lucilius H)",
    },
    // chart sort key
    "ジータさん残りHP": {
        "en": "Player Remain HP",
        "ja": "ジータさん残りHP",
        "zh": "主角剩余HP",
    },
    "まとめて比較": {
        "en": "Compare All",
        "ja": "まとめて比較",
        "zh": "全部一起比较",
    },
    "保存された編成を編集": {
        "en": "Edit Saved Weapon Setups",
        "ja": "保存された編成を編集",
        "zh": "编辑已保存的编成",
    },
    "保存された編成を削除": {
        "en": "Delete All Saved Setups",
        "ja": "保存された編成を全て削除",
        "zh": "删除全部已保存的编成",
    },
    "保存済みの編成": {
        "en": "Saved Weapon Setups",
        "ja": "保存済みの編成",
        "zh": "已保存的编成",
    },
    // send request
    "追加要望を送る": {
        "en": "Send new template request",
        "ja": "追加要望を送る",
        "zh": "发送新的追加请求",
    },
    "追加要望を送る": {
        "en": "Send new template request",
        "ja": "追加要望を送る",
        "zh": "发送新的追加请求",
    },
    "キャラ追加要望": {
        "en": "New character template request",
        "ja": "キャラ追加要望",
        "zh": "角色追加请求",
    },
    "武器追加要望": {
        "en": "New weapon template request",
        "ja": "武器追加要望",
        "zh": "武器追加请求",
    },
    "要望種別": {
        "en": "Request type",
        "ja": "要望種別",
        "zh": "请求类型",
    },
    "名": {
        "en": "name ",
        "ja": "名",
        "zh": "名字",
    },
    "メッセージ": {
        "en": "Message ",
        "ja": "詳細",
        "zh": "内容",
    },
    "あなたのお名前": {
        "en": "Your name (optional) ",
        "ja": "あなたのお名前（任意）",
        "zh": "你的名字 (任意)",
    },
    "送信": {
        "en": "SUBMIT",
        "ja": "送信",
        "zh": "发送",
    },
    "送信成功": {
        "en": "Your request was sent!",
        "ja": "要望を送信しました!",
        "zh": "发送成功!",
    },
    "要望送信メッセージ": {
        "en": "Send a comment to github motocal Issue.",
        "ja": "github/motocalのIssueに要望コメントを送信します.",
        "zh": "将请求发送到github/motocal的Issue",
    },
    // Simulator Infomation
    "パーティ全体": {
        "en": "Settings for all alies",
        "ja": "パーティ全体設定",
        "zh": "全队设定",
    },
    "通常攻撃": {
        "en": "Attack",
        "ja": "通常攻撃",
        "zh": "通常攻击",
    },
    "奥義": {
        "en": "C.A.",
        "ja": "奥義",
        "zh": "奥义",
    },
    "奥義(ダメージ無し)": {
        "en": "C.A. w/o damage",
        "ja": "奥義(ダメージ無し)",
        "zh": "奥义(无伤害)",
    },
    "ターン数": {
        "en": "Turn length",
        "ja": "ターン数",
        "zh": "回合数",
    },
    "ターン": {
        "en": "Turn",
        "ja": "ターン",
        "zh": "回合",
    },
    "バフテンプレート": {
        "en": "Open Buff Templates",
        "ja": "バフテンプレートを開く",
        "zh": "打开Buff列表",
    },
    "バフテンプレート説明": {
        "en": "Drag and drop these buttons into a turn.",
        "ja": "追加したいターンにバフボタンをドラッグアンドドロップしてください.",
        "zh": "请把Buff按钮拖到想要追加的回合上。",
    },
    "シミュレータ-上にコピー": {
        "en": "Copy all settings to the upper row.",
        "ja": "上の行にバフ設定をコピーします.",
        "zh": "把Buff设定复制到上面一行。",
    },
    "シミュレータ-下にコピー": {
        "en": "Copy all settings to the lower row.",
        "ja": "下の行にバフ設定をコピーします.",
        "zh": "把Buff设定复制到下面一行。",
    },
    // Buff template
    "レイジIII": {
        "en": "Rage III",
        "ja": "レイジIII",
        "zh": "Rage III",
    },
    "レイジIV": {
        "en": "Rage IV",
        "ja": "レイジIV",
        "zh": "Rage IV",
    },
    "ランページ": {
        "en": "Rampage",
        "ja": "ランページ",
        "zh": "Rampage",
    },
    "四天刃バフ": {
        "en": "Four-Sky Blade Buff",
        "ja": "四天刃バフ",
        "zh": "四天刃Buff",
    },
    "属性バフ(30%)": {
        "en": "Element Buff (30%)",
        "ja": "属性バフ(30%)",
        "zh": "属性バフ(30%)",
    },
    "コルワ1アビフィル10": {
        "en": "Korwa Abi1 Fill 10",
        "ja": "コルワ1アビフィル10",
        "zh": "コルワ1技能10纺丝",
    },
    "コルワ2アビフィル10": {
        "en": "Korwa Abi2 Fill 10",
        "ja": "コルワ2アビフィル10",
        "zh": "コルワ2技能10纺丝",
    },
    "SOG 楽器なし": {
        "en": "Sky Realm Song w/o Harp",
        "ja": "ソング・オブ・グランデ 楽器なし",
        "zh": "Sky Realm Song 无乐器",
    },
    "SOG 楽器あり": {
        "en": "Sky Realm Song with Harp",
        "ja": "ソング・オブ・グランデ 楽器あり",
        "zh": "Sky Realm Song 装备乐器",
    },
    "コール・オブ・アビス 楽器あり": {
        "en": "Call of the Abyss with Harp",
        "ja": "コール・オブ・アビス 楽器あり",
        "zh": "Call of the Abyss 装备乐器",
    },
    "天眼陣(3T)": {
        "en": "Omnipotent Eye (3T)",
        "ja": "天眼陣(3T)",
        "zh": "天眼阵(3T)",
    },
    "他心陣と奥義": {
        "en": "Splitting Spirit and C.A.",
        "ja": "他心陣と奥義",
        "zh": "他心阵和奥义",
    },
    // Notice
    "オメガウェポン注記": {
        "en": "Gauph Key of Strength is not implemented yet.",
        "ja": "ガフスキー強壮(渾身)は未実装です.",
        "zh": "Omega武器1技能的强壮(浑身)还没有实装。",
    },
    "天司武器注記": {
        "en": "If you added Angel's weapon in your grid, set the sort key to that based on \'Damage\'.",
        "ja": "天司武器入りで計算する場合、優先項目をダメージベースのものに設定してください.",
        "zh": "把天司武器加入计算的时候，请选择基于伤害的优先项目。",
    },
    "敵の弱体効果": {
        "en": "Number of Debuffs (on target)",
        "ja": "敵の弱体効果の数",
        "za": "敵の弱体効果の数",
    },
    "ジータバフの数": {
        "en": "Number of Buffs (on Djeeta)",
        "ja": "バフの数（ジータ）",
        "za": "バフの数（ジータ）",
    },
    "広告": {
        "en": "Ad.",
        "ja": "広告",
        "zh": "广告",
    },
    "入力例:": {
        "en": "Input Example:",
        "ja": "入力例:",
        "zh": "入力例:",
    },
    "不具合報告・ご要望:": {
        "en": "Bug Report/Request:",
        "ja": "不具合報告・ご要望:",
        "zh": "不具合報告・要望:",
    },
    "開発者募集:": {
        "en": "Recruiting Developers:\n",
        "ja": "開発者募集:",
        "zh": "開発者募集:",
    },
    "更新履歴": {
        "en": "Changelog",
        "ja": "更新履歴",
        "zh": "更新履歴",
    },
    "次の{step}件を表示": {
        "en": "Show next {step} logs",
        "ja": "次の{step}件を表示",
        "zh": "Show next {step} logs",
    },
    "percent": {
        "en": " {}%",
        "ja": "{}%",
        "zh": " {}%",
    },
    "notice-20170114-1": {
        "en": "2017/01/14: English Support (partly).",
        "ja": "2017/01/14: 英語対応",
        "zh": "2017/01/14: 英语支持",
    },
    "notice-20170116-1": {
        "en": "2017/01/16: Fixed HP calculation process missed including Job HP bonus and Health Bonus.",
        "ja": "2017/01/16: ジョブのHPボーナスと守護ボーナスを計算に入れ忘れていたのを修正",
        "zh": "2017/01/16: 修正了职业的HP和守护Bonus被遗忘的问题",
    },
    "notice-20170116-2": {
        "en": "2017/01/16: Fixed a bug that \"Character Favorite Weapon\" also affect their HP.",
        "ja": "2017/01/16: キャラの得意武器補正がHPにも乗っていたのを修正",
        "zh": "2017/01/16: 修正了得意武器也会影响HP的问题",
    },
    "notice-20170118-1": {
        "en": "2017/01/18: Added some advertisements to make myself motivate.",
        "ja": "2017/01/18: 開発意欲を出すため広告を追加.",
        "zh": "2017/01/18: 为了开发动力增加了广告。",
    },
    "notice-20170121-1": {
        "en": "2017/01/21: Fixed a bug that \"Inferno's Seconda Insignia\" is not affected by Agnis.",
        "ja": "2017/01/21: 紅蓮の呪印・弐にアグニス石が影響するように戻した.",
        "zh": "2017/01/21: 修正了红莲的咒印・叁不受阿格尼斯加护的问题。",
    },
    "notice-20170121-2": {
        "en": "2017/01/21: Implemennted Zaruhamerina Enmity.",
        "ja": "2017/01/21: ザルハメリナ背水の実装.",
        "zh": "2017/01/21: ザルハメリナ背水(被动技能)实装。",
    },
    "notice-20170121-3": {
        "en": "2017/01/21: Display Health Bonus amount in skill amount info.",
        "ja": "2017/01/21: 守護ボーナス分がスキル情報として表示されるようにした。",
        "zh": "2017/01/21: 守护Bonus部分现在也作为技能情报显示。",
    },
    "notice-20170121-4": {
        "en": "2017/01/21: Added Zenith Perk for Party HP Bonus",
        "ja": "2017/01/21: パーティHPボーナスのゼニス入力欄を追加",
        "zh": "2017/01/21: 增加了全队HP LB的输入栏。",
    },
    "notice-20170121-5": {
        "en": "2017/01/21: Added Send new tempalte request button.",
        "ja": "2017/01/21: テンプレート追加要望ボタンを追加.",
        "zh": "2017/01/21: 添加了列表追加请求按钮。",
    },
    "notice-20170122-1": {
        "en": "2017/01/22: Fixed a bug that some weapon which have element changes cannot add. / Added new weapons",
        "ja": "2017/01/22: 属性変更武器が追加できなくなっていた不具合を修正 / 武器追加",
        "zh": "2017/01/22: 修正了无法增加改变属性武器的Bug / 追加新武器",
    },
    "notice-20170122-2": {
        "en": "2017/01/22: Fixed invalid Open Enmity-Graph call if character length > 3.",
        "ja": "2017/01/22: キャラ数が4人以上の場合に背水グラフが開けなくなっていた不具合を修正",
        "zh": "2017/01/22: 修正了角色数4人以上时无法打开背水图表的问题。",
    },
    "notice-20170123-1": {
        "en": "2017/01/23: Added new templates. / Changed the standard sortkey.",
        "ja": "2017/01/23: 新規キャラと武器追加 / 標準のソートキーを変更",
        "zh": "2017/01/23: 添加新角色与新武器 / 改变了标准sort key",
    },
    "notice-20170129-1": {
        "en": "2017/01/29: Implemented personal buff inputs. (and tweaked character tab style.) / Additional Damage buff gets displayed in skill information.",
        "ja": "2017/01/29: キャラ個別バフ欄の追加 (キャラ欄の見た目調整) / 追加ダメージバフがスキル情報に表示されるように修正.",
        "zh": "2017/01/29: 添加了角色个别的Buff栏(角色栏的UI调整) / 追加伤害Buff现在也作为技能情报显示了",
    },
    "notice-20170202-1": {
        "en": "2017/02/02: Added new two weapons.",
        "ja": "2017/02/02: カースドブレイドとマシンボウ追加.",
        "zh": "2017/02/02: 添加了两把新武器。",
    },
    "notice-20170204-1": {
        "en": "2017/02/04: Added Rosamia.",
        "ja": "2017/02/04: ロザミア(SSR)が抜けていたので追加.",
        "zh": "2017/02/04: 添加了ロザミア(SSR)",
    },
    "notice-20170204-2": {
        "en": "2017/02/04: Weapons which have element variation become displayed regardless of the filter element.",
        "ja": "2017/02/04: 属性変更武器が、属性フィルターに関わらず表示されるようにした.",
        "zh": "2017/02/04: 变更属性武器现在无论选择了哪个属性都会显示。",
    },
    "notice-20170208-1": {
        "en": "2017/02/08: Implemented \"Enmity Graph based on real HP\" / Changed input behavior, open templates when a user begins name input.",
        "ja": "2017/02/08: 実HPベースの背水グラフ表示を実装 / 武器とキャラの名前が空欄の時に入力を開始するとテンプレートが自動的に開かれるようにした.",
        "zh": "2017/02/08: 实装了基于实际HP的背水图表 / 现在武器和角色名字为空，输入开始就会自动打开列表。",
    },
    "notice-20170212-1": {
        "en": "2017/02/12: Fixed a bug that cannot open enmity graph if there is only one summon setup.",
        "ja": "2017/02/12: 召喚石組み合わせが1組のみの場合に背水グラフが開けないバグを修正.",
        "zh": "2017/02/12: 修正了召唤石只有1组时打不开背水图表的Bug。",
    },
    "notice-20170212-2": {
        "en": "2017/02/12: Added coco&mimi Lv150.",
        "ja": "2017/02/12: ココミミとペルソスの最終上限解放ステータスを追加. (スキル対応はまだ).",
        "zh": "2017/02/12: 增加了可可&米米的最终上限解放数值。",
    },
    "notice-20170212-3": {
        "en": "2017/02/12: Added Job Masterpieces tempalte.",
        "ja": "2017/02/12: 属性変更後のジョブマスターピースのテンプレートを追加.",
        "zh": "2017/02/12: 增加了改变属性后的英雄武器。",
    },
    "notice-20170216-1": {
        "en": "2017/02/16: Addded Xeno Ifrit Axes.",
        "ja": "2017/02/16: ゼノイフリート斧とEX特大の計算を追加 / ジョブの守護ボーナスの計算タイミングがおかしいのを修正.",
        "zh": "2017/02/16: 增加了火六道斧与EX特大的计算 / 修正了职业守护Bonus计算的问题",
    },
    "notice-20170217-1": {
        "en": "17/02/2017: Currently, there is a invalid data loading bug when you load the setup from a browser. When it happened, change an value in Profile Tab. It will fix the result.",
        "ja": "2017/02/17: 現在、ブラウザ保存したデータ読み込み時にプロフィール欄が正しく読み込まれない場合があるようです. その場合、プロフィール欄の入力値をどこでもいいので適当に変更すると正しい計算結果になるはずです.",
        "zh": "2017/02/17: 现在读取浏览器保存的数据时可能资料栏无法正确读取。如果遇到这种情况，重新输入资料栏的任意栏应该就会解决。",
    },
    "notice-20170218-1": {
        "en": "18/02/2017: Added charas and weapons, apsaras.",
        "ja": "2017/02/18: 武器とキャラ追加 / アプサラス追加.",
        "zh": "2017/02/18: 增加新武器/新角色/新职业",
    },
    "notice-20170218-2": {
        "en": "18/02/2017: Added English Name of Romeo, Yngwei, Yuisis, Rastina and Implemented English name searching for these charas.",
        "ja": "2017/02/18: ロミオ、イングヴェイ、ユイシス、ラスティナの連撃率更新 / 英語名表示と英語名検索を実装.",
        "zh": "2017/02/18: 更新了一部分角色的连击率 / 增加了英语名字和英语名搜索",
    },
    "notice-20170302-1": {
        "en": "02/03/2017: Display chara elements and enemy's element in result tab. Do not display Exp. Critical Ratio in number when djeeta's element is Non-advantage.",
        "ja": "2017/03/02: キャラ属性と敵属性を結果欄に表示するように変更 / 非有利の時は技巧期待値を数値で表示しないように変更",
        "zh": "2017/03/02: 现在角色属性与敌人属性会显示在结果栏中 / 非有利的时候不再表示技巧的期望值。",
    },
    "notice-20170305-1": {
        "en": "05/03/2017: Disabled swipe tab switching. Modified the graph add bution.",
        "ja": "2017/03/05: スワイプによるタブ移動を無効化. グラフ追加ボタンを元に戻した.",
        "zh": "2017/03/05: 拖动不再能移动栏。 修改了追加图表按钮。",
    },
    "notice-20170305-2": {
        "en": "05/03/2017: Added new weapons.",
        "ja": "2017/03/05: 4凸ブリューナク追加. スキル「貫きの牙」追加. ブリューナク追加時にメイン装備かどうかの切り替えができるようにした.",
        "zh": "2017/03/05: 增加了4突武器ブリューナク和技能。",
    },
    "notice-20170306-1": {
        "en": "06/03/2017: Implemented piram's 2nd skill.",
        "ja": "2017/03/06: 4凸ピラムのスキル「鷲王の結界」実装. 効果量はジータのみDA+13%（SLv15の時）で、SLv14以下は適当に0.5%ごと減少にしています.",
        "zh": "2017/03/06: 增加了4突武器ピラム的技能「鷲王の結界」。",
    },
    "notice-20170308-1": {
        "en": "08/03/2017: Changed the maximum rank to 200.",
        "ja": "2017/03/08: ランクの上限値を200に変更.",
        "zh": "2017/03/08: Rank上限变为200。",
    },
    "notice-20170310-1": {
        "en": "10/03/2017: Implemented new \"Damage UP\" skill (Angel's blessing).",
        "ja": "2017/03/10: 天司の祝福スキルを実装. 与ダメージ上昇を計算できるようにした. (スキル情報にも表示されます)",
        "zh": "2017/03/10: 增加了天司的祝福技能。（效果显示在技能情报中）",
    },
    "notice-20170311-1": {
        "en": "11/03/2017: Added new weapons.",
        "ja": "2017/03/11: 新武器などを追加",
        "zh": "2017/03/11: 增加了新武器。",
    },
    "notice-20170312-1": {
        "en": "12/03/2017: Modified Enmity (M) and Enmity (L) values.",
        "ja": "2017/03/12: 背水(中)と背水(大)の効果量を微修正.",
        "zh": "2017/03/12: 微调了背水(中)和背水(大)的效果量",
    },
    "notice-20170312-2": {
        "en": "12/03/2017: Separated \"Single Attack Damage\" columns and added new sort keys.",
        "ja": "2017/03/12: \"単攻撃ダメージ\"を4つに分類し、ソートキーを追加.",
        "zh": "2017/03/12: 将单次攻击伤害分成4类，增加了新的sort key。",
    },
    "notice-20170315-1": {
        "en": "15/03/2017: Implemented Critical UP support abilities.",
        "ja": "2017/03/15: キャラサポアビのクリティカル計算を実装",
        "zh": "2017/03/15: 增加了角色被动技能的暴击率计算。",
    },
    "notice-20170317-1": {
        "en": "17/03/2017: Implemented Angel's blessing II. / Added Seraphim weapon (SSR) templates",
        "ja": "2017/03/17: 天司の祝福II(与ダメージアップ20%)を実装. / 天司武器SSRを追加.",
        "zh": "2017/03/17: 实装了SSR天司武器及技能天司的祝福II（伤害增加20%)",
    },
    "notice-20170328-1": {
        "en": "28/03/2017: Fixed problems on data loading from browser.",
        "ja": "2017/03/28: ブラウザデータロード時に正しく読み込まれないことがあるバグを修正.",
        "zh": "2017/03/28: 修正了浏览器数据无法正确读取的Bug。",
    },
    "notice-20170329-1": {
        "en": "29/03/2017: Fixed bugs.",
        "ja": "2017/03/29: 霧氷の追牙に神石効果が乗らない不具合を修正 / 天司スキルが非有利の場合でも計算されてしまう不具合を修正.",
        "zh": "2017/03/29: 修正了雾冰的追牙(玄武壳拳)不受加护影响的Bug / 天司技能非有利也会计算的Bug。",
    },
    "notice-20170329-3": {
        "en": "29/03/2017: Fixed invalid loading if the weapon or summon number is not matched their default number. / Fixed that the server save function was corrupted.",
        "ja": "2017/03/29: 武器数と召喚石組数が変更されたデータが読み込まれた際に表示がおかしくなるバグを修正 / サーバーに保存機能が動いていなかったバグを修正.",
        "zh": "2017/03/29: 修正了读取改变了武器数和召唤石的组数的数据时的一个Bug。",
    },
    "notice-20170331-1": {
        "en": "31/03/2017: Fixed values of normal and magna criticals (M). / Added Elysian. / Improved buff input interfaces.",
        "ja": "2017/03/31: 技巧(中)の効果量修正 / エリュシオン追加 / バフ入力欄の利便性向上.",
        "zh": "2017/03/31: 修正了技巧(中)的效果量 / 追加了新职业Elysian / 改进了Buff输入栏。",
    },
    "notice-20170409-1": {
        "en": "09/04/2017: Improved An Interface of Damage Simulator. / Implemented name editing of saved grids.",
        "ja": "2017/04/09: ダメージシミュレータのインターフェースの改善 / 保存した編成の名前を編集できるようにした.",
        "zh": "2017/04/09: 伤害模拟器UI改进 / 现在可以自己编辑保存的编成名了。",
    },
    "notice-20170410-1": {
        "en": "10/04/2017: Added a new skill Normal Tyranny II and Implemented the additional skill selection for Four beast weapons.",
        "ja": "2017/04/09: 通常暴君IIを追加 / 新四象武器選択時に追加スキルを追加するか選択可能に.",
        "zh": "2017/04/09: 增加了通常暴君II / 选择新四象武器时可以选择追加技能了。",
    },
    "notice-20170414-1": {
        "en": "14/04/2017: Added a skill Normal Aegis (LL).",
        "ja": "2017/04/14: 通常守護IIを追加.",
        "zh": "2017/04/14: 增加了通常守护II。",
    },
    "notice-20170415-1": {
        "en": "15/04/2017: Partly added English Templates! Thanks theorycrafting guys.",
        "ja": "2017/04/15: 武器とキャラテンプレートの一部を英語化.",
        "zh": "2017/04/15: 武器和角色列表一部分英化。",
    },
    "notice-20170501-1": {
        "en": "01/05/2017: Added new weapons and skills.",
        "ja": "2017/05/01: 武器追加、通常攻刃IIIと通常三手(小)[未検証]を追加.",
        "zh": "2017/05/01: 增加新武器 / 增加新技能 通常攻刃III和通常三手(小)",
    },
    "notice-20170516-1": {
        "en": "16/05/2017: Fixed the invalid value of Health Bonus by Majesty skills.",
        "ja": "2017/05/16: 神威スキルのHP上昇量が通常守護のものとなっていたので修正.",
        "zh": "2017/05/16: 修正了神威技能有误的HP上升量。",
    },
    "notice-20170517-1": {
        "en": "17/05/2017: Implemented Chain Burst calculation.",
        "ja": "2017/05/17: チェインバーストダメージの計算を実装.",
        "zh": "2017/05/17: 实装了Chain Burst伤害的计算。",
    },
    "notice-20170525-1": {
        "en": "25/05/2017: Implemented Damage Limit UP calculation.",
        "ja": "2017/05/25: ダメージ上限UPの計算を実装.",
        "zh": "2017/05/25: 实装了伤害上限上升的计算。",
    },
    "notice-20170531-1": {
        "en": "31/05/2017: Fixed an invalid status of Murgles / Modified the skill amount of Andalis 4* damage limit up to 7%.",
        "ja": "2017/05/31: ミュルグレス4凸の武器ステータスが+99のものになっていたので修正 / アンダリス4凸の上限UP効果を7%に.",
        "zh": "2017/05/31: 修正了4突武器ミュルグレス不正确的数值 / 4突武器アンダリス的伤害上限效果修正为7%。",
    },
    "notice-20170617-1": {
        "en": "17/06/2017: Fixed Base ATK and HP calculation above Rank 175.",
        "ja": "2017/06/17: Rank175以上の基礎攻撃力/HP計算式を修正.",
        "zh": "2017/06/17: 修正了Rank175以上的基础HP/HP公式。",
    },
    "notice-20170704-1": {
        "en": "04/07/2017: Added new weapons. Implemented 'Non' element type. Implemented critical ratio array displaying.",
        "ja": "2017/07/04: 武器追加. 無属性と無属性（技巧あり）を実装. 技巧倍率毎の発生確率表示を実装.",
        "zh": "2017/07/04: 增加新武器。 实装了无属性和无属性(考虑技巧)的计算。实装了显示每个技巧倍率的发生概率。",
    },
    "notice-20170725-1": {
        "en": "25/07/2017: Added new weapons. Implemented Ougi Damage Limit UP calculation. Added Primacy skill.",
        "ja": "2017/07/25: 武器追加. 奥義上限UP計算の実装. 無双スキルと奥義上限UPと舞姫の演武の実装.",
        "zh": "2017/07/25: 增加新武器。 实装了奥义上限上升的计算。 实装了新技能。",
    },
    "notice-20170802-1": {
        "en": "02/08/2017: Changed damage calculation ceiling timing to match the value shown in GBF game.",
        "ja": "2017/08/02: ダメージ計算の切り上げタイミングの調整(ゲーム内予測ダメージと一致するようになりました)",
        "zh": "2017/08/02: 调整了伤害计算时取整的时机(和游戏内预测伤害一致了)。",
    },
    "notice-20170805-1": {
        "en": "05/08/2017: Implemented Ultima Weapons.",
        "ja": "2017/08/05: オメガウェポンスキルを実装.",
        "zh": "2017/08/05: 实装了Omega武器的技能。",
    },
    "notice-20170817-1": {
        "en": "17/08/2017: Implemented Rose weapons II. Added new charas. Implemented 'Primal' race.",
        "ja": "2017/08/17: EX攻刃守護(中)を実装. ローズ武器2を追加. 水着キャラ追加. 種族: 星晶獣を追加.",
        "zh": "2017/08/17: 增加了EX攻刃守护(中)。增加了蔷薇武器2。增加了泳装角色。增加了星晶兽种族。",
    },
    "notice-20170819-1": {
        "en": "19/08/2017: Fixed some character data without favorite weapons. Applied new Ougi Damage Limitation Range. Fixed stopping bug when the ChainBurst Number was changed.",
        "ja": "2017/08/19: 得意武器が抜けていたキャラを修正. 新奥義上限を適用. チェインバースト数を弄ると計算が止まる不具合を修正.",
        "zh": "2017/08/19: 修正了部分角色没有的义务切断问题。奥义上限适用调整后的数值。修正了修改Chain Burst数会停止计算的Bug。",
    },
    "notice-20170907-1": {
        "en": "07/09/2017: Added new weapons and characters.",
        "ja": "2017/09/07: 武器とキャラ追加.",
        "zh": "2017/09/07: 增加新武器和新角色。",
    },
    "notice-20171011-1": {
        "en": "11/10/2017: Added new weapons and characters.",
        "ja": "2017/10/11: 武器とキャラ追加.",
        "zh": "2017/09/07: 增加新武器和新角色。",
    },
    "notice-20171011-2": {
        "en": "11/10/2017: Implemented second `other buff` input forms.",
        "ja": "2017/10/11: 2つ目の`その他バフ`を入力する欄を追加.",
        "zh": "2017/10/11: 增加了第二个其他Buff的支持。",
    },
    "notice-20171117-1": {
        "en": "17/11/2017: Added the new skill 'Normal Celere (S)' / Added new weapons and charas.",
        "ja": "2017/11/17: 通常刹那(小)追加 / キャラと武器追加.",
        "zh": "2017/11/17: 添加了新技能 通常刹那(小) / 添加了新角色和新武器",
    },
    "notice-20171211-1": {
        "en": "11/12/2017: Added new weapons.",
        "ja": "2017/12/11: 武器追加.",
        "zh": "2017/12/11: 添加了新武器。",
    },
    "notice-20171229-1": {
        "en": "29/12/2017: Implemented Chara Limit Bonus Calculation and Ultima (Zeal) skill.",
        "ja": "2017/12/29: キャラLBの計算を実装 / オメガ激情の計算を実装.",
        "zh": "2017/12/29: 实装了角色LB的计算 / 实装了Omega激情的计算",
    },
    "notice-20180102-1": {
        "en": "02/01/2018: Implemented Fandango skill.",
        "ja": "2018/01/02: 乱舞(小)の計算を実装 / ダメージ上限上昇が奥義ダメージ上限へ影響していなかった不具合を修正.",
        "zh": "2018/01/02: 乱舞(小)计算实装 / 修正了伤害上限上升不会影响奥义伤害上限的Bug。",
    },
    "notice-20180205-1": {
        "en": "05/02/2018: Implemented Stamina (M).",
        "ja": "2018/02/05: 渾身(中)の計算を実装 / 武器テンプレート追加.",
        "zh": "2018/02/05: 浑身(中)计算实装 / 武器列表追加",
    },
    "notice-20180311-1": {
        "en": "11/03/2018: Implemented Magna Stamina (M), Ultima Strength, and added new magna II Weapons.",
        "ja": "2018/03/11: 方陣渾身(中)、オメガ強壮の計算を実装 / マグナII武器テンプレート追加(スキルは未対応).",
        "zh": "2018/03/11: 方阵浑身(中)、Omega强壮的计算实装 / 方阵2武器的列表追加(无技能)",
    },
    "notice-20190310-1": {
        "en": "10/03/2019: Add 3rd support ability slot and Gladiator Class and character and weapons.",
        "ja": "2019/03/10: 3番目のサポアビ欄実装。クリュサオル追加。最終十天等一部キャラに奥義上限を引き上げるサポアビ追加。他キャラ・武器追加。",
        "zh": "2019/03/10: Add 3rd support ability slot and Gladiator Class and character and weapons.",
    },
    "notice-20190414-1": {
        "en": "14/04/2019: Add Opus weapons and 3rd skill slot.",
        "ja": "2019/04/14: 終末武器追加。3番目のスキル欄追加(過去の編成データが読み込めなくなっています(現在修正済))",
        "zh": "2019/04/14: Add Opus weapons and 3rd skill slot.",
    },
    "notice-20190414-2": {
        "en": "14/04/2019: Fix the skill effect amount.",
        "ja": "2019/04/14: 二手三手技巧軍神スキル効果量修正。",
        "zh": "2019/04/14: Fix the skill effect amount.",
    },
    "notice-20190424-1": {
        "en": "24/04/2019: Separate enemy defense value and debuff fields.",
        "ja": "2019/04/24: デバフ量項目実装。",
        "zh": "2019/04/24: Separate enemy defense value and debuff fields",
    },
    "notice-20190424-2": {
        "en": "24/04/2019: Add character and weapons.",
        "ja": "2019/04/24: 天司武器4凸追加。他キャラ・武器追加。",
        "zh": "2019/04/24: Add character and weapons.",
    },
    "notice-20190426-1": {
        "en": "26/04/2019: Add the total of Magna/Normal/Exceed ougi damage limits is 60%.",
        "ja": "2019/04/26: 方陣+通常+イクシードの合算枠上限を60%に設定。他奥義上限枠見直し。",
        "zh": "2019/04/26: Add the total of Magna/Normal/Exceed ougi damage limits is 60%.",
    },
    "notice-20190427-1": {
        "en": "27/04/2019: Implement Boost damage aura. Add [4凸]Ichigo Hitofuri. Fix Character base DATA. Others, fine-tuned.",
        "ja": "2019/04/27: 与ダメージ加護実装。[4凸]一期一振追加。キャラ基礎連撃修正。その他微調整。",
        "zh": "2019/04/27: Implement Boost damage aura. Add [4凸]Ichigo Hitofuri. Fix Character base DATA. Others, fine-tuned.",
    },
    "notice-20190428-1": {
        "en": "28/04/2019: Implement a damage limit aura. Add Master Bonuses.",
        "ja": "2019/04/28: ダメージ上限加護実装。マスボ追加。最終ソーンの奥義をサポアビとして実装(今の所手動で選択する必要があります)。",
        "zh": "2019/04/28: Implement a damage limit aura. Add Master Bonuses.",
    },
    "notice-20190430-1": {
        "en": "30/04/2019: Add Player's Extended Mastery. Improved Save data compatibility.",
        "ja": "2019/04/30: ジータLB追加。編成データの互換性強化。",
        "zh": "2019/04/30: Add Player's Extended Mastery. Improved Save data compatibility.",
    },
    "notice-20190501-1": {
        "en": "01/05/2019: Add huanglong spear skill2. Fix Eahta's support ability and Belltower Skill.",
        "ja": "2019/05/01: 黄龍槍メイン装備時スキル追加。最終オクトーサポアビ修正。ベルタワースキル修正。",
        "zh": "2019/05/01: Add huanglong spear skill2. Fix Eahta's support ability and Belltower Skill.",
    },
    "notice-20190511-1": {
        "en": "11/05/2019: Add characters and weapons and chara's default ougi ratio.",
        "ja": "2019/05/11: キャラ・武器追加。キャラのデフォルト奥義倍率追加。",
        "zh": "2019/05/11: Add characters and weapons and chara's default ougi ratio.",
    },
    "notice-20190514-1": {
        "en": "14/05/2019: Added sort key: C.A.+Chain damage(need to change chain number to 4). Added support for rounding down the decimal point of multi attack.",
        "ja": "2019/05/14: 優先項目(ソートキー)に「奥義+チェンバダメージ」追加(より細かい設定から4チェインにする必要有)。連撃率の小数点以下切り捨て対応。",
        "zh": "2019/05/14: Added sort key: C.A.+Chain damage(need to change chain number to 4). Added support for rounding down the decimal point of multi attack.",
    },
    "notice-20190517-1": {
        "en": "17/05/2019: Added C.A. damage bonus buff to Indiv Buff. Set to default value of ATK and HP of summon. Changed default arua valus to 140.",
        "ja": "2019/05/17: 個別バフに奥義バフ入力欄追加。召喚石の攻撃力HPデフォルト値追加。召喚石のデフォルト加護値を140に。",
        "zh": "2019/05/17: Added C.A. damage bonus buff to Indiv Buff. Set to default value of ATK and HP of summon. Changed default arua valus to 140.",
    },
    "notice-20190518-1": {
        "en": "18/05/2019: Added rankiShikku skill, and support skills of Percival and Scathacha, and level list of SR weapon.",
        "ja": "2019/05/18: 青竜髭刃のスキル「乱気の疾駆・壱」追加。パーシヴァル、スカーサハのサポアビ追加。SR武器のレベル区域追加。",
        "zh": "2019/05/18: Added rankiShikku skill, and support skills of Percival and Scathacha, and level list of SR weapon.",
    },
    "notice-20190528-1": {
        "en": "28/05/2019: Added new weapons and characters, and new normal critical calculation, and Over Masterys, and Soldier.",
        "ja": "2019/05/28: 武器とキャラ追加。通常技巧の計算方法を方陣技巧と共通化。EXLB(指輪)入力欄追加。ソルジャー追加。",
        "zh": "2019/05/28: Added new weapons and characters, and new normal critical calculation, and Over Masterys. and Soldier.",
    },
    "notice-20190606-1": {
        "en": "06/06/2019: Added new weapons and characters, Character Balance Patch, Hollowsky/Dark opus weapon limit (1 per grid). Updated critical(M) Slv15 effect size to 6.5.",
        "ja": "2019/06/06: 武器とキャラ追加。キャラ調整アプデ対応。虚空/終末武器が1編成に1つしか入らないように制限。技巧中Slv15の効果量を6.5に変更。",
        "zh": "2019/06/06: Added new weapons and characters, Character Balance Patch, Hollowsky/Dark opus weapon limit (1 per grid). Updated critical(M) Slv15 effect size to 6.5.",
    },
    "notice-20190608-1": {
        "en": "08/06/2019: Added Wedding Rings to Characters, Plus bonus of character, ChiretsuSenwaku skill. Fixed Vania favorite weapon.",
        "ja": "2019/06/08: 久遠の指輪対応。キャラバランスパッチ。キャラのプラスボーナス対応。スキル「地裂の煽惑・参」追加。ヴァンピィ得意武器修正。",
        "zh": "2019/06/08: Added Wedding Rings to Characters, Plus bonus of character, ChiretsuSenwaku skill. Fixed Vania favorite weapon.",
    },
    "notice-20190615-1": {
        "en": "15/06/2019: Added Hollowsky weapons skill2, supplemental damage skill/support, Translation for Characters Support Abilities.",
        "ja": "2019/06/15: 与ダメ上昇対応(虚空武器スキル、サポアビ、バフ欄)。サポアビ英訳対応。暴君70%制限対応。",
        "zh": "2019/06/15: Added Hollowsky weapons skill2, supplemental damage skill/support, Translation for Characters Support Abilities.",
    },
    "notice-20190617-1": {
        "en": "17/06/2019: Added Support stamina weapon/Character skills, Elemental Resistance, Uplift. Changed Lily support ability by game update.",
        "ja": "2019/06/17: メイン装備時渾身スキル/渾身サポアビ対応。敵非有利耐性欄追加。高揚バフ欄追加。リリィのサポアビ変更アプデ対応。",
        "zh": "2019/06/17: Added Support stamina weapon/Character skills, Elemental Resistance, Uplift. Changed Lily support ability by game update.",
    },
    "notice-20190618-1": {
        "en": "06/06/2019: Added Recent uncaps, Color for upper limit when you display DA/TA skill amount, Character LB of ougiDamage, ougiDamageLimit, ougiGageBuff",
        "ja": "2019/06/06: 武器上限開放対応。DA/TAスキル効果量表示時に上限で赤色表示に。奥義、奥義上限、奥義ゲージ上昇量のキャラLB追加。",
        "zh": "2019/06/06: Added Recent uncaps, Color for upper limit when you display DA/TA skill amount, Character LB of ougiDamage, ougiDamageLimit, ougiGageBuff",
    },
};

// Language settings
module.exports.getLocale = function () {
    var lang = (
        (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage);
    if (lang == "ja-jp" || lang == "ja-JP") lang = "ja";
    if (lang == "zh-cn" || lang == "zh-CN") lang = "zh";
    if (lang != "ja" && lang != "zh") lang = "en";

    return lang;
};

module.exports.translate = function (key, locale) {
    try {
        if (key == undefined || key == "") return "";
        if (locale != "ja" && locale != "en" && locale != "zh") return multiLangData[key]["ja"];

        return multiLangData[key][locale];
    } catch (e) {
        console.error("Error! Key " + key + "for language " + locale + " not found");
    }
};
