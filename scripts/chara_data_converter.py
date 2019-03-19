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
supportAbilist["da_up_fist_10"] = {u"古今無双流"}
supportAbilist["hp_down_own_15"] = {u"喪失する自我", u"アストラルチャージ", u"真夏の夜の夢"}
supportAbilist["hp_up_own_15"] = {u"やばいですね☆"}
supportAbilist["hp_up_own_20"] = {u"老當益壮"}
supportAbilist["atk_up_own_5"] = {u"翼の王者", u"愛憎の衝動", u"お祭りの正装"}
supportAbilist["atk_up_all_5"] = {u"クイーン・オブ・カジノ", u"ディペンデンス"}
supportAbilist["atk_up_all_10"] = {u"羊神宮の主"}
supportAbilist["atk_up_doraf"] = {u"質実剛健"}
supportAbilist["atk_up_depends_races"] = {u"氷晶宮の特使"}
supportAbilist["ougi_gage_up_own_10"] = {u"戦賢の書"}
supportAbilist["ougi_gage_up_own_20"] = {u"剣聖", u"静かな威圧", u"片翼の悪魔"}
supportAbilist["ougi_gage_up_own_100"] = {u"明鏡止水"}
supportAbilist["ougi_damage_up_50_cap_10"] = {u"天星剣王2"}
supportAbilist["ougi_damage_up_50"] = {u"天星剣王"}
supportAbilist["emnity_all_SL10"] = {u"太陽信仰"}
supportAbilist["emnity_own_SL20"] = {u"ダーク・ラピュセル", u"黒の鎧", u"砂神グラフォスの慈愛"}
supportAbilist["envoy_meditation"] = {u"調停の使徒"}
supportAbilist["dance_of_nataraja"] = {u"破滅の舞踏"}
supportAbilist["recklessness_incarnate"] = {u"猪突・上宝沁金ノ撃槍"}
supportAbilist["critical_up_own_10_30"] = {u"イ・タ・ズ・ラしちゃうぞ☆", u"セルフィッシュ・ロイヤル", u"ラ・ピュセル30"}
supportAbilist["critical_up_own_20_20"] = {u"ラ・ピュセル20"}
supportAbilist["critical_up_all_5_30"] = {u"調教してやる"}
supportAbilist["damageUP_5"] = {u"真っ二つにしてやるんだっ！"}
supportAbilist["damageUP_10"] = {u"婉麗な姉"}
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
supportAbilist["wildcard"] = {
    u"ワイルドカード"
}

# Patching
patching = OrderedDict()

# Consecutive atk rate from すんどめ侍さん
## Eternals
patching["[最終]ソーン"] = {"DA": 4.0, "TA": 1.0}
patching["[最終]サラーサ"] = {"DA": 5.0, "TA": 1.0}
patching["[最終]カトル"] = {"DA": 10.0, "TA": 5.0}
patching["[最終]フュンフ"] = {"DA": 4.0, "TA": 1.0}
patching["[最終]シス"] = {"DA": 1000.0, "TA": 0.0}
patching["[最終]シエテ"] = {"DA": 10.0, "TA": 5.0}
patching["[最終]オクトー"] = {"DA": 25.0, "TA": 1.0}
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
patching["アオイドス"] = {"DA": 4.0, "TA": 1.0}
patching["アニラ"] = {"DA": 4.0, "TA": 1.0}
patching["アギエルバ"] = {"DA": 4.0, "TA": 1.0}
patching["ザルハメリナ"] = {"DA": 4.0, "TA": 1.0}
patching["ユエル"] = {"DA": 12.0, "TA": 3.0}
patching["ゼタ"] = {"DA": 10.0, "TA": 5.0}
patching["ラカム(リミテッドver)"] = {"DA": 10.0, "TA": 5.0}
patching["テレーズ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["メーテラ(火属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ヘルエス"] = {"DA": 10.0, "TA": 5.0}
patching["ガンダゴウザ"] = {"DA": 10.0, "TA": 5.0}
patching["アリーザ(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["グレア"] = {"DA": 10.0, "TA": 5.0}
patching["スツルム"] = {"DA": 10.0, "TA": 5.0}
patching["白竜の双騎士 ランスロット＆ヴェイン"] = {"DA": 1000.0, "TA": 0.0}

### SR
patching["ジェミニ・サンライズ"] = {"DA": 10.0, "TA": 5.0}

## 水 - Water
patching["リリィ"] = {"DA": 4.0, "TA": 1.0}
patching["イングヴェイ"] = {"DA": 10.0, "TA": 5.0}
patching["シルヴァ"] = {"DA": 10.0, "TA": 5.0}
patching["ランスロット(SSR)"] = {"DA": 10.0, "TA": 5.0}
patching["桜内梨子＆高海千歌＆渡辺 曜"] = {"DA": 10.0, "TA": 5.0}
patching["ヴァジラ"] = {"DA": 10.0, "TA": 5.0}
patching["ユエル(水属性ver)"] = {"DA": 10.0, "TA": 5.0}
patching["ソシエ"] = {"DA": 10.0, "TA": 5.0}
patching["イシュミール"] = {"DA": 10.0, "TA": 5.0}

### SR
patching["ユエル(イベントver)"] = {"DA": 12.0, "TA": 3.0}

## 土 - Earth
patching["アレーティア"] = {"DA": 10.0, "TA": 5.0}
patching["カリオストロ"] = {"DA": 4.0, "TA": 1.0}
patching["メルゥ"] = {"DA": 12.0, "TA": 3.0}
patching["サラ"] = {"DA": 4.0, "TA": 1.0}
patching["ヴィーラ(水着ver)"] = {"DA": 10.0, "TA": 5.0}
patching["キャサリン"] = {"DA": 10.0, "TA": 5.0}
patching["レ・フィーエ(土属性ver)"] = {"DA": 4.0, "TA": 1.0}
patching["津島善子＆国木田花丸＆黒澤ルビィ"] = {"DA": 4.0, "TA": 1.0}

### SR

## 風 - Wind
patching["ユイシス"] = {"DA": 10.0, "TA": 5.0}
patching["コッコロ"] = {"DA": 12.0, "TA": 3.0}

### SR

## 光 - Light
patching["アルベール"] = {"DA": 1000.0, "TA": 0.0}
patching["プリキュア"] = {"DA": 1000.0, "TA": 0.0}
patching["レヴィオン姉妹 マイム＆ミイム＆メイム"] = {"DA": 1000.0, "TA": 0.0}

### SR
patching["アルベール(SR)"] = {"DA": 1000.0, "TA": 0.0}

## 闇 - Dark
patching["ウーフとレニー"] = {"DA": 1000.0, "TA": 1000.0}
patching["ケルベロス"] = {"DA": 10.0, "TA": 55.0}

### SR

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
    name_pattern = re.compile("\[\[([\W\w]+?) \(")

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
