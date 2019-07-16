import csv
import inspect
import json
import os
import re
from collections import OrderedDict

armtypelist = OrderedDict()
armtypelist[u"剣"] = "sword"
armtypelist[u"銃"] = "gun"
armtypelist[u"短剣"] = "dagger"
armtypelist[u"槍"] = "spear"
armtypelist[u"斧"] = "axe"
armtypelist[u"杖"] = "wand"
armtypelist[u"格闘"] = "fist"
armtypelist[u"弓"] = "bow"
armtypelist[u"楽器"] = "music"
armtypelist[u"刀"] = "katana"

charatypelist = OrderedDict()
charatypelist[u"攻撃"] = "attack"
charatypelist[u"防御"] = "defense"
charatypelist[u"回復"] = "heal"
charatypelist[u"バランス"] = "balance"
charatypelist[u"特殊"] = "pecu"

racelist = OrderedDict()
racelist[u"ヒューマン"] = "human"
racelist[u"ドラフ"] = "doraf"
racelist[u"エルーン"] = "erune"
racelist[u"ハーヴィン"] = "havin"
racelist[u"星晶獣"] = "seisho"
racelist[u"不明"] = "unknown"

sexlist = OrderedDict()
sexlist[u"男"] = "male"
sexlist[u"女"] = "female"
sexlist[u"不詳"] = "other"

supportAbilist = OrderedDict()
supportAbilist["da_up_all_10"] = {u"双剣乱舞"}
supportAbilist["ta_up_all_3"] = {u"大いなる翼"}
supportAbilist["data_up_wind_10_5"] = {u"溢れる母性"}
supportAbilist["data_up_water_10_5"] = {u"舞い歌う夏の巫女"}
supportAbilist["da_up_fist_10"] = {u"古今無双流"}
supportAbilist["hp_down_own_15"] = {u"喪失する自我", u"アストラルチャージ"}
supportAbilist["hp_up_own_15"] = {u"やばいですね☆"}
supportAbilist["hp_up_own_20"] = {u"老當益壮",u"本物のヒーロー"}
supportAbilist["atk_up_own_5"] = {u"愛憎の衝動"}
supportAbilist["atk_up_all_5"] = {u"クイーン・オブ・カジノ", u"ディペンデンス"}
supportAbilist["atk_up_all_10"] = {u"羊神宮の主"}
supportAbilist["atk_up_doraf"] = {u"質実剛健"}
supportAbilist["atk_up_depends_races"] = {u"氷晶宮の特使"}
supportAbilist["element_buff_boost_own_30"] = {u"王者の風格"}
supportAbilist["eternal_wisdom"] = {u"久遠の叡智"}
supportAbilist["ougi_gage_up_own_10"] = {u"戦賢の書"}
supportAbilist["ougi_gage_up_own_20"] = {u"剣聖", u"静かな威圧", u"片翼の悪魔"}
supportAbilist["ougi_gage_up_own_100"] = {u"刀神"}
supportAbilist["ougi_damage_up_50_cap_10"] = {u"天星剣王2"}
supportAbilist["ougi_damage_up_50"] = {u"天星剣王"}
supportAbilist["emnity_all_SL10"] = {u"太陽信仰"}
supportAbilist["emnity_own_SL20"] = {u"ダーク・ラピュセル", u"黒の鎧", u"砂神グラフォスの慈愛"}
supportAbilist["envoy_meditation"] = {u"調停の使徒"}
supportAbilist["ideal_vassals"] = {u"理想の家臣"}
supportAbilist["dance_of_nataraja"] = {u"破滅の舞踏"}
supportAbilist["recklessness_incarnate"] = {u"猪突・上宝沁金ノ撃槍"}
supportAbilist["knightmare_frame"] = {u"人型自在戦闘装甲騎", u"ナイトメアフレーム"}
supportAbilist["critical_up_own_10_30"] = {u"セルフィッシュ・ロイヤル", u"ラ・ピュセル30"}
supportAbilist["critical_up_own_20_20"] = {u"ラ・ピュセル20"}
supportAbilist["critical_up_own_40_50"] = {u"ぶっ殺すわよ！"}
supportAbilist["critical_up_all_5_30"] = {u"調教してやる"}
supportAbilist["damageUP_5"] = {u"真っ二つにしてやるんだっ！"}
#The effect size of "真っ二つにしてやるんだっ！" has not been verified.
#supportAbilist["damageUP_10"] =  {u""} 
supportAbilist["damageUP_20"] = {
    u"炎帝の刃",
    u"冷たい女",
    u"アニマ・アエテルヌス",
    u"真龍の鉤爪",
    u"護国の双剣",
    u"アニマ・ドゥクトゥス",
}
supportAbilist["damageUP_OugiCapUP_20"] = {
    u"羅刹の豪槍",
    u"暴虎",
    u"死の舞踏",
    u"カンピオーネ",
    u"鬼神",
    u"惑乱の旋律",
    u"ピースメーカー",
}
supportAbilist["ougiCapUP_20"] = {
    u"孤高の狙撃手",
    u"天性の才能",
    u"反撃の狼煙"
}
supportAbilist["ougiCapUP_25"] = {
    u"優しい心",
    u"リレーション・コンバーター"
}
supportAbilist["ougiCapUP_100"] = {
    u"神魔を恐れぬ王"
}
supportAbilist["wildcard"] = {
    u"ワイルドカード"
}

supportAbilist["stamina_all_L"] = {
    u"夏祭りの思い出",
    u"不退転の戦旗",
    u"絶対だいじょうぶだよ"
}

supportAbilist["stamina_all_M"] = {
    u"黒の騎士団 総司令"
}

supportAbilist["stamina_all_L_hp_down_own_15"] = {
    u"真夏の夜の夢"
}

supportAbilist["supplemental_third_hit_50k"] = {
    u"みんなのあんぜんあんしん"
}

# Patching DA TA
patching = OrderedDict()

# Consecutive atk rate from すんどめ侍さん
# default: DA7%,TA3%
# Once we assume that the version differences are the same.(The possibility of being different is high.)
## Eternals
patching["[最終]ソーン"] = {"DA": 4.0, "TA": 1.0}
patching["[最終]サラーサ"] = {"DA": 5.0, "TA": 1.0}
patching["[最終]カトル"] = {"DA": 10.0, "TA": 5.0}
patching["[最終]フュンフ"] = {"DA": 4.0, "TA": 1.0}
patching["[最終]シス"] = {"DA": 1000.0, "TA": 0.0}
patching["[最終]シエテ"] = {"DA": 10.0, "TA": 5.0}
patching["[最終]オクトー"] = {"DA": 25.0, "TA": 1.0} ##support skill DA20%
patching["[最終]ニオ"] = {"DA": 4.0, "TA": 1.0}
patching["[最終]エッセル"] = {"DA": 10.0, "TA": 5.0}
patching["ソーン"] = {"DA": 4.0, "TA": 1.0}
patching["サラーサ"] = {"DA": 5.0, "TA": 1.0}
patching["カトル"] = {"DA": 10.0, "TA": 5.0}
patching["フュンフ"] = {"DA": 4.0, "TA": 1.0}
patching["シス"] = {"DA": 1000.0, "TA": 0.0}
patching["シエテ"] = {"DA": 10.0, "TA": 5.0}
patching["オクトー"] = {"DA": 5.0, "TA": 1.0}
patching["ニオ"] = {"DA": 4.0, "TA": 1.0}
patching["エッセル"] = {"DA": 10.0, "TA": 5.0}

## 火 - Fire
patching["ゼタ"] = {"DA": 10.0, "TA": 5.0}
patching["ラカム(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patching["テレーズ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["メーテラ(火属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ヘルエス"] = {"DA": 10.0, "TA": 5.0}
patching["ガンダゴウザ"] = {"DA": 10.0, "TA": 5.0}
patching["アリーザ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["グレア"] = {"DA": 10.0, "TA": 5.0}
patching["スツルム"] = {"DA": 10.0, "TA": 5.0}
patching["アラナン"] = {"DA": 10.0, "TA": 5.0}
patching["パーシヴァル"] = {"DA": 10.0, "TA": 5.0}

patching["ユエル"] = {"DA": 12.0, "TA": 3.0} ##support skill DA5%

patching["アオイドス"] = {"DA": 4.0, "TA": 1.0}
patching["アニラ"] = {"DA": 4.0, "TA": 1.0}
patching["アギエルバ"] = {"DA": 4.0, "TA": 1.0}
patching["ザルハメリナ"] = {"DA": 4.0, "TA": 1.0}
patching["イオ(水着ver)"] = {"DA": 4.0, "TA": 1.0}

patching["白竜の双騎士 ランスロット＆ヴェイン"] = {"DA": 1000.0, "TA": 3.0}

### SR
patching["ジェミニ・サンライズ"] = {"DA": 10.0, "TA": 5.0}
patching["テレーズ(バニーver)"] = {"DA": 10.0, "TA": 5.0}
patching["天道輝"] = {"DA": 10.0, "TA": 5.0}

## 水 - Water
patching["イングヴェイ"] = {"DA": 10.0, "TA": 5.0}
patching["シルヴァ"] = {"DA": 10.0, "TA": 5.0}
patching["ランスロット(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["桜内梨子＆高海千歌＆渡辺 曜"] = {"DA": 10.0, "TA": 5.0}
patching["ヴァジラ"] = {"DA": 10.0, "TA": 5.0}
patching["ユエル(水属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ソシエ"] = {"DA": 20.0, "TA": 5.0} ##support skill DA10%
patching["イシュミール"] = {"DA": 10.0, "TA": 5.0}
patching["イシュミール(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patching["グレア(水着ver)"] = {"DA": 10.0, "TA": 5.0}

patching["リリィ"] = {"DA": 4.0, "TA": 1.0}
patching["エウロペ"] = {"DA": 4.0, "TA": 1.0}
patching["ダヌア(ハロウィンver)"] = {"DA": 4.0, "TA": 1.0}
patching["シャルロッテ"] = {"DA": 4.0, "TA": 1.0}

### SR
patching["アンジェ"] = {"DA": 12.0, "TA": 3.0}  ##support skill DA5%

patching["テレーズ"] = {"DA": 10.0, "TA": 5.0}
patching["春麗"] = {"DA": 10.0, "TA": 5.0}

patching["オーウェン"] = {"DA": 1000.0, "TA": 3.0}

## 土 - Earth
patching["アレーティア"] = {"DA": 10.0, "TA": 5.0}
patching["ダーント＆フライハイト"] = {"DA": 10.0, "TA": 5.0}
patching["ヴィーラ(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patching["キャサリン"] = {"DA": 10.0, "TA": 5.0}
patching["ネモネ"] = {"DA": 10.0, "TA": 5.0}
patching["ユーステス(ハロウィンver)"] = {"DA": 10.0, "TA": 5.0}

patching["カリオストロ"] = {"DA": 4.0, "TA": 1.0}
patching["サラ"] = {"DA": 4.0, "TA": 1.0}
patching["レ・フィーエ(土属性ver)"] = {"DA": 4.0, "TA": 1.0}
patching["津島善子＆国木田花丸＆黒澤ルビィ"] = {"DA": 4.0, "TA": 1.0}

patching["メルゥ"] = {"DA": 12.0, "TA": 3.0}
patching["ユーステス(ハロウィンver)"] = {"DA": 13.0, "TA": 5.5}
patching["津島善子＆国木田花丸＆黒澤ルビィ"] = {"DA": 6.0, "TA": 5.0}

### SR
patching["カルメリーナ(SR)"] = {"DA": 4.0, "TA": 1.0}

## 風 - Wind
patching["ユエル(水着ver)"] = {"DA": 12.0, "TA": 3.0}
patching["コッコロ"] = {"DA": 12.0, "TA": 3.0}

patching["ユイシス"] = {"DA": 10.0, "TA": 5.0}
patching["ヘルエス(風属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["メリッサベル"] = {"DA": 10.0, "TA": 5.0}
patching["スカーサハ"] = {"DA": 10.0, "TA": 5.0}
patching["ジャンヌダルク(水着ver)"] = {"DA": 10.0, "TA": 5.0}

patching["コルワ"] = {"DA": 4.0, "TA": 1.0}
patching["コルワ(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patching["フィーナ(SSR)"] = {"DA": 4.0, "TA": 1.0}
patching["カルメリーナ"] = {"DA": 4.0, "TA": 1.0}

patching["リヴァイ"] = {"DA": 0.0, "TA": 100.0}

### SR
patching["ユイシス(浴衣ver)"] = {"DA": 10.0, "TA": 5.0}
patching["リュウ"] = {"DA": 10.0, "TA": 5.0}

patching["フィーナ"] = {"DA": 4.0, "TA": 1.0}

## 光 - Light
patching["アーミラ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["ゼタ(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ヘルエス(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ジャンヌダルク"] = {"DA": 10.0, "TA": 5.0}
patching["セルエル"] = {"DA": 10.0, "TA": 5.0}
patching["ロザミア(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["メリッサベル(バレンタインver)"] = {"DA": 10.0, "TA": 5.0}
patching["メーテラ(クリスマスver)"] = {"DA": 10.0, "TA": 5.0}
patching["シルヴァ(光属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ルシオ(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}

patching["バウタオーダ(SSR)"] = {"DA": 4.0, "TA": 1.0}
patching["イオ(リミテッドver)"] = {"DA": 4.0, "TA": 1.0}
patching["ソフィア"] = {"DA": 4.0, "TA": 1.0}
patching["レ・フィーエ(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patching["シャルロッテ(ハロウィンver)"] = {"DA": 4.0, "TA": 1.0}
patching["シャルロッテ(光属性ver)"] = {"DA": 4.0, "TA": 1.0}

patching["アルベール"] = {"DA": 1000.0, "TA": 3.0}
patching["プリキュア"] = {"DA": 1000.0, "TA": 3.0}
patching["レヴィオン姉妹 マイム＆ミイム＆メイム"] = {"DA": 1000.0, "TA": 3.0}
patching["ハールート・マールート(水着ver)"] = {"DA": 1000.0, "TA": 3.0}

### SR
patching["ゼタ(SR)"] = {"DA": 10.0, "TA": 5.0}
patching["フェリ(ハロウィンver)"] = {"DA": 10.0, "TA": 5.0}

patching["アンジェ(ハロウィンver)"] = {"DA": 12.0, "TA": 3.0}  ##support skill DA5%

patching["フィーナ(クリスマスver)"] = {"DA": 4.0, "TA": 1.0}

patching["アルベール(SR)"] = {"DA": 1000.0, "TA": 3.0}

## 闇 - Dark
patching["フォルテ"] = {"DA": 10.0, "TA": 5.0}
patching["ゼタ(闇属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ヴィーラ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["黒騎士(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patching["レディ・グレイ"] = {"DA": 10.0, "TA": 5.0}
patching["ジャンヌダルク(闇)"] = {"DA": 10.0, "TA": 5.0}
patching["アザゼル"] = {"DA": 10.0, "TA": 5.0}

patching["バザラガ"] = {"DA": 4.0, "TA": 1.0}
patching["ダヌア(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patching["カリオストロ(闇属性ver)"] = {"DA": 4.0, "TA": 1.0}
patching["ベアトリクス"] = {"DA": 4.0, "TA": 1.0}

patching["ウーフとレニー"] = {"DA": 1000.0, "TA": 1000.0}
patching["ケルベロス"] = {"DA": 0.0, "TA": 55.0}
patching["ユーステス(闇属性ver)"] = {"DA": 13.0, "TA": 5.5}

### SR
patching["プレデター"] = {"DA": 1000.0, "TA": 3.0}

# Patching ougi ratio https://docs.google.com/spreadsheets/d/1kea2IL6wLNbw4RNUcrrxMTpoIdlXU13pYOzBXjgoBbs/edit#gid=199555968
patchingOugiRatio = OrderedDict()

defaultOugiRatio = {
    "R": 3.5,
    "SR": 3.5,
    "SSR": 4.5,
}

## SSR(Lv100) https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22824
patchingOugiRatio["レディ・グレイ"] = {"ougiRatio": 5.0}
patchingOugiRatio["バザラガ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ナルメア"] = {"ougiRatio": 5.0}
patchingOugiRatio["ヴィーラ(SSR)"] = {"ougiRatio": 5.0}
patchingOugiRatio["ジャンヌダルク"] = {"ougiRatio": 5.0}
patchingOugiRatio["セルエル"] = {"ougiRatio": 5.0}
patchingOugiRatio["サルナーン"] = {"ougiRatio": 5.0}
patchingOugiRatio["アーミラ(SSR)"] = {"ougiRatio": 5.0}
patchingOugiRatio["レナ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ネツァワルピリ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ガウェイン"] = {"ougiRatio": 5.0}
patchingOugiRatio["ハレゼナ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ジークフリート"] = {"ougiRatio": 5.0}
patchingOugiRatio["カリオストロ"] = {"ougiRatio": 5.0}
patchingOugiRatio["アルルメイヤ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ランスロット(SSR)"] = {"ougiRatio": 5.0}
patchingOugiRatio["シルヴァ"] = {"ougiRatio": 5.0}
patchingOugiRatio["シャルロッテ"] = {"ougiRatio": 5.0}
patchingOugiRatio["イングヴェイ"] = {"ougiRatio": 5.0}
patchingOugiRatio["アルタイル"] = {"ougiRatio": 5.0}
patchingOugiRatio["ユエル"] = {"ougiRatio": 5.0}
patchingOugiRatio["マギサ"] = {"ougiRatio": 5.0}
patchingOugiRatio["パーシヴァル"] = {"ougiRatio": 5.0}
patchingOugiRatio["スカーサハ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ガンダゴウザ"] = {"ougiRatio": 5.0}
patchingOugiRatio["メーテラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["アルベール"] = {"ougiRatio": 5.0}
patchingOugiRatio["桜内梨子＆高海千歌＆渡辺 曜"] = {"ougiRatio": 5.0}
patchingOugiRatio["サンダルフォン"] = {"ougiRatio": 5.0}
patchingOugiRatio["ヴァンピィ"] = {"ougiRatio": 5.0}
patchingOugiRatio["リリィ"] = {"ougiRatio": 5.0}

### SSR(Guardian Deity(十二神将) Lv100)
patchingOugiRatio["アンチラ"] = {"ougiRatio": 5.5}
patchingOugiRatio["アニラ"] = {"ougiRatio": 5.5}

### SSR(Guardian Deity(十二神将))
patchingOugiRatio["クビラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["マキラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ヴァジラ"] = {"ougiRatio": 5.0}

### SSR(The Eternals(十天衆) Lv100)
patchingOugiRatio["[最終]ウーノ"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]ソーン"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]サラーサ"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]カトル"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]フュンフ"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]シス"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]シエテ"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]オクトー"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]ニオ"] = {"ougiRatio": 5.0}
patchingOugiRatio["[最終]エッセル"] = {"ougiRatio": 5.0}

### SSR(Other)
patchingOugiRatio["アギエルバ"] = {"ougiRatio": 4.7}
patchingOugiRatio["イオ(水着ver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["レ・フィーエ(水着ver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["ソフィア"] = {"ougiRatio": 4.7}
patchingOugiRatio["シャルロッテ(ハロウィンver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["ロゼッタ(クリスマスver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["サラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["レ・フィーエ"] = {"ougiRatio": 5.5}
patchingOugiRatio["ロボミ(SSR)"] = {"ougiRatio": 12.5}
patchingOugiRatio["シャリオス17世"] = {"ougiRatio": 12.5}

### SSR(Not Ougi)
patchingOugiRatio["コルワ"] = {"ougiRatio": 0.0}
patchingOugiRatio["コルワ(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["コッコロ"] = {"ougiRatio": 0.0}
patchingOugiRatio["ディアンサ(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["木之本桜"] = {"ougiRatio": 0.0}

## SR
### SR(Lv90)
patchingOugiRatio["ルシウス"] = {"ougiRatio": 4.0}
patchingOugiRatio["リタ"] = {"ougiRatio": 4.0}
patchingOugiRatio["ダヌア"] = {"ougiRatio": 4.0}
patchingOugiRatio["城ヶ崎美嘉"] = {"ougiRatio": 4.0}
patchingOugiRatio["ウィル"] = {"ougiRatio": 4.0}
patchingOugiRatio["フェザー"] = {"ougiRatio": 4.0}
patchingOugiRatio["ノア"] = {"ougiRatio": 4.0}
patchingOugiRatio["島村卯月"] = {"ougiRatio": 4.0}
patchingOugiRatio["アーミラ(SR)"] = {"ougiRatio": 4.0}
patchingOugiRatio["ミュオン"] = {"ougiRatio": 4.0}
patchingOugiRatio["ヘルナル"] = {"ougiRatio": 4.0}
patchingOugiRatio["セレフィラ"] = {"ougiRatio": 4.0}
patchingOugiRatio["スーテラ"] = {"ougiRatio": 4.0}
patchingOugiRatio["双葉杏"] = {"ougiRatio": 4.0}
patchingOugiRatio["ソリッズ"] = {"ougiRatio": 4.0}
patchingOugiRatio["ガイーヌ"] = {"ougiRatio": 4.0}
patchingOugiRatio["オイゲン"] = {"ougiRatio": 4.0}
patchingOugiRatio["ローアイン"] = {"ougiRatio": 4.0}
patchingOugiRatio["渋谷凛"] = {"ougiRatio": 4.0}
patchingOugiRatio["エジェリー"] = {"ougiRatio": 4.0}
patchingOugiRatio["ウラムヌラン"] = {"ougiRatio": 4.0}
patchingOugiRatio["イオ"] = {"ougiRatio": 4.0}
patchingOugiRatio["アンジェ"] = {"ougiRatio": 4.0}
patchingOugiRatio["ラカム"] = {"ougiRatio": 4.0}
patchingOugiRatio["本田未央"] = {"ougiRatio": 4.0}
patchingOugiRatio["ノイシュ(火属性ver)"] = {"ougiRatio": 4.0}
patchingOugiRatio["ティナ"] = {"ougiRatio": 4.0}
patchingOugiRatio["城ヶ崎莉嘉"] = {"ougiRatio": 4.0}
patchingOugiRatio["シャオ"] = {"ougiRatio": 4.0}

### SR(Other)
patchingOugiRatio["カタリナ(水着ver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["ヘルナル(水着ver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["アンジェ(ハロウィンver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["アレク"] = {"ougiRatio": 4.2}
patchingOugiRatio["ルリア"] = {"ougiRatio": 6.0}

### SR(Not Ougi)
patchingOugiRatio["ヤイア"] = {"ougiRatio": 0.0}
patchingOugiRatio["ローアイン"] = {"ougiRatio": 0.0}
patchingOugiRatio["ディアンサ"] = {"ougiRatio": 0.0}
patchingOugiRatio["一ノ瀬志希"] = {"ougiRatio": 0.0}
patchingOugiRatio["クロエ(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["ソフィア(SR)"] = {"ougiRatio": 0.0}
patchingOugiRatio["カルメリーナ(SR)"] = {"ougiRatio": 0.0}
patchingOugiRatio["リルル(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["ルドミリア"] = {"ougiRatio": 0.0}


########################################################################################################################
filename = inspect.getframeinfo(inspect.currentframe()).filename
path = os.path.dirname(os.path.abspath(filename))

# json translation
translation = json.load(open(os.path.join(path, "../txt_source/chara-translation.json"), "r", encoding="utf-8"))


def arm_replace(armtype):
    for armtypename, inner_armtype in armtypelist.items():
        if re.match(armtypename, armtype):
            return inner_armtype
    return "no_favorite_arm_error"


def type_replace(charatype):
    for charatypename, inner_charatype in charatypelist.items():
        if re.match(charatypename, charatype):
            return inner_charatype
    return "error"


def race_replace(racetype):
    for racetypename, inner_racetype in racelist.items():
        if re.match(racetypename, racetype):
            return inner_racetype
    return "error"


def sex_replace(sextype):
    for sextypename, inner_sextype in sexlist.items():
        if re.match(sextypename, sextype):
            return inner_sextype
    return "error"


def support_replace(support_str):
    support_pattern = re.compile("\[\[([\W\w]+?)>")

    m = support_pattern.search(support_str)
    if m:
        support = m.group(1)
        for support_typename, support_name in supportAbilist.items():
            for name in support_name:
                if re.match(name, support):
                    return support_typename
    return "none"


def get_value(value_str):
    value_pattern = re.compile("(\d+)")
    matched = value_pattern.search(value_str)

    if matched:
        return matched.group(1)
    else:
        print("input: " + value_str)
        print("matched: error")
        return "error"


def processCSVdata(csv_file_name, json_data, image_wiki_url_list, image_game_url_list):
    key_pattern = re.compile("(\d+_\d+\.png)")
    br_pattern = re.compile("(\w+)&br;(\w+)")
    support_pattern2 = re.compile("([\W\w]+)&br;([\W\w]+)")
    support_pattern3 = re.compile("([\W\w]+)&br;([\W\w]+)&br;([\W\w]+)")
    name_pattern = re.compile("\[\[([\W\w]+?) \((S?S?R)\)")

    mycsv = csv.reader(open(csv_file_name, 'r', encoding="utf-8"), delimiter="|")
    for row in mycsv:
        newdict = OrderedDict()

        if len(row) <= 1:
            continue
        else:
            m = key_pattern.search(row[1])
            if m:
                key = m.group(1)

            m = name_pattern.search(row[2])
            if m:
                name = m.group(1)
                rare = m.group(2)    # <- "SSR", "SR", "R"
            else:
                print("error")
                name = "error"

            newdict["name"] = name
            newdict["ja"] = name

            # element
            if row[3].find("火") > 0:
                newdict["element"] = "fire"
            elif row[3].find("水") > 0:
                newdict["element"] = "water"
            elif row[3].find("土") > 0:
                newdict["element"] = "earth"
            elif row[3].find("風") > 0:
                newdict["element"] = "wind"
            elif row[3].find("光") > 0:
                newdict["element"] = "light"
            else:
                newdict["element"] = "dark"

            # type
            newdict["type"] = type_replace(row[4])
            newdict["race"] = race_replace(row[5])
            newdict["sex"] = sex_replace(row[6])

            m = br_pattern.search(row[7])
            if m:
                newdict["fav1"] = arm_replace(m.group(1))
                newdict["fav2"] = arm_replace(m.group(2))
            else:
                newdict["fav1"] = arm_replace(row[7])
                newdict["fav2"] = "none"

            m3 = support_pattern3.search(row[10])
            m2 = support_pattern2.search(row[10])
            if m3:
                newdict["support"] = support_replace(m3.group(1))
                newdict["support2"] = support_replace(m3.group(2))
                newdict["support3"] = support_replace(m3.group(3))
            elif m2:
                newdict["support"] = support_replace(m2.group(1))
                newdict["support2"] = support_replace(m2.group(2))
                newdict["support3"] = "none"
            else:
                newdict["support"] = support_replace(row[10])
                newdict["support2"] = "none"
                newdict["support3"] = "none"

            newdict["minhp"] = get_value(row[11])
            newdict["hp"] = get_value(row[13])

            newdict["minattack"] = get_value(row[12])
            newdict["attack"] = get_value(row[14])

            if newdict["name"] in patching:
                newdict["baseDA"] = patching[newdict["name"]]["DA"]
                newdict["baseTA"] = patching[newdict["name"]]["TA"]
            else:
                newdict["baseDA"] = 7.0
                newdict["baseTA"] = 3.0
				
            if newdict["name"] in patchingOugiRatio:
                newdict["ougiRatio"] = patchingOugiRatio[newdict["name"]]["ougiRatio"]
            else:
                newdict["ougiRatio"] = defaultOugiRatio[rare]
			

            newdict["imageURL"] = "./charaimgs/" + key

            if name in translation:
                newdict["en"] = translation[name]
            else:
                print(name)
                newdict["en"] = name

            json_data[name] = newdict
            # Wiki
            image_wiki_url_list.append("http://gbf-wiki.com/index.php?plugin=attach&refer=img&openfile=" + key + "\n")
            # Game - Might get you banned...
            image_game_url_list.append("http://gbf.game-a.mbga.jp/assets/img/sp/assets/npc/b/" + key + "\n")
            image_wiki_url_list = list(OrderedDict.fromkeys(image_wiki_url_list))
            image_game_url_list = list(OrderedDict.fromkeys(image_game_url_list))

    return json_data, image_wiki_url_list, image_game_url_list


if __name__ == '__main__':
    json_data = OrderedDict()
    image_wiki_url_list = []
    image_game_url_list = []

    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(
        os.path.join(path, "../txt_source/charaData.txt"), json_data, image_wiki_url_list, image_game_url_list)

    f = open(os.path.join(path, "../charaData.json"), "w", encoding="utf-8")
    json.dump(json_data, f, ensure_ascii=False, indent=4)
    f.close()

    f = open(os.path.join(path, "../txt_source/charaImageWikiURLList.txt"), "w", encoding="utf-8")
    for x in image_wiki_url_list:
        f.write(x)
    f.close()

    f = open(os.path.join(path, "../txt_source/charaImageGameURLList.txt"), "w", encoding="utf-8")
    for x in image_game_url_list:
        f.write(x)
    f.close()
