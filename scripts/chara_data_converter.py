# -*- coding:utf-8 -*-
import os, csv, sys, math, time, re, json, codecs, types
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

supportAbilist = OrderedDict()
supportAbilist["atk_up_own_5"] = {u"翼の王者", u"愛憎の衝動", u"お祭りの正装"}
supportAbilist["da_up_all_5"] = {u"双剣乱舞"}
supportAbilist["ta_up_all_3"] = {u"大いなる翼"}
supportAbilist["atk_up_all_5"] = {u"羊神宮の主", u"クイーン・オブ・カジノ"}
supportAbilist["atk_up_doraf"] = {u"質実剛健"}
supportAbilist["atk_up_depends_races"] = {u"氷晶宮の特使"}
supportAbilist["ougi_gage_up_own_10"] = {u"戦賢の書"}
supportAbilist["ougi_gage_up_own_20"] = {u"剣聖", u"静かな威圧", u"片翼の悪魔"}
supportAbilist["ougi_gage_up_own_100"] = {u"明鏡止水"}
supportAbilist["ougi_damage_up_1_5"] = {u"天星剣王"}
supportAbilist["taiyou_sinkou"] = {u"太陽信仰"}
supportAbilist["critical_up_own_10_30"] = {u"イ・タ・ズ・ラしちゃうぞ☆", u"セルフィッシュ・ロイヤル", u"ラ・ピュセル30"}
supportAbilist["critical_up_own_20_20"] = {u"ラ・ピュセル20"}
supportAbilist["critical_up_all_5_30"] = {u"調教してやる"}
supportAbilist["damageUP_5"] = {u"真っ二つにしてやるんだっ！"}
supportAbilist["damageUP_10"] = {u"婉麗な姉"}
supportAbilist["damageUP_20"] = {
    u"ピースメーカー",
    u"炎帝の刃",
    u"羅刹の豪槍",
    u"死の舞踏",
    u"冷たい女",
    u"暴虎",
    u"鬼神",
    u"アニマ・アエテルヌス",
    u"カンピオーネ",
    u"惑乱の旋律",
    u"真龍の鉤爪",
    u"護国の双剣",
    u"アニマ・ドゥクトゥス",
}

# Patching
patching = OrderedDict()

# 連撃率 from すんどめ侍さん
patching["ロミオ"] = {"DA": 7.5, "TA": 2.5}
patching["イングヴェイ"] = {"DA": 9.0, "TA": 4.0}
patching["ラスティナ"] = {"DA": 7.0, "TA": 3.0}
patching["マルキアレス"] = {"DA": 7.0, "TA": 3.0}
patching["ユイシス"] = {"DA": 8.0, "TA": 4.0}
patching["シス"] = {"DA": 100.0, "TA": 0.0}
patching["[最終]シス"] = {"DA": 100.0, "TA": 0.0}
patching["アルベール"] = {"DA": 100.0, "TA": 3.0}
patching["アルベール(SR)"] = {"DA": 100.0, "TA": 3.0}
patching["ウーフとレニー"] = {"DA": 100.0, "TA": 100.0}

# json translation
translation = json.load(open("./txt_source/chara-translation.json", "r", encoding="utf-8"))

def skill_replace(skill):
    decoded_skill = skill.decode("utf-8")
    for inner_skillname, onelist in skillnamelist.items():
        for skillname, elem in onelist.items():
            m = re.match(skillname, decoded_skill)
            if m:
                res = inner_skillname
                element = elem
                return res, element

    return "non", "fire"

def arm_replace(armtype):
    for armtypename, inner_armtype in armtypelist.items():
        m = re.match(armtypename, armtype)
        if m:
            res = inner_armtype
            return res
    return "no_favorite_arm_error"

def type_replace(charatype):
    for charatypename, inner_charatype in charatypelist.items():
        m = re.match(charatypename, charatype)
        if m:
            res = inner_charatype
            return res
    return "error"

def race_replace(racetype):
    for racetypename, inner_racetype in racelist.items():
        m = re.match(racetypename, racetype)
        if m:
            res = inner_racetype
            return res
    return "error"

def support_replace(support_str):
    support_pattern = re.compile("\[\[([\W\w]+?)>")

    m = support_pattern.search(support_str)
    if m:
        support = m.group(1)
        for support_typename, support_name in supportAbilist.items():
            for name in support_name:
                m = re.match(name, support)
                if m:
                    res = support_typename
                    return res
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

def processCSVdata(csv_file_name, json_data, image_url_list):
    key_pattern = re.compile("(\d+_\d+\.png)")
    br_pattern = re.compile("(\w+)&br;(\w+)")
    support_pattern = re.compile("([\W\w]+)&br;([\W\w]+)")
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

            m = br_pattern.search(row[6])
            if m:
                newdict["fav1"] = arm_replace(m.group(1))
                newdict["fav2"] = arm_replace(m.group(2))
            else:
                newdict["fav1"] = arm_replace(row[6])
                newdict["fav2"] = "none"

            m = support_pattern.search(row[9])
            if m:
                newdict["support"] = support_replace(m.group(1))
                newdict["support2"] = support_replace(m.group(2))
            else:
                newdict["support"] = support_replace(row[9])
                newdict["support2"] = "none"

            newdict["minhp"] = get_value(row[10])
            newdict["hp"] = get_value(row[12])

            newdict["minattack"] = get_value(row[11])
            newdict["attack"] = get_value(row[13])

            if newdict["name"] in patching:
                newdict["baseDA"] = patching[newdict["name"]]["DA"]
                newdict["baseTA"] = patching[newdict["name"]]["TA"]
            else:
                newdict["baseDA"] = 6.5
                newdict["baseTA"] = 3.0

            newdict["imageURL"] = "./charaimgs/" + key

            if name in translation:
                newdict["en"] = translation[name]
            else:
                print(name)
                newdict["en"] = name

            json_data[name] = newdict
            # imageURL.append("http://gbf-wiki.com/index.php?plugin=attach&refer=img&openfile=" + key + "_01.png\n")

    return json_data, image_url_list

if __name__ == '__main__':
    json_data = OrderedDict()
    image_url_list = []

    json_data, image_url_list = processCSVdata("./txt_source/charaData.txt", json_data, image_url_list)

    f = open("./charaData.json", "w", encoding="utf-8")
    json.dump(json_data, f, ensure_ascii=False, indent=4)
    f.close()

    # f = open("./charaImageURLlist.txt", "w", encoding="utf-8")
    # for x in imageURL:
    #     f.write(x)
    # f.close()
