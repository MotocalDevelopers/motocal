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
racelist[u"不明"] = "unknown"

supportAbilist = OrderedDict()
supportAbilist["atk_up_own_5"] = {u"翼の王者", u"愛憎の衝動", u"お祭りの正装"}
supportAbilist["da_up_all_5"] = {u"双剣乱舞"}
supportAbilist["ta_up_all_5"] = {u"大いなる翼"}
supportAbilist["atk_up_all_5"] = {u"羊神宮の主", u"クイーン・オブ・カジノ"}
supportAbilist["atk_up_doraf"] = {u"質実剛健"}
supportAbilist["atk_up_depends_races"] = {u"氷晶宮の特使"}
supportAbilist["ougi_gage_up_own_10"] = {u"戦賢の書"}
supportAbilist["ougi_gage_up_own_20"] = {u"剣聖", u"静かな威圧", u"片翼の悪魔"}
supportAbilist["ougi_gage_up_own_100"] = {u"明鏡止水"}
supportAbilist["ougi_damage_up_1_5"] = {u"天星剣王"}

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
    decoded_armtype = armtype.decode("utf-8")
    for armtypename, inner_armtype in armtypelist.items():
        m = re.match(armtypename, decoded_armtype)
        if m:
            res = inner_armtype
            return res
    return "none"

def type_replace(charatype):
    decoded_charatype = charatype.decode("utf-8")
    for charatypename, inner_charatype in charatypelist.items():
        m = re.match(charatypename, decoded_charatype)
        if m:
            res = inner_charatype
            return res
    return "error"

def race_replace(racetype):
    decoded_racetype = racetype.decode("utf-8")
    for racetypename, inner_racetype in racelist.items():
        m = re.match(racetypename, decoded_racetype)
        if m:
            res = inner_racetype
            return res
    return "error"

def support_replace(support_str):
    support_pattern = re.compile("\[\[([\W\w]+?)>")

    m = support_pattern.search(support_str)
    if m:
        decoded_support = m.group(1).decode("utf-8")
        for support_typename, support_name in supportAbilist.items():
            for name in support_name:
                m = re.match(name, decoded_support)
                if m:
                    res = support_typename
                    return res
    return "none"

if __name__ == '__main__':
    key_pattern = re.compile("\d+")
    br_pattern = re.compile("(\W+)&br;(\W+)")
    support_pattern = re.compile("([\W\w]+)&br;([\W\w]+)")
    name_pattern = re.compile("\[\[([\W\w]+?) \(")
    mycsv = csv.reader(open("txt_source/charaData.txt", 'r'), delimiter="|")
    json_data = OrderedDict()
    imageURL = []

    for row in mycsv:
        newdict = OrderedDict()

        if len(row) <= 1:
            continue
        else:
            m = key_pattern.search(row[1])
            if m:
                key = row[1][m.start():m.end()]

            m = name_pattern.search(row[2])
            if m:
                name = m.group(1)
            else:
                print "error"
                name = "error"

            newdict["name"] = name

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

            newdict["minhp"] = row[10].translate(None, "COLOR(red):'")
            newdict["hp"] = row[12].translate(None, "COLOR(red):'")

            newdict["minattack"] = row[11].translate(None, "COLOR(red):'")
            newdict["attack"] = row[13].translate(None, "COLOR(red):'")

            newdict["baseDA"] = 6.5
            newdict["baseTA"] = 3.0
            newdict["imageURL"] = "./charaimgs/" + key + "_01.png"
            json_data[name] = newdict
            # imageURL.append("http://gbf-wiki.com/index.php?plugin=attach&refer=img&openfile=" + key + "_01.png\n")

    f = open("./charaData.json", "w")
    json.dump(json_data, f, ensure_ascii=False, indent=4)
    f.close()

    # f = open("./charaImageURLlist.txt", "w")
    # for x in imageURL:
    #     f.write(x)
    # f.close()
