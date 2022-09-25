import csv
import inspect
import json
import os
import re
from collections import OrderedDict

# wiki内の表記から読み取るための辞書
elementlist = OrderedDict()
elementlist[u"火"] = "fire"
elementlist[u"水"] = "water"
elementlist[u"土"] = "earth"
elementlist[u"風"] = "wind"
elementlist[u"光"] = "light"
elementlist[u"闇"] = "dark"

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
racelist[u"ヒューマン/エルーン"] = "human/erune"
racelist[u"ヒューマン&br;エルーン"] = "human/erune"
racelist[u"ヒューマン/ドラフ"] = "human/doraf"
racelist[u"ヒューマン&br;ドラフ"] = "human/doraf"
racelist[u"ヒューマン"] = "human"
racelist[u"ドラフ"] = "doraf"
racelist[u"エルーン/ドラフ"] = "erune/doraf"
racelist[u"エルーン&br;ドラフ"] = "erune/doraf"
racelist[u"エルーン"] = "erune"
racelist[u"ハーヴィン/ヒューマン"] = "havin/human"
racelist[u"ハーヴィン&br;ヒューマン"] = "havin/human"
racelist[u"ハーヴィン"] = "havin"
racelist[u"星晶獣"] = "seisho"
racelist[u"不明"] = "unknown"
racelist[u"その他"] = "unknown"

sexlist = OrderedDict()
sexlist[u"男/女"] = "male/female"
sexlist[u"女/男"] = "male/female"
sexlist[u"男&br;女"] = "male/female"
sexlist[u"女&br;男"] = "male/female"
sexlist[u"男"] = "male"
sexlist[u"女"] = "female"
sexlist[u"不明"] = "other"

supportAbilist = OrderedDict()
supportAbilist["none"] = {
    u"剣聖を継ぐ者",  # NOTE: Avoid mis-matches with "剣聖"
}
supportAbilist["da_up_all_10"] = {
    u"双剣乱舞"
}
supportAbilist["ta_up_all_3"] = {
    u"大いなる翼"
}
supportAbilist["data_up_wind_10_5"] = {
    u"溢れる母性"
}
supportAbilist["data_up_water_10_5"] = {
    u"舞い歌う夏の巫女"
}
supportAbilist["da_up_fist_10"] = {
    u"古今無双流"
}
supportAbilist["hp_down_own_15"] = {
    u"喪失する自我",
    u"アストラルチャージ"
}
supportAbilist["hp_up_own_10"] = {
    u"黒の鎧"
}
supportAbilist["hp_up_own_15"] = {
    u"やばいですね☆"
}
supportAbilist["hp_up_own_20"] = {
    u"本物のヒーロー"
}
supportAbilist["hp_up_own_30"] = {
    u"老當益壮"
}
supportAbilist["atk_up_own_5"] = {
    u"愛憎の衝動"
}
supportAbilist["atk_up_all_5"] = {
    u"クイーン・オブ・カジノ",
    u"ディペンデンス"
}
supportAbilist["atk_up_all_10"] = {
    u"羊神宮の主"
}
supportAbilist["atk_up_doraf"] = {
    u"質実剛健"
}
supportAbilist["atk_up_depends_races"] = {
    u"氷晶宮の特使"
}
supportAbilist["element_buff_boost_own_30"] = {
    u"王者の風格SR",
    #    u"覇者の風格"
}
supportAbilist["eternal_wisdom"] = {
    u"久遠の叡智"
}
supportAbilist["ougi_gage_up_own_10"] = {
    u"戦賢の書"
}
supportAbilist["ougi_gage_up_own_20"] = {
    u"剣聖",
    u"静かな威圧",
    u"片翼の悪魔",
    u"見た目は子供、頭脳は大人"
}
supportAbilist["ougi_gage_up_own_100"] = {
    u"刀神"
}
supportAbilist["ougi_gage_down_own_25"] = {
    u"砂神グラフォスの鉄槌",
    u"亥之一番"
}
supportAbilist["ougi_gage_down_own_35"] = {
    u"闘争求む重鎧"
}
supportAbilist["ougi_gage_down_own_35_ta_100"] = {
    u"ケンプファー",
    u"凶爪",
    u"バレンタインとか興味無いかな～",
    u"ワンダフルマジック",
}
supportAbilist["ougi_gage_up_djeeta_20"] = {
    u"クラリスちゃんの特製チョコ☆"
}
supportAbilist["ougi_damage_up_50_cap_10"] = {
    u"天星剣王2"
}
supportAbilist["ougi_damage_up_50"] = {
    u"天星剣王"
}
supportAbilist["ougi_damage_up_10"] = {
    u"音ノ木坂学院2年生"
}
supportAbilist["emnity_all_SL10"] = {
    u"太陽信仰",
    u"七回忌の砌",
    u"影歩む黒涙",
}
supportAbilist["emnity_own_SL20"] = {
    u"ダーク・ラピュセル",
    u"砂神グラフォスの慈愛",
}
supportAbilist["emnity_own_SL20_steps"] = {
    u"絶望の剣",
    u"ノートラーガ",
    u"無為の封縛",
}
supportAbilist["envoy_meditation"] = {
    u"調停の使徒"
}
supportAbilist["ideal_vassals"] = {
    u"理想の家臣"
}
supportAbilist["dance_of_nataraja"] = {
    u"破滅の舞踏"
}
supportAbilist["recklessness_incarnate"] = {
    u"猪突・上宝沁金ノ撃槍"
}
supportAbilist["knightmare_frame"] = {
    u"人型自在戦闘装甲騎",
    u"ナイトメアフレーム"
}
supportAbilist["sumizome_sakura"] = {
    u"墓前の墨染桜",
    u"浜辺の鋼鉄少女"
}
supportAbilist["arvess_pact"] = {
    u"アルベスの契約者"
}
supportAbilist["critical_up_own_10_30"] = {
    u"セルフィッシュ・ロイヤル",
    u"ラ・ピュセル30"
}
supportAbilist["critical_up_own_20_20"] = {
    u"ラ・ピュセル20"
}
supportAbilist["critical_up_own_40_50"] = {
    u"ぶっ殺すわよ！"
}
supportAbilist["critical_up_all_5_30"] = {
    u"調教してやる"
}
supportAbilist["mamoritai_kono_egao"] = {
    u"護りたい、この笑顔"
}
supportAbilist["mamorubeshi_sono_egao"] = {
    u"護るべし、その笑顔"
}
# The effect size of "真っ二つにしてやるんだっ！" has not been verified.
supportAbilist["damageUP_5"] = {
    u"真っ二つにしてやるんだっ！"
}
#supportAbilist["damageUP_10"] = {u""}
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
    u"反撃の狼煙",
}
supportAbilist["ougiCapUP_25"] = {
    u"生命のリンク",
    u"リレーション・コンバーター",
    u"ぎゃうー……",
}
supportAbilist["ougiCapUP_100"] = {
    u"神魔を恐れぬ王"
}
supportAbilist["wildcard"] = {
    u"ワイルドカード"
}
supportAbilist["hanged_man_reversed"] = {
    u"刑死者の逆位置"
}
# supportAbilist["fumetsu_no_mikiri"] = {
#     u"不滅の見切り"
# }
supportAbilist["aegisUP_30"] = {
    u"護国の双肩"
}
# supportAbilist["chikara_atsu_no_ha"] = {
#    u"力圧の刃"
# }
supportAbilist["more_than_mere_speed"] = {
    u"ビヨンド・ザ・スピード"
}
supportAbilist["no_multi_attack"] = {
    u"ナイトロ・リミッター"
}
supportAbilist["element_buff_boost_fire_30"] = {
    u"崇拝の尊神"
}
supportAbilist["element_buff_boost_water_30"] = {
    u"神虜の麗姫"
}
supportAbilist["element_buff_boost_earth_30"] = {
    u"神域の守護者"
}
supportAbilist["element_buff_boost_wind_30"] = {
    u"踊り狂う暴風"
}
supportAbilist["element_buff_boost_light_30"] = {
    u"聖布の乙女"
}
# supportAbilist["element_buff_boost_dark_30"] = {
#     u""
# }
# supportAbilist["element_buff_boost_all_30"] = {
#     u""
# }
supportAbilist["element_buff_boost_wind_15"] = {
    u"精霊の啓示"
}
supportAbilist["critical_cap_up_water_3"] = {
    u"正射必中"
}
supportAbilist["critical_cap_up_light_3"] = {
    u"スポッター"
}
supportAbilist["critical_cap_up_earth_3"] = {
    u"遥かな夜空に思いを馳せて"
}
supportAbilist["crazy_auguste"] = {
    u"頭アウギュステ"
}
supportAbilist["lillie_liebe"] = {
    u"リーリエ・リーベ"
}
supportAbilist["sandy_sniper"] = {
    u"砂浜のスナイパー"
}
supportAbilist["unwavering_conviction"] = {
    u"揺るぎない信念"
}
supportAbilist["shinryu_to_no_kizuna"] = {
    u"真龍との絆"
}
supportAbilist["revion_kishi_sanshimai"] = {
    u"レヴィオン騎士三姉妹"
}
supportAbilist["element_buff_boost_damageUP_own_10"] = {
    #    u"堕天司"
}
supportAbilist["element_buff_boost_damageUP_normal_own_30"] = {
    u"堕天司"
}
# supportAbilist["no_normal_attack"] = {
#     u"優しい心",
#     u"カードキャプター"
# }
# supportAbilist["tousou_no_chishio"] = {
#     u"闘争の血潮"
# }
supportAbilist["kenkyaku_no_koou"] = {
    u"剣脚の呼応"
}
supportAbilist["kenkyaku_no_koou"] = {
    u"剣脚の呼応"
}
supportAbilist["debuff_resistance_up_own_15"] = {
    u"ユニバーサルスター",
    u"魔生花の楔"
}
supportAbilist["debuff_resistance_up_own_80"] = {
    u"魔道の申し子"
}
supportAbilist["stamina_all_L"] = {
    u"夏祭りの思い出",
    u"不退転の戦旗",
    u"絶対だいじょうぶだよ",
    u"マップタツパワー"
}
supportAbilist["stamina_all_M"] = {
    u"黒の騎士団 総司令"
}
supportAbilist["stamina_all_L_hp_down_own_15"] = {
    u"真夏の夜の夢"
}
supportAbilist["supplemental_third_hit_50k"] = {
    u"みんなのあんぜんあんしん",
    u'炎天の雷迅卿'
}
supportAbilist["benedikutosu_soure"] = {
    u"太陽の逆位置"  # placeholder for ougi effect not the support ability effect
}
supportAbilist["otherbuff_own_30"] = {
    u"アインザーム"
}
supportAbilist["party_all_night"] = {
    u"朝までハッピィ～！"
}
supportAbilist["additional_damage_on_ta_light_10"] = {
    u"ドレス・ラ・ピュセル"
}
supportAbilist["additional_damage_on_ta_wind_10"] = {
    u"真夏の我は一味違うぞ？"
}
supportAbilist["ougi_gage_down_own_50_damageUP_25"] = {
    u"征道の書"
}
supportAbilist["da_up_ta_up_damageUPOnlyNormal_fist_10_5_3"] = {
    u"己の意志"
}
supportAbilist["element_buff_boost_other_own_30"] = {
    u"真龍の友愛"
}
# Patching DA TA
patchingDaTa = OrderedDict()

# Consecutive atk rate from すんどめ侍さん
# Default: DA7%,TA3%

# Eternals
patchingDaTa["[未開放]ソーン"] = \
patchingDaTa["[最終]ソーン"] = \
patchingDaTa["ソーン"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["[未開放]サラーサ"] = \
patchingDaTa["[最終]サラーサ"] = \
patchingDaTa["サラーサ"] = {"DA": 5.0, "TA": 2.0}
patchingDaTa["[未開放]カトル"] = \
patchingDaTa["[最終]カトル"] = \
patchingDaTa["カトル"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["[未開放]フュンフ"] = \
patchingDaTa["[最終]フュンフ"] = \
patchingDaTa["フュンフ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["[未開放]シス"] = \
patchingDaTa["[最終]シス"] = \
patchingDaTa["シス"] = {"DA": 1000.0, "TA": 0.0}
patchingDaTa["[未開放]シエテ"] = \
patchingDaTa["[最終]シエテ"] = \
patchingDaTa["シエテ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["[未開放]オクトー"] = \
patchingDaTa["[最終]オクトー"] = \
patchingDaTa["オクトー"] = {"DA": 25.0, "TA": 2.0}  # Support skill DA20%
patchingDaTa["[未開放]ニオ"] = \
patchingDaTa["[最終]ニオ"] = \
patchingDaTa["ニオ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["[未開放]エッセル"] = \
patchingDaTa["[最終]エッセル"] = \
patchingDaTa["エッセル"] = {"DA": 10.0, "TA": 5.0}

## 火 - Fire
patchingDaTa["ゼタ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ラカム(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["テレーズ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["メーテラ(火属性ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ヘルエス"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ガンダゴウザ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["アリーザ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["グレア"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["スツルム"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["アラナン"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["パーシヴァル"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ニーナ・ドランゴ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["紅月カレン"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["フラウ"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["ユエル"] = {"DA": 12.0, "TA": 3.0}  # Support skill DA5%

patchingDaTa["アオイドス"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["アニラ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["アギエルバ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["ザルハメリナ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["イオ(水着ver)"] = {"DA": 4.0, "TA": 1.0}

patchingDaTa["白竜の双騎士 ランスロット＆ヴェイン"] = {"DA": 1000.0, "TA": 3.0}

# SR
patchingDaTa["ジェミニ・サンライズ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["テレーズ(バニーver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["天道輝"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["神月かりん"] = {"DA": 10.0, "TA": 5.0}

## 水 - Water
patchingDaTa["イングヴェイ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["シルヴァ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ランスロット(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["桜内梨子＆高海千歌＆渡辺 曜"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ヴァジラ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ユエル(水属性ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ソシエ"] = {"DA": 20.0, "TA": 5.0}  # Support skill DA10%
patchingDaTa["イシュミール"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["グレア(水着ver)"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["リリィ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["エウロペ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["ダヌア(ハロウィンver)"] = {"DA": 4.0, "TA": 1.0}

# SR
patchingDaTa["アンジェ"] = {"DA": 12.0, "TA": 3.0}  # Support skill DA5%

patchingDaTa["テレーズ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["春麗"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["オーウェン"] = {"DA": 1000.0, "TA": 3.0}

## 土 - Earth
patchingDaTa["アレーティア"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ヴィーラ(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["キャサリン"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ネモネ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ユーステス(ハロウィンver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ダーント＆フライハイト"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["カリオストロ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["サラ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["レ・フィーエ(土属性ver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["津島善子＆国木田花丸＆黒澤ルビィ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["真紅と冥闇 ゼタ＆バザラガ(ハロウィンver)"] = {"DA": 1000.0, "TA": 3.0}

patchingDaTa["メルゥ"] = {"DA": 12.0, "TA": 3.0}

# SR
patchingDaTa["カルメリーナ(SR)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["白竜の双騎士 ランスロット＆ヴェイン(SR)(水着ver)"] = {"DA": 1000.0, "TA": 3.0}

## 風 - Wind
patchingDaTa["ユエル(水着ver)"] = {"DA": 12.0, "TA": 3.0}
patchingDaTa["コッコロ"] = {"DA": 12.0, "TA": 3.0}

patchingDaTa["ヘルエス(風属性ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["メリッサベル"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["スカーサハ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ジャンヌダルク(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ジークフリート(浴衣ver)"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["コルワ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["コルワ(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["フィーナ(SSR)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["カルメリーナ"] = {"DA": 4.0, "TA": 1.0}

patchingDaTa["リヴァイ"] = {"DA": 0.0, "TA": 100.0}

patchingDaTa["勇者と姫君 スタン＆アリーザ"] = {"DA": 1000.0, "TA": 3.0}
patchingDaTa["ミュオン(クリスマスver)"] = {"DA": 0, "TA": 1000.0}
patchingDaTa["グリームニル(バレンタインver)"] = {"DA": 1000.0, "TA": 1000.0}

# SR
patchingDaTa["リュウ"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["フィーナ"] = {"DA": 4.0, "TA": 1.0}

## 光 - Light
patchingDaTa["アーミラ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ゼタ(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ヘルエス(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ジャンヌダルク"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["セルエル"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ロザミア(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["メリッサベル(バレンタインver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["メーテラ(クリスマスver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["シルヴァ(光属性ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ルシオ(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ガイゼンボーガ"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["バウタオーダ(SSR)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["イオ(リミテッドver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["ソフィア"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["レ・フィーエ(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["シャルロッテ(ハロウィンver)"] = {"DA": 4.0, "TA": 1.0}

patchingDaTa["アルベール"] = {"DA": 1000.0, "TA": 3.0}
patchingDaTa["プリキュア"] = {"DA": 1000.0, "TA": 3.0}
patchingDaTa["レヴィオン姉妹 マイム＆ミイム＆メイム"] = {"DA": 1000.0, "TA": 3.0}
patchingDaTa["ハールート・マールート(水着ver)"] = {"DA": 1000.0, "TA": 3.0}
patchingDaTa["ハレゼナ(ハロウィンver)"] = {"DA": 1000.0, "TA": 1000.0}
patchingDaTa["渋谷凛＆島村卯月＆本田未央"] = {"DA": 1000.0, "TA": 1000.0}

# SR
patchingDaTa["ゼタ(SR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["フェリ(ハロウィンver)"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["アンジェ(ハロウィンver)"] = {"DA": 12.0, "TA": 3.0}  # Support skill DA5%

patchingDaTa["フィーナ(クリスマスver)"] = {"DA": 4.0, "TA": 1.0}

patchingDaTa["アルベール(SR)"] = {"DA": 1000.0, "TA": 3.0}

## 闇 - Dark
patchingDaTa["フォルテ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ゼタ(闇属性ver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ヴィーラ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["黒騎士(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["レディ・グレイ"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["ジャンヌダルク(闇)"] = {"DA": 10.0, "TA": 5.0}
patchingDaTa["アザゼル"] = {"DA": 10.0, "TA": 5.0}

patchingDaTa["バザラガ"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["ダヌア(水着ver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["カリオストロ(闇属性ver)"] = {"DA": 4.0, "TA": 1.0}
patchingDaTa["ベアトリクス"] = {"DA": 4.0, "TA": 1.0}

patchingDaTa["ウーフとレニー"] = {"DA": 1000.0, "TA": 1000.0}
patchingDaTa["ケルベロス"] = {"DA": 0.0, "TA": 55.0}
patchingDaTa["ユーステス(闇属性ver)"] = {"DA": 13.0, "TA": 5.5}
patchingDaTa["プレデター(SSR)"] = {"DA": 1000.0, "TA": 1000.0}

# SR
patchingDaTa["プレデター"] = {"DA": 1000.0, "TA": 1000.0}

# Patching ougi ratio
# Verification list: https://docs.google.com/spreadsheets/d/1kea2IL6wLNbw4RNUcrrxMTpoIdlXU13pYOzBXjgoBbs/edit#gid=199555968
patchingOugiRatio = OrderedDict()

defaultOugiRatio = {
    "R": 3.5,
    "SR": 3.5,
    "SSR": 4.5,
}

# SSR
# SSR (5★)
# 5★ Character list: https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/22824
# Please add below.
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
patchingOugiRatio["アイル"] = {"ougiRatio": 5.0}
patchingOugiRatio["カタリナ(リミテッドver)"] = {"ougiRatio": 5.0}
patchingOugiRatio["ラカム(リミテッドver)"] = {"ougiRatio": 5.0}
patchingOugiRatio["黒騎士(リミテッドver)"] = {"ougiRatio": 5.0}
patchingOugiRatio["ゼタ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ティアマト"] = {"ougiRatio": 5.0}
patchingOugiRatio["ヴェイン(SSR)"] = {"ougiRatio": 5.0}
patchingOugiRatio["イオ(リミテッドver)"] = {"ougiRatio": 5.0}
patchingOugiRatio["アオイドス"] = {"ougiRatio": 5.0}
patchingOugiRatio["クリスティーナ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ソリッズ(SSR)"] = {"ougiRatio": 5.0}
patchingOugiRatio["ロミオ"] = {"ougiRatio": 5.0}

# SSR (Guardian Deity 5★) (最終十二神将)
patchingOugiRatio["アンチラ"] = {"ougiRatio": 5.5}
patchingOugiRatio["アニラ"] = {"ougiRatio": 5.5}
patchingOugiRatio["マキラ"] = {"ougiRatio": 5.5}

# SSR (Guardian Deity 4★) (十二神将)
patchingOugiRatio["クビラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ヴァジラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["ビカラ"] = {"ougiRatio": 5.0}

# SSR (The Eternals 5★, 6★) (最終・超越十天衆)
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

patchingOugiRatio["[超越]ウーノ"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]ソーン"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]サラーサ"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]カトル"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]フュンフ"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]シス"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]シエテ"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]オクトー"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]ニオ"] = {"ougiRatio": 5.5}
patchingOugiRatio["[超越]エッセル"] = {"ougiRatio": 5.5}


### SSR (Other)
patchingOugiRatio["アギエルバ"] = {"ougiRatio": 4.7}
patchingOugiRatio["イオ(水着ver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["レ・フィーエ(水着ver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["ソフィア"] = {"ougiRatio": 4.7}
patchingOugiRatio["シャルロッテ(ハロウィンver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["ロゼッタ(クリスマスver)"] = {"ougiRatio": 4.7}
patchingOugiRatio["サラ"] = {"ougiRatio": 5.0}
patchingOugiRatio["レ・フィーエ"] = {"ougiRatio": 6.0}
patchingOugiRatio["ロボミ(SSR)"] = {"ougiRatio": 12.5}
patchingOugiRatio["シャリオス17世"] = {"ougiRatio": 12.5}
patchingOugiRatio["ミュオン(クリスマスver)"] = {"ougiRatio": 12.5}
patchingOugiRatio["飛竜と吸血姫 ヴァンピィ＆ベス"] = {"ougiRatio": 12.5}
patchingOugiRatio["シュラ"] = {"ougiRatio": 12.5}
patchingOugiRatio["アーミラ(水着ver)"] = {"ougiRatio": 12.5}
patchingOugiRatio["ミムルメモル(水着ver)"] = {"ougiRatio": 12.5}

# SSR (Not to ougi)
patchingOugiRatio["コルワ"] = {"ougiRatio": 0.0}
patchingOugiRatio["コルワ(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["コッコロ"] = {"ougiRatio": 0.0}
patchingOugiRatio["ディアンサ(水着ver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["ディアンサ(SSR)"] = {"ougiRatio": 0.0}
patchingOugiRatio["木之本桜"] = {"ougiRatio": 0.0}
patchingOugiRatio["グリームニル(バレンタインver)"] = {"ougiRatio": 0.0}
patchingOugiRatio["レイ(リミテッドver)"] = {"ougiRatio": 0.0}

# SR
# SR (5★)
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
patchingOugiRatio["カタリナ"] = {"ougiRatio": 4.0}
patchingOugiRatio["ミリン"] = {"ougiRatio": 4.0}
patchingOugiRatio["ウェルダー(イベントver)"] = {"ougiRatio": 4.0}

### SR (Other)
patchingOugiRatio["カタリナ(水着ver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["ヘルナル(水着ver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["アンジェ(ハロウィンver)"] = {"ougiRatio": 3.7}
patchingOugiRatio["アレク"] = {"ougiRatio": 4.2}
patchingOugiRatio["ルリア"] = {"ougiRatio": 6.0}

# SR (Not to ougi)
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
translation = json.load(open(os.path.join(
    path, "../txt_source/chara-translation.json"), "r", encoding="utf-8"))

def processCSVdata(csv_file_name, json_data, image_wiki_url_list, image_game_url_list):
    name_pattern = re.compile("\[\[([\W\w]+?) \(S?S?R\)")
    rare_pattern = re.compile("\[\[[\W\w]+? \((S?S?R)\)")
    image_pattern = re.compile("(\w+\.(?:jpg|png))")
    element_pattern = re.compile("{(.+?)\}")
    br_pattern = re.compile("&br;|\/")
    support_pattern2 = re.compile("([\W\w]+)&br;([\W\w]+)")
    support_pattern3 = re.compile("([\W\w]+)&br;([\W\w]+)&br;([\W\w]+)")
    number_pattern = re.compile("(\d+)")
    
    # wiki上の表記→内部用名に置き換える
    def replace_notation(wikistr, dict):
        nonlocal name
        wikistr = wikistr.strip()
        
        for notation, innervalue in dict.items():
            if wikistr == notation:
                return innervalue
        print(f"{name} Replace Error: str={wikistr}, dict={dict}")
        return ""
        
    def parse_from_patten(wikistr, pattern):
        nonlocal name
        wikistr = wikistr.strip()
        parsed = pattern.search(wikistr)

        if parsed: 
            return parsed.group(1)
        else:
            print(rf"{name} Parse Error: input={wikistr}, pattern={pattern}")
            return ""
            
    # サポートアビリティだけkeyとvalueが反対なので関数を分ける、入力していないサポアビが大半なのでエラーは表示しない
    def support_replace(support_str):
        support_pattern = re.compile("\[\[([\W\w]+?)(?:\(|>)")
        m = support_pattern.search(support_str)
        if m:
            support = m.group(1)
            for innervalue, notations in supportAbilist.items():
                for notation in notations:
                    if notation == support:
                        return innervalue
        return "none"

    mycsv = csv.reader(
        open(csv_file_name, 'r', encoding="utf-8"), delimiter="|")
    for row in mycsv:
        parsed_dict = OrderedDict()
        
        if len(row) <= 1:
            continue
        else:
            # エラー表示のため
            name = "???"
            name = parsed_dict["name"] = parsed_dict["ja"] = parse_from_patten(row[2], name_pattern)
            rare = parsed_dict["rare"] = parse_from_patten(row[2], rare_pattern)
            imageurl = parse_from_patten(row[1], image_pattern)
            parsed_dict["element"] = replace_notation(parse_from_patten(row[3], element_pattern), elementlist) or "fire"
            parsed_dict["type"] = replace_notation(row[4], charatypelist) or "pecu"
            parsed_dict["race"] = replace_notation(row[5], racelist) or "unknown"
            parsed_dict["sex"] = replace_notation(row[6], sexlist) or "other"
            
            # favorite weapon
            if br_pattern.findall(row[7]):
                favs = br_pattern.split(row[7])
                parsed_dict["fav1"] = replace_notation(favs[0], armtypelist) or "none"
                parsed_dict["fav2"] = replace_notation(favs[1], armtypelist) or "none"
            else:
                parsed_dict["fav1"] = replace_notation(row[7], armtypelist) or "none"
                parsed_dict["fav2"] = "none"

            # support
            if len(br_pattern.findall(row[10])) >= 2:
                supports = br_pattern.split(row[10])
                parsed_dict["support"] = support_replace(supports[0])
                parsed_dict["support2"] = support_replace(supports[1])
                parsed_dict["support3"] = support_replace(supports[2])
            elif len(br_pattern.findall(row[10])) == 1:
                supports = br_pattern.split(row[10])
                parsed_dict["support"] = support_replace(supports[0])
                parsed_dict["support2"] = support_replace(supports[1])
                parsed_dict["support3"] = "none"
            else:
                parsed_dict["support"] = support_replace(row[10])
                parsed_dict["support2"] = "none"
                parsed_dict["support3"] = "none"

            parsed_dict["minhp"] = parse_from_patten(row[11], number_pattern)
            parsed_dict["hp"] = parse_from_patten(row[13], number_pattern)

            parsed_dict["minattack"] = parse_from_patten(row[12], number_pattern)
            parsed_dict["attack"] = parse_from_patten(row[14], number_pattern)

            # patching
            if parsed_dict["name"] in patchingDaTa:
                parsed_dict["baseDA"] = patchingDaTa[parsed_dict["name"]]["DA"]
                parsed_dict["baseTA"] = patchingDaTa[parsed_dict["name"]]["TA"]
            else:
                parsed_dict["baseDA"] = 7.0
                parsed_dict["baseTA"] = 3.0

            if parsed_dict["name"] in patchingOugiRatio:
                parsed_dict["ougiRatio"] = patchingOugiRatio[parsed_dict["name"]]["ougiRatio"]
            else:
                parsed_dict["ougiRatio"] = defaultOugiRatio[rare]

            parsed_dict["imageURL"] = "./charaimgs/" + imageurl

            # Input chara-translation.json
            if name in translation:
                parsed_dict["en"] = translation[name]
            else:
                print(f"{name} English name is not input.")
                parsed_dict["en"] = name
            
            json_data[name] = parsed_dict
            
            # For "download_image.py"
            # Wiki image
            image_wiki_url_list.append(
                "http://gbf-wiki.com/index.php?plugin=attach&refer=img&openfile=" + imageurl + "\n")
            # Game image - Might get you banned...
            image_game_url_list.append(
                "http://gbf.game-a.mbga.jp/assets/img/sp/assets/npc/b/" + imageurl + "\n")
            image_wiki_url_list = list(
                OrderedDict.fromkeys(image_wiki_url_list))
            image_game_url_list = list(
                OrderedDict.fromkeys(image_game_url_list))
    return json_data, image_wiki_url_list, image_game_url_list

if __name__ == '__main__':
    json_data = OrderedDict()
    image_wiki_url_list = []
    image_game_url_list = []

    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(os.path.join(path,
        "../txt_source/charaData-ssr.txt"), json_data, image_wiki_url_list, image_game_url_list)
    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(os.path.join(path,
        "../txt_source/charaDataAddition.txt"), json_data, image_wiki_url_list, image_game_url_list)
    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(os.path.join(path,
        "../txt_source/charaData-sr.txt"), json_data, image_wiki_url_list, image_game_url_list)
    
    f = open(os.path.join(path, "../charaData.json"), "w", encoding="utf-8")
    json.dump(json_data, f, ensure_ascii=False, indent=4)
    f.close()

    f = open(os.path.join(
        path, "../txt_source/charaImageWikiURLList.txt"), "w", encoding="utf-8")
    for x in image_wiki_url_list:
        # TODO: create chain of url replacements for every wrong jp wiki url on update
        r = x
        r = re.sub('3040183000_03.png', '3040183000_03_full.png', r)
        r = re.sub('3040153000_03.png', '3040153000_03_full.png', r)
        r = re.sub('3040152000_03.png', '3040152000_03_full.png', r)
        r = re.sub('3040122000_03.png', '3040122000_03_full.png', r)
        r = re.sub('3040107000_03.png', '3040107000_03_full.png', r)
        r = re.sub('3040082000_03.png', '3040082000_03_full.png', r)
        r = re.sub('3040076000_03.png', '3040076000_03_full.png', r)
        r = re.sub('3040071000_03.png', '3040071000_03_full.png', r)
        r = re.sub('3040065000_03.png', '3040065000_03_full.png', r)
        r = re.sub('3040063000_03.png', '3040063000_03_full.png', r)
        r = re.sub('3040059000_03.png', '3040059000_03_full.png', r)
        r = re.sub('3040057000_03.png', '3040057000_03_full.png', r)
        r = re.sub('3040054000_03.png', '3040054000_03_full.png', r)
        r = re.sub('3040052000_03.png', '3040052000_03_full.png', r)
        r = re.sub('3040049000_03.png', '3040049000_03_full.png', r)
        r = re.sub('3040045000_03.png', '3040045000_03_full.png', r)
        r = re.sub('3040029000_03.png', '3040029000_03_full.png', r)
        r = re.sub('3040028000_03.png', '3040028000_03_full.png', r)
        r = re.sub('3040021000_03.png', '3040021000_03_full.png', r)
        r = re.sub('3040019000_03.png', '3040019000_03_full.png', r)
        r = re.sub('3040018000_03.png', '3040018000_03_full.png', r)
        r = re.sub('3040012000_03.png', '3040012000_03_full.png', r)
        r = re.sub('3040008000_03.png', '3040008000_03_full.png', r)
        r = re.sub('3040007000_03.png', '3040007000_03_full.png', r)
        r = re.sub('3040004000_03.png', '3040004000_03full.png', r)
        r = re.sub('3040001000_03.png', '3040001000_03_full.png', r)
        r = re.sub('3030005000_03.png', '3030005000_03_full.png', r)
        r = re.sub('3030007000_03.png', '3030007000_03_full.png', r)
        r = re.sub('3030008000_03.png', '3030008000_03_full.png', r)
        r = re.sub('3030051000_03.png', '3030051000_03_full.png', r)
        r = re.sub('3030054000_03.png', '3030054000_03_full.png', r)
        r = re.sub('3030061000_03.png', '3030061000_03_full.png', r)
        r = re.sub('3030065000_03.png', '3030065000_03_full.png', r)
        r = re.sub('3030071000_03.png', '3030071000_03_full.png', r)
        r = re.sub('3030088000_03.png', '3030088000_03_full.png', r)
        r = re.sub('3030092000_03.png', '3030092000_03_full.png', r)
        r = re.sub('3030111000_03.png', '3030111000_03_full.png', r)
        r = re.sub('3030124000_03.png', '3030124000_03_full.png', r)
        r = re.sub('3030172000_03.png', '3030172000_03_full.png', r)
        r = re.sub('3030197000_03.png', '3030197000_03_full.png', r)
        r = re.sub('3030224000_03.png', '3030224000_03_full.png', r)
        r = re.sub('3040170000_03.png', '3040170000_03_full.png', r)
        r = re.sub('3040098000_03.png', '3040098000_03_full.png', r)
        f.write(r)
    f.close()

    f = open(os.path.join(
        path, "../txt_source/charaImageGameURLList.txt"), "w", encoding="utf-8")
    for x in image_game_url_list:
        f.write(x)
    f.close()
