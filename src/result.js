var React = require('react');
var {Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, Collapse, DropdownButton, MenuItem, FormControl, Checkbox, Modal, Image, Popover, ProgressBar} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var Simulator = require('./simulator.js');
var {HPChart} = require('./chart.js');
var {AdsenseAdvertisement} = require('./advertisement.js');
var intl = require('./translate.js');
var {HPChartHowTo} = require('./howto.js');
var supplemental = require('./supplemental.js');
var GlobalConst = require('./global_const.js');

var TextWithTooltip = GlobalConst.TextWithTooltip;
var ElementColorLabel = GlobalConst.ElementColorLabel;
var elementRelation = GlobalConst.elementRelation;
var bahamutRelation = GlobalConst.bahamutRelation;
var bahamutFURelation = GlobalConst.bahamutFURelation;
var supportAbilities = GlobalConst.supportAbilities;
var selector = GlobalConst.selector;
var zenith = GlobalConst.zenith;
var Jobs = GlobalConst.Jobs;
var armTypes = GlobalConst.armTypes;
var jobTypes = GlobalConst.jobTypes;
var keyTypes = GlobalConst.keyTypes;
var skilltypes = GlobalConst.skilltypes;
var skillAmounts = GlobalConst.skillAmounts;
var elementTypes = GlobalConst.elementTypes;
var summonTypes = GlobalConst.summonTypes;
var summonElementTypes = GlobalConst.summonElementTypes;
var raceTypes = GlobalConst.raceTypes;
var sexTypes = GlobalConst.sexTypes;
var filterElementTypes = GlobalConst.filterElementTypes;
var enemyDefenseType = GlobalConst.enemyDefenseType;
var _ua = GlobalConst._ua;
var getElementColorLabel = GlobalConst.getElementColorLabel;

var {checkNumberOfRaces, getTesukatoripokaAmount, getTypeBonus, getTypeBonusStr, calcCriticalDeviation} = require('./global_logic.js');
const ResultWorker = require('worker-loader!./calculate_result_worker.js');

var ResultList = CreateClass({
    calculateResult: function ({profile, armlist, summon, chara, sortKey}) {
        let worker;
        const {previousArmlist, previousCombinations} = this.state;
        this.setState({
            calculatingResult: true
        });
        if (typeof (worker) == "undefined") {
            worker = new ResultWorker();
        }
        worker.onmessage = ({data: {result, previousArmlist, previousCombinations}}) => {
            this.setState({
                result,
                previousArmlist: previousArmlist || this.state.previousArmlist,
                previousCombinations: previousCombinations || this.state.previousCombinations,
                calculatingResult: false
            });
            worker.terminate();
            worker = undefined;
        };
        worker.postMessage({profile, armlist, summon, chara, sortKey, previousArmlist, previousCombinations});
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
            switchCharaTimeDamage: 0,
            switchCharaPureDamage: 0,
            switchCharaOugiDamage: 0,
            switchCharaLimitValues: 0,
            switchCharaOugiGage: 0,
            switchCharaLockout: 0,
            switchAverageAttack: 1,
            switchAverageCriticalAttack: 0,
            switchTotalExpected: 0,
            switchAverageTotalExpected: 0,
            switchDamage: 0,
            switchPureDamage: 0,
            switchDamageWithCritical: 0,
            switchDamageWithMultiple: 0,
            switchOugiGage: 0,
            switchLockout: 0,
            switchOugiDamage: 0,
            switchCycleDamage: 0,
            switchTimeDamage: 0,
            switchAverageCycleDamage: 1,
            switchAverageTimeDamage: 0,
            switchDebuffResistance: 0,
            switchChainBurst: 0,
            switchTotalOugiDamageWithChain: 0,
            disableAutoResultUpdate: 0,
            result: {summon: this.props.summon, result: []},
            chartSortKey: "totalAttack",
            chartData: {},
            storedList: {"combinations": [], "armlist": [], "names": []},
            openHPChart: false,
            displayRealHP: false,
            openSimulator: false,
            openDisplayElementTable: false,
            openHPChartTutorial: false,
            openShowStoredList: false,
            ChartButtonActive: false,
            previousArmlist: null,
            previousCombinations: null,
            ruleMaxSize: true,
            filterOptionsChanged: false,
            calculatingResult: false
        };
    },
    closeHPChart: function () {
        this.setState({openHPChart: false})
    },
    closeSimulator: function () {
        this.setState({openSimulator: false})
    },
    closeHPChartTutorial: function () {
        this.setState({openHPChartTutorial: false})
    },
    openHPChartTutorial: function () {
        this.setState({openHPChartTutorial: true})
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.state.disableAutoResultUpdate != 1 && (nextProps.noResultUpdate == undefined || !nextProps.noResultUpdate)) {
            this.calculateResult(nextProps);
        }

        // Whether armlist has not been changed check => If changed, erase until now
        var isArmValid = true;
        for (var i = 0; i < this.state.storedList.combinations.length; i++) {
            if (nextProps.armlist.length != this.state.storedList.armlist[i].length) {
                isArmValid = false;
                continue;
            }
            for (var k = 0; k < nextProps.armlist.length; k++) {
                // If name and attack power were changed at the same time, it is expected that deletion, addition, etc. are occurring
                if (nextProps.armlist[k].name != this.state.storedList.armlist[i][k].name && nextProps.armlist[k].attack != this.state.storedList.armlist[i][k].attack) {
                    isArmValid = false;
                    break;
                }
            }
        }
        if (!isArmValid) {
            this.setState({storedList: {"combinations": [], "armlist": [], "names": []}});
            this.setState({ChartButtonActive: false})
        }
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = (newState[key] == 0) ? 1 : 0;

        this.setState(newState)
        // UPDATE after automatic update ON
        if (key == "disableAutoResultUpdate" && newState[key] == 0) {
            this.calculateResult(this.props);
        }
    },
    openHPChart: function (e) {
        var sortkey = "averageCyclePerTurn";
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値";
        if (this.props.sortKey == this.props.sortKey) {
            sortkey = this.props.sortKey;
            sortkeyname = keyTypes[sortkey]
        }
        this.setState({chartSortKey: sortkey});
        this.setState({openHPChart: true})
    },
    addHaisuiData: function (id, summonid) {
        var locale = this.props.locale;
        var newStored = this.state.storedList;
        var newCombinations = this.state.result.result[summonid][id].armNumbers;
        newStored["combinations"].push(JSON.parse(JSON.stringify(newCombinations)));
        newStored["armlist"].push(JSON.parse(JSON.stringify(this.props.armlist)));

        var title = "";
        for (var i = 0; i < this.props.armlist.length; i++) {
            if (newCombinations[i] > 0) {
                var name = (this.props.armlist[i].name == "") ? intl.translate("武器", locale) + i.toString() + " " : this.props.armlist[i].name;
                title += name + newCombinations[i] + intl.translate("本", locale) + "\n"
            }
        }
        newStored["names"].push(title);

        this.setState({storedList: newStored});
        this.setState({ChartButtonActive: true})
    },
    openSimulator: function () {
        this.setState({openSimulator: true});
        this.setState({chartSortKey: "averageExpectedDamage"})
    },
    switchDisplayRealHP: function (e) {
        this.setState({displayRealHP: !(this.state.displayRealHP)});
        this.openHPChart(!(this.state.displayRealHP));
    },
    resetStoredList: function (e) {
        this.setState({
            storedList: {"combinations": [], "armlist": [], "names": []},
            openShowStoredList: false,
            openHPChart: false,
            openSimulator: false,
            ChartButtonActive: false,
        });
    },
    openStoredList: function (e) {
        this.setState({openShowStoredList: true})
    },
    closeStoredList: function (e) {
        this.setState({openShowStoredList: false})
    },
    removeOneStoredList: function (e) {
        var targetIndex = parseInt(e.target.id);
        var newCombinations = this.state.storedList.combinations;
        newCombinations.splice(targetIndex, 1);
        var newArmList = this.state.storedList.armlist;
        newArmList.splice(targetIndex, 1);
        var newNames = this.state.storedList.names;
        newNames.splice(targetIndex, 1);

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
        newStoredList.names[ind] = newName;
        this.setState({storedList: newStoredList})
    },
    forceResultUpdate: function () {
        this.calculateResult(this.props);
    },
    openDisplayTable: function () {
        this.setState({openDisplayElementTable: !this.state.openDisplayElementTable})
    },
    render: function () {
        var locale = this.props.locale;

        var res = this.state.result;
        var prof = this.props.profile;
        var arm = this.props.armlist;
        var chara = this.props.chara;
        var summon = this.props.summon;

        // For Tezcatlipoca calculation
        var races = checkNumberOfRaces(chara);
        var tesukatoripoka = getTesukatoripokaAmount;

        var result = res.result;
        var onAddToHaisuiData = this.addHaisuiData;

        var switcher = this.state;
        var armnames = [];
        for (var i = 0; i < arm.length; i++) {
            if (arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if (armname == '') {
                    armname = intl.translate("武器", locale) + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = [];
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
        if (switcher.switchLockout) {
            tableheader.push(intl.translate("予想ターン毎の硬直", locale))
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
        if (switcher.switchTotalOugiDamageWithChain) {
            tableheader.push(intl.translate("奥義+チェンバダメージ", locale))
        }
        if (switcher.switchCycleDamage) {
            tableheader.push(intl.translate("予想ターン毎ダメージ", locale))
        }
        if (switcher.switchTimeDamage) {
            tableheader.push(intl.translate("予想秒毎ダメージ", locale))
        }
        if (switcher.switchAverageCycleDamage) {
            tableheader.push(intl.translate("パーティ平均予想ターン毎ダメージ", locale) + " (" + intl.translate("四人合計値", locale) + ")")
        }
        if (switcher.switchAverageTimeDamage) {
            tableheader.push(intl.translate("パーティ平均予想秒毎ダメージ", locale) + " (" + intl.translate("四人合計値", locale) + ")")
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name;
        var charaInfoStr = intl.translate("ジータさん", locale) + "(" + intl.translate(job, locale) + ") HP";
        if (prof.remainHP != undefined) {
            charaInfoStr += Math.min(parseInt(prof.remainHP), parseInt(prof.hp)) || "1";
        } else {
            charaInfoStr += prof.hp == 0 ? "1" : prof.hp;
        }
        charaInfoStr += prof.remainHP == 0 || prof.hp == 0 ? " " : "% ";
        charaInfoStr += "(" + intl.translate(getTypeBonusStr(prof.element, prof.enemyElement), locale) + ")";
        var charaInfo = [<span key={0}>{getElementColorLabel(prof.element, locale)}&nbsp;{charaInfoStr}</span>];
        for (var i = 0; i < chara.length; i++) {
            if (chara[i].name != "" && chara[i].isConsideredInAverage) {
                charaInfoStr = chara[i].name + (chara[i].plusBonus > 0 ? "+" + chara[i].plusBonus : "") + " HP";
                if (chara[i].remainHP != undefined) {
                    charaInfoStr += Math.min(parseInt(chara[i].remainHP), parseInt(prof.hp)) || "1";
                } else {
                    charaInfoStr += prof.hp == 0 ? "1" : prof.hp;
                }
                charaInfoStr += prof.remainHP == 0 || chara[i].remainHP == 0 ? " " : "% ";
                charaInfoStr += "(" + intl.translate(getTypeBonusStr(chara[i].element, prof.enemyElement), locale) + ")";
                charaInfo.push(<span
                    key={i + 1}>&nbsp;/&nbsp;{getElementColorLabel(chara[i].element, locale)}&nbsp;{charaInfoStr}</span>);
            }
        }

        var addPercent = (value) => intl.translate("percent", locale).replace("{}", value === undefined ? "0" : value);

        // Create buff info line
        var buffInfo = [];
        buffInfo.push(intl.translate("通常バフ", locale) + addPercent(prof.normalBuff));
        buffInfo.push(intl.translate("属性バフ", locale) + addPercent(prof.elementBuff));
        buffInfo.push(intl.translate("その他バフ", locale) + addPercent(prof.otherBuff));
        buffInfo.push(intl.translate("DAバフ", locale) + addPercent(prof.daBuff));
        buffInfo.push(intl.translate("TAバフ", locale) + addPercent(prof.taBuff));
        buffInfo.push(intl.translate("追加ダメージバフ", locale) + addPercent(prof.additionalDamageBuff));
        buffInfo.push(intl.translate("烈日の楽園", locale) + (prof.retsujitsuNoRakuen ? intl.translate("アクティブ", locale) : intl.translate("無効", locale)));
        buffInfo.push(intl.translate("死ト愛ノ世界", locale) + (prof.shiToAiNoSekai ? intl.translate("アクティブ", locale) : intl.translate("無効", locale)));
        var buffInfoStr = buffInfo.join(", ");

        // Enemy info line
        var enemyInfo = [];
        enemyInfo.push(intl.translate("敵防御固有値", locale) + (prof.enemyDefense === undefined ? "0" : prof.enemyDefense));
        enemyInfo.push(intl.translate("防御デバフ合計", locale) + addPercent(prof.defenseDebuff));
        enemyInfo.push(intl.translate("敵非有利耐性", locale) + addPercent(Math.max(0, Math.min(100, parseInt(prof.enemyResistance)))));
        var enemyInfoStr = enemyInfo.join(", ");

        if (_ua.Mobile || _ua.Tablet) {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "100%", padding: "0"}}
                                             value={this.props.sortKey}
                                             onChange={this.props.onChangeSortkey}> {selector[locale].ktypes} </FormControl>;
            return (
                <div className="resultList">
                    <Button block onClick={this.openDisplayTable}>
                        {intl.translate("表示項目切替", locale)}
                    </Button>
                    <Collapse in={this.state.openDisplayElementTable}>
                        <table style={{"width": "100%", textAlign: "center", marginBottom: "2px"}}
                               className="table table-bordered">
                            <tbody>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchTotalAttack")}
                                    className={(this.state.switchTotalAttack == 1) ? "display-checked" : "display-unchecked"}> 攻撃力(二手技巧無し)
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchATKandHP")}
                                    className={(this.state.switchATKandHP == 1) ? "display-checked" : "display-unchecked"}>戦力
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchHP")}
                                    className={(this.state.switchHP == 1) ? "display-checked" : "display-unchecked"}> HP
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchDATA")}
                                    className={(this.state.switchDATA == 1) ? "display-checked" : "display-unchecked"}> 連続攻撃率
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchExpectedAttack")}
                                    className={(this.state.switchExpectedAttack == 1) ? "display-checked" : "display-unchecked"}> 期待攻撃回数
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCriticalRatio")}
                                    className={(this.state.switchCriticalRatio == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchCriticalAttack")}
                                    className={(this.state.switchCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値*攻撃力
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageAttack")}
                                    className={(this.state.switchAverageAttack == 1) ? "display-checked" : "display-unchecked"}> パーティ平均攻撃力(二手技巧無し)
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")}
                                    className={(this.state.switchAverageCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧平均攻撃力
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchTotalExpected")}
                                    className={(this.state.switchTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総合*期待回数*技巧期待値
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")}
                                    className={(this.state.switchAverageTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総回技のパーティ平均値
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCycleDamage")}
                                    className={(this.state.switchCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchTimeDamage")}
                                    className={(this.state.switchTimeDamage == 1) ? "display-checked" : "display-unchecked"}> 予想秒毎ダメージ
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")}
                                    className={(this.state.switchAverageCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージの平均値
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchAverageTimeDamage")}
                                    className={(this.state.switchAverageTimeDamage == 1) ? "display-checked" : "display-unchecked"}> 予想秒毎ダメージの平均値
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchDamage")}
                                    className={(this.state.switchDamage == 1) ? "display-checked" : "display-unchecked"}> 単攻撃ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchLockout")}
                                    className={(this.state.switchLockout == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎の硬直
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchOugiGage")}
                                    className={(this.state.switchOugiGage == 1) ? "display-checked" : "display-unchecked"}> 奥義ゲージ上昇期待値
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchOugiDamage")}
                                    className={(this.state.switchOugiDamage == 1) ? "display-checked" : "display-unchecked"}> 奥義ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchChainBurst")}
                                    className={(this.state.switchChainBurst == 1) ? "display-checked" : "display-unchecked"}> チェインバースト
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchTotalOugiDamageWithChain")}
                                    className={(this.state.switchTotalOugiDamageWithChain == 1) ? "display-checked" : "display-unchecked"}> 奥義+チェンバダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaAttack")}
                                    className={(this.state.switchCharaAttack == 1) ? "display-checked" : "display-unchecked"}> キャラ攻撃力
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaHP")}
                                    className={(this.state.switchCharaHP == 1) ? "display-checked" : "display-unchecked"}> キャラHP
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaDA")}
                                    className={(this.state.switchCharaDA == 1) ? "display-checked" : "display-unchecked"}> キャラ連続攻撃率
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")}
                                    className={(this.state.switchCharaTotalExpected == 1) ? "display-checked" : "display-unchecked"}> キャラ総回技値
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaCycleDamage")}
                                    className={(this.state.switchCharaCycleDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ予想ターン毎ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaTimeDamage")}
                                    className={(this.state.switchCharaTimeDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ予想秒毎ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaPureDamage")}
                                    className={(this.state.switchCharaPureDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ単攻撃ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaOugiDamage")}
                                    className={(this.state.switchCharaOugiDamage == 1) ? "display-checked" : "display-unchecked"}> キャラ奥義ダメージ
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaLimitValues")}
                                    className={(this.state.switchCharaLimitValues == 1) ? "display-checked" : "display-unchecked"}> キャラ実質ダメージ上限
                                </td>
                            </tr>
                            <tr>
                                <td onClick={this.handleEvent.bind(this, "switchCharaLockout")}
                                    className={(this.state.switchCharaLockout == 1) ? "display-checked" : "display-unchecked"}> キャラ予想ターン毎の硬直
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchCharaOugiGage")}
                                    className={(this.state.switchCharaOugiGage == 1) ? "display-checked" : "display-unchecked"}> キャラ奥義ゲージ上昇量
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchSkillTotal")}
                                    className={(this.state.switchSkillTotal == 1) ? "display-checked" : "display-unchecked"}> スキル合計値
                                </td>
                                <td onClick={this.handleEvent.bind(this, "switchDebuffResistance")}
                                    className={(this.state.switchDebuffResistance == 1) ? "display-checked" : "display-unchecked"}> 弱体耐性率
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </Collapse>
                    <ControlAutoUpdate mobile autoupdate={this.state.disableAutoResultUpdate}
                                       switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")}
                                       forceResultUpdate={this.forceResultUpdate} locale={locale}/>
                    <hr/>
                    <p>{intl.translate("優先項目", locale)}:{changeSortKey}</p>
                    <hr/>
                    <Button block bsStyle="success" onClick={this.openHPChart}
                            disabled={!this.state.ChartButtonActive}>{intl.translate("背水グラフ", locale)}</Button>
                    <hr/>
                    {summon.map(function (s, summonindex) {
                        var selfSummonHeader = "";
                        if (s.selfSummonType == "odin") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = "";
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
                                <hr style={{"margin": "10px 0px"}}/>
                                <div className="charainfo">
                                    {charaInfo}
                                    <div>{intl.translate("パーティ全体バフ", locale)}: {buffInfoStr}</div>
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵", locale)} ({enemyInfoStr})</div>
                                </div>
                                <table className="table table-bordered">
                                    <thead className="result">
                                    <tr>
                                        <th>{intl.translate("順位", locale)}</th>
                                        {tableheader.map(function (m, ind) {
                                            return <th key={ind}>{m}</th>;
                                        })}
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
                                    <Result key={summonindex} summonid={summonindex} data={result[summonindex]}
                                            switcher={switcher} arm={arm} prof={prof}
                                            onAddToHaisuiData={onAddToHaisuiData} locale={locale}/>
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("背水渾身グラフ", locale)}</Modal.Title>
                            <div className="charainfo" style={{"float": "left"}}>
                                {charaInfo}
                                <div>{intl.translate("パーティ全体バフ", locale)}: {buffInfoStr}</div>
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵", locale)} ({enemyInfoStr})</div>
                            </div>
                            <ButtonGroup block vertical>
                                <Button bsStyle="info"
                                        onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                                <Button bsStyle="primary"
                                        onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger"
                                        onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                {(this.state.displayRealHP) ?
                                    <Button bsStyle="default"
                                            onClick={this.switchDisplayRealHP}>{intl.translate("HP割合で表示", locale)}</Button> :
                                    <Button bsStyle="default"
                                            onClick={this.switchDisplayRealHP}>{intl.translate("実際のHPで表示", locale)}</Button>
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
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList}
                                      onHide={this.closeStoredList} storedList={this.state.storedList}
                                      removeOneStoredList={this.removeOneStoredList} locale={locale}/>
                </div>
            );

        } else {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "350px"}}
                                             value={this.props.sortKey}
                                             onChange={this.props.onChangeSortkey}> {selector[locale].ktypes} </FormControl>;
            return (
                <div className="resultList">
                    <ControlLabel>{intl.translate("表示項目切替", locale)}</ControlLabel>
                    <ButtonToolbar>
                        <DropdownButton title={intl.translate("攻撃力・HP・連撃率", locale)} id="atk-hp-etcs">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTotalAttack")}
                                      active={(this.state.switchTotalAttack == 1)}>{intl.translate("攻撃力(二手技巧無し)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchATKandHP")}
                                      active={(this.state.switchATKandHP == 1)}>{intl.translate("戦力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchHP")}
                                      active={(this.state.switchHP == 1)}>HP</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDATA")}
                                      active={(this.state.switchDATA == 1)}>{intl.translate("連撃率", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchExpectedAttack")}
                                      active={(this.state.switchExpectedAttack == 1)}>{intl.translate("期待攻撃回数", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalRatio")}
                                      active={(this.state.switchCriticalRatio == 1)}>{intl.translate("技巧期待値", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalAttack")}
                                      active={(this.state.switchCriticalAttack == 1)}>{intl.translate("技巧期待攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTotalExpected")}
                                      active={(this.state.switchTotalExpected == 1)}>{intl.translate("総合*回数*技巧", locale)}</MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("パーティ平均攻撃力", locale)} id="party-averafed-atk">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageAttack")}
                                      active={(this.state.switchAverageAttack == 1)}>{intl.translate("パーティ平均攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")}
                                      active={(this.state.switchAverageCriticalAttack == 1)}>{intl.translate("技巧平均攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")}
                                      active={(this.state.switchAverageTotalExpected == 1)}>{intl.translate("総回技の平均", locale)}</MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("予測ダメージ", locale)} id="expected-damage">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCycleDamage")}
                                      active={(this.state.switchCycleDamage == 1)}> {intl.translate("予想ターン毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTimeDamage")}
                                      active={(this.state.switchTimeDamage == 1)}> {intl.translate("予想秒毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")}
                                      active={(this.state.switchAverageCycleDamage == 1)}> {intl.translate("パーティ平均予想ターン毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchAverageTimeDamage")}
                                      active={(this.state.switchAverageTimeDamage == 1)}> {intl.translate("パーティ平均予想秒毎ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchPureDamage")}
                                      active={(this.state.switchPureDamage == 1)}> {intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamageWithCritical")}
                                      active={(this.state.switchDamageWithCritical == 1)}> {intl.translate("単攻撃ダメージ(技巧有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamageWithMultiple")}
                                      active={(this.state.switchDamageWithMultiple == 1)}> {intl.translate("単攻撃ダメージ(連撃有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDamage")}
                                      active={(this.state.switchDamage == 1)}> {intl.translate("単攻撃ダメージ(技巧連撃有)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchOugiDamage")}
                                      active={(this.state.switchOugiDamage == 1)}> {intl.translate("奥義ダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchChainBurst")}
                                      active={(this.state.switchChainBurst == 1)}> {intl.translate("チェインバースト", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchTotalOugiDamageWithChain")}
                                      active={(this.state.switchTotalOugiDamageWithChain == 1)}> {intl.translate("奥義+チェンバダメージ", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchLockout")}
                                      active={(this.state.switchLockout == 1)}> {intl.translate("予想ターン毎の硬直", locale)} </MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchOugiGage")}
                                      active={(this.state.switchOugiGage == 1)}> {intl.translate("ターン毎の奥義ゲージ上昇量", locale)} </MenuItem>
                        </DropdownButton>

                        <DropdownButton title={intl.translate("キャラ情報・スキル合計値", locale)} id="chara-and-skill-info">
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaAttack")}
                                      active={(this.state.switchCharaAttack == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("攻撃力", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaHP")}
                                      active={(this.state.switchCharaHP == 1)}>{intl.translate("キャラ(result)", locale)}HP</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaDA")}
                                      active={(this.state.switchCharaDA == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("連撃率", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")}
                                      active={(this.state.switchCharaTotalExpected == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("総回技", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaCycleDamage")}
                                      active={(this.state.switchCharaCycleDamage == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("予想ターン毎ダメージ", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaTimeDamage")}
                                      active={(this.state.switchCharaTimeDamage == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("予想秒毎ダメージ", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaPureDamage")}
                                      active={(this.state.switchCharaPureDamage == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaOugiDamage")}
                                      active={(this.state.switchCharaOugiDamage == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("奥義ダメージ", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaLimitValues")}
                                      active={(this.state.switchCharaLimitValues == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("実質ダメージ上限", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaLockout")}
                                      active={(this.state.switchCharaLockout == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("予想ターン毎の硬直", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchCharaOugiGage")}
                                      active={(this.state.switchCharaOugiGage == 1)}>{intl.translate("キャラ(result)", locale)}{intl.translate("ターン毎の奥義ゲージ上昇量", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchSkillTotal")}
                                      active={(this.state.switchSkillTotal == 1)}>{intl.translate("スキル合計", locale)}</MenuItem>
                            <MenuItem onClick={this.handleEvent.bind(this, "switchDebuffResistance")}
                                      active={(this.state.switchDebuffResistance == 1)}>{intl.translate("弱体耐性率", locale)}</MenuItem>
                        </DropdownButton>
                        <ControlAutoUpdate autoupdate={this.state.disableAutoResultUpdate}
                                           switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")}
                                           forceResultUpdate={this.forceResultUpdate} locale={locale}/>
                    </ButtonToolbar>

                    <hr/>

                    <ButtonGroup style={{width: "100%"}}>
                        <Button block style={{float: "left", width: "50%", margin: "0px"}} bsStyle="success"
                                bsSize="large" onClick={this.openHPChart}
                                disabled={!this.state.ChartButtonActive}>{intl.translate("背水グラフ", locale)}</Button>
                        <Button block style={{float: "left", width: "50%", margin: "0px"}} bsStyle="success"
                                bsSize="large" onClick={this.openSimulator}
                                disabled={!this.state.ChartButtonActive}>{intl.translate("ダメージシミュレータを開く", locale)}</Button>
                    </ButtonGroup>

                    <div style={{"width": "1050px"}}>
                        <AdsenseAdvertisement locale={locale} type="pc-1"/>
                        <AdsenseAdvertisement locale={locale} type="pc-2"/>
                    </div>

                    {summon.map((s, summonindex) => {
                        var selfSummonHeader = "";
                        if (s.selfSummonType == "odin") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性攻", locale) + s.selfSummonAmount + intl.translate("キャラ攻", locale) + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate(summonTypes[s.selfSummonType], locale) + s.selfSummonAmount
                        }

                        var friendSummonHeader = "";
                        if (s.friendSummonType == "odin") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性攻", locale) + s.friendSummonAmount + intl.translate("キャラ攻", locale) + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate(summonTypes[s.friendSummonType], locale) + s.friendSummonAmount
                        }

                        return (
                            <div style={{textAlign: "left"}} key={summonindex} className="result">
                                <h2> No.{summonindex + 1} </h2>
                                <ElementColorLabel element={s.selfElement}>{selfSummonHeader}</ElementColorLabel>
                                <ElementColorLabel element="all">+</ElementColorLabel>
                                <ElementColorLabel element={s.friendElement}>{friendSummonHeader}</ElementColorLabel>
                                <hr style={{"margin": "10px 0px 5px 0px"}}/>
                                <div className="charainfo" style={{"float": "left"}}>
                                    {charaInfo}
                                    <div>{intl.translate("パーティ全体バフ", locale)}: {buffInfoStr}</div>
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵", locale)} ({enemyInfoStr})</div>
                                </div>
                                <div style={{"textAlign": "right", "float": "right"}}>
                                    <span>{intl.translate("優先項目", locale)}: {changeSortKey}</span>
                                </div>
                                <table className="table table-bordered">
                                    <thead className="result">
                                    <tr>
                                        <th>{intl.translate("順位", locale)}</th>
                                        {tableheader.map(function (m, ind) {
                                            return <th key={ind}>{m}</th>;
                                        })}
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
                                    <Result key={summonindex} summonid={summonindex} data={result[summonindex]}
                                            switcher={switcher} arm={arm} prof={prof}
                                            onAddToHaisuiData={onAddToHaisuiData} locale={locale}
                                            calculating={this.state.calculatingResult}
                                    />
                                </table>
                            </div>
                        );
                    })}
                    <hr/>

                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("背水渾身グラフ", locale)}</Modal.Title>
                            <div className="charainfo" style={{"float": "left"}}>
                                {charaInfo}
                                <div>{intl.translate("パーティ全体バフ", locale)}: {buffInfoStr}</div>
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵", locale)} ({enemyInfoStr})</div>
                            </div>
                            <div style={{"float": "right"}}>
                                <Button bsStyle="info"
                                        onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                                <Button bsStyle="primary"
                                        onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger"
                                        onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                {(this.state.displayRealHP) ?
                                    <Button bsStyle="default"
                                            onClick={this.switchDisplayRealHP}>{intl.translate("HP割合で表示", locale)}</Button> :
                                    <Button bsStyle="default"
                                            onClick={this.switchDisplayRealHP}>{intl.translate("実際のHPで表示", locale)}</Button>
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
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openSimulator} onHide={this.closeSimulator}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("ダメージシミュレータ", locale)}</Modal.Title>
                            <div className="charainfo" style={{"float": "left"}}>
                                {charaInfo}
                                <div>{intl.translate("パーティ全体バフ", locale)}: {buffInfoStr}</div>
                                <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵", locale)} ({enemyInfoStr})</div>
                            </div>
                            <div style={{"float": "right"}}>
                                <Button bsStyle="primary"
                                        onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                <Button bsStyle="danger"
                                        onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
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
        const formatCommaSeparatedNumber = num => String(Math.round(num)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

        if (this.props.calculating) {
            return (
                <tbody className="result">
                <tr>
                    <td colSpan="999">
                        <ProgressBar active now={100}/>
                    </td>
                </tr>
                </tbody>
            );
        }

        return (
            <tbody className="result">
            {(this.props.data || []).map(function (m, rank) {
                var colSize = 2;
                var tablebody = [];
                var charaDetail = {};

                for (key in m.data) {
                    charaDetail[key] = [];
                    // Like { "Djeeta": [<p>攻撃力10000, HP15000</p>, <p>通常攻刃15%</p>, <p>DA 100%</p>], } Create an associative array
                }

                if (sw.switchTotalAttack) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.totalAttack));
                    ++colSize;
                }
                if (sw.switchATKandHP) {
                    // senryoku = 戦力 = PWR
                    let {displayAttack, displayHP} = m.data.Djeeta;
                    let senryoku = displayAttack + displayHP;
                    tablebody.push(formatCommaSeparatedNumber(senryoku) + "\n(" + formatCommaSeparatedNumber(displayAttack) + ' + ' + formatCommaSeparatedNumber(displayHP) + ')');
                    ++colSize;
                }

                if (sw.switchCharaAttack) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-attack"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("攻撃力", locale)}</span> {formatCommaSeparatedNumber(m.data[key].totalAttack)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchDATA) {
                    charaDetail["Djeeta"].push(
                        <span key={key + "-da"} className="result-chara-detail">
                                <span
                                    className="label label-danger">DA</span> {(100.0 * m.data.Djeeta.totalDA).toFixed(1)}%&nbsp;
                            <span
                                className="label label-danger">TA</span> {(100.0 * m.data.Djeeta.totalTA).toFixed(1)}%&nbsp;
                            </span>
                    );
                }

                if (sw.switchCharaDA) {
                    for (key in m.data) {
                        // If switchDATA is not specified, all members
                        // Only if it is not Djeeta if specified
                        if (!sw.switchDATA || (key != "Djeeta")) {
                            charaDetail[key].push(
                                <span key={key + "-da"} className="result-chara-detail">
                                        <span
                                            className="label label-danger">DA</span> {(100.0 * m.data[key].totalDA).toFixed(1)}%&nbsp;
                                    <span
                                        className="label label-danger">TA</span> {(100.0 * m.data[key].totalTA).toFixed(1)}%&nbsp;
                                    </span>
                            );
                        }
                    }
                }

                if (sw.switchDebuffResistance) {
                    for (key in m.data) {
                        //Treat debuff tolerance rate as% notation
                        charaDetail[key].push(
                            <span key={key + "-debuffResistance"} className="result-chara-detail">
                                    <span
                                        className="label label-success">{intl.translate("弱体耐性率", locale)}</span> {parseFloat(m.data[key].debuffResistance.toFixed(1))}%&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchExpectedAttack) {
                    let {expectedAttack, totalAttack} = m.data.Djeeta;
                    let attack = expectedAttack * totalAttack;
                    tablebody.push(expectedAttack.toFixed(4) + "\n(" + formatCommaSeparatedNumber(attack) + ")");
                    ++colSize;
                }

                if (sw.switchCriticalAttack) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.criticalAttack));
                    ++colSize;
                }

                if (sw.switchCriticalRatio) {
                    if (getTypeBonus(prof.element, prof.enemyElement) == 1.5 || prof.enemyElement == "non-but-critical") {
                        tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.effectiveCriticalRatio.toFixed(4) + ")");
                        ++colSize;
                    } else {
                        tablebody.push(intl.translate("非有利", locale));
                        ++colSize;
                    }
                }

                if (sw.switchHP) {
                    let {totalHP, remainHP} = m.data.Djeeta;
                    tablebody.push(formatCommaSeparatedNumber(totalHP) + "\n(" + formatCommaSeparatedNumber(totalHP * remainHP) + ")");
                    ++colSize;
                }

                if (sw.switchCharaHP) {
                    for (key in m.data) {
                        let {totalHP, remainHP} = m.data[key];
                        charaDetail[key].push(
                            <span key={key + "-HP"} className="result-chara-detail">
                                    <span
                                        className="label label-success">{intl.translate("残HP", locale)} / HP</span>&nbsp;
                                {formatCommaSeparatedNumber(totalHP * remainHP)}&nbsp;/&nbsp;{formatCommaSeparatedNumber(totalHP)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchAverageAttack) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.averageAttack));
                    ++colSize;
                }

                if (sw.switchAverageCriticalAttack) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.averageCriticalAttack));
                    ++colSize;
                }

                if (sw.switchTotalExpected) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.totalExpected));
                    ++colSize;
                }

                if (sw.switchCharaTotalExpected) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-PCF"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("総回技", locale)}</span>{formatCommaSeparatedNumber(m.data[key].totalExpected)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchAverageTotalExpected) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.averageTotalExpected));
                    ++colSize;
                }

                if (sw.switchPureDamage) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.pureDamage));
                    ++colSize;
                }

                if (sw.switchCharaPureDamage) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-pure-damage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("単攻撃ダメージ(技巧連撃無)", locale)}</span> {formatCommaSeparatedNumber(m.data[key].pureDamage)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchDamageWithCritical) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.damageWithCritical));
                    ++colSize;
                }

                if (sw.switchDamageWithMultiple) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.damageWithMultiple));
                    ++colSize;
                }

                if (sw.switchDamage) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.damage));
                    ++colSize;
                }

                if (sw.switchLockout) {
                    tablebody.push(m.data.Djeeta.expectedLockoutTimePerTurn.toFixed(2) + "s");
                    ++colSize;
                }

                if (sw.switchOugiGage) {
                    tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn.toFixed(2) + "T)");
                    ++colSize;
                }

                if (sw.switchOugiDamage) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.totalOugiDamage));
                    ++colSize;
                }


                if (sw.switchCharaOugiDamage) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-ougi-damage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("奥義ダメージ", locale)}</span> {formatCommaSeparatedNumber(m.data[key].ougiDamage)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchCharaLockout) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-ougi-gage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("予想ターン毎の硬直", locale)}</span> {m.data[key].expectedLockoutTimePerTurn.toFixed(2) + "s"}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchCharaOugiGage) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-ougi-gage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("ターン毎の奥義ゲージ上昇量", locale)}</span> {m.data[key].expectedOugiGage.toFixed(2) + "%\n(" + m.data[key].expectedTurn.toFixed(2) + "T)"}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchChainBurst) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.averageChainBurst));
                    ++colSize;
                }
                if (sw.switchTotalOugiDamageWithChain) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.totalOugiDamageWithChain));
                    ++colSize;
                }
                if (sw.switchCycleDamage) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.expectedCycleDamagePerTurn));
                    ++colSize;
                }

                if (sw.switchTimeDamage) {
                    tablebody.push(formatCommaSeparatedNumber(m.data.Djeeta.expectedCycleDamagePerSecond));
                    ++colSize;
                }

                if (sw.switchCharaCycleDamage) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-cycle-damage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("予想ターン毎ダメージ", locale)}</span> {formatCommaSeparatedNumber(m.data[key].expectedCycleDamagePerTurn)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchCharaTimeDamage) {
                    for (key in m.data) {
                        charaDetail[key].push(
                            <span key={key + "-time-damage"} className="result-chara-detail">
                                    <span
                                        className="label label-primary">{intl.translate("予想秒毎ダメージ", locale)}</span> {formatCommaSeparatedNumber(m.data[key].expectedCycleDamagePerSecond)}&nbsp;
                                </span>
                        );
                    }
                }

                if (sw.switchAverageCycleDamage) {
                    let averageCyclePerTurn = m.data.Djeeta.averageCyclePerTurn;
                    tablebody.push(formatCommaSeparatedNumber(averageCyclePerTurn) + " (" + formatCommaSeparatedNumber(4 * averageCyclePerTurn) + ")");
                    ++colSize;
                }

                if (sw.switchAverageTimeDamage) {
                    let averageCyclePerSecond = m.data.Djeeta.averageCyclePerSecond;
                    tablebody.push(formatCommaSeparatedNumber(averageCyclePerSecond) + " (" + formatCommaSeparatedNumber(4 * averageCyclePerSecond) + ")");
                    ++colSize;
                }


                if (sw.switchCharaLimitValues) {
                    for (var key in m.data) {
                        function createRealLimitValues(limitValues, damageUP, enemyResistance, ougiFixedDamage, criticalRatio, supplementalDamage) {
                            // e.g. one-foe: 300K+{(400K-300K)×0.8}+{(500K-400K)×0.6}+{(600K-500K)×0.05}
                            let _limitValues = limitValues[3][0] + (limitValues[2][0] - limitValues[3][0]) * limitValues[3][1] +
                                (limitValues[1][0] - limitValues[2][0]) * limitValues[2][1] +
                                (limitValues[0][0] - limitValues[1][0]) * limitValues[1][1];

                            // In the case of ougi.
                            _limitValues += ougiFixedDamage * criticalRatio;

                            _limitValues *= Math.max(1.0, 1.0 + damageUP);
                            _limitValues *= Math.max(0.0, Math.min(1.0, 1.0 - enemyResistance));
                            _limitValues += supplementalDamage;

                            return _limitValues;
                        }

                        // Generate supplemental Damage.
                        let damageSupplemental = 0, damageWithoutCriticalSupplemental = 0, ougiDamageSupplemental = 0,
                            chainBurstSupplemental = 0;
                        [damageSupplemental, damageWithoutCriticalSupplemental, ougiDamageSupplemental, chainBurstSupplemental] = supplemental.calcOthersDamage(m.data[key].skilldata.supplementalDamageArray, [damageSupplemental, damageWithoutCriticalSupplemental, ougiDamageSupplemental, chainBurstSupplemental], {remainHP: m.data[key].remainHP});

                        let normalDamageRealLimit = createRealLimitValues(m.data[key].normalDamageLimitValues, m.data[key].skilldata.damageUPOnlyNormalDamage, m.data[key].skilldata.enemyResistance, 0, 0, damageSupplemental);
                        let ougiDamageRealLimit = createRealLimitValues(m.data[key].ougiDamageLimitValues, m.data[key].skilldata.damageUP, m.data[key].skilldata.enemyResistance, m.data[key].ougiFixedDamage, m.data[key].criticalRatio, ougiDamageSupplemental);

                        charaDetail[key].push(
                            <div key={key + "-LimitValues"}>
                                    <span key={key + "-LimitValues"}>
                                        <span
                                            className={"label label-default"}>{intl.translate("実質通常上限", locale)}</span>&nbsp;
                                        {formatCommaSeparatedNumber(normalDamageRealLimit)}&nbsp;
                                        <span
                                            className={"label label-default"}>{intl.translate("実質奥義上限", locale)}</span>&nbsp;
                                        {formatCommaSeparatedNumber(ougiDamageRealLimit)}&nbsp;
                                    </span>
                            </div>
                        );
                    };
                }

                if (sw.switchSkillTotal) {
                    for (var key in m.data) {
                        var mainSkillInfo = [];
                        var skilldata = m.data[key].skilldata;

                        // For attacking skills
                        var pushSkillInfoElement1 = (skillKey, label, labelType = "primary") => {
                            // Use outer mainSkillInfo, skilldata, and locale
                            if (skilldata[skillKey] != 1.0) {
                                mainSkillInfo.push(
                                    <span key={key + "-" + skillKey}>
                                            <span
                                                className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                        {(100.0 * (skilldata[skillKey] - 1.0)).toFixed(1)}%&nbsp;
                                        </span>
                                );
                            }
                        };

                        pushSkillInfoElement1("normal", "通常攻刃", "danger");
                        pushSkillInfoElement1("normalHaisui", "通常背水", "dark");
                        pushSkillInfoElement1("normalKonshin", "通常渾身", "light");
                        pushSkillInfoElement1("element", "属性", "default");
                        pushSkillInfoElement1("magna", "マグナ", "primary");
                        pushSkillInfoElement1("magnaHaisui", "マグナ背水", "dark");
                        pushSkillInfoElement1("magnaKonshin", "マグナ渾身", "light");
                        pushSkillInfoElement1("ex", "EX", "warning");
                        pushSkillInfoElement1("exHaisui", "EX背水", "dark");
                        pushSkillInfoElement1("charaHaisui", "キャラ背水", "dark");
                        pushSkillInfoElement1("LBHaisui", "LB背水ラベル", "dark");
                        pushSkillInfoElement1("LBKonshin", "LB渾身ラベル", "light");
                        pushSkillInfoElement1("hpRatio", "HP増加", "success");
                        pushSkillInfoElement1("other", "その他バフ", "primary");
                        pushSkillInfoElement1("ATKDebuff", "攻撃力減少(特殊)", "danger");
                        pushSkillInfoElement1("accuracyDebuff", "攻撃命中率減少(特殊)", "dark");

                        var multipleAttackSkillInfo = [];
                        // For batting skill
                        var pushSkillInfoElement2 = (skillKey, label, labelType = "primary") => {
                            // Use outer skillInfo, skilldata and locale
                            let value = skilldata[skillKey];
                            let isOver = GlobalConst.LIMIT[skillKey] && (value >= GlobalConst.LIMIT[skillKey]);
                            if (value != 0.0) {
                                multipleAttackSkillInfo.push(
                                    <span key={key + "-" + skillKey}>
                                        <span
                                            className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                        <span className={isOver ? "is-over" : ""}>{value.toFixed(1)}%</span>&nbsp;
                                    </span>
                                );
                            }
                        };

                        pushSkillInfoElement2("normalDA", "DA上昇(通常)", "danger");
                        pushSkillInfoElement2("magnaDA", "DA上昇(マグナ)", "primary");
                        pushSkillInfoElement2("exDA", "DA上昇(EX)", "default");
                        pushSkillInfoElement2("bahaDA", "DA上昇(バハ)", "dark");
                        pushSkillInfoElement2("cosmosDA", "DA上昇(コスモス)", "light");
                        pushSkillInfoElement2("otherDA", "DA上昇(その他)", "default");
                        pushSkillInfoElement2("normalTA", "TA上昇(通常)", "danger");
                        pushSkillInfoElement2("magnaTA", "TA上昇(マグナ)", "primary");
                        pushSkillInfoElement2("bahaTA", "TA上昇(バハ)", "dark");
                        pushSkillInfoElement2("otherTA", "TA上昇(その他)", "default");

                        var criticalInfo = [];
                        if (Object.keys(skilldata.criticalArray).length > 0) {
                            var sortedKeys = Object.keys(skilldata.criticalArray).sort();
                            criticalInfo.push(
                                <table key={key + "-criticalInfoTable"} className="table table-bordered"
                                       style={{"marginBottom": "0px"}}>
                                    <thead>
                                    <tr>
                                        <th className="bg-success"
                                            style={{"fontSize": "10pt"}}>{intl.translate("技巧倍率", locale)}</th>
                                        {sortedKeys.map(function (v, ind) {
                                            return <th key={ind} className="bg-success"
                                                       style={{"fontSize": "10pt"}}>{parseFloat(v).toFixed(2)}{intl.translate("倍", locale)}</th>
                                        })}
                                        <th className="bg-success"
                                            style={{"fontSize": "10pt"}}>{intl.translate("標準偏差", locale)}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{"fontSize": "10pt"}}>{intl.translate("発生確率", locale)}</td>
                                        {sortedKeys.map(function (v, ind) {
                                            return (
                                                <td key={ind}
                                                    style={{"fontSize": "10pt"}}>{(100.0 * skilldata.criticalArray[v]).toFixed(3)}%</td>
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

                        var additionalInfo = [];
                        if (skilldata["additionalDamageXA"]) {
                            let {additionalDamageXA} = skilldata;
                            additionalInfo.push(
                                <table key={key + "-additionalInfoTable"} className="table table-bordered"
                                       style={{"marginBottom": "0px", "fontSize": "10pt"}}>
                                    <thead>
                                    <tr>
                                        <th className="bg-success">{intl.translate("追加ダメージXA", locale)}</th>
                                        <th className="bg-success">SA</th>
                                        <th className="bg-success">DA</th>
                                        <th className="bg-success">TA</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{intl.translate("効果量", locale)}</td>
                                        {additionalDamageXA.map(value => <td>{Math.round(value * 100)}%</td>)}
                                    </tr>
                                    </tbody>
                                </table>
                            );
                        }

                        var supplementalDamageInfo = [];
                        const supplementalInfo = supplemental.collectSkillInfo(skilldata.supplementalDamageArray, {remainHP: m.data[key].remainHP});
                        if (supplementalInfo.total > 0) {
                            supplementalDamageInfo.push(
                                <table key={key + "-supplementalDamageTable"} className="table table-bordered"
                                       style={{"marginBottom": "0px", "fontSize": "10pt"}}>
                                    <thead>
                                    <tr>
                                        <th className="bg-success">{intl.translate("与ダメージ上昇効果のソース", locale)}</th>
                                        {supplementalInfo.headers.map(([key, type, val]) =>
                                            <th key={key} className="bg-success">
                                                {intl.translate(key, locale) +
                                                (intl.translate("supplemental_" + type, locale) || "").replace("{value}", (val || "").toString())}
                                            </th>)}
                                        <th className="bg-success">{intl.translate("合計", locale)}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{intl.translate("ダメージ", locale)}</td>
                                        {supplementalInfo.values.map(([key, damage]) => <td key={key}>{damage}</td>)}
                                        <td>
                                            {supplementalInfo.total}&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            );
                        }

                        var otherSkillInfo = [];
                        // For other skills
                        var pushSkillInfoElement3 = (skillKey, label, labelType = "primary") => {
                            // Use outer skillInfo, skilldata and locale
                            if (skilldata[skillKey] != 0.0) {
                                otherSkillInfo.push(
                                    <span key={key + "-" + skillKey}>
                                            <span
                                                className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                        {(100.0 * skilldata[skillKey]).toFixed(1)}%&nbsp;
                                        </span>
                                );
                            }
                        };
                        pushSkillInfoElement3("additionalDamage", "追加ダメージ", "primary");
                        pushSkillInfoElement3("damageUP", "与ダメージUP", "danger");
                        pushSkillInfoElement3("damageUPOnlyNormalDamage", "与ダメージUP(通常攻撃のみ)", "danger");
                        pushSkillInfoElement3("damageLimit", "ダメージ上限アップ", "danger");
                        pushSkillInfoElement3("ougiDamageUP", "奥義ダメージアップ", "warning");
                        pushSkillInfoElement3("ougiDamageLimit", "奥義ダメージ上限アップ", "warning");
                        pushSkillInfoElement3("chainDamageUP", "チェインダメージアップ", "succes");
                        pushSkillInfoElement3("chainDamageLimit", "チェインダメージ上限アップ", "succes");
                        pushSkillInfoElement3("ougiGageBuff", "奥義ゲージ上昇量", "warning");
                        if (skilldata["criticalDamageLimit"] != 0) {
                            otherSkillInfo.push(
                                <span key={key + "-" + "normalCriticalDamageLimit"}>
                                        <span
                                            className={"label label-" + "default"}>{intl.translate("CriticalDamageLimit (effective)", locale)}</span>&nbsp;
                                    {(100.0 * skilldata["criticalDamageLimit"]).toFixed(1) + "%\n(" + (100.0 * skilldata["critRate"]).toFixed(1) + "%)"}&nbsp;
                                    </span>
                            );
                        }
                        pushSkillInfoElement3("uplift", "高揚", "default");

                        var ougiInfo = [];
                        var pushOugiInfo = (skillKey, label, labelType = "primary") => {
                            if (m.data[key][skillKey] != 0.0) {
                                ougiInfo.push(
                                    <span key={key + "-" + skillKey}>
                                            <span
                                                className={"label label-" + labelType}>{intl.translate(label, locale)}</span>&nbsp;
                                        {(m.data[key][skillKey]).toFixed(1)}&nbsp;
                                        </span>
                                );
                            }
                        };
                        pushOugiInfo("ougiRatio", "奥義倍率", "warning");
                        pushOugiInfo("ougiFixedDamage", "奥義固定ダメージ", "warning");
                        pushOugiInfo("ougiBonusPlainDamage", "奥義追加ダメージ(無属性固定)", "default");

                        charaDetail[key].push(<div key={key + "-mainSkillInfo"}>{mainSkillInfo}</div>);
                        charaDetail[key].push(<div key={key + "-multipleAttackInfo"}>{multipleAttackSkillInfo}</div>);
                        charaDetail[key].push(<div key={key + "-criticalInfo"}
                                                   style={{"margin": "5px 0px"}}>{criticalInfo}</div>);
                        charaDetail[key].push(<div key={key + "-additionalInfo"}
                                                   style={{"margin": "5px 0px"}}>{additionalInfo}</div>);
                        charaDetail[key].push(<div key={key + "-supplementalDamageInfo"}
                                                   style={{"margin": "5px 0px"}}>{supplementalDamageInfo}</div>);
                        charaDetail[key].push(<div key={key + "-otherSkillInfo"}>{otherSkillInfo}</div>);
                        charaDetail[key].push(<div key={key + "-ougiInfo"}>{ougiInfo}</div>);
                    }
                }

                var res = [
                    <tr className="result" key={rank + 1}>
                        <td>{rank + 1}</td>
                        {tablebody.map(function (am, ind) {
                            return (<td key={ind}>{am}</td>);
                        })}
                        {m.armNumbers.map(function (am, ind) {
                            if (typeof arm[ind] !== 'undefined' && arm[ind].considerNumberMax != 0) {
                                ++colSize;
                                if (parseInt(am) > 0) {
                                    return (<td key={ind}><span
                                        className="text-info"><strong>{am} </strong></span>
                                    </td>);
                                } else {
                                    return (<td key={ind}><span
                                        className="text-muted">{am} </span></td>);
                                }
                            }
                        })}
                        <td><Button id={rank} block bsStyle="primary" className="add-graph-button"
                                    onClick={onClick}>{intl.translate("追加", locale)}</Button></td>
                    </tr>,
                ];

                for (var key in charaDetail) {
                    if (charaDetail[key].length > 0) {
                        res.push(<tr key={"chara-result-" + key}>
                            <td colSpan="3">
                                <span className="text-info">{key}</span>
                            </td>
                            <td style={{"textAlign": "left"}} colSpan={colSize - 3}>
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
        var locale = this.props.locale;
        var combinations = this.props.storedList.combinations;
        var armlist = this.props.storedList.armlist;
        var names = this.props.storedList.names;
        var removeOneStoredList = this.props.removeOneStoredList;
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
                                <th>{intl.translate("編成名", locale)}(Optional)</th>
                                {(armlist.length != 0) ? (armlist[0].map(function (arm, ind) {
                                    if (arm.name != "") {
                                        return (<th key={ind}>{arm.name}</th>);
                                    } else {
                                        return (<th key={ind}>{intl.translate("武器", locale)}{ind}</th>);
                                    }
                                })) : ""}
                                <th>{intl.translate("操作", locale)}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {combinations.map(function (v, ind) {
                                return (
                                    <tr key={ind}>
                                        <td>{ind}</td>
                                        <TextWithTooltip tooltip={intl.translate("保存済みリスト名説明", locale)}
                                                         id="tooltip-storedlist-name">
                                            <td><FormControl componentClass="textarea" style={{
                                                "width": "100%",
                                                "minWidth": "300px",
                                                "height": "120px"
                                            }} name={ind} value={names[ind]} onChange={handleNameChange}/></td>
                                        </TextWithTooltip>
                                        {v.map(function (num, ind2) {
                                            return (<td key={ind2}>{num}</td>)
                                        })}
                                        <td><Button id={ind} onClick={removeOneStoredList}
                                                    bsStyle="primary">{intl.translate("削除", locale)}</Button></td>
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
    render: function () {
        var locale = this.props.locale;
        var gstyle = (this.props.mobile) ? {"width": "100%"} : {};
        var style = (this.props.mobile) ? {"width": "50%"} : {};
        if (this.props.autoupdate) {
            return (
                <ButtonGroup style={gstyle}>
                    <Button bsStyle="primary" style={style}
                            onClick={this.props.forceResultUpdate}>{intl.translate("結果を更新", locale)}</Button>
                    <Button bsStyle="danger" style={style}
                            onClick={this.props.switchAutoUpdate}>{intl.translate("自動更新: OFF", locale)}</Button>
                </ButtonGroup>
            )
        } else {
            return (
                <ButtonGroup style={gstyle}>
                    <Button bsStyle="primary" style={style} disabled
                            onClick={this.props.forceResultUpdate}>{intl.translate("結果を更新", locale)}</Button>
                    <Button bsStyle="primary" style={style}
                            onClick={this.props.switchAutoUpdate}>{intl.translate("自動更新: ON", locale)}</Button>
                </ButtonGroup>)
        }
    },
});

module.exports.ResultList = ResultList;
module.exports.Result = Result;
module.exports.StoredListEditor = StoredListEditor;
module.exports.ControlAutoUpdate = ControlAutoUpdate;
