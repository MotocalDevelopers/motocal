            // global arrays
            var zenith = {"無し": 0, "★1": 0.01, "★2": 0.03, "★3": 0.05, "★4": 0.06, "★5": 0.08, "★6": 0.10}
            var keyTypes = {"総合攻撃力": "totalAttack", "HP": "totalHP", "戦力": "ATKandHP", "パーティ平均攻撃力": "averageAttack", "技巧期待値": "criticalAttack", "技巧期待平均攻撃力": "averageCriticalAttack"}

            // skill data
            var skilltypes = {
                "non": {name: "無し", type:"non", amount: "non"},
                "normalS": {name:"通常攻刃(小)", type:"normal", amount: "S"},
                "normalM": {name:"通常攻刃(中)", type:"normal", amount: "M"},
                "normalL": {name:"通常攻刃(大)", type:"normal", amount: "L"},
                "normalLL": {name:"通常攻刃II", type:"normal", amount: "LL"},
                "normalBoukunL": {name:"通常暴君", type:"normalBoukun", amount: "LL"},
                "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
                "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
                "normalNiteS": {name:"通常二手(小)", type:"normalNite", amount: "S"},
                "normalNiteM": {name:"通常二手(中)", type:"normalNite", amount: "M"},
                "normalNiteL": {name:"通常二手(大)", type:"normalNite", amount: "L"},
                "normalKatsumiM": {name:"通常克己(中)", type:"normalKatsumi", amount: "M"},
                "normalKamui": {name:"通常神威", type:"normalKamui", amount: "S"},
                "magnaM": {name: "マグナ攻刃", type:"magna", amount:"M"},
                "magnaL": {name: "マグナ攻刃II", type:"magna", amount:"L"},
                "magnaHaisuiS": {name:"マグナ背水(小)", type:"magnaHaisui", amount: "S"},
                "magnaHaisuiL": {name:"マグナ背水(大)", type:"magnaHaisui", amount: "L"},
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
            };

            var armtypes = [
                {name:"短剣", type:"dagger"},
                {name:"剣", type:"sword"},
                {name:"槍", type:"spear"},
                {name:"斧", type:"axe"},
                {name:"杖", type:"wand"},
                {name:"銃", type:"gun"},,
                {name:"格闘", type:"fist"},
                {name:"弓", type:"bow"},
                {name:"楽器", type:"music"},
                {name:"刀", type:"katana"},
                {name:"無し", type:"none"},
            ];

            var summonTypes = {
                "magna": "マグナ",
                "element": "属性",
                "zeus": "ゼウス系",
                "chara": "キャラ",
                "ranko": "蘭子",
                "odin": "属性攻+キャラ攻",
            }

            var raceTypes = {
                "human": "人間",
                "erune": "エルーン",
                "doraf": "ドラフ",
                "havin": "ハーヴィン",
                "unknown": "種族不明",
            }

            var jobTypes = {
                "attack": "攻撃",
                "heal": "回復",
                "defense": "防御",
                "pecu": "特殊",
                "balance": "バランス",
            }

            var elementTypes = {
                "fire": "火",
                "wind": "風",
                "earth": "土",
                "water": "水",
                "light": "光",
                "dark": "闇",
            }

            // "key"属性が強い属性と弱い属性
            var elementRelation = {
                "fire": {"weak": "water", "strong": "wind"},
                "wind": {"weak": "fire", "strong": "earth"},
                "earth": {"weak": "wind", "strong": "water"},
                "water": {"weak": "earth", "strong": "fire"},
                "light": {"weak": "none", "strong": "dark"},
                "dark": {"weak": "none", "strong": "light"},
            }

            var bahamutRelation = {
                "dagger": {"type1": "human"},
                "axe": {"type1": "doraf"},
                "spear": {"type1": "erune"},
                "gun": {"type1": "havin"},
                "sword": {"type1": "human", "type2": "doraf"},
                "wand": {"type1": "erune", "type2": "havin"},
                "fist": {"type1": "human"},
                "katana": {"type1": "doraf"},
                "bow": {"type1": "erune"},
                "music": {"type1": "havin"},
            }

            var bahamutFURelation = {
                "dagger": {"type1": "human", "type2": "erune"},
                "axe": {"type1": "doraf", "type2": "havin"},
                "spear": {"type1": "erune", "type2": "doraf"},
                "gun": {"type1": "havin", "type2": "human"},
                "sword": {"type1": "human", "type2": "doraf"},
                "wand": {"type1": "erune", "type2": "havin"},
                "fist": {"type1": "human"},
                "katana": {"type1": "doraf"},
                "bow": {"type1": "erune"},
                "music": {"type1": "havin"},
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

            var skillAmounts = {
                // normal と unknown の M Slv11 以降については仮入力
                "normal":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "magna":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "unknown":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "unknownOther":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "bahaHP": {
                    // 剣など
                    "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                },
                "bahaAT": {
                    // 短剣など
                    "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                    "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                },
                "bahaFUATHP": {
                    // 剣など
                    "HP": [15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "AT": [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                },
                "normalHP":{
                    "S": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "M": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.4, 15.8, 16.2, 16.6, 17.0],
                    "L": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
                },
                "magnaHP":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
                    "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "unknownHP":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
                    "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "normalNite":{
                    "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
                    "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
                    "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                    "LL": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                },
                // 仮
                "magnaNite":{
                    "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
                    "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
                    "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                    "LL": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                },
                "unknownOtherNite":{
                    "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
                },
                "normalCritical":{
                    "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
                    "M": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.7, 7.0, 7.3],
                    "L": [4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6],
                    "ratio": 0.5,
                },
                // 仮入力
                "magnaCritical":{
                    "S": [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.2, 2.3, 2.4],
                    "M": [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.7, 7.0, 7.3],
                    "L": [4.0, 4.4, 4.8, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2, 7.6, 8.0, 8.4, 8.8, 9.2, 9.6],
                    "ratio": 0.5,
                },
            }

            // オプション用
            var select_races = Object.keys(raceTypes).map(function(opt){return <option value={opt} key={opt}>{raceTypes[opt]}</option>;});
            var select_elements = Object.keys(elementTypes).map(function(opt){return <option value={opt} key={opt}>{elementTypes[opt]}</option>;});
            var select_summons = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{summonTypes[opt]}</option>;});
            var select_skills = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{skilltypes[key].name}</option>;})
            var select_types = Object.keys(jobTypes).map(function(opt){return <option value={opt} key={opt}>{jobTypes[opt]}</option>;});
            var select_armtypes = armtypes.map(function(opt){return <option value={opt.type} key={opt.name}>{opt.name}</option>;});

            // query 取得用の関数
            var urldata = getVarInQuery("data");
            var urlid = getVarInQuery("id")

            function getVarInQuery(key){
                var vars = {}, max = 0, hash = "", array = "";
                var url = window.location.search;

                hash  = url.slice(1).split('&');
                max = hash.length;
                for (var i = 0; i < max; i++) {
                    array = hash[i].split('=');
                    vars[array[0]] = array[1];
                }

                var result = ""
                if(key in vars){
                    result = vars[key];
                }

                return result;
            }

            // global hash for loading new data
            var newData = {}
            var cosmosChecked = false;

            // Root class contains [Profile, ArmList, Results].
            var Root = React.createClass({
              getInitialState: function() {
                  return {
                    armNum: 3,
                    summonNum: 1,
                    profile: [],
                    armlist: [],
                    chara: [],
                    summon: [],
                    dataName: '',
                    topclass: "top open",
                    topopen: true,
                    buttontext: "プロフィール欄を縮小 -",
                  };
              },
              getDatacharById: function(id) {
                  $.ajax({
                      url: "getdata.php",
                      type: 'POST',
                      dataType: 'text',
                      cache: false,
                      timeout: 10000,
                      data: {id: id},
                      success: function(data, datatype) {
                          var initState = JSON.parse(Base64.decode(data));
                          newData = initState
                          this.setState(initState);
                      }.bind(this),
                      error: function(xhr, status, err) {
                          alert("Error!: IDが不正です. status: ", status, ", error message: ", err.toString());
                      }.bind(this)
                  });
              },
              componentDidMount: function(){
                  if(urldata != ''){
                      var initState = JSON.parse(Base64.decode(urldata));
                      initState["dataName"] = "urlData"
                      newData = initState
                      this.setState(initState);
                  }

                  if(urlid != ''){
                      this.getDatacharById(urlid);
                  }
              },
              handleArmNumChange: function(newArmNum) {
                  this.setState({armNum: newArmNum});
                  var newProf = this.state.profile;
                  newProf["armNum"] = newArmNum
                  this.setState({profile: newProf});
              },
              handleSummonNumChange: function(newSummonNum) {
                  this.setState({summonNum: newSummonNum});
                  var newProf = this.state.profile;
                  newProf["summonNum"] = newSummonNum
                  this.setState({profile: newProf});
              },
              onChangeArmData: function(state) {
                  this.setState({armlist: state});
              },
              onChangeProfileData: function(state) {
                  this.setState({profile: state});
              },
              onChangeSummonData: function(state) {
                  this.setState({summon: state});
              },
              onChangeCharaData: function(state) {
                  this.setState({chara: state});
              },
              handleChangeData: function(newDataName) {
                  this.setState({armNum: newData.armNum});
                  this.setState({summonNum: newData.summonNum});
                  this.setState({dataName: newDataName});
              },
              handleOnClickTitle: function(e) {
                  if(this.state.topopen) {
                      this.setState({topclass: "top", topopen: false, buttontext: "プロフィール欄を展開 +"})
                  } else {
                      this.setState({topclass: "top open", topopen: true, buttontext: "プロフィール欄を縮小 -"})
                  }
              },
              render: function() {
                return (
                    <div className="root">
                        <div className="rootLeft">
                            <button className="toggle" onClick={this.handleOnClickTitle}>{this.state.buttontext}</button>
                            <div className={this.state.topclass}>
                                <Profile dataName={this.state.dataName} onArmNumChange={this.handleArmNumChange} onChange={this.onChangeProfileData} onSummonNumChange={this.handleSummonNumChange} />
                                <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                                <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} />
                            </div>
                            <hr />
                            <div className="bottom">
                                <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} />
                                <hr />
                                <ResultList data={this.state} />
                                <Notice />
                            </div>
                        </div>
                        <div className="rootRight">
                            <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                            <TwitterShareButton data={this.state} />
                        </div>
                    </div>
                );
              }
            });

            var CharaList = React.createClass({
                getInitialState: function() {
                    return {
                        charalist: [],
                    };
                },
                handleOnChange: function(key, state){
                    var newcharalist = this.state.charalist;
                    newcharalist[key] = state;
                    this.setState({charalist: newcharalist})
                    this.props.onChange(newcharalist);
                },
                render: function() {
                    var charas = [];
                    for(var i=0; i < 5; i++) {
                        charas.push({id: i});
                    }
                    var hChange = this.handleOnChange;
                    var dataName = this.props.dataName;
                    return (
                        <div className="charaList">
                            <h3> キャラクター </h3>
                            <table>
                            <thead>
                            <tr>
                                <th>キャラ名</th>
                                <th>属性</th>
                                <th>種族</th>
                                <th>タイプ</th>
                                <th>得意武器</th>
                                <th>得意武器2</th>
                                <th>攻撃力</th>
                                <th>HP</th>
                                <th>サポアビ(予定)</th>
                            </tr>
                            </thead>
                            <tbody>
                                {charas.map(function(c) {
                                    return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} />;
                                })}
                            </tbody>
                            </table>
                        </div>
                    );
                }
            });

            var Chara = React.createClass({
                getInitialState: function() {
                    return {
                        name: "",
                        element: "fire",
                        race: "human",
                        attack: 0,
                        hp: 0,
                        support: "none",
                        type: "attack",
                        favArm: "dagger",
                        favArm2: "none",
                    };
                },
                componentDidMount: function(){
                   var state = this.state;

                   // もし newData に自分に該当するキーがあるなら読み込む
                   // (データロード時に新しく増えたコンポーネント用)
                   var chara = newData.chara
                   if( chara != undefined && this.props.id in chara ){
                       state = chara[this.props.id]
                       this.setState(state)
                   }
                   // 初期化後 state を 上の階層に渡しておく
                   // CharaList では onChange が勝手に上に渡してくれるので必要なし
                   this.props.onChange(this.props.id, state);
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var chara = newData.chara
                        if( chara != undefined && this.props.id in chara ){
                            state = chara[this.props.id]
                            this.setState(state)
                            this.props.onChange(this.props.id, state)
                        }
                    }
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    newState[key] = e.target.value
                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                render: function() {
                    return (
                        <tr>
                            <form className="charaForm">
                                <td><input type="text" placeholder="名前" value={this.state.name} onChange={this.handleEvent.bind(this, "name")}/></td>
                                <td><select value={this.state.element} onChange={this.handleEvent.bind(this, "element")} >{select_elements}</select></td>
                                <td><select value={this.state.race} onChange={this.handleEvent.bind(this, "race")} >{select_races}</select></td>
                                <td><select value={this.state.type} onChange={this.handleEvent.bind(this, "type")} >{select_types}</select></td>
                                <td><select value={this.state.favArm} onChange={this.handleEvent.bind(this, "favArm")} >{select_armtypes}</select></td>
                                <td><select value={this.state.favArm2} onChange={this.handleEvent.bind(this, "favArm2")} >{select_armtypes}</select></td>
                                <td><input type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                                <td><input type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                                <td></td>
                            </form>
                        </tr>
                    );

                }
            });

            var SummonList = React.createClass({
                getInitialState: function() {
                    return {
                        smlist: [],
                    };
                },
                componentWillReceiveProps: function(nextProps) {
                    if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
                        var newsmlist = this.state.smlist;
                        while(newsmlist.length > nextProps.summonNum) {
                            newsmlist.pop();
                        }
                        this.setState({smlist: newsmlist})
                    }
                },
                handleOnChange: function(key, state){
                    var newsmlist = this.state.smlist;
                    newsmlist[key] = state;
                    this.setState({smlist: newsmlist})
                    this.props.onChange(newsmlist);
                },
                render: function() {
                    var summons = [];
                    for(var i=0; i < this.props.summonNum; i++) {
                        summons.push({id: i});
                    }
                    var hChange = this.handleOnChange;
                    var dataName = this.props.dataName;
                    return (
                        <div className="summonList">
                            <h3> 召喚石 </h3>
                            <table>
                            <thead>
                            <tr>
                                <th>自分の石</th>
                                <th className="tiny">属性</th>
                                <th>加護量</th>
                                <th>フレ石</th>
                                <th className="tiny">属性</th>
                                <th>フレ加護量</th>
                                <th>合計攻撃力</th>
                                <th>合計HP</th>
                                <th>HPUP(%)</th>
                                <th>DA率</th>
                                <th>TA率</th>
                            </tr>
                            </thead>
                            <tbody>
                                {summons.map(function(sm) {
                                    return <Summon key={sm.id} onChange={hChange} id={sm.id} dataName={dataName} />;
                                })}
                            </tbody>
                            </table>
                        </div>
                    );
                }
            });

            var Summon = React.createClass({
                getInitialState: function() {
                    return {
                        selfSummonType: "magna",
                        selfSummonAmount: 0,
                        selfSummonAmount2: 0,
                        selfElement: "fire",
                        friendSummonType: "magna",
                        friendSummonAmount: 0,
                        friendSummonAmount2: 0,
                        friendElement: "fire",
                        attack: 0,
                        hp: 0,
                        hpBonus: 0,
                        DA: 0,
                        TA: 0,
                    };
                },
                componentDidMount: function(){
                   var state = this.state;

                   // もし newData に自分に該当するキーがあるなら読み込む
                   // (データロード時に新しく増えたコンポーネント用)
                   var summon = newData.summon
                   if( summon != undefined && this.props.id in summon ){
                       state = summon[this.props.id]
                       this.setState(state)
                   }
                   // 初期化後 state を 上の階層に渡しておく
                   // summonList では onChange が勝手に上に渡してくれるので必要なし
                   this.props.onChange(this.props.id, state);
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData.summon[this.props.id]
                        this.setState(newState);
                        this.props.onChange(this.props.id, newState)
                    }
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    newState[key] = e.target.value
                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                handleSummonAmountChange(type, ind, e){
                    var newState = this.state
                    if(type == "self") {
                        if(ind == 0){
                            newState["selfSummonAmount"] = e.target.value
                        } else {
                            newState["selfSummonAmount2"] = e.target.value
                        }
                    } else {
                        if(ind == 0){
                            newState["friendSummonAmount"] = e.target.value
                        } else {
                            newState["friendSummonAmount2"] = e.target.value
                        }
                    }
                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                render: function() {
                    var selfSummon = [{"label": "", "input": "number"}, {"input": "hidden"}]
                    if(this.state.selfSummonType == "odin"){
                        selfSummon[1] = {"label": "キャラ ", "input": "number"}
                        selfSummon[0].label = "属性 "
                    }
                    var friendSummon = [{"label": "", "input": "number"}, {"input": "hidden"}]
                    if(this.state.friendSummonType == "odin"){
                        friendSummon[1] = {"label": "キャラ ", "input": "number"}
                        friendSummon[0].label = "属性 "
                    }
                    return (
                        <tr>
                            <form className="summonForm">
                                <td><select value={this.state.selfSummonType} onChange={this.handleEvent.bind(this, "selfSummonType")} >{select_summons}</select></td>
                                <td className="tiny"><select value={this.state.selfElement} onChange={this.handleEvent.bind(this, "selfElement")} >{select_elements}</select></td>
                                <td>
                                <label>{selfSummon[0].label}<input type={selfSummon[0].input} min="0" max="120" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)} /></label>
                                <label>{selfSummon[1].label}<input type={selfSummon[1].input} min="0" max="120" value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)} /></label>
                                </td>
                                <td><select value={this.state.friendSummonType} onChange={this.handleEvent.bind(this, "friendSummonType")} >{select_summons}</select></td>
                                <td className="tiny"><select value={this.state.friendElement} onChange={this.handleEvent.bind(this, "friendElement")} >{select_elements}</select></td>
                                <td>
                                <label>{friendSummon[0].label}<input type={friendSummon[0].input} min="0" max="120" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)} /></label>
                                <label>{friendSummon[1].label}<input type={friendSummon[1].input} min="0" max="120" value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)} /></label>
                                </td>
                                <td><input type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                                <td><input type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                                <td><input type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                                <td><input type="number" min="0" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                                <td><input type="number" min="0" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            </form>
                        </tr>
                    );

                }
            });

            var ResultList = React.createClass({
                getInitialState: function() {
                    return {
                        switchTotalAttack: 1,
                        switchATKandHP: 0,
                        switchHP: 1,
                        switchDATA: 0,
                        switchExpectedAttack: 0,
                        switchCriticalRatio: 0,
                        switchCharaAttack: 0,
                        switchAverageAttack: 0,
                    };
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    newState[key] = (newState[key] == 0) ? 1 : 0
                    this.setState(newState)
                },
                calculateCombinations: function(arml) {
                    // 全武器に対して [最小考慮数, ... , 最大考慮数] の配列を計算しておく
                    var armNumArray = []
                    var totalItr = 1;
                    for(var i = 0; i < arml.length; i++){
                        var temp = []
                        var itr = arml[i].considerNumberMax - arml[i].considerNumberMin + 1
                        for(var j = 0; j < itr; j++){
                            temp[j] = j + arml[i].considerNumberMin;
                        }
                        totalItr *= itr;
                        armNumArray[i] = temp;
                    }

                    // index を manage する関数
                    var proceedIndex = function(index, ana, i){
                        if(i == ana.length){
                            return index;
                        } else {
                            index[i]++;
                            if(index[i] > ana[i].length - 1){
                                index[i] = 0;
                                index = proceedIndex(index, ana, i + 1);
                            }
                            return index
                        }
                    }

                    var combinations = []
                    var index = []
                    for(var i = 0; i < armNumArray.length; i++){
                        index[i] = 0;
                    }

                    for(var i = 0; i < totalItr; i++){
                        var temp = []
                        var num = 0;
                        for(var j = 0; j < armNumArray.length; j++){
                            temp.push(armNumArray[j][index[j]]);
                            num += parseInt(armNumArray[j][index[j]])
                        }
                        if( (totalItr <= 100 || num >= 8) && num <= 10) combinations.push(temp)
                        index = proceedIndex(index, armNumArray, 0)
                    }
                    return combinations
                },
                calculateBasedOneSummon: function(summon, prof, buff, totals) {
                    var res = {}

                    for(key in totals) {
                        var totalSummon = {magna: 0, element: 0, zeus: 0, chara: 0, ranko: 0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};
                        selfElement = (summon.selfElement == undefined) ? "fire" : summon.selfElement
                        friendElement = (summon.friendElement == undefined) ? "fire" : summon.friendElement

                        if(selfElement == totals[key]["element"] || selfElement == "all" ){
                            if(summon.selfSummonType == "odin") {
                                // odin(属性+キャラ攻撃)など、複数の場合の処理
                                totalSummon["element"] += 0.01 * parseInt(summon.selfSummonAmount)
                                totalSummon["chara"] += 0.01 * parseInt(summon.selfSummonAmount2)
                            } else {
                                // 自分の加護 通常の場合
                                totalSummon[summon.selfSummonType] += 0.01 * parseInt(summon.selfSummonAmount)
                            }
                        }
                        if(friendElement == totals[key]["element"] || friendElement == "all" ){
                            if(summon.friendSummonType == "odin") {
                                // odin(属性+キャラ攻撃)など、複数の場合の処理
                                totalSummon["element"] += 0.01 * parseInt(summon.friendSummonAmount)
                                totalSummon["chara"] += 0.01 * parseInt(summon.friendSummonAmount2)
                            } else {
                                // フレンドの加護 通常の場合
                                totalSummon[summon.friendSummonType] += 0.01 * parseInt(summon.friendSummonAmount)
                            }
                        }

                        // 後から追加したので NaN でないか判定しておく
                        if(!isNaN(summon.attack)) totalSummon["attack"] = parseInt(summon.attack)
                        if(!isNaN(summon.hp)) totalSummon["hp"] = parseInt(summon.hp)
                        if(!isNaN(summon.hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon.hpBonus)
                        if(!isNaN(summon.DA)) totalSummon["da"] = 0.01 * parseInt(summon.DA)
                        if(!isNaN(summon.TA)) totalSummon["ta"] = 0.01 * parseInt(summon.TA)

                        // 弱点属性判定
                        var typeBonus = 1.0
                        if(elementRelation[ totals[key]["element"] ]["weak"] == prof.enemyElement) {
                            typeBonus = 0.75
                        } else if(elementRelation[ totals[key]["element"] ]["strong"] == prof.enemyElement) {
                            typeBonus = 1.5
                        }

                        // for attack
                        var magnaCoeff = 1.0 + 0.01 * totals[key]["magna"] * ( 1.0 + totalSummon["magna"] )
                        var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"]) * ( 1.0 + totalSummon["magna"] )
                        var unknownCoeff = 1.0 + 0.01 * totals[key]["unknown"] * (1.0 + totalSummon["ranko"]) + 0.01 * totals[key]["unknownOther"]
                        var unknownHaisuiCoeff = 1.0 + 0.01 * totals[key]["unknownOtherHaisui"]

                        var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * (1.0 + totalSummon["zeus"]) + 0.01 * totals[key]["bahaAT"] + totalSummon["chara"] + buff["normal"]
                        var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * (1.0 + totalSummon["zeus"])
                        var elementCoeff = typeBonus + totalSummon["element"] + buff["element"]
                        var otherCoeff = 1.0 + buff["other"]

                        if(key == "Djeeta") {
                            // for Djeeta
                            var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + parseInt(prof.attackBonus) ) * (1.0 + buff["master"])
                            var displayHP = (totals[key]["baseHP"] + totalSummon["hp"] + totals[key]["armHP"] + buff["hpBonus"]) * (1.0 + buff["masterHP"])
                        } else {
                            // for chara
                            var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"]
                            var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]
                        }

                        var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff * unknownHaisuiCoeff
                        var totalHP = displayHP * (1.0 - totals[key]["HPdebuff"]) * (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["magnaHP"] * (1.0 + totalSummon["magna"]) + 0.01 * totals[key]["normalHP"] * (1.0 + totalSummon["zeus"]) + 0.01 * totals[key]["unknownHP"] * (1.0 + totalSummon["ranko"]))

                        // for DA and TA
                        var totalDA = 100.0 * (0.065 + buff["da"] + totalSummon["da"] + 0.01 * totals[key]["normalNite"] * (1.0 + totalSummon["zeus"]) + 0.01 * totals[key]["magnaNite"] * (1.0 + totalSummon["magna"]) + 0.01 * totals[key]["unknownOtherNite"] + 0.01 * totals[key]["cosmosBL"])
                        var totalTA = 100.0 * (0.03 + buff["ta"] + totalSummon["ta"])
                        var criticalRatio = (1.0 + skillAmounts["magnaCritical"]["ratio"]) * 0.01 * totals[key]["magnaCritical"] * (1.0 + totalSummon["magna"]) + (1.0 + skillAmounts["normalCritical"]["ratio"]) * 0.01 * totals[key]["normalCritical"] * (1.0 + totalSummon["zeus"]) + 1.0 * (1.0 - 0.01 * totals[key]["normalCritical"] * (1.0 + totalSummon["zeus"]) - 0.01 * totals[key]["magnaCritical"] * (1.0 + totalSummon["magna"]))

                        if(typeBonus != 1.5) {
                            criticalRatio = 1.0
                        }

                        var criticalAttack = parseInt(totalAttack * criticalRatio)

                        res[key] = {totalAttack: Math.ceil(totalAttack), displayAttack: Math.ceil(summedAttack), totalHP: Math.round(totalHP), displayHP: Math.round(displayHP), totalDA: totalDA, totalTA: totalTA, criticalAttack: criticalAttack, criticalRatio: criticalRatio};

                    }
                    var average = 0.0;
                    var crit_average = 0.0;

                    var cnt = 0.0
                    for(key in res) {
                        average += res[key].totalAttack
                        crit_average += res[key].criticalAttack
                        cnt += 1.0
                    }
                    res["Djeeta"]["averageAttack"] = parseInt(average/cnt)
                    res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average/cnt)
                    return res
                },
                calculateOneCombination: function(comb, summon, prof, arml, buff, chara){
                    var tempArmList = []
                    for(var i = 0; i < arml.length; i++){
                        for(var j = 0; j < comb[i]; j++){
                            tempArmList.push(arml[i]);
                        }
                    }
                    var baseAttack = (prof.rank > 100) ? 5000 + (parseInt(prof.rank) - 100) * 20 : 1000 + (parseInt(prof.rank)) * 40
                    var baseHP = (prof.rank > 100) ? 1400 + (parseInt(prof.rank) - 100) * 4.0 : 600 + (parseInt(prof.rank)) * 8
                    var element = (prof.element == undefined) ? "fire" : prof.element

                    var totals = {"Djeeta": {baseAttack: baseAttack, baseHP: baseHP, armAttack: 0, armHP:0, fav1: "", fav2: "", race: "unknown", type: "none", element: element, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0}};
                    for(var i = 0; i < chara.length; i++){
                        if(chara[i].name != "") {
                            var charaelement = (chara[i].element == undefined) ? "fire" : chara[i].element
                            totals[chara[i].name] = {baseAttack: parseInt(chara[i].attack), baseHP: parseInt(chara[i].hp), armAttack: 0, armHP:0, fav1: chara[i].favArm, fav2: chara[i].favArm2, race: chara[i].race, type: chara[i].type, element: charaelement, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, cosmosBL: 0}
                        }
                    }

                    // cosmos武器があるかどうかを確認しておく
                    var cosmosType = '';
                    for(var i = 0; i < tempArmList.length; i++){
                        var arm = tempArmList[i];
                        if(arm.isCosmos) {
                            cosmosType = arm.armType
                        }
                    }

                    if(prof.job != undefined) {
                        totals["Djeeta"]["fav1"] = Jobs[prof.job].favArm1
                        totals["Djeeta"]["fav2"] = Jobs[prof.job].favArm2
                        totals["Djeeta"]["type"] = Jobs[prof.job].type
                    }

                    var index = 0;
                    for( key in totals ) {
                        index++;
                        for(var i = 0; i < tempArmList.length; i++){
                            var arm = tempArmList[i];
                            var armSup= 1.0
                            var hpSup = 1.0

                            if (arm.armType == cosmosType){
                                armSup += 0.3
                                hpSup += 0.3
                            }

                            if( key == "Djeeta" ) {
                                // for Djeeta
                                if(arm.armType == totals[key]["fav1"] && arm.armType == totals[key]["fav2"]){
                                    armSup += (0.2 + buff["zenith1"] + buff["zenith2"])
                                    hpSup += 0.2
                                } else if(arm.armType == totals[key]["fav1"]){
                                    armSup += (0.2 + buff["zenith1"])
                                    hpSup += 0.2
                                } else if(arm.armType == totals[key]["fav2"]){
                                    armSup += (0.2 + buff["zenith2"])
                                    hpSup += 0.2
                                }
                            } else {
                                // for chara
                                if(arm.armType == totals[key]["fav1"]){
                                    armSup += 0.2
                                    hpSup += 0.2
                                } else if(arm.armType == totals[key]["fav2"]){
                                    armSup += 0.2
                                    hpSup += 0.2
                                }
                            }

                            totals[key]["armAttack"] += armSup * parseInt(arm.attack)
                            totals[key]["armHP"] += hpSup * parseInt(arm.hp)

                            for(var j = 1; j <= 2; j++){
                                var skillname = '';
                                if(j == 1) { skillname = arm.skill1 } else { skillname = arm.skill2 }

                                if(skillname != 'non'){
                                    // 古いデータ用の対応
                                    if(skillname == "bahaAT" || skillname == "bahaFUATHP") {
                                        skillname += "-dagger"
                                    } else if (skillname == "bahaATHP") {
                                        skillname += "-sword"
                                    }
                                    var stype = skilltypes[skillname].type;
                                    var amount = skilltypes[skillname].amount;
                                    var slv = parseInt(arm.slv)
                                    var element = (arm.element == undefined) ? "fire" : arm.element

                                    // mask invalid slv
                                    if(slv == 0) slv = 1

                                    // バハとコスモスは属性関係なし
                                    if(stype == 'bahaAT') {
                                        // バハ短剣など
                                        if(totals[key]["race"] == "unknown") {
                                            totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                        } else {
                                            var bahatype = skillname.split("-")
                                            if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ) {
                                                totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                            }
                                        }
                                    } else if(stype == 'bahaATHP') {
                                        // バハ剣など
                                        if(totals[key]["race"] == "unknown") {
                                            totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                            totals[key]["bahaHP"] += skillAmounts["bahaHP"][amount][slv - 1];
                                        } else {
                                            var bahatype = skillname.split("-")
                                            if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                                totals[key]["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                                totals[key]["bahaHP"] += skillAmounts["bahaHP"][amount][slv - 1];
                                            }
                                        }
                                    } else if(stype == 'bahaFUATHP') {
                                        if(totals[key]["race"] == "unknown") {
                                            totals[key]["bahaAT"] += skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                            totals[key]["bahaHP"] += skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                        } else {
                                            var bahatype = skillname.split("-")
                                            if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                                totals[key]["bahaAT"] += skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                                totals[key]["bahaHP"] += skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                            }
                                        }
                                    } else if(stype == 'cosmos') {
                                        // コスモス武器
                                        if(skillname == 'cosmosAT' && totals[key]["type"] == "attack") {
                                            totals[key]["normal"] += 20.0;
                                            totals[key]["HPdebuff"] += 0.40
                                        } else if(skillname == 'cosmosDF' && totals[key]["type"] == "defense") {
                                            totals[key]["HPdebuff"] -= 0.10
                                        } else if(skillname == 'cosmosBL' && totals[key]["type"] == "balance") {
                                            totals[key]["cosmosBL"] = 20.0
                                        }
                                    } else if(totals[key]["element"] == element){
                                        // 属性一致してれば計算

                                        if(stype == 'normalHaisui' || stype == 'magnaHaisui' || stype == 'unknownOtherHaisui'){
                                            // 背水倍率の実装は日比野さんのところのを参照
                                            var remainHP = 0.01 * parseInt(prof.hp)
                                            var baseRate = 0.0
                                            if(amount == "S") {
                                                // 小
                                                if(slv < 10) {
                                                    baseRate = -0.3 + slv * 1.8;
                                                } else {
                                                    baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                                }
                                            } else if ( amount == "M" ){
                                                // 中
                                                if(slv < 10) {
                                                    baseRate = -0.4 + slv * 2.4;
                                                } else {
                                                    baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                                }
                                            } else {
                                                // 大
                                                if(slv < 10) {
                                                    baseRate = -0.5 + slv * 3.0;
                                                } else {
                                                    baseRate = 30 + 3.0 * ((slv - 10) / 5.0)
                                                }
                                            }
                                            var haisuiBuff =  (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
                                            totals[key][stype] += haisuiBuff
                                        } else if(stype == 'normalKamui') {
                                            totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                            totals[key]["normalHP"] += skillAmounts["normalHP"][amount][slv - 1];
                                        } else if(stype == 'magnaKamui') {
                                            totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                                            totals[key]["magnaHP"] += skillAmounts["magnaHP"][amount][slv - 1];
                                        } else if(stype == 'normalSetsuna') {
                                            totals[key]["normalCritical"] += skillAmounts["normalCritical"][amount][slv - 1];
                                            totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                        } else if(stype == 'magnaSetsuna') {
                                            totals[key]["magnaCritical"] += skillAmounts["magnaCritical"][amount][slv - 1];
                                            totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                                        } else if(stype == 'normalKatsumi') {
                                            totals[key]["normalCritical"] += skillAmounts["normalCritical"][amount][slv - 1];
                                            totals[key]["normalNite"] += skillAmounts["normalNite"][amount][slv - 1];
                                        } else if(stype == 'magnaKatsumi') {
                                            totals[key]["magnaCritical"] += skillAmounts["magnaCritical"][amount][slv - 1];
                                            totals[key]["magnaNite"] += skillAmounts["magnaNite"][amount][slv - 1];
                                        } else if(stype == 'normalBoukun') {
                                            totals[key]["HPdebuff"] += 0.10
                                            totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                        } else if(stype == 'magnaBoukun') {
                                            totals[key]["HPdebuff"] += 0.10
                                            totals[key]["magna"] += skillAmounts["magna"][amount][slv - 1];
                                        } else if(stype == 'unknownOtherBoukun'){
                                            totals[key]["HPdebuff"] += 0.07
                                            totals[key]["unknown"] += skillAmounts["unknown"][amount][slv - 1];
                                        } else if(stype == 'gurenJuin'){
                                            if(index == 2){
                                                totals[key]["normal"] += skillAmounts["normal"][amount][slv - 1];
                                            }
                                        } else {
                                            totals[key][stype] += skillAmounts[stype][amount][slv - 1];
                                        }
                                    }
                                }
                            }
                        }

                        // バハ武器重複上限
                        if(totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50
                        if(totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50
                        // 二手スキル上限
                        if(totals[key]["normalNite"] > 50) totals[key]["normalNite"] = 50
                        if(totals[key]["magnaNite"]  > 50) totals[key]["magnaNite"] = 50
                    }

                    var result = []
                    for(var i = 0; i < summon.length; i++){
                       // 攻撃などの結果を入れた連想配列の配列を作る
                       result.push(this.calculateBasedOneSummon(summon[i], prof, buff, totals));
                    }

                    return result
                },
                calculateResult: function() {
                  var prof = this.props.data.profile; var arml = this.props.data.armlist;
                  var summon = this.props.data.summon; var chara = this.props.data.chara;

                  if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
                      var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hpBonus: 0.0, hp: 0.0, da: 0.0, ta: 0.0};

                      // 後から追加したパラメータはNaNなことがあるので追加処理
                      if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
                      if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
                      if(!isNaN(prof.hpBonus)) totalBuff["hpBonus"] += parseInt(prof.hpBonus);
                      if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
                      if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseInt(prof.daBuff);
                      if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseInt(prof.taBuff);
                      totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
                      totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
                      totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
                      totalBuff["zenith1"] += zenith[prof.zenithBonus1];
                      totalBuff["zenith2"] += zenith[prof.zenithBonus2];

                      // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
                      var sortkey = "totalAttack"
                      var sortkeyname = "総合攻撃力"
                      if(prof.sortKey == prof.sortKey) {
                          sortkey = keyTypes[prof.sortKey]
                          sortkeyname = prof.sortKey
                      }

                      var combinations = this.calculateCombinations(arml)
                      var res = []
                      for(var i = 0; i < summon.length; i++){
                          res[i] = []
                      }
                      for(var i = 0; i < combinations.length; i++){
                          var oneres = this.calculateOneCombination(combinations[i], summon, prof, arml, totalBuff, chara)
                          for(var j = 0; j < summon.length; j++){
                              res[j].push({data: oneres[j], armNumbers: combinations[i]});
                          }
                      }
                      // この時点で summonres は"各召喚石に対応する結果データの連想配列 を並べた配列"の配列になっているはず

                      for(var i = 0; i < summon.length; i++){
                          if(sortkey == "ATKandHP") {
                              res[i].sort(function(a, b){
                                  if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) < (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return  1;
                                  if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) > (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return -1;
                                  return 0;
                              });
                          }else {
                              res[i].sort(function(a, b){
                                  if(a["data"]["Djeeta"][sortkey] < b["data"]["Djeeta"][sortkey]) return  1;
                                  if(a["data"]["Djeeta"][sortkey] > b["data"]["Djeeta"][sortkey]) return -1;
                                  return 0;
                              });
                          }
                          while(res[i].length > 10){ res[i].pop(); }
                      }

                      return {summon: summon, result: res, sortkeyname: sortkeyname}
                  } else {
                      return {summon: summon, result: []}
                  }

                },
                render: function() {
                    res = this.calculateResult();
                    var summondata = res.summon
                    var result = res.result

                    switcher = this.state;
                    var armnames = []
                    for(var i = 0; i < this.props.data.armlist.length; i++){
                        armnames[i] = this.props.data.armlist[i].name;

                        if(armnames[i] == '') {
                            armnames[i] = "武器" + (i + 1).toString()
                        }
                    }

                    var tableheader = []
                    if(switcher.switchTotalAttack) {
                        tableheader.push('総合攻撃力')
                    }
                    if(switcher.switchATKandHP) {
                        tableheader.push('戦力')
                    }
                    if(switcher.switchHP) {
                        tableheader.push('HP')
                    }
                    if(switcher.switchDATA) {
                        tableheader.push('連続攻撃率(%)')
                    }
                    if(switcher.switchExpectedAttack) {
                        tableheader.push('期待攻撃回数')
                    }
                    if(switcher.switchCriticalRatio) {
                        tableheader.push('技巧期待値 (期待攻撃力, 平均攻撃力)')
                    }
                    if(switcher.switchCharaAttack) {
                        var chara = this.props.data.chara
                        for(var i = 0; i < chara.length; i++){
                            if(chara[i].name != "") {
                                tableheader.push(chara[i].name)
                            }
                        }
                    }
                    if(switcher.switchAverageAttack) {
                        tableheader.push('平均攻撃力')
                    }
                    var prof = this.props.data.profile

                    return (
                        <div className="resultList">
                            表示項目:
                            <input type="checkbox" checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 総合攻撃力
                            <input type="checkbox" checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力
                            <input type="checkbox" checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP
                            <input type="checkbox" checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率
                            <input type="checkbox" checked={this.state.switchExpectedAttack} onChange={this.handleEvent.bind(this, "switchExpectedAttack")} /> 期待攻撃回数
                            <input type="checkbox" checked={this.state.switchCriticalRatio} onChange={this.handleEvent.bind(this, "switchCriticalRatio")} /> 技巧期待値(仮)
                            <input type="checkbox" checked={this.state.switchCharaAttack} onChange={this.handleEvent.bind(this, "switchCharaAttack")} /> キャラ攻撃力
                            <input type="checkbox" checked={this.state.switchAverageAttack} onChange={this.handleEvent.bind(this, "switchAverageAttack")} /> パーティ平均攻撃力
                            <div className="divright"><h3>比較用プロフィール: rank {prof.rank}, HP {prof.hp} %, 通常バフ {prof.normalBuff}%, 属性バフ {prof.elementBuff}%, その他バフ {prof.otherBuff}%</h3></div>

                            {summondata.map(function(s, summonindex) {
                                var selfSummonHeader = ""
                                if(s.selfSummonType == "odin"){
                                    selfSummonHeader = "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                                } else {
                                    selfSummonHeader = summonTypes[s.selfSummonType] + s.selfSummonAmount
                                }

                                var friendSummonHeader = ""
                                if(s.friendSummonType == "odin"){
                                    friendSummonHeader = "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                                } else {
                                    friendSummonHeader = summonTypes[s.friendSummonType] + s.friendSummonAmount
                                }
                                return(
                                    <div className="result">
                                        <h2> 結果({res.sortkeyname}): No. {summonindex + 1} ({selfSummonHeader} + {friendSummonHeader}) </h2>
                                        <table>
                                        <thead>
                                        <tr>
                                            <th>順位</th>
                                            {tableheader.map(function(m){ return <th>{m}</th>; })}
                                            {
                                                armnames.map(function(m, ind){
                                                if(ind == 0) {
                                                    return <th className="resultFirst">{m}</th>;
                                                } else {
                                                    return <th className="resultList">{m}</th>;
                                                }})
                                            }
                                        </tr>
                                        </thead>
                                        <Result key={summonindex} data={result[summonindex]} switcher={switcher}/>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            });

            var Result = React.createClass({
                render: function() {
                    var sw = this.props.switcher;
                    return (
                        <tbody className="result">
                            {this.props.data.map(function(m, rank) {
                                var tablebody = []
                                if(sw.switchTotalAttack) {
                                    tablebody.push(m.data.Djeeta.totalAttack)
                                }
                                if(sw.switchATKandHP) {
                                    var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                                    tablebody.push(senryoku + ' (' + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                                }
                                if(sw.switchHP) {
                                    tablebody.push(m.data.Djeeta.totalHP)
                                }
                                if(sw.switchDATA) {
                                    tablebody.push('DA:' + m.data.Djeeta.totalDA.toFixed(1) + '%, TA: ' + m.data.Djeeta.totalTA.toFixed(1) + '%')
                                }
                                if(sw.switchExpectedAttack) {
                                    var taRate = (parseInt(m.data.Djeeta.totalTA) >= 100) ? 1.0 : 0.01 * parseInt(m.data.Djeeta.totalTA)
                                    var daRate = (parseInt(m.data.Djeeta.totalDA) >= 100) ? 1.0 : 0.01 * parseInt(m.data.Djeeta.totalDA)
                                    var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))
                                    tablebody.push(expectedAttack.toFixed(2))
                                }
                                if(sw.switchCriticalRatio) {
                                    tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "(" + m.data.Djeeta.criticalAttack + ", " + m.data.Djeeta.averageCriticalAttack + ")")
                                }
                                if(sw.switchCharaAttack) {
                                    for(key in m.data){
                                        if(key != "Djeeta") {
                                            tablebody.push(m.data[key].totalAttack)
                                        }
                                    }
                                }
                                if(sw.switchAverageAttack) {
                                    tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                                }
                                return (
                                    <tr key={rank + 1}>
                                        <td>{rank + 1}</td>
                                        {tablebody.map(function(am){
                                            return (<td>{am}</td>);
                                        })}
                                        {m.armNumbers.map(function(am, ind){
                                            if(ind == 0){
                                                return (<td className="resultFirst">{am} 本</td>);
                                            } else {
                                                return (<td className="resultList">{am} 本</td>);
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    );
                }
            });

            // ArmList has a number of Arm objects.
            var ArmList = React.createClass({
                getInitialState: function() {
                    var al = []
                    for(var i = 0; i < this.props.armNum; i++) al[i] = []

                    var arms = []
                    for(var i=0; i < this.props.armNum; i++) { arms.push(i); }

                    return {
                        // 武器リストをRootに渡すための連想配列
                        alist: al,
                        // 武器リストを管理するための連想配列
                        // indexによって保存データとの対応を取り、
                        // その値をkeyとして使うことでコンポーネントの削除などを行う
                        arms: arms,
                    };
                },
                updateArmNum: function(num) {
                    var arms = this.state.arms
                    if(arms.length < num) {
                        var maxvalue = Math.max.apply(null, arms)
                        for(var i = 0; i < (num - arms.length); i++){
                            arms.push(i + maxvalue + 1)
                        }
                    } else {
                        // ==の場合は考えなくてよい (問題がないので)
                        while(arms.length > num){
                            arms.pop();
                        }
                    }
                    this.setState({arms: arms})
                },
                componentWillReceiveProps: function(nextProps) {
                    // iPadなどで一度数字が消された場合NaNになる
                    if(!isNaN(parseInt(nextProps.armNum))) {
                        // 今回のarmNumが小さくなったらalistも切り落とす (前回がNaNの場合も行う)
                        if (isNaN(parseInt(this.props.armNum)) || (parseInt(nextProps.armNum) < parseInt(this.props.armNum))) {
                            var newalist = this.state.alist;
                            while(newalist.length > nextProps.armNum) {
                                newalist.pop();
                            }
                            this.setState({alist: newalist})
                        }
                        this.updateArmNum(nextProps.armNum)
                    }
                },
                handleOnCopy: function(id, keyid, state) {
                    var newarms = this.state.arms
                    var maxvalue = Math.max.apply(null, newarms)

                    newarms.splice(id + 1, 0, maxvalue + 1)
                    newarms.pop();
                    this.setState({arms: newarms})

                    // newDataにコピー対象のstateを入れておいて、componentDidMountで読み出されるようにする
                    if(!("armlist" in newData)) {
                        // もしnewDataが更新される前だったらkeyを作っておく
                        newData["armlist"] = {}
                    }
                    newData.armlist[id + 1] = state;

                    var newalist = this.state.alist;
                    newalist.splice(id + 1, 0, state)
                    newalist.pop();
                    this.setState({alist: newalist})

                    // Root へ変化を伝搬
                    this.props.onChange(newalist);
                },
                handleOnRemove: function(id, keyid, state) {
                    var newarms = this.state.arms
                    var maxvalue = Math.max.apply(null, newarms)

                    // 該当の "key" を持つものを削除する
                    newarms.splice(this.state.arms.indexOf(keyid), 1)
                    // 1個補充
                    newarms.push(maxvalue + 1)
                    this.setState({arms: newarms})

                    // newDataにinitial stateを入れておいて、componentDidMountで読み出されるようにする
                    if(!("armlist" in newData)) {
                        newData["armlist"] = {}
                    }
                    newData.armlist[newarms.length - 1] = state;

                    var newalist = this.state.alist;
                    // 削除した分をalistからも削除
                    newalist.splice(id, 1)
                    // 1個補充
                    newalist.push(state)
                    this.setState({alist: newalist})

                    // Root へ変化を伝搬
                    this.props.onChange(newalist);
                },
                handleOnChange: function(key, state){
                    var newalist = this.state.alist;
                    newalist[key] = state;
                    this.setState({alist: newalist})
                    this.props.onChange(newalist);
                },
                render: function(){
                    var dataName = this.props.dataName;
                    var arms = this.state.arms;
                    var hChange = this.handleOnChange;
                    var hRemove = this.handleOnRemove;
                    var hCopy = this.handleOnCopy;
                    return (
                        <div className="armList">
                            <h2> 武器リスト </h2>
                            <table>
                            <thead>
                            <tr>
                                <th>武器名</th>
                                <th>攻撃力</th>
                                <th>HP</th>
                                <th>属性</th>
                                <th className="select">武器種</th>
                                <th className="checkbox">コスモス？</th>
                                <th>スキル1</th>
                                <th>スキル2</th>
                                <th className="select">SLv</th>
                                <th className="consider">考慮本数</th>
                                <th className="system">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {arms.map(function(arm, ind) {
                                return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} id={ind} keyid={arm} dataName={dataName} />;
                            })}
                            </tbody>
                            </table>
                        </div>
                    );
                }
            });

            // Arm is a fundamental object corresponding one arm.
            var Arm = React.createClass({
                getInitialState: function() {
                    return {
                            name: '',
                            attack: 0,
                            hp: 0,
                            armType: 'sword',
                            isCosmos: 0,
                            skill1: 'non',
                            skill2: 'non',
                            slv: 1,
                            considerNumberMin: 0,
                            considerNumberMax: 0,
                            element: 'fire',
                    };
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData.armlist[this.props.id]
                        this.setState(newState);
                        this.props.onChange(this.props.id, newState);
                    }
                },
                componentDidMount: function(){
                   var state = this.state;

                   // もし newData に自分に該当するキーがあるなら読み込む
                   // (データロード時に新しく増えたコンポーネント用)
                   var armlist = newData.armlist
                   if( armlist != undefined && this.props.id in armlist ){
                       state = armlist[this.props.id]
                       this.setState(state)
                   }
                   // 初期化後 state を 上の階層に渡しておく
                   // armList では onChange が勝手に上に渡してくれるので必要なし
                   this.props.onChange(this.props.id, state);
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    if(key == "isCosmos") {
                        // if already checked
                        if( newState[key] == 1 ) {
                            newState[key] = 0
                            cosmosChecked = false;

                            // コスモススキルが設定されていたら外す
                            if( newState["skill1"].search(/cosmos/) >= 0){
                                newState["skill1"] = "non"
                            }
                            if( newState["skill2"].search(/cosmos/) >= 0){
                                newState["skill2"] = "non"
                            }
                        // or else
                        } else {
                            if(!cosmosChecked) {
                                cosmosChecked = true;
                                newState[key] = (newState[key] == 0) ? 1 : 0
                            }
                        }

                    } else if(key == "considerNumberMin"){
                        if (parseInt(e.target.value) <= parseInt(this.state.considerNumberMax)) newState[key] = parseInt(e.target.value)
                    } else if(key == "considerNumberMax") {
                        if (parseInt(e.target.value) >= parseInt(this.state.considerNumberMin)) newState[key] = parseInt(e.target.value)
                    } else if( (key == "skill1" || key == "skill2") && (e.target.value.search(/cosmos/) >= 0)){
                        if( newState["isCosmos"] == 1) {
                            if( (key == "skill1" && newState["skill2"].search(/cosmos/) < 0) || (key == "skill2" && newState["skill1"].search(/cosmos/) < 0)) {
                                // 既にcosmosスキルが設定されていない場合のみ設定可能
                                newState[key] = e.target.value
                            } else {
                                alert("コスモススキルは一種のみ設定可能です。")
                            }
                        } else {
                            alert("コスモススキルはコスモス武器の場合のみ指定することができます。(先にコスモス武器にチェックを入れてください。)")
                        }
                    } else { newState[key] = e.target.value }

                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                clickRemoveButton: function(e) {
                    this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
                },
                clickCopyButton: function(e, state) {
                    this.props.onCopy(this.props.id, this.props.keyid, this.state)
                },
                render: function(){

                    return (
                        <tr>
                            <form className="armForm">
                            <td><input type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td>
                            <td><input type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td>
                            <td><input type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td>
                            <td className="select"><select value={this.state.element} onChange={this.handleEvent.bind(this, "element")} > {select_elements} </select></td>
                            <td className="select"><select value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {select_armtypes} </select></td>
                            <td className="checkbox"><input className="checkbox" type="checkbox" checked={this.state.isCosmos} onChange={this.handleEvent.bind(this, "isCosmos")} /></td>
                            <td><select value={this.state.skill1} onChange={this.handleEvent.bind(this, "skill1")} > {select_skills}</select></td>
                            <td><select value={this.state.skill2} onChange={this.handleEvent.bind(this, "skill2")} > {select_skills}</select></td>
                            <td className="select"><input type="number" min="1" max="15" step="1" value={this.state.slv} onChange={this.handleEvent.bind(this, "slv")} /></td>
                            <td>
                                <input className="consider" type="number" min="0" max="10" value={this.state.considerNumberMin} onChange={this.handleEvent.bind(this, "considerNumberMin")} /> 本～
                                <input className="consider" type="number" min="0" max="10" value={this.state.considerNumberMax} onChange={this.handleEvent.bind(this, "considerNumberMax")} /> 本
                            </td>
                            <td className="system">
                                <button className="systemButton" type="button" onClick={this.clickRemoveButton}>削除</button>
                                <button className="systemButton" type="button" onClick={this.clickCopyButton}>コピー</button>
                            </td>
                            </form>
                        </tr>
                    );
                }
            });

            var Profile = React.createClass({
                getDefaultProps() {
                    var zenithBonuses = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
                    var ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
                    var alljobs = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{Jobs[opt].name}</option> });

                    return {
                        zenithBonuses: zenithBonuses,
                        keyTypes: ktypes,
                        alljobs: alljobs,
                    };
                },
                componentDidMount: function(){
                   // 初期化後 state を 上の階層に渡しておく
                   this.props.onChange(this.state);
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData.profile
                        this.setState(newState);
                        this.props.onChange(newState);
                    }
                },
                getInitialState: function() {
                    return {
                        rank: 1,
                        attackBonus: 0,
                        hpBonus: 0,
                        masterBonus: 0,
                        masterBonusHP: 0,
                        normalBuff: 0,
                        elementBuff: 0,
                        otherBuff: 0,
                        hpBuff: 0,
                        daBuff: 0,
                        taBuff: 0,
                        hp: 100,
                        zenithBonus1: "無し",
                        zenithBonus2: "無し",
                        enemyElement: "水",
                        job: "none",
                        armNum: 3,
                        summonNum: 1,
                        sortKey: "総合攻撃力",
                        element: "fire",
                    };
                },
                handleEvent: function(key, e) {
                  var newState = this.state
                  newState[key] = e.target.value
                  this.setState(newState)
                  this.props.onChange(newState)
                },
                handleSummonNumChange: function(e) {
                  this.setState({summonNum: e.target.value});
                  this.props.onSummonNumChange(e.target.value);
                },
                handleArmNumChange: function(e) {
                  if(e.target.value < 20) {
                      this.setState({armNum: e.target.value});
                      this.props.onArmNumChange(e.target.value);
                  }
                },
                render: function() {
                        return (
                            <div className="profile">
                                <h3> 基本プロフィール </h3>
                                <form>
                                <table>
                                <tr>
                                    <th className="prof">Rank</th>
                                    <th className="prof">攻撃力ボーナス</th>
                                    <th className="prof">HPボーナス</th>
                                    <th className="prof">マスターボーナスATK(%)</th>
                                    <th className="prof">マスターボーナスHP(%)</th>
                                    <th className="prof">HP (%)</th>
                                </tr>
                                <tr>
                                    <td><input type="number"  min="0" max="175" value={this.state.rank} onChange={this.handleEvent.bind(this, "rank")}/></td>
                                    <td><input type="number" min="0" value={this.state.attackBonus} onChange={this.handleEvent.bind(this, "attackBonus")}/></td>
                                    <td><input type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                                    <td><input type="number" min="0" max="100" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}/></td>
                                    <td><input type="number" min="0" max="100" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}/></td>
                                    <td><input type="number" min="0" max="100" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                                </tr>
                                <tr>
                                    <th className="prof">ジータ属性</th>
                                    <th className="prof">敵の属性</th>
                                    <th className="prof">ジョブ</th>
                                    <th className="prof">武器ゼニス1</th>
                                    <th className="prof">武器ゼニス2</th>
                                </tr>
                                <tr>
                                    <td><select value={this.state.element} onChange={this.handleEvent.bind(this, "element")}> {select_elements} </select></td>
                                    <td><select value={this.state.enemyElement} onChange={this.handleEvent.bind(this, "enemyElement")}> {select_elements} </select></td>
                                    <td><select value={this.state.job} onChange={this.handleEvent.bind(this, "job")} > {this.props.alljobs} </select></td>
                                    <td><select value={this.state.zenithBonus1} onChange={this.handleEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </select></td>
                                    <td><select value={this.state.zenithBonus2} onChange={this.handleEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </select></td>
                                </tr>
                                </table>

                                有利不利の設定から、ジータと敵の属性をそれぞれ設定するように変更しました。<br/>
                                (武器の中にジータの属性に対応するものがなくても警告されませんのでご注意下さい。)

                                <h3>バフ(%表記)</h3>
                                <table>
                                    <tr>
                                        <th className="buff">通常バフ</th>
                                        <th className="buff">属性バフ</th>
                                        <th className="buff">その他バフ</th>
                                        <th className="buff">HPバフ</th>
                                        <th className="buff">DAバフ</th>
                                        <th className="buff">TAバフ</th>
                                    </tr>
                                    <tr>
                                        <td><input type="number"  min="0" value={this.state.normalBuff} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.elementBuff} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.otherBuff} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.hpBuff} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                                        <td><input type="number"  min="0" max="100" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                                        <td><input type="number"  min="0" max="100" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                                    </tr>
                                </table>
                                <h3>システム関連</h3>
                                <table>
                                    <tr>
                                        <th>武器種類数</th>
                                        <th>召喚石の組数</th>
                                        <th>優先する項目</th>
                                    </tr>
                                    <tr>
                                        <td><input type="number" min="1" max="20" step="1" value={this.state.armNum} onChange={this.handleArmNumChange}/></td>
                                        <td><input type="number" min="1" max="4" step="1" value={this.state.summonNum} onChange={this.handleSummonNumChange}/></td>
                                        <td><select value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {this.props.keyTypes} </select></td>
                                    </tr>
                                </table>
                                </form>
                            </div>
                        );
                    }
            });
            var Sys = React.createClass({
                getInitialState: function() {
                    return {
                        storedData: {},
                        dataName: '',
                        selectedData: '',
                    };
                },
                componentDidMount: function(){
                    // localStorage から data をロードする
                    if ("data" in localStorage && localStorage.data != "{}" ) {
                        var storedData = JSON.parse(Base64.decode(localStorage["data"]))
                        this.setState({storedData: storedData})
                    }
                },
                handleOnClick: function(key, e) {
                  var newState = this.state
                  newState[key] = e.target.value
                  this.setState(newState)
                },
                handleEvent: function(key, e) {
                  var newState = this.state
                  newState[key] = e.target.value
                  this.setState(newState)

                  if(key == "dataName") {
                      // 短縮URL取得時に使用するために保存しておく
                      newData["dataName"] = e.target.value;
                  }
                },
                onSubmitRemove: function(e) {
                  if(this.state.selectedData != ''){
                      // remove data
                      var newState = this.state;
                      delete newState["storedData"][this.state.selectedData];
                      newState.selectedData = Object.keys(this.state.storedData)[0]

                      localStorage.setItem("data", Base64.encodeURI(JSON.stringify(newState.storedData)));
                      this.setState(newState);
                  } else {
                      alert("削除するデータを選択して下さい。")
                  }
                },
                onSubmitLoad: function(e){
                  e.preventDefault();
                  if(this.state.selectedData != ''){
                      newData = JSON.parse(JSON.stringify(this.state.storedData[this.state.selectedData]));

                      // これは will receive props が発火したあとしか反映されない
                      this.setState({dataName: this.state.selectedData});
                      this.props.onLoadNewData(this.state.selectedData)
                  } else {
                      alert("読み込むデータを選択して下さい。")
                  }
                },
                onSubmitSave: function(e){
                  e.preventDefault();
                  if(this.state.dataName != ''){
                      var newState = this.state;
                      var propsdata = JSON.parse(JSON.stringify(this.props.data));

                      // dataName だけ Root に持っていっていないので、上書きしておく
                      propsdata["dataName"] = this.state.dataName;

                      newState["storedData"][this.state.dataName] = propsdata;
                      newState["selectedData"] = this.state.dataName;

                      // save data
                      var saveString = Base64.encodeURI(JSON.stringify(newState.storedData));
                      localStorage.setItem("data", saveString);

                      newData = propsdata;
                      this.setState(newState);
                  } else {
                      alert("データ名を入力して下さい。")
                  }
                },
                render: function() {
                    var datalist = []
                    if(Object.keys(this.state.storedData).length != 0){
                        var keys = Object.keys(this.state.storedData);
                        datalist = keys.map(function(opt){
                            return (
                                <option value={opt} key={opt}>{opt}</option>
                            );
                        });
                    }
                    return (
                        <div className="system">
                            <h2> System </h2>
                            <form className="sysForm">
                                <select size="12" value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </select>
                                データ名: <input size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} /><br />
                                <button type="button" onClick={this.onSubmitSave} >保存</button>
                                <button type="button" onClick={this.onSubmitLoad} >読込</button>
                                <button type="button" onClick={this.onSubmitRemove} >削除</button>
                            </form>
                        </div>
                    );
                }
            });

            // Twitter Button
            var TwitterShareButton = React.createClass ({
                componentWillReceiveProps: function(nextProps){
                    var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
                    var shareurl = "http://hsimyu.net/motocal?data=" + datatext
                    this.setState({datatext: datatext, shareurl: shareurl});
                },
                getInitialState: function() {
                    var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
                    var shareurl = "http://hsimyu.net/motocal?data=" + datatext
                    return {
                        shareurl: datatext,
                        datatext: datatext,
                    };
                },
                getShortenUrl: function() {
                    var data = this.props.data;
                    if("dataName" in newData && newData["dataName"] != '') {
                        // 基本的にSys.dataNameに入力されているものをベースにして保存
                        data["dataName"] = newData["dataName"];
                    } else {
                        // Sys.dataNameが空の場合
                        data["dataName"] = "savedData";
                    }

                    $.ajax({
                        url: "getshort.php",
                        type: 'POST',
                        dataType: 'text',
                        cache: false,
                        timeout: 10000,
                        data: {datachar: Base64.encodeURI(JSON.stringify(data))},
                        success: function(data, datatype) {
                            var shareurl = 'http://hsimyu.net/motocal?id=' + data
                            var tweeturl = 'https://twitter.com/intent/tweet?';
                            tweeturl += 'text=元カレ計算機（グラブル攻撃力計算機）'
                            tweeturl += '&url=' + shareurl
                            window.open(tweeturl, '_blank')
                            this.setState({shareurl: shareurl})
                        }.bind(this),
                        error: function(xhr, status, err) {
                            alert("Error!: 何かがおかしいです。@hsimyuまで連絡して下さい。status: ", status, ", error message: ", err.toString());
                        }.bind(this)
                    });
                },
                render: function() {
                  return (
                        <div className="tweet">
                            <button type="button" onClick={this.getShortenUrl}> 短縮URLを取得 </button>
                            <h3>保存用URL</h3>
                            {this.state.shareurl}
                        </div>
                   );
                },
            });

            var Notice = React.createClass ({
                render: function() {
                  return (
                    <div className="notice">
                        <hr/>
                        <div className="noticeLeft">
                            <h3>入力例</h3>
                            <ul>
                                <li> <a href="http://hsimyu.net/motocal?id=136"> 例:火ベルセ </a> </li>
                            </ul>
                            <h3>更新履歴</h3>
                            <ul>
                                <li>2016/07/16: バハ短剣の適応種族が間違っていたので修正 / 朱雀琴スキルの実装 / 計算量を削減する処理の追加 </li>
                                <li>2016/07/15: 技巧・刹那の追加と、技巧期待値計算機能の追加 / キャラ攻撃力計算の実装、属性の導入 </li>
                                <li>2016/07/14: 通常神威のHP上昇量が低かったので修正 / プロフィールと召喚石欄のtoggle機能追加 </li>
                                <li>2016/07/13: スマホ版Chromeで武器数変更が行えなかった不具合を修正 / 得意武器欄を廃止してジョブ欄を追加 </li>
                                <li>2016/06/17: 神威によるHP上昇が加味されていなかったので修正 </li>
                                <li>2016/06/15: コスモスATの効果量が間違っていたので修正 / コピー機能の不具合修正 / localStorageに保存時のデータ名が1つ前のものになってしまう不具合を修正 </li>
                                <li>2016/06/14: 短縮URL取得機能の実装 </li>
                                {/*<li>2016/06/13: ストレングス背水の実装 / styleの調整 </li>
                                <li>2016/06/11: オーディン石（属性+キャラ）に対応 </li>
                                <li>2016/06/05: 暴君とコスモスATのHPデバフ分の計算が間違っていたので修正 </li>
                                <li>2016/06/04: 削除ボタンとコピーボタンを実装 / 基礎DATA率と期待攻撃回数計算を追加(仮) / 召喚石を複数にした際の動作速度を改善 </li>
                                <li>2016/06/03: コスモスAT/DF/BLの計算を追加。コスモス武器指定がない場合にはコスモススキルを指定できないように修正</li>
                                <li>2016/05/31: 表示項目を選べるように / 属性バフを加算し忘れていたので修正 / 暴君とミフネ流のHP計算に対応 / DATA率の計算に対応</li>
                                <li>2016/05/30: HPマスターボーナスをHPバフ側に加算していたので修正。</li>
                                <li>2016/05/29: 基礎HPの基礎式を修正。召喚石を増やした後減らすと結果表示が残る不具合修正。武器本数が少ないデータを読み込むと前のデータの武器が残ってしまう不具合を修正。</li>
                                <li>2016/05/29: 得意武器ゼニスIIに対応（★4、★5、★6）。</li>
                                <li>2016/05/29: HPと守護スキルの実装、優先項目を選んでソートできるように修正</li>
                                <li>2016/05/29: 武器種類数を10本に設定すると表示がバグる不具合を修正 </li>
                                <li>2016/05/26: マスターボーナスがなかった場合のURLを入力してしまうと表示がNaNになってしまう不具合を修正 </li>
                                <li>2016/05/26: マスターボーナスの項が抜けてたので追加 / ついでに表示される攻撃力も算出されるように変更(確認用) </li>
                                <li>2016/05/25: 保存用URLのTweetボタンを追加 </li>
                                <li>2016/05/25: 召喚石関連の入力値も複数持てるように変更しました。（修正前の保存データは一部壊れる可能性があります）</li>*/}
                            </ul>

                            <h3>注記</h3>
                            <ul>
                                 <li>今後の実装予定: HPやDAが上がるなどのサポアビ対応</li>
                                 <li><strong>バハ武器フツルスのHP/攻撃力を正しく計算したい場合はスキルに"バハフツ(攻/HP)"を選択してください。</strong> <br/>
                                 (バハ攻SLv11~の場合のHPと、バハ攻HPのSLv10の場合にズレが出ます。それ以外は問題ありません)</li>
                                 <li>未対応: 羅刹/三手/召喚石のクリティカル率/フラム=グラス</li>
                                 <li>得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。</li>
                                 <li>基礎DA/TA率は 6.5%/3.0% としています。<br/>
                                 二手のDA率上昇量はすんどめ侍氏の検証結果を使っています(二手大SLv15は7.0%としました。)<br/>
                                 克己のDA率上昇量は二手(中)と全く同じとしています。</li>
                                 <li>暴君の攻撃力上昇量は対応するスキルの(大)と同様としています。</li>
                                 <li>基礎HPの基礎式は 600 + 8 * rank(100まで) + 4 * (rank - 100)としていますが、120以上くらいでちょっとズレてる気がします。</li>
                                 <li>背水の計算式は日比野さんのところの式を利用しています。</li>
                                 <li>計算量削減のため、合計本数8本-10本の編成のみ算出します。</li>
                             </ul>

                            <h3>LICENSE</h3>
                            <ul>
                                <li> <a href="http://facebook.github.io/react">React</a>: Copyright &copy; 2013-2016 Facebook Inc. v0.13.3 </li>
                                <li> <a href="http://github.com/dankogai/js-base64">dankogai/js-base64</a>: Copyright &copy; 2014, Dan Kogai <a href="./js-base64/LICENSE.md"> LICENSE </a></li>

                            </ul>

                            <h3>参考文献</h3>
                            以下のサイトを参考にさせていただきました。
                            <ul>
                                <li> <a href="http://gbf-wiki.com">グランブルーファンタジー(グラブル)攻略wiki</a></li>
                                <li> <a href="http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html">グランブルーファンタジー攻撃力計算機</a></li>
                                <li> <a href="http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html">オススメ装備に自信ニキ</a></li>
                                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/12/09/230544">すんどめ侍のグラブル生活 - 【グラブル】武器スキル検証結果</a></li>
                                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/10/11/175521">すんどめ侍のグラブル生活 - 【グラブル】ジョブデータ検証結果</a></li>
                            </ul>
                        </div>
                        <div className="noticeRight">
                            製作者: ほしみ <a href="http://twitter.com/hsimyu" target="_blank"> @hsimyu </a><br/>
                            <img className="banner" src="./ChWJ-LgUgAA2JEy.jpg" />
                        </div>
                    </div>
                   );
                },

            });

            var m = React.render(<Root />, document.getElementById('app'));
