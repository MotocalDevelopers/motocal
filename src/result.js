var React = require('react');
var { Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, Collapse, DropdownButton, MenuItem, FormControl, Checkbox, Modal, Image, Popover } = require('react-bootstrap');
var CreateClass = require('create-react-class');
var Simulator = require('./simulator.js')
var { HPChart } = require('./chart.js')
var { AdsenseAdvertisement } = require('./advertisement.js');
var intl = require('./translate.js');
var { HPChartHowTo } = require('./howto.js')

var GlobalConst = require('./global_const.js')

var TextWithTooltip = GlobalConst.TextWithTooltip
var ElementColorLabel = GlobalConst.ElementColorLabel
var elementRelation = GlobalConst.elementRelation
var bahamutRelation = GlobalConst.bahamutRelation
var bahamutFURelation = GlobalConst.bahamutFURelation
var supportAbilities = GlobalConst.supportAbilities
var selector = GlobalConst.selector
var zenith = GlobalConst.zenith
var Jobs = GlobalConst.Jobs
var armTypes = GlobalConst.armTypes
var jobTypes = GlobalConst.jobTypes
var keyTypes = GlobalConst.keyTypes
var skilltypes = GlobalConst.skilltypes
var skillAmounts = GlobalConst.skillAmounts
var elementTypes = GlobalConst.elementTypes
var summonTypes = GlobalConst.summonTypes
var summonElementTypes = GlobalConst.summonElementTypes
var raceTypes = GlobalConst.raceTypes
var filterElementTypes = GlobalConst.filterElementTypes
var enemyDefenseType = GlobalConst.enemyDefenseType
var _ua = GlobalConst._ua;
var getElementColorLabel = GlobalConst.getElementColorLabel;

var { isCosmos, isValidResult, checkNumberofRaces, proceedIndex,
    calcCombinations, calcDamage, calcOugiDamage, treatSupportAbility,
    calcHaisuiValue, calcBasedOneSummon, addSkilldataToTotals, calcOneCombination,
    initializeTotals, getTesukatoripokaAmount, recalcCharaHaisui, getTotalBuff,
    getInitialTotals, getTypeBonus, getTypeBonusStr, calcCriticalDeviation } = require('./global_logic.js');

var ResultList = CreateClass({
    calculateResult: function (newprops) {
        var prof = newprops.profile; var arml = newprops.armlist;
        var summon = newprops.summon; var chara = newprops.chara;

        if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
            var totalBuff = getTotalBuff(prof)

            // 後から追加したパラメータはNaNなことがあるので追加処理
            // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
            var sortkey = "averageCyclePerTurn"
            var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
            if (newprops.sortKey == newprops.sortKey) {
                sortkey = newprops.sortKey
                sortkeyname = keyTypes[sortkey]
            }

            // combinationsが変更されていないなら古いやつを使う
            if (this.state.previousArmlist != null) {
                var isCombinationChanged = false;
                if (this.state.previousArmlist.length != arml.length) {
                    isCombinationChanged = true;
                }
                if (!isCombinationChanged) {
                    for (var i = 0; i < arml.length; i = (i + 1) | 0) {
                        if (arml[i].considerNumberMax != this.state.previousArmlist[i].considerNumberMax || arml[i].considerNumberMin != this.state.previousArmlist[i].considerNumberMin) {
                            isCombinationChanged = true;
                        }
                        // コスモス武器になったか、コスモス武器じゃなくなったかでコンビネーションが変わる
                        if (isCosmos(arml[i]) != isCosmos(this.state.previousArmlist[i])) {
                            isCombinationChanged = true;
                        }
                    }
                }
                if (isCombinationChanged) {
                    var combinations = calcCombinations(arml)
                    this.setState({ previousArmlist: JSON.parse(JSON.stringify(arml)) })
                    this.setState({ previousCombinations: JSON.parse(JSON.stringify(combinations)) })
                } else {
                    var combinations = this.state.previousCombinations
                }
            } else {
                var combinations = calcCombinations(arml)
                this.setState({ previousArmlist: JSON.parse(JSON.stringify(arml)) })
                this.setState({ previousCombinations: JSON.parse(JSON.stringify(combinations)) })
            }

            var res = []
            var minSortKey = []
            for (var i = 0; i < summon.length; i++) {
                res[i] = []
                minSortKey[i] = -1
            }

            var totals = getInitialTotals(prof, chara, summon)
            treatSupportAbility(totals, chara)
            var itr = combinations.length
            var totalItr = itr * summon.length * Object.keys(totals).length

            // 前処理に必要な値があればここで用意
            var minHP = (prof.minimumHP == undefined) ? undefined : parseInt(prof.minimumHP)

            for (var i = 0; i < itr; i = (i + 1) | 0) {
                var oneres = calcOneCombination(combinations[i], summon, prof, arml, totals, totalBuff)
                for (var j = 0; j < summon.length; j++) {
                    // 各結果に対して前処理
                    if (isValidResult(oneres[j], minHP)) {
                        if (res[j].length < 10) {
                            //  まずminSortkeyを更新する
                            if (minSortKey[j] < 0 || minSortKey[j] > oneres[j].Djeeta[sortkey]) {
                                minSortKey[j] = oneres[j].Djeeta[sortkey]
                            }
                            res[j].push({ data: oneres[j], armNumbers: combinations[i] });
                        } else {
                            // minSortkey より大きいものだけpush
                            if (oneres[j].Djeeta[sortkey] >= minSortKey[j]) {
                                // 11番目に追加する
                                res[j].push({ data: oneres[j], armNumbers: combinations[i] });

                                // 10番目まででminSortkey[j]と一致するものを消す
                                var spliceid = -1;
                                for (var k = 0; k < 10; k = (k + 1) | 0) {
                                    if (res[j][k].data.Djeeta[sortkey] == minSortKey[j]) {
                                        spliceid = k
                                    }
                                }
                                res[j].splice(spliceid, 1)
                                minSortKey[j] = -1

                                // 10個の配列になったので、もう一度最小値を計算する
                                for (var k = 0; k < 10; k = (k + 1) | 0) {
                                    if (minSortKey[j] < 0 || minSortKey[j] > res[j][k].data.Djeeta[sortkey]) {
                                        minSortKey[j] = res[j][k].data.Djeeta[sortkey]
                                    }
                                }
                            }
                        }
                    }
                }
                initializeTotals(totals)
            }
            // この時点で summonres は"各召喚石に対応する結果データの連想配列 を並べた配列"の配列になっているはず

            for (var i = 0; i < summon.length; i++) {
                if (sortkey == "ATKandHP") {
                    res[i].sort(function (a, b) {
                        if ((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) < (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return 1;
                        if ((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) > (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return -1;
                        return 0;
                    });
                } else {
                    res[i].sort(function (a, b) {
                        if (a["data"]["Djeeta"][sortkey] < b["data"]["Djeeta"][sortkey]) return 1;
                        if (a["data"]["Djeeta"][sortkey] > b["data"]["Djeeta"][sortkey]) return -1;
                        return 0;
                    });
                }
                while (res[i].length > 10) { res[i].pop(); }
            }

            return { summon: summon, result: res, sortkeyname: sortkeyname, totalItr: totalItr }
        } else {
            return { summon: summon, result: [] }
        }
    },
    getInitialState: function () {
        return {
            switchTotalAttack: 1,
            switchATKandHP: 0,
            switchHP: 1,
            switchCharaHP: 0,
            switchDATA: 0,
            switchExpectedAttack: 0,
            switchSkillTotal: 0,
            switchCharaExpectedAttack: 0,
            switchCriticalRatio: 0,
            switchCriticalAttack: 0,
            switchCharaAttack: 0,
            switchCharaDA: 0,
            switchCharaTotalExpected: 0,
            switchCharaCycleDamage: 0,
            switchCharaPureDamage: 0,
            switchCharaOugiDamage: 0,
            switchCharaOugiGage: 0,
            switchAverageAttack: 1,
            switchAverageCriticalAttack: 0,
            switchTotalExpected: 0,
            switchAverageTotalExpected: 0,
            switchDamage: 0,
            switchPureDamage: 0,
            switchDamageWithCritical: 0,
            switchDamageWithMultiple: 0,
            switchOugiGage: 0,
            switchOugiDamage: 0,
            switchCycleDamage: 0,
            switchAverageCycleDamage: 1,
            switchDebuffResistance: 0,
            switchChainBurst: 0,
            disableAutoResultUpdate: 0,
            result: { summon: this.props.summon, result: [] },
            chartSortKey: "totalAttack",
            chartData: {},
            storedList: { "combinations": [], "armlist": [], "names": [] },
            openHPChart: false,
            displayRealHP: false,
            openSimulator: false,
            openDisplayElementTable: false,
            openHPChartTutorial: false,
            openShowStoredList: false,
            ChartButtonActive: false,
            previousArmlist: null,
            previousCombinations: null,
        };
    },
    closeHPChart: function () {
        this.setState({ openHPChart: false })
    },
    closeSimulator: function () {
        this.setState({ openSimulator: false })
    },
    closeHPChartTutorial: function () {
        this.setState({ openHPChartTutorial: false })
    },
    openHPChartTutorial: function () {
        this.setState({ openHPChartTutorial: true })
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.disableAutoResultUpdate != 1 && (nextProps.noResultUpdate == undefined || !nextProps.noResultUpdate)) {
            var allresult = this.calculateResult(nextProps);
            this.setState({ result: allresult });
        }

        // armlistが変更されていないかcheck => 変更されてたら今までの分消す
        var isArmValid = true
        for (var i = 0; i < this.state.storedList.combinations.length; i++) {
            if (nextProps.armlist.length != this.state.storedList.armlist[i].length) {
                isArmValid = false
                continue;
            }
            for (var k = 0; k < nextProps.armlist.length; k++) {
                // 名前と攻撃力が同時に変更されていた場合、削除や追加などが起こっていると予想される
                if (nextProps.armlist[k].name != this.state.storedList.armlist[i][k].name && nextProps.armlist[k].attack != this.state.storedList.armlist[i][k].attack) {
                    isArmValid = false
                    break;
                }
            }
        }
        if (!isArmValid) {
            this.setState({ storedList: { "combinations": [], "armlist": [], "names": [] } })
            this.setState({ ChartButtonActive: false })
        }
    },
    handleEvent: function (key, e) {
        var newState = this.state
        newState[key] = (newState[key] == 0) ? 1 : 0

        // 自動更新ONにしたらUPDATEする
        if (key == "disableAutoResultUpdate" && newState[key] == 0) {
            newState["result"] = this.calculateResult(this.props)
        }
        this.setState(newState)
    },
    openHPChart: function (e) {
        var sortkey = "averageCyclePerTurn"
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
        if (this.props.sortKey == this.props.sortKey) {
            sortkey = this.props.sortKey
            sortkeyname = keyTypes[sortkey]
        }
        this.setState({ chartSortKey: sortkey })
        this.setState({ openHPChart: true })
    },
    addHaisuiData: function (id, summonid) {
        var newStored = this.state.storedList
        var newCombinations = this.state.result.result[summonid][id].armNumbers
        newStored["combinations"].push(JSON.parse(JSON.stringify(newCombinations)))
        newStored["armlist"].push(JSON.parse(JSON.stringify(this.props.armlist)))

        var title = "";
        for (var i = 0; i < this.props.armlist.length; i++) {
            if (newCombinations[i] > 0) {
                var name = (this.props.armlist[i].name == "") ? "武器" + i.toString() + "" : this.props.armlist[i].name
                title += name + newCombinations[i] + "本\n"
            }
        }
        newStored["names"].push(title)

        this.setState({ storedList: newStored })
        this.setState({ ChartButtonActive: true })
    },
    openSimulator: function () {
        this.setState({ openSimulator: true })
        this.setState({ chartSortKey: "averageExpectedDamage" })
    },
    switchDisplayRealHP: function (e) {
        this.setState({ displayRealHP: !(this.state.displayRealHP) });
        this.openHPChart(!(this.state.displayRealHP));
    },
    resetStoredList: function (e) {
        this.setState({
            storedList: { "combinations": [], "armlist": [], "names": [] },
            openShowStoredList: false,
            openHPChart: false,
            openSimulator: false,
            ChartButtonActive: false,
        });
    },
    openStoredList: function (e) {
        this.setState({ openShowStoredList: true })
    },
    closeStoredList: function (e) {
        this.setState({ openShowStoredList: false })
    },
    removeOneStoredList: function (e) {
        var targetIndex = parseInt(e.target.id)
        var newCombinations = this.state.storedList.combinations
        newCombinations.splice(targetIndex, 1)
        var newArmList = this.state.storedList.armlist
        newArmList.splice(targetIndex, 1)
        var newNames = this.state.storedList.names
        newNames.splice(targetIndex, 1)

        if (newArmList.length == 0) {
            this.resetStoredList()
        } else {
            this.setState({
                storedList: {
                    "combinations": newCombinations,
                    "armlist": newArmList,
                    "names": newNames,
                },
            });
            if (this.state.openHPChart) {
                this.openHPChart();
            } else if (this.state.openSimulator) {
                this.openSimulator();
            }
        }
    },
    handleStoredListNameChange: function (ind, newName) {
        var newStoredList = this.state.storedList;
        newStoredList.names[ind] = newName
        this.setState({ storedList: newStoredList })
    },
    forceResultUpdate: function () {
        this.setState({ result: this.calculateResult(this.props) })
    },
    openDisplayTable: function () {
        this.setState({ openDisplayElementTable: !this.state.openDisplayElementTable })
    },
    render: function () {
        var locale = this.props.locale

        var res = this.state.result;
        var prof = this.props.profile
        var arm = this.props.armlist
        var chara = this.props.chara
        var summon = this.props.summon

        // テスカトリポカ計算用
        var races = checkNumberofRaces(chara)
        var tesukatoripoka = getTesukatoripokaAmount

        var result = res.result
        var onAddToHaisuiData = this.addHaisuiData

        var switcher = this.state;
        var armnames = []
        for (var i = 0; i < arm.length; i++) {
            if (arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if (armname == '') {
                    armname = intl.translate("武器", locale) + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = []
        if (switcher.switchTotalAttack) {
            tableheader.push(intl.translate("攻撃力(二手技巧無し)", locale))
        }
        if (switcher.switchATKandHP) {
            tableheader.push(intl.translate("戦力", locale))
        }
        if (switcher.switchExpectedAttack) {
            tableheader.push(intl.translate("期待攻撃回数", locale))
        }
        if (switcher.switchCriticalAttack) {
            tableheader.push(intl.translate("技巧期待攻撃力", locale))
        }
        if (switcher.switchCriticalRatio) {
            tableheader.push(intl.translate("技巧期待値", locale))
        }
        if (switcher.switchHP) {
            tableheader.push("HP\n(" + intl.translate("残HP", locale) + ")")
        }
        if (switcher.switchAverageAttack) {
            tableheader.push(intl.translate("パーティ平均攻撃力", locale))
        }
        if (switcher.switchAverageCriticalAttack) {
            tableheader.push(intl.translate("技巧平均攻撃力", locale))
        }
        if (switcher.switchTotalExpected) {
            tableheader.push(intl.translate("総合*回数*技巧", locale))
        }
        if (switcher.switchAverageTotalExpected) {
            tableheader.push(intl.translate("総回技の平均", locale))
        }
        if (switcher.switchPureDamage) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧連撃無)", locale))
        }
        if (switcher.switchDamageWithCritical) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧有)", locale))
        }
        if (switcher.switchDamageWithMultiple) {
            tableheader.push(intl.translate("単攻撃ダメージ(連撃有)", locale))
        }
        if (switcher.switchDamage) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧連撃有)", locale))
        }
        if (switcher.switchOugiGage) {
            tableheader.push(intl.translate("ターン毎の奥義ゲージ上昇量", locale))
        }
        if (switcher.switchOugiDamage) {
            tableheader.push(intl.translate("奥義ダメージ", locale))
        }
        if (switcher.switchChainBurst) {
            tableheader.push(intl.translate("チェインバースト", locale))
        }
        if (switcher.switchCycleDamage) {
            tableheader.push(intl.translate("予想ターン毎ダメージ", locale))
        }
        if (switcher.switchAverageCycleDamage) {
            tableheader.push(intl.translate("パーティ平均予想ターン毎ダメージ", locale) + " (" + intl.translate("四人合計値", locale) + ")")
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name
        var charaInfoStr = intl.translate("ジータさん", locale) + "(" + intl.translate(job, locale) + ") HP";
        if (prof.remainHP != undefined) {
            charaInfoStr += (parseInt(prof.remainHP) < parseInt(prof.hp)) ? prof.remainHP : prof.hp
        } else {
            charaInfoStr += prof.hp
        }
        charaInfoStr += "% (" + intl.translate(getTypeBonusStr(prof.element, prof.enemyElement), locale) + ")"
        var charaInfo = [<span key={0}>{getElementColorLabel(prof.element, locale)}&nbsp;{charaInfoStr}</span>]
        for (var i = 0; i < chara.length; i++) {
            if (chara[i].name != "" && chara[i].isConsideredInAverage) {
                charaInfoStr = chara[i].name + " HP"
                if (chara[i].remainHP != undefined) {
                    charaInfoStr += (parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? chara[i].remainHP : prof.hp
                } else {
                    charaInfoStr += prof.hp
                }
                charaInfoStr += "% (" + intl.translate(getTypeBonusStr(chara[i].element, prof.enemyElement), locale) + ")"
                charaInfo.push(<span key={i + 1}>&nbsp;/&nbsp;{getElementColorLabel(chara[i].element, locale)}&nbsp;{charaInfoStr}</span>);
            }
        }
        var buffInfoStr = intl.translate("通常バフ", locale) + prof.normalBuff + "%, "
        buffInfoStr += intl.translate("属性バフ", locale) + prof.elementBuff + "%, "
        buffInfoStr += intl.translate("その他バフ", locale) + prof.otherBuff + "%, "
        buffInfoStr += intl.translate("DAバフ", locale) + prof.daBuff + "%, "
        buffInfoStr += intl.translate("TAバフ", locale) + prof.taBuff + "%, "
        buffInfoStr += intl.translate("追加ダメージバフ", locale) + ((prof.additionalDamageBuff == undefined) ? "0" : prof.additionalDamageBuff) + "%, "
        buffInfoStr += intl.translate("敵防御固有値", locale) + prof.enemyDefense

        if (_ua.Mobile || _ua.Tablet) {
            var changeSortKey = <FormControl componentClass="select" style={{ "width": "100%", padding: "0" }} value={this.props.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <Button block onClick={this.openDisplayTable}>
                        {intl.translate("表示項目切替", locale)}
                    </Button>
                    <Collapse in={this.state.openDisplayElementTable}>
                        <table style={{ "width": "100%", textAlign: "center", marginBottom: "2px" }} className="table table-bordered"><tbody>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchTotalAttack")} className={(this.state.switchTotalAttack == 1) ? "display-checked" : "display-unchecked"}> 攻撃力(二手技巧無し) </td>
                                <td onClick={this.handleEvent.bind(this, "switchATKandHP")} className={(this.state.switchATKandHP == 1) ? "display-checked" : "display-unchecked"}>戦力</td>
                                <td onClick={this.handleEvent.bind(this, "switchHP")} className={(this.state.switchHP == 1) ? "display-checked" : "display-unchecked"}> HP</td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchDATA")} className={(this.state.switchDATA == 1) ? "display-checked" : "display-unchecked"}> 連続攻撃率</td>
                                <td onClick={this.handleEvent.bind(this, "switchExpectedAttack")} className={(this.state.switchExpectedAttack == 1) ? "display-checked" : "display-unchecked"}> 期待攻撃回数</td>
                                <td onClick={this.handleEvent.bind(this, "switchCriticalRatio")} className={(this.state.switchCriticalRatio == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値</td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchCriticalAttack")} className={(this.state.switchCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値*攻撃力</td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageAttack")} className={(this.state.switchAverageAttack == 1) ? "display-checked" : "display-unchecked"}> パーティ平均攻撃力(二手技巧無し)</td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")} className={(this.state.switchAverageCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧平均攻撃力 </td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchTotalExpected")} className={(this.state.switchTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総合*期待回数*技巧期待値</td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")} className={(this.state.switchAverageTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総回技のパーティ平均値</td>
                                <td onClick={this.handleEvent.bind(this, "switchCycleDamage")} className={(this.state.switchCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージ </td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")} className={(this.state.switchAverageCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージの平均値 </td>
                                <td onClick={this.handleEvent.bind(this, "switchDamage")} className={(this.state.switchDamage == 1) ? "display-checked" : "display-unchecked"}> 単攻撃ダメージ</td>
                                <td onClick={this.handleEvent.bind(this, "switchOugiGage")} className={(this.state.switchOugiGage == 1) ? "display-checked" : "display-unchecked"}> 奥義ゲージ上昇期待値 </td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchOugiDamage")} className={(this.state.switchOugiDamage == 1) ? "display-checked" : "display-unchecked"}> 奥義ダメージ </td>
                                <td onClick={this.handleEvent.bind(this, "switchChainBurst")} className={(this.state.switchChainBurst == 1) ? "display-checked" : "display-unchecked"}> チェインバースト </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaAttack")} className={(this.state.switchCharaAttack == 1) ? "display-checked" : "display-unchecked"}> キャラ攻撃力</td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaHP")} className={(this.state.switchCharaHP == 1) ? "display-checked" : "display-unchecked"}> キャラHP</td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaDA")} className={(this.state.switchCharaDA == 1) ? "display-checked" : "display-unchecked"}> キャラ連続攻撃率</td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} className={(this.state.switchCharaTotalExpected == 1) ? "display-checked" : "display-unchecked"}> キャラ総回技値</td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaCycleDamage")} className={(this.state.switchCharaCycleDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ予想ターン毎ダメージ </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaPureDamage")} className={(this.state.switchCharaPureDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ単攻撃ダメージ</td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaOugiDamage")} className={(this.state.switchCharaOugiDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ奥義ダメージ</td>
                            </tr><tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaOugiGage")} className={(this.state.switchCharaOugiGage == 1) ? "display-checked" : "display-unchecked"}> キャラ奥義ゲージ上昇量</td>
                                <td onClick={this.handleEvent.bind(this, "switchSkillTotal")} className={(this.state.switchSkillTotal == 1) ? "display-checked" : "display-unchecked"}> スキル合計値</td>
                                <td onClick={this.handleEvent.bind(this, "switchDebuffResistance")} className={(this.state.switchDebuffResistance == 1) ? "display-checked" : "display-unchecked"}> 弱体耐性率</td>
                                <td></td>
                            </tr>
                        </tbody></table>
                    </Collapse>
                    <ControlAutoUpdate mobile autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    <hr />
                    <p>{intl.translate("優先項目", locale)}:{changeSortKey}</p>
                    <hr />
                    <Button block bsStyle="success" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >{intl.translate("背水グラフ", locale)}</Button>
                    <hr />
                    {summon.map(function (s, summonindex) {
                        var selfSummonHeader = ""
                        if (s.selfSummonType == "odin") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if (s.friendSummonType == "odin") {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return (
                            <div key={summonindex} className="result">
                                <p> No.{summonindex + 1} </p>
                                <ElementColorLabel element={s.selfElement}>{selfSummonHeader}</ElementColorLabel>
                                <ElementColorLabel element="all">+</ElementColorLabel>
                                <ElementColorLabel element={s.friendElement}>{friendSummonHeader}</ElementColorLabel>
                                <hr style={{ "margin": "10px 0px" }} />
                                <div className="charainfo">
                                    <div>{charaInfo}</div>
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                </div>
                                <table className="table table-bordered">
                                    <thead className="result">
                                        <tr>
                                            <th>{intl.translate("順位", locale)}</th>
                                            {tableheader.map(function (m, ind) { return <th key={ind} >{m}</th>; })}
                                            {
                                                armnames.map(function (m, ind) {
                                                    if (ind == 0) {
                                                        return <th key={ind}>{m}</th>;
                                                    } else {
                                                        return <th key={ind}>{m}</th>;
                                                    }
                                                })
                                            }
                                            <th>{intl.translate("グラフ", locale)}</th>
                                        </tr>
                                    </thead>
                                    <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} locale={locale} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("背水渾身グラフ", locale)}</Modal.Title>
                            <div className="charainfo" style={{ "float": "left" }}>
                                {charaInfo}
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                <span>{buffInfoStr}</span>
                            </div>
                            <ButtonGroup block vertical>
                                <Button bsStyle="info" onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                                <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                {(this.state.displayRealHP) ?
                                    <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("HP割合で表示", locale)}</Button> :
                                    <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("実際のHPで表示", locale)}</Button>
                                }
                            </ButtonGroup>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart
                                chara={chara}
                                prof={prof}
                                armlist={arm}
                                summon={summon}
                                sortKey={this.state.chartSortKey}
                                locale={locale}
                                storedList={this.state.storedList}
                                displayRealHP={this.state.displayRealHP}
                            />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial} />
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList} onHide={this.closeStoredList} storedList={this.state.storedList} removeOneStoredList={this.removeOneStoredList} locale={locale} />
                </div>
            );

        } else {
            var changeSortKey = <FormControl componentClass="select" style={{ "width": "350px" }} value={this.props.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <ControlLabel>{intl.translate("表示項目切替", locale)}</ControlLabel>
                    <ButtonToolbar>
                        <DropdownButton title={intl.translate("攻撃力・HP・連撃率", locale)} id="atk-hp-etcs">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTotalAttack")} active={(this.state.switchTotalAttack == 1) ? true : false}>{intl.translate("攻撃力(二手技巧無し)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchATKandHP")} active={(this.state.switchATKandHP == 1) ? true : false}>{intl.translate("戦力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchHP")} active={(this.state.switchHP == 1) ? true : false}>HP</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDATA")} active={(this.state.switchDATA == 1) ? true : false}>{intl.translate("連撃率", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchExpectedAttack")} active={(this.state.switchExpectedAttack == 1) ? true : false}>{intl.translate("期待攻撃回数", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalRatio")} active={(this.state.switchCriticalRatio == 1) ? true : false}>{intl.translate("技巧期待値", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalAttack")} active={(this.state.switchCriticalAttack == 1) ? true : false}>{intl.translate("技巧期待攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTotalExpected")} active={(this.state.switchTotalExpected == 1) ? true : false}>{intl.translate("総合*回数*技巧", locale)}</MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("パーティ平均攻撃力", locale)} id="party-averafed-atk">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageAttack")} active={(this.state.switchAverageAttack == 1) ? true : false}>{intl.translate("パーティ平均攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")} active={(this.state.switchAverageCriticalAttack == 1) ? true : false}>{intl.translate("技巧平均攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")} active={(this.state.switchAverageTotalExpected == 1) ? true : false}>{intl.translate("総回技の平均", locale)}</MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("予測ダメージ", locale)} id="expected-damage">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCycleDamage")} active={(this.state.switchCycleDamage == 1) ? true : false}> {intl.translate("予想ターン毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")} active={(this.state.switchAverageCycleDamage == 1) ? true : false}> {intl.translate("パーティ平均予想ターン毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchPureDamage")} active={(this.state.switchPureDamage == 1) ? true : false}> {intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamageWithCritical")} active={(this.state.switchDamageWithCritical == 1) ? true : false}> {intl.translate("単攻撃ダメージ(技巧有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamageWithMultiple")} active={(this.state.switchDamageWithMultiple == 1) ? true : false}> {intl.translate("単攻撃ダメージ(連撃有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamage")} active={(this.state.switchDamage == 1) ? true : false}> {intl.translate("単攻撃ダメージ(技巧連撃有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchOugiDamage")} active={(this.state.switchOugiDamage == 1) ? true : false}> {intl.translate("奥義ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchChainBurst")} active={(this.state.switchChainBurst == 1) ? true : false}> {intl.translate("チェインバースト", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchOugiGage")} active={(this.state.switchOugiGage == 1) ? true : false}> {intl.translate("ターン毎の奥義ゲージ上昇量", locale)} </MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("キャラ情報・スキル合計値", locale)} id="chara-and-skill-info">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaAttack")} active={(this.state.switchCharaAttack == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaHP")} active={(this.state.switchCharaHP == 1) ? true : false}>{intl.translate("キャラ", locale)}HP</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaDA")} active={(this.state.switchCharaDA == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("連撃率", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} active={(this.state.switchCharaTotalExpected == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("総回技", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaCycleDamage")} active={(this.state.switchCharaCycleDamage == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("予想ターン毎ダメージ", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaPureDamage")} active={(this.state.switchCharaPureDamage == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaOugiDamage")} active={(this.state.switchCharaOugiDamage == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("奥義ダメージ", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaOugiGage")} active={(this.state.switchCharaOugiDamage == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("ターン毎の奥義ゲージ上昇量", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchSkillTotal")} active={(this.state.switchSkillTotal == 1) ? true : false}>{intl.translate("スキル合計", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDebuffResistance")} active={(this.state.switchDebuffResistance == 1) ? true : false}>{intl.translate("弱体耐性率", locale)}</MenuItem>
                        </DropdownButton>
                        <ControlAutoUpdate autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    </ButtonToolbar>

                    <hr />

                    <ButtonGroup style={{ width: "100%" }}>
                        <Button block style={{ float: "left", width: "50%", margin: "0px" }} bsStyle="success" bsSize="large" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >{intl.translate("背水グラフ", locale)}</Button>
                        <Button block style={{ float: "left", width: "50%", margin: "0px" }} bsStyle="success" bsSize="large" onClick={this.openSimulator} disabled={!this.state.ChartButtonActive} >{intl.translate("ダメージシミュレータを開く", locale)}</Button>
                    </ButtonGroup>

                    <div style={{"width": "1050px"}}>
                        <AdsenseAdvertisement locale={locale} type="pc-1" />
                        <AdsenseAdvertisement locale={locale} type="pc-2" />
                    </div>

                    {summon.map(function (s, summonindex) {
                        var selfSummonHeader = ""
                        if (s.selfSummonType == "odin") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性攻", locale) + s.selfSummonAmount + intl.translate("キャラ攻", locale) + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate(summonTypes[s.selfSummonType], locale) + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if (s.friendSummonType == "odin") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性攻", locale) + s.friendSummonAmount + intl.translate("キャラ攻", locale) + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate(summonTypes[s.friendSummonType], locale) + s.friendSummonAmount
                        }

                        return (
                            <div style={{ textAlign: "left" }} key={summonindex} className="result">
                                <h2> No.{summonindex + 1} </h2>
                                <ElementColorLabel element={s.selfElement}>{selfSummonHeader}</ElementColorLabel>
                                <ElementColorLabel element="all">+</ElementColorLabel>
                                <ElementColorLabel element={s.friendElement}>{friendSummonHeader}</ElementColorLabel>
                                <hr style={{ "margin": "10px 0px 5px 0px" }} />
                                <div className="charainfo" style={{ "float": "left" }}>
                                    {charaInfo}
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                    <span>{buffInfoStr}</span>
                                </div>
                                <div style={{ "textAlign": "right", "float": "right" }}>
                                    <span>{intl.translate("優先項目", locale)}: {changeSortKey}</span>
                                </div>
                                <table className="table table-bordered">
                                    <thead className="result">
                                        <tr>
                                            <th>{intl.translate("順位", locale)}</th>
                                            {tableheader.map(function (m, ind) { return <th key={ind}>{m}</th>; })}
                                            {
                                                armnames.map(function (m, ind) {
                                                    if (ind == 0) {
                                                        return <th key={ind}>{m}</th>;
                                                    } else {
                                                        return <th key={ind}>{m}</th>;
                                                    }
                                                })
                                            }
                                            <th>{intl.translate("グラフ", locale)}</th>
                                        </tr>
                                    </thead>
                                    <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} locale={locale} />
                                </table>
                            </div>
                        );
                    })}
                    <hr />

                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("背水渾身グラフ", locale)}</Modal.Title>
                            <div className="charainfo" style={{ "float": "left" }}>
                                {charaInfo}
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                <span>{buffInfoStr}</span>
                            </div>
                            <div style={{ "float": "right" }}>
                                <Button bsStyle="info" onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                                <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                {(this.state.displayRealHP) ?
                                    <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("HP割合で表示", locale)}</Button> :
                                    <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("実際のHPで表示", locale)}</Button>
                                }
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart
                                chara={chara}
                                prof={prof}
                                armlist={arm}
                                summon={summon}
                                sortKey={this.state.chartSortKey}
                                locale={locale}
                                storedList={this.state.storedList}
                                displayRealHP={this.state.displayRealHP}
                            />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial} />
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openSimulator} onHide={this.closeSimulator}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("ダメージシミュレータ", locale)}</Modal.Title>
                            <div className="charainfo" style={{ "float": "left" }}>
                                {charaInfo}
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                <span>{buffInfoStr}</span>
                            </div>
                            <div style={{ "float": "right" }}>
                                <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <Simulator
                                chara={chara}
                                prof={prof}
                                armlist={arm}
                                summon={summon}
                                dataName={this.props.dataName}
                                dataForLoad={this.props.simulator}
                                locale={locale}
                                onChange={this.props.onChangeSimulationData}
                                storedList={this.state.storedList}
                                sortKey={this.state.chartSortKey}
                            />
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor
                        className="hpChartTutotial"
                        show={this.state.openShowStoredList}
                        onHide={this.closeStoredList}
                        storedList={this.state.storedList}
                        removeOneStoredList={this.removeOneStoredList}
                        locale={locale}
                        handleStoredListNameChange={this.handleStoredListNameChange}
                    />
                </div>
            );
        }
    }
});

var Result = CreateClass({
    onClick: function (e) {
        this.props.onAddToHaisuiData(e.target.id, this.props.summonid)
    },
    render: function () {
        var sw = this.props.switcher;
        var arm = this.props.arm;
        var prof = this.props.prof;
        var onClick = this.onClick;
        var locale = this.props.locale;

        return (
            <tbody className="result">
                {this.props.data.map(function (m, rank) {
                    var colSize = 2;
                    var tablebody = []
                    var charaDetail = {};

                    for (key in m.data) {
                        charaDetail[key] = [];
                        // { "Djeeta": [<p>攻撃力10000, HP15000</p>, <p>通常攻刃15%</p>, <p>DA 100%</p>], }のような連想配列を作る
                    }

                    if (sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                        ++colSize;
                    }
                    if (sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + "\n(" + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                        ++colSize;
                    }

                    if (sw.switchCharaAttack) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-attack"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("攻撃力", locale)}</span> {m.data[key].totalAttack}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchDATA) {
                        charaDetail["Djeeta"].push(
                            <span key={key + "-da"} className="result-chara-detail">
                                <span className="label label-danger">DA</span> {(100.0 * m.data.Djeeta.totalDA).toFixed(1)}%&nbsp;
                                <span className="label label-danger">TA</span> {(100.0 * m.data.Djeeta.totalTA).toFixed(1)}%&nbsp;
                            </span>
                        );
                    }

                    if (sw.switchCharaDA) {
                        for (key in m.data) {
                            // switchDATAが指定されていなかったら全員分
                            // 指定されていたらDjeetaじゃない場合だけ
                            if (!sw.switchDATA || (key != "Djeeta")) {
                                charaDetail[key].push(
                                    <span key={key + "-da"} className="result-chara-detail">
                                        <span className="label label-danger">DA</span> {(100.0 * m.data[key].totalDA).toFixed(1)}%&nbsp;
                                        <span className="label label-danger">TA</span> {(100.0 * m.data[key].totalTA).toFixed(1)}%&nbsp;
                                    </span>
                                );
                            }
                        }
                    }

                    if (sw.switchDebuffResistance) {
                        for (key in m.data) {
                            // 弱体耐性率は%表記のまま扱う
                            charaDetail[key].push(
                                <span key={key + "-debuffResistance"} className="result-chara-detail">
                                    <span className="label label-success">弱体耐性率</span> {parseInt(m.data[key].debuffResistance)}%&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(4) + "\n(" + expectedAttack + ")")
                        ++colSize;
                    }

                    if (sw.switchCriticalAttack) {
                        tablebody.push(m.data.Djeeta.criticalAttack)
                        ++colSize;
                    }

                    if (sw.switchCriticalRatio) {
                        if (getTypeBonus(prof.element, prof.enemyElement) == 1.5 || prof.enemyElement == "non-but-critical") {
                            tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.effectiveCriticalRatio.toFixed(4) + ")")
                            ++colSize;
                        } else {
                            tablebody.push(intl.translate("非有利", locale))
                            ++colSize;
                        }
                    }

                    if (sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "\n(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                        ++colSize;
                    }

                    if (sw.switchCharaHP) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-HP"} className="result-chara-detail">
                                    <span className="label label-success">{intl.translate("残HP", locale)} / HP</span>&nbsp;
                                    {parseInt(m.data[key].totalHP * m.data[key].remainHP)}&nbsp;/&nbsp;{m.data[key].totalHP}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchAverageAttack) {
                        tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                        ++colSize;
                    }

                    if (sw.switchAverageCriticalAttack) {
                        tablebody.push(m.data.Djeeta.averageCriticalAttack)
                        ++colSize;
                    }

                    if (sw.switchTotalExpected) {
                        tablebody.push(m.data.Djeeta.totalExpected)
                        ++colSize;
                    }

                    if (sw.switchCharaTotalExpected) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-PCF"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("総回技", locale)}</span>{m.data[key].totalExpected}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchAverageTotalExpected) {
                        tablebody.push(m.data.Djeeta.averageTotalExpected)
                        ++colSize;
                    }

                    if (sw.switchPureDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.pureDamage))
                        ++colSize;
                    }

                    if (sw.switchCharaPureDamage) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-pure-damage"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</span> {m.data[key].pureDamage.toFixed(0)}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchDamageWithCritical) {
                        tablebody.push(parseInt(m.data.Djeeta.damageWithCritical))
                        ++colSize;
                    }

                    if (sw.switchDamageWithMultiple) {
                        tablebody.push(parseInt(m.data.Djeeta.damageWithMultiple))
                        ++colSize;
                    }

                    if (sw.switchDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.damage))
                        ++colSize;
                    }

                    if (sw.switchOugiGage) {
                        tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn.toFixed(2) + "T)")
                        ++colSize;
                    }

                    if (sw.switchOugiDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.ougiDamage))
                        ++colSize;
                    }

                    if (sw.switchCharaOugiDamage) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-ougi-damage"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("奥義ダメージ", locale)}</span> {m.data[key].ougiDamage.toFixed(0)}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchCharaOugiGage) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-ougi-gage"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("ターン毎の奥義ゲージ上昇量", locale)}</span> {m.data[key].expectedOugiGage.toFixed(2) + "%\n(" + m.data[key].expectedTurn.toFixed(2) + "T)"}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchChainBurst) {
                        tablebody.push(parseInt(m.data.Djeeta.averageChainBurst))
                        ++colSize;
                    }
                    if (sw.switchCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.expectedCycleDamagePerTurn))
                        ++colSize;
                    }

                    if (sw.switchCharaCycleDamage) {
                        for (key in m.data) {
                            charaDetail[key].push(
                                <span key={key + "-cycle-damage"} className="result-chara-detail">
                                    <span className="label label-primary">{intl.translate("予想ターン毎ダメージ", locale)}</span> {m.data[key].expectedCycleDamagePerTurn.toFixed(0)}&nbsp;
                                </span>
                            );
                        }
                    }

                    if (sw.switchAverageCycleDamage) {
                        var val = parseInt(m.data.Djeeta.averageCyclePerTurn)
                        tablebody.push(val.toString() + " (" + (4 * val).toString() + ")")
                        ++colSize;
                    }

                    if (sw.switchSkillTotal) {
                        for (var key in m.data) {
                            var mainSkillInfo = [];
                            var skilldata = m.data[key].skilldata

                            // 攻刃系スキル用
                            var pushSkillInfoElement1 = (skillKey, label, labelType = "primary") => {
                                // 外側のmainSkillInfoとskilldataとlocaleを使う
                                if (skilldata[skillKey] != 1.0) {
                                    mainSkillInfo.push(
                                        <span key={key + "-" + skillKey}>
                                            <span className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                            {(100.0 * (skilldata[skillKey] - 1.0)).toFixed(1)}%&nbsp;
                                        </span>
                                    );
                                }
                            }

                            pushSkillInfoElement1("normal", "通常攻刃", "danger");
                            pushSkillInfoElement1("normalHaisui", "通常背水", "light");
                            pushSkillInfoElement1("normalKonshin", "通常渾身", "success");
                            pushSkillInfoElement1("element", "属性", "primary");
                            pushSkillInfoElement1("magna", "マグナ", "primary");
                            pushSkillInfoElement1("magnaHaisui", "マグナ背水", "light");
                            pushSkillInfoElement1("magnaKonshin", "マグナ渾身", "success");
                            pushSkillInfoElement1("ex", "EX", "primary");
                            pushSkillInfoElement1("exHaisui", "EX背水", "light");
                            pushSkillInfoElement1("charaHaisui", "キャラ背水", "light");
                            pushSkillInfoElement1("hpRatio", "HP増加", "success");
                            pushSkillInfoElement1("other", "その他バフ", "primary");

                            var multipleAttackSkillInfo = [];
                            // 連撃スキル用
                            var pushSkillInfoElement2 = (skillKey, label, labelType = "primary") => {
                                // 外側のskillInfoとskilldataとlocaleを使う
                                if (skilldata[skillKey] != 0.0) {
                                    multipleAttackSkillInfo.push(
                                        <span key={key + "-" + skillKey}>
                                            <span className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                            {skilldata[skillKey].toFixed(1)}%&nbsp;
                                        </span>
                                    );
                                }
                            }

                            pushSkillInfoElement2("normalDA", "DA上昇(通常)", "danger");
                            pushSkillInfoElement2("magnaDA", "DA上昇(マグナ)", "danger");
                            pushSkillInfoElement2("exDA", "DA上昇(EX)", "danger");
                            pushSkillInfoElement2("bahaDA", "DA上昇(バハ)", "danger");
                            pushSkillInfoElement2("cosmosDA", "DA上昇(コスモス)", "danger");
                            pushSkillInfoElement2("otherDA", "DA上昇(その他)", "danger");
                            pushSkillInfoElement2("normalTA", "TA上昇(通常)", "danger");
                            pushSkillInfoElement2("magnaTA", "TA上昇(マグナ)", "danger");
                            pushSkillInfoElement2("bahaTA", "TA上昇(バハ)", "danger");
                            pushSkillInfoElement2("otherTA", "TA上昇(その他)", "danger");

                            var criticalInfo = [];
                            if (Object.keys(skilldata.criticalArray).length > 0) {
                                var sortedKeys = Object.keys(skilldata.criticalArray).sort();
                                criticalInfo.push(
                                    <table key={key + "-criticalInfoTable"} className="table table-bordered" style={{"marginBottom": "0px"}} >
                                        <thead>
                                            <tr>
                                                <th className="bg-success" style={{"fontSize": "10pt"}}>{intl.translate("技巧倍率", locale)}</th>
                                                {sortedKeys.map( function (v, ind) {
                                                    return <th key={ind} className="bg-success" style={{"fontSize": "10pt"}}>{parseFloat(v).toFixed(2)}{intl.translate("倍", locale)}</th>
                                                })}
                                                <th className="bg-success" style={{"fontSize": "10pt"}}>{intl.translate("標準偏差", locale)}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{"fontSize": "10pt"}}>{intl.translate("発生確率", locale)}</td>
                                                {sortedKeys.map( function (v, ind) {
                                                    return (
                                                        <td key={ind} style={{ "fontSize": "10pt" }}>{(100.0 * skilldata.criticalArray[v]).toFixed(3)}%</td>
                                                    )
                                                })}
                                                <td style={{"fontSize": "10pt"}}>
                                                    {calcCriticalDeviation(skilldata.criticalArray).toFixed(3)}&nbsp;
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            }

                            var otherSkillInfo = [];
                            // その他スキル用
                            var pushSkillInfoElement3 = (skillKey, label, labelType = "primary") => {
                                // 外側のskillInfoとskilldataとlocaleを使う
                                if (skilldata[skillKey] != 0.0) {
                                    otherSkillInfo.push(
                                        <span key={key + "-" + skillKey}>
                                            <span className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                            {(100.0 * skilldata[skillKey]).toFixed(1)}%&nbsp;
                                        </span>
                                    );
                                }
                            }
                            pushSkillInfoElement3("additionalDamage", "追加ダメージ", "default");
                            pushSkillInfoElement3("damageUP", "与ダメージ上昇", "default");
                            pushSkillInfoElement3("damageLimit", "ダメージ上限アップ", "default");
                            pushSkillInfoElement3("ougiDamageLimit", "奥義ダメージ上限アップ", "default");
                            pushSkillInfoElement3("ougiDamageUP", "奥義ダメージアップ", "default");

                            charaDetail[key].push( <div key={key + "-mainSkillInfo"} >{mainSkillInfo}</div>);
                            charaDetail[key].push( <div key={key + "-multipleAttackInfo"} >{multipleAttackSkillInfo}</div>);
                            charaDetail[key].push( <div key={key + "-criticalInfo"} style={{"margin": "5px 0px"}}>{criticalInfo}</div>);
                            charaDetail[key].push( <div key={key + "-otherSkillInfo"} >{otherSkillInfo}</div>);
                        }
                    }

                    var res = [
                        <tr className="result" key={rank + 1}>
                            <td>{rank + 1}</td>
                            {tablebody.map(function (am, ind) {
                                return (<td key={ind} >{am}</td>);
                            })}
                            {m.armNumbers.map(function (am, ind) {
                                if (arm[ind].considerNumberMax != 0) {
                                    ++colSize;
                                    if (parseInt(am) > 0) {
                                        return (<td key={ind}><span className="text-info"><strong>{am} {intl.translate("本", locale)}</strong></span></td>);
                                    } else {
                                        return (<td key={ind}><span className="text-muted">{am} {intl.translate("本", locale)}</span></td>);
                                    }
                                }
                            })}
                            <td><Button id={rank} block bsStyle="primary" className="add-graph-button" onClick={onClick}>{intl.translate("追加", locale)}</Button></td>
                        </tr>,
                    ];

                    for (var key in charaDetail) {
                        if (charaDetail[key].length > 0) {
                            res.push(<tr>
                                <td colSpan="3">
                                    <span className="text-info">{key}</span>
                                </td>
                                <td style={{ "textAlign": "left" }} colSpan={colSize - 3}>
                                    {charaDetail[key]}
                                </td>
                            </tr>);
                        }
                    }

                    return res;
                })}
            </tbody>
        );
    }
});

var StoredListEditor = CreateClass({
    handleNameChange: function (e) {
        var newName = e.target.value;
        var ind = e.target.getAttribute("name");
        this.props.handleStoredListNameChange(ind, newName);
    },
    render: function () {
        var locale = this.props.locale
        var combinations = this.props.storedList.combinations
        var armlist = this.props.storedList.armlist
        var names = this.props.storedList.names
        var removeOneStoredList = this.props.removeOneStoredList
        var handleNameChange = this.handleNameChange;

        return (
            <Modal className="storedListEditor" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.translate("保存済みの編成", locale)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>編成名(Optional)</th>
                                    {(armlist.length != 0) ? (armlist[0].map(function(arm, ind){
                                    if(arm.name != "") {
                                        return (<th key={ind}>{arm.name}</th>);
                                    } else {
                                        return (<th key={ind}>{intl.translate("武器", locale)}{ind}</th>);
                                    }
                                })) : ""}
                                <th>{intl.translate("操作", locale)}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {combinations.map(function(v, ind){
                                return (
                                    <tr key={ind}>
                                        <td>{ind}</td>
                                        <TextWithTooltip tooltip={intl.translate("保存済みリスト名説明", locale)} id="tooltip-storedlist-name">
                                            <td><FormControl componentClass="textarea" style={{"width": "100%", "minWidth": "300px", "height": "120px"}} name={ind} value={names[ind]} onChange={handleNameChange}/></td>
                                        </TextWithTooltip>
                                        {v.map(function(num, ind2){
                                            return (<td key={ind2}>{num}{intl.translate("本", locale)}</td>)
                                        })}
                                        <td><Button id={ind} onClick={removeOneStoredList} bsStyle="primary">{intl.translate("削除", locale)}</Button></td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        )
    },
});

var ControlAutoUpdate = CreateClass({
    render: function() {
        var locale = this.props.locale;
        var gstyle = (this.props.mobile) ? {"width": "100%"} : {}
        var style = (this.props.mobile) ? {"width": "50%"} : {}
        if(this.props.autoupdate) {
            return (
                <ButtonGroup style={gstyle} >
                <Button bsStyle="primary" style={style} onClick={this.props.forceResultUpdate}>{intl.translate("結果を更新", locale)}</Button>
                <Button bsStyle="danger" style={style} onClick={this.props.switchAutoUpdate} >{intl.translate("自動更新: OFF", locale)}</Button>
                </ButtonGroup>
            )
        } else {
            return (
                <ButtonGroup style={gstyle}>
                <Button bsStyle="primary" style={style} disabled onClick={this.props.forceResultUpdate}>{intl.translate("結果を更新", locale)}</Button>
                <Button bsStyle="primary" style={style} onClick={this.props.switchAutoUpdate} >{intl.translate("自動更新: ON", locale)}</Button>
                </ButtonGroup>)
        }
    },
});

module.exports.ResultList = ResultList
module.exports.Result = Result
module.exports.StoredListEditor = StoredListEditor;
module.exports.ControlAutoUpdate = ControlAutoUpdate
