var React = require('react');
var {Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, Collapse, DropdownButton, MenuItem, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var {Chart} = require('react-google-charts')
var Simulator = require('./simulator.js')
var {HPChart, TurnChart} = require('./chart.js')
var Advertisement = require('./advertisement.js');
var intl = require('./translate.js');
var {HPChartHowTo} = require('./howto.js')

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

var {isCosmos, isValidResult, checkNumberofRaces, proceedIndex,
    calcCombinations, calcDamage, calcOugiDamage, treatSupportAbility,
    calcHaisuiValue, calcBasedOneSummon, addSkilldataToTotals, calcOneCombination,
    initializeTotals, getTesukatoripokaAmount, recalcCharaHaisui, getTotalBuff,
    getInitialTotals, getTypeBonus, getTypeBonusStr} = require('./global_logic.js');

var ResultList = React.createClass({
    calculateResult: function(newprops) {
      var prof = newprops.profile; var arml = newprops.armlist;
      var summon = newprops.summon; var chara = newprops.chara;

      if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
          var totalBuff = getTotalBuff(prof)

          // 後から追加したパラメータはNaNなことがあるので追加処理
          // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
          var sortkey = "averageCyclePerTurn"
          var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
          if(newprops.sortKey == newprops.sortKey) {
              sortkey = newprops.sortKey
              sortkeyname = keyTypes[sortkey]
          }

          // combinationsが変更されていないなら古いやつを使う
          if(this.state.previousArmlist != null) {
              var isCombinationChanged = false;
              if(this.state.previousArmlist.length != arml.length) {
                  isCombinationChanged = true;
              }
              if(!isCombinationChanged) {
                  for(var i = 0; i < arml.length; i = (i + 1)|0){
                      if(arml[i].considerNumberMax != this.state.previousArmlist[i].considerNumberMax || arml[i].considerNumberMin != this.state.previousArmlist[i].considerNumberMin) {
                          isCombinationChanged = true;
                      }
                      // コスモス武器になったか、コスモス武器じゃなくなったかでコンビネーションが変わる
                      if(isCosmos(arml[i]) != isCosmos(this.state.previousArmlist[i])) {
                          isCombinationChanged = true;
                      }
                  }
              }
              if(isCombinationChanged) {
                  var combinations = calcCombinations(arml)
                  this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
                  this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
              } else {
                  var combinations = this.state.previousCombinations
              }
          } else {
              var combinations = calcCombinations(arml)
              this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
              this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
          }

          var res = []
          var minSortKey = []
          for(var i = 0; i < summon.length; i++){
              res[i] = []
              minSortKey[i] = -1
          }

          var totals = getInitialTotals(prof, chara, summon)
          treatSupportAbility(totals, chara)
          var itr = combinations.length
          var totalItr = itr * summon.length * Object.keys(totals).length

          // 前処理に必要な値があればここで用意
          var minHP = (prof.minimumHP == undefined) ? undefined : parseInt(prof.minimumHP)

          for(var i = 0; i < itr; i = (i + 1)|0){
              var oneres = calcOneCombination(combinations[i], summon, prof, arml, totals, totalBuff)
              for(var j = 0; j < summon.length; j++){
                  // 各結果に対して前処理
                  if(isValidResult(oneres[j], minHP)) {
                      if(res[j].length < 10) {
                          //  まずminSortkeyを更新する
                          if (minSortKey[j] < 0 || minSortKey[j] > oneres[j].Djeeta[sortkey]) {
                              minSortKey[j] = oneres[j].Djeeta[sortkey]
                          }
                          res[j].push({data: oneres[j], armNumbers: combinations[i]});
                      } else {
                          // minSortkey より大きいものだけpush
                          if (oneres[j].Djeeta[sortkey] >= minSortKey[j]) {
                              // 11番目に追加する
                              res[j].push({data: oneres[j], armNumbers: combinations[i]});

                              // 10番目まででminSortkey[j]と一致するものを消す
                              var spliceid = -1;
                              for(var k = 0; k < 10; k = (k + 1)|0) {
                                  if(res[j][k].data.Djeeta[sortkey] == minSortKey[j]) {
                                      spliceid = k
                                  }
                              }
                              res[j].splice(spliceid, 1)
                              minSortKey[j] = -1

                              // 10個の配列になったので、もう一度最小値を計算する
                              for(var k = 0; k < 10; k = (k + 1)|0) {
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

          return {summon: summon, result: res, sortkeyname: sortkeyname, totalItr: totalItr}
      } else {
          return {summon: summon, result: []}
      }
    },
    getInitialState: function() {
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
            disableAutoResultUpdate: 0,
            result: {summon: this.props.summon, result: []},
            chartSortKey: "totalAttack",
            chartData: {},
            storedList: {"combinations": [], "armlist": []},
            openHPChart: false,
            displayRealHP: false,
            openTurnChart: false,
            openSimulator: false,
            openDisplayElementTable: false,
            openHPChartTutorial: false,
            openShowStoredList: false,
            ChartButtonActive: false,
            previousArmlist: null,
            previousCombinations: null,
        };
    },
    closeHPChart: function() {
        this.setState({openHPChart: false})
    },
    closeTurnChart: function() {
        this.setState({openTurnChart: false})
    },
    closeSimulator: function() {
        this.setState({openSimulator: false})
    },
    closeHPChartTutorial: function() {
        this.setState({openHPChartTutorial: false})
    },
    openHPChartTutorial: function() {
        this.setState({openHPChartTutorial: true})
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.state.disableAutoResultUpdate != 1 && (nextProps.noResultUpdate == undefined || !nextProps.noResultUpdate)){
            var allresult = this.calculateResult(nextProps);
            this.setState({result: allresult});
        }

        // armlistが変更されていないかcheck => 変更されてたら今までの分消す
        var isArmValid = true
        for(var i = 0; i < this.state.storedList.combinations.length; i++) {
            if(nextProps.armlist.length != this.state.storedList.armlist[i].length) {
                isArmValid = false
                continue;
            }
            for(var k = 0; k < nextProps.armlist.length; k++){
                // 名前と攻撃力が同時に変更されていた場合、削除や追加などが起こっていると予想される
                if(nextProps.armlist[k].name != this.state.storedList.armlist[i][k].name && nextProps.armlist[k].attack != this.state.storedList.armlist[i][k].attack ) {
                    isArmValid = false
                    break;
                }
            }
        }
        if(!isArmValid){
            this.setState({storedList: {"combinations": [], "armlist": []}})
            this.setState({ChartButtonActive: false})
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = (newState[key] == 0) ? 1 : 0

        // 自動更新ONにしたらUPDATEする
        if(key == "disableAutoResultUpdate" && newState[key] == 0){
            newState["result"] = this.calculateResult(this.props)
        }
        this.setState(newState)
    },
    openHPChart: function(displayRealHP, e) {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.profile; var arml = this.props.armlist;
        var summon = this.props.summon; var chara = this.props.chara;
        var totalBuff = getTotalBuff(prof)
        var totals = getInitialTotals(prof, chara, summon)
        treatSupportAbility(totals, chara)

        var sortkey = "averageCyclePerTurn"
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
        if(this.props.sortKey == this.props.sortKey) {
            sortkey = this.props.sortKey
            sortkeyname = keyTypes[sortkey]
        }

        var res = []
        for(var i = 0; i < summon.length; i++){
            res[i] = []
        }

        for(var i = 0; i < storedCombinations.length; i++){
            var oneres = calcOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
            for(var j = 0; j < summon.length; j++){
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            initializeTotals(totals)
        }
        // resに再計算されたデータが入っている状態
        // res[summonind][rank]
        this.setState({chartData: this.generateHaisuiData(res, arml, summon, prof, chara, storedCombinations, displayRealHP)})
        this.setState({chartSortKey: sortkey})
        this.setState({openHPChart: true})
    },
    generateHaisuiData: function(res, arml, summon, prof, chara, storedCombinations, displayRealHP) {
        var data = {}
        var locale = this.props.locale

        var minMaxArr = {
            "totalAttack": {"max": 0, "min": 0},
            "totalHP": {"max": 0, "min": 0},
            "criticalAttack": {"max": 0, "min": 0},
            "totalExpected": {"max": 0, "min": 0},
            "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
            "averageAttack": {"max": 0, "min": 0},
            "averageTotalExpected": {"max": 0, "min": 0},
            "averageCyclePerTurn": {"max": 0, "min": 0},
            "averageCriticalAttack": {"max": 0, "min": 0},
        }
        var cnt = 1
        var considerAverageArray = {}
        for(var ch = 0; ch < chara.length; ch++) {
            var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
            if(charaConsidered && chara[ch].name != "") {
                cnt++;
                considerAverageArray[chara[ch].name] = true
            } else {
                considerAverageArray[chara[ch].name] = false
            }
        }

        if(res.length > 1) {
            var AllTotalAttack = [["残りHP(%)"]];
            var AllCycleDamagePerTurn = [["残りHP(%)"]];
            var AllCriticalAttack = [["残りHP(%)"]];
            var AllTotalExpected = [["残りHP(%)"]];
            var AllAverageTotalAttack = [["残りHP(%)"]];
            var AllAverageTotalExpected = [["残りHP(%)"]];
            var AllAverageCycleDamagePerTurn = [["残りHP(%)"]];
            var AllAverageCriticalAttack = [["残りHP(%)"]];
            var AllTotalHP = [["残りHP(%)"]]
        }

        // キャラ編成は武器編成毎には変わらないので先に計算することができる
        var charaHaisuiBuff = []
        for(var k = 0; k < 100; ++k){
            var charaHaisuiValue = recalcCharaHaisui(chara, 0.01 * (k + 1));
            charaHaisuiBuff.push(charaHaisuiValue);
        }

        var allAlreadyUsedHP = {};

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += intl.translate("属性攻", locale) + summon[s].selfSummonAmount + intl.translate("キャラ攻", locale) + summon[s].selfSummonAmount2
            } else {
                summonHeader += intl.translate(summonElementTypes[summon[s].selfElement].name, locale) + intl.translate(summonTypes[summon[s].selfSummonType], locale) + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += intl.translate("属性攻", locale) + summon[s].friendSummonAmount + intl.translate("キャラ攻", locale) + summon[s].friendSummonAmount2
            } else {
                summonHeader += intl.translate(summonElementTypes[summon[s].friendElement].name, locale) + intl.translate(summonTypes[summon[s].friendSummonType], locale) + summon[s].friendSummonAmount
            }
            var TotalAttack = [["残りHP(%)"]];
            var TotalHP = [["残りHP(%)"]]
            var CriticalAttack = [["残りHP(%)"]];
            var TotalExpected = [["残りHP(%)"]];
            var CycleDamagePerTurn = [["残りHP(%)"]];
            var AverageTotalExpected = [["残りHP(%)"]];
            var AverageTotalAttack = [["残りHP(%)"]];
            var AverageCriticalAttack = [["残りHP(%)"]];
            var AverageCycleDamagePerTurn = [["残りHP(%)"]];

            var alreadyUsedHP = {};

            for(var j = 0; j < oneresult.length; j++){
                var onedata = oneresult[j].data

                var title = "No. " + (j+1).toString() + ":"
                for(var i=0; i < arml.length; i++){
                    if(storedCombinations[j][i] > 0) {
                        var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                        title += name + storedCombinations[j][i] + "本\n"
                    }
                }

                TotalAttack[0].push(title)
                TotalHP[0].push(title)
                CriticalAttack[0].push(title)
                TotalExpected[0].push(title)
                CycleDamagePerTurn[0].push(title)
                AverageTotalExpected[0].push(title)
                AverageTotalAttack[0].push(title)
                AverageCycleDamagePerTurn[0].push(title)
                AverageCriticalAttack[0].push(title)

                // 召喚石2組以上の場合
                if(res.length > 1) {
                    AllTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllTotalHP[0].push("(" + summonHeader + ")" + title)
                    AllCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllTotalExpected[0].push("(" + summonHeader + ")" + title)
                    AllCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalExpected[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                }

                for(key in onedata){
                    var totalSummon = onedata[key].totalSummon
                    var normalHaisuiOrig = onedata[key].skilldata.normalHaisui
                    var magnaHaisuiOrig = onedata[key].skilldata.magnaHaisui
                    var charaHaisuiOrig = onedata[key].skilldata.charaHaisui
                    var normalKonshinOrig = onedata[key].skilldata.normalKonshin
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig * charaHaisuiOrig)

                    var haisuiBuff = []
                    // キャラ背水はキャラ個別で計算するべき
                    for(var k = 0; k < 100; k++){
                        haisuiBuff.push({normalHaisui: 1.0, magnaHaisui: 1.0, normalKonshin: 1.0, charaHaisui: charaHaisuiBuff[k]})
                    }

                    // 武器データ計算
                    for(var i=0; i < arml.length; i++){
                        var arm = arml[i]
                        for(var jj = 1; jj <= 2; jj++){
                            var skillname = '';
                            var element = ''; (arm.element == undefined) ? "fire" : arm.element
                            if(jj == 1) {
                                skillname = arm.skill1
                                element = (arm.element == undefined) ? "fire" : arm.element
                            } else {
                                skillname = arm.skill2
                                element = (arm.element2 == undefined) ? "fire" : arm.element2
                            }

                            if(skillname != 'non' && onedata[key].element == element){
                                var stype = skilltypes[skillname].type;
                                var amount = skilltypes[skillname].amount;
                                var slv = parseInt(arm.slv)

                                // mask invalid slv
                                if(slv == 0) slv = 1

                                if(stype == "normalHaisui" || stype == "magnaHaisui" || stype == "normalKonshin" || stype == "magnaKonshin"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)

                                        if(stype == "normalHaisui" || stype == "normalKonshin") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.magna
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for(var k = 0; k < 100; k++){
                        var newTotalAttack = totalAttackWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin * haisuiBuff[k].charaHaisui
                        var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack
                        var newDamage = calcDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP)
                        var newOugiDamage = calcOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff, onedata[key].skilldata.damageUP)
                        var newExpectedCycleDamagePerTurn = (newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                        var hp;
                        if (displayRealHP) {
                            // 実HP
                            hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                        } else {
                            // 残HP割合
                            hp = k + 1
                        }

                        if(key == "Djeeta") {
                            var index;
                            if(hp in alreadyUsedHP) {
                                index = alreadyUsedHP[hp] - 1
                            } else {
                                alreadyUsedHP[hp] = TotalAttack.push([hp]);
                                TotalHP.push([hp])
                                TotalExpected.push([hp])
                                CriticalAttack.push([hp])
                                CycleDamagePerTurn.push([hp])
                                AverageTotalAttack.push([hp])
                                AverageTotalExpected.push([hp])
                                AverageCycleDamagePerTurn.push([hp])
                                AverageCriticalAttack.push([hp])
                                index = alreadyUsedHP[hp] - 1;

                                for(var subj = 0; subj < oneresult.length; subj++){
                                    // 散布図とするため、先にresult分の欄を作っておく
                                    TotalAttack[index].push(null)
                                    CycleDamagePerTurn[index].push(null)
                                    CriticalAttack[index].push(null)
                                    TotalExpected[index].push(null)
                                    TotalHP[index].push(null)
                                    AverageTotalAttack[index].push(null)
                                    AverageTotalExpected[index].push(null)
                                    AverageCycleDamagePerTurn[index].push(null)
                                    AverageCriticalAttack[index].push(null)
                                }

                                if(res.length > 1) {
                                    var allindex;
                                    if(hp in allAlreadyUsedHP) {
                                    allindex = allAlreadyUsedHP[hp] - 1
                                    } else {
                                    allAlreadyUsedHP[hp] = AllTotalAttack.push([hp]);
                                    AllTotalHP.push([hp])
                                    AllTotalExpected.push([hp])
                                    AllCriticalAttack.push([hp])
                                    AllCycleDamagePerTurn.push([hp])
                                    AllAverageTotalAttack.push([hp])
                                    AllAverageTotalExpected.push([hp])
                                    AllAverageCycleDamagePerTurn.push([hp])
                                    AllAverageCriticalAttack.push([hp])
                                    allindex = allAlreadyUsedHP[hp] - 1;

                                    // まとめる場合はres.length*oneres.lengthの分だけ先に用意
                                    for(var subj = 0; subj < res.length * oneresult.length; subj++){
                                        AllTotalAttack[allindex].push(null)
                                        AllCycleDamagePerTurn[allindex].push(null)
                                        AllCriticalAttack[allindex].push(null)
                                        AllTotalExpected[allindex].push(null)
                                        AllTotalHP[allindex].push(null)
                                        AllAverageTotalAttack[allindex].push(null)
                                        AllAverageTotalExpected[allindex].push(null)
                                        AllAverageCycleDamagePerTurn[allindex].push(null)
                                        AllAverageCriticalAttack[allindex].push(null)
                                    }
                                    }
                                }
                            }

                            TotalHP[index][j+1] = (displayRealHP ? hp : parseInt(hp * onedata[key].totalHP));
                            TotalAttack[index][j+1] = parseInt(newTotalAttack)
                            TotalExpected[index][j+1] = parseInt(newTotalExpected)
                            CriticalAttack[index][j+1] = parseInt(onedata[key].criticalRatio * newTotalAttack)
                            CycleDamagePerTurn[index][j+1] = parseInt(newExpectedCycleDamagePerTurn)
                            AverageTotalAttack[index][j+1] += parseInt(newTotalAttack / cnt)
                            AverageTotalExpected[index][j+1] += parseInt(newTotalExpected / cnt)
                            AverageCycleDamagePerTurn[index][j+1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[index][j+1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        } else if (considerAverageArray[key]) {
                            var index = alreadyUsedHP[hp] - 1
                            AverageTotalAttack[index][j+1] += parseInt(newTotalAttack / cnt)
                            AverageTotalExpected[index][j+1] += parseInt(newTotalExpected / cnt)
                            AverageCycleDamagePerTurn[index][j+1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[index][j+1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        }
                    }
                }

                if(res.length > 1) {
                    for(var k = 0; k < 100; k++) {
                        var hp;
                        if (displayRealHP) {
                            // 実HP
                            hp = parseInt(0.01 * (k + 1) * onedata["Djeeta"].totalHP);
                        } else {
                            // 残HP割合
                            hp = k + 1
                        }

                        index = alreadyUsedHP[hp] - 1
                        allindex = allAlreadyUsedHP[hp] - 1
                        allj = s * oneresult.length + j + 1;

                        AllTotalAttack[allindex][allj] = TotalAttack[index][j + 1]
                        AllTotalHP[allindex][allj] = TotalHP[index][j + 1]
                        AllCriticalAttack[allindex][allj] = CriticalAttack[index][j + 1]
                        AllTotalExpected[allindex][allj] = TotalExpected[index][j + 1]
                        AllCycleDamagePerTurn[allindex][allj] = CycleDamagePerTurn[index][j + 1]
                        AllAverageTotalExpected[allindex][allj] = AverageTotalExpected[index][j + 1]
                        AllAverageTotalAttack[allindex][allj] = AverageTotalAttack[index][j + 1]
                        AllAverageCriticalAttack[allindex][allj] = AverageCriticalAttack[index][j + 1]
                        AllAverageCycleDamagePerTurn[allindex][allj] = AverageCycleDamagePerTurn[index][j + 1]
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["totalAttack"] = TotalAttack
            data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
            data[summonHeader]["criticalAttack"] = CriticalAttack
            data[summonHeader]["totalExpected"] = TotalExpected
            data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
            data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
            data[summonHeader]["totalHP"] = TotalHP
        }

        if(res.length > 1){
            var matomete = intl.translate("まとめて比較", locale)
            data[matomete] = {}
            data[matomete]["totalAttack"] = AllTotalAttack
            data[matomete]["totalHP"] = AllTotalHP
            data[matomete]["criticalAttack"] = AllCriticalAttack
            data[matomete]["totalExpected"] = AllTotalExpected
            data[matomete]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data[matomete]["averageAttack"] = AllAverageTotalAttack
            data[matomete]["averageCriticalAttack"] = AllAverageCriticalAttack
            data[matomete]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
            data[matomete]["averageTotalExpected"] = AllAverageTotalExpected
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k <= 100; k++){
                    for(var j = 1; j <= res[0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    addHaisuiData: function(id, summonid) {
        var newStored = this.state.storedList
        newStored["combinations"].push(JSON.parse(JSON.stringify(this.state.result.result[summonid][id].armNumbers)))
        newStored["armlist"].push(JSON.parse(JSON.stringify(this.props.armlist)))
        this.setState({storedList: newStored})
        this.setState({ChartButtonActive: true})
    },
    openTurnChart: function() {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.profile; var arml = this.props.armlist;
        var summon = this.props.summon; var chara = this.props.chara;
        var totalBuff = getTotalBuff(prof)
        var totals = getInitialTotals(prof, chara, summon)
        treatSupportAbility(totals, chara)

        var sortkey = "averageCyclePerTurn"
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
        if(this.props.sortKey == this.props.sortKey) {
            sortkey = this.props.sortKey
            sortkeyname = keyTypes[sortkey]
        }

        var res = []
        for(var i = 0; i < summon.length; i++){
            res[i] = []
        }

        for(var i = 0; i < storedCombinations.length; i++){
            var oneres = calcOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
            for(var j = 0; j < summon.length; j++){
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            initializeTotals(totals)
        }
        // resに再計算されたデータが入っている状態
        // res[summonind][rank]
        this.setState({chartData: this.generateTurnData(res, arml, summon, prof, totalBuff, chara, storedCombinations)})
        this.setState({chartSortKey: sortkey})
        this.setState({openTurnChart: true})
    },
    generateTurnData: function(res, arml, summon, prof, buff, chara, storedCombinations) {
        var data = {}
        var minMaxArr = {
            "totalAttack": {"max": 0, "min": 0},
            "criticalAttack": {"max": 0, "min": 0},
            "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
            "averageAttack": {"max": 0, "min": 0},
            "averageCyclePerTurn": {"max": 0, "min": 0},
            "averageCriticalAttack": {"max": 0, "min": 0},
        }
        var cnt = 1
        var considerAverageArray = {}
        for(var ch = 0; ch < chara.length; ch++) {
            var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
            if(charaConsidered && chara[ch].name != "") {
                cnt++;
                considerAverageArray[chara[ch].name] = true
            } else {
                considerAverageArray[chara[ch].name] = false
            }
        }

        if(res.length > 1) {
            var AllTotalAttack = [["経過ターン"]];
            var AllCycleDamagePerTurn = [["経過ターン"]];
            var AllCriticalAttack = [["経過ターン"]];
            var AllAverageTotalAttack = [["経過ターン"]];
            var AllAverageCycleDamagePerTurn = [["経過ターン"]];
            var AllAverageCriticalAttack = [["経過ターン"]];

            for(var m = 0; m < 21; m++){
                AllTotalAttack.push([m])
                AllCycleDamagePerTurn.push([m])
                AllCriticalAttack.push([m])
                AllAverageTotalAttack.push([m])
                AllAverageCycleDamagePerTurn.push([m])
                AllAverageCriticalAttack.push([m])
            }
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].selfSummonAmount + "キャラ攻" + summon[s].selfSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].selfElement].name + summonTypes[summon[s].selfSummonType] + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].friendSummonAmount + "キャラ攻" + summon[s].friendSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].friendElement].name + summonTypes[summon[s].friendSummonType] + summon[s].friendSummonAmount
            }
            var TotalAttack = [["経過ターン"]];
            var CriticalAttack = [["経過ターン"]];
            var CycleDamagePerTurn = [["経過ターン"]];
            var AverageTotalAttack = [["経過ターン"]];
            var AverageCriticalAttack = [["経過ターン"]];
            var AverageCycleDamagePerTurn = [["経過ターン"]];

            for(var m = 0; m < 21; m++){
                TotalAttack.push([m])
                CycleDamagePerTurn.push([m])
                CriticalAttack.push([m])
                AverageTotalAttack.push([m])
                AverageCycleDamagePerTurn.push([m])
                AverageCriticalAttack.push([m])

                // 合計値を足すために先に要素を追加しておく
                // (key の 処理順が不明のため)
                for(var j = 0; j < oneresult.length; j++){
                    AverageTotalAttack[m + 1].push(0)
                    AverageCycleDamagePerTurn[m + 1].push(0)
                    AverageCriticalAttack[m + 1].push(0)
                }
            }

            for(var j = 0; j < oneresult.length; j++){
                var onedata = oneresult[j].data

                var title = "No. " + (j+1).toString() + ":"
                for(var i=0; i < arml.length; i++){
                    if(storedCombinations[j][i] > 0) {
                        var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                        title += name + storedCombinations[j][i] + "本\n"
                    }
                }
                for(key in onedata){
                    var totalSummon = onedata[key].totalSummon
                    var elementCoeff = onedata[key].skilldata.element
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / elementCoeff

                    // 召喚石ターン分を減じておく
                    var elementTurn = totalSummon.elementTurn - 1.0
                    elementCoeff -= elementTurn

                    for(var k = 0; k < 21; k++){
                        // とりあえず 20ターンかかると仮定
                        if(totalSummon.elementTurn > 1.0){
                            elementTurn = 0.20 + (totalSummon.elementTurn - 1.20) * k / 20
                        }
                        var newTotalAttack = totalAttackWithoutHaisui * (elementCoeff + elementTurn)
                        var newDamage = calcDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP)
                        var newOugiDamage = calcOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff, onedata[key].skilldata.damageUP)
                        var newExpectedCycleDamagePerTurn = (newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                        if(key == "Djeeta") {
                            TotalAttack[k + 1].push( parseInt(newTotalAttack) )
                            CriticalAttack[k + 1].push(parseInt(onedata[key].criticalRatio * newTotalAttack))
                            CycleDamagePerTurn[k + 1].push( parseInt(newExpectedCycleDamagePerTurn) )
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        } else if (considerAverageArray[key]) {
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        }
                    }
                }
                TotalAttack[0].push(title)
                CriticalAttack[0].push(title)
                CycleDamagePerTurn[0].push(title)
                AverageTotalAttack[0].push(title)
                AverageCycleDamagePerTurn[0].push(title)
                AverageCriticalAttack[0].push(title)

                // 召喚石2組以上の場合
                if(res.length > 1) {
                    AllTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)

                    for(var k = 1; k < 22; k++) {
                        AllTotalAttack[k].push(TotalAttack[k][j + 1])
                        AllCriticalAttack[k].push(CriticalAttack[k][j + 1])
                        AllCycleDamagePerTurn[k].push(CycleDamagePerTurn[k][j + 1])
                        AllAverageTotalAttack[k].push(AverageTotalAttack[k][j + 1])
                        AllAverageCriticalAttack[k].push(AverageCriticalAttack[k][j + 1])
                        AllAverageCycleDamagePerTurn[k].push(AverageCycleDamagePerTurn[k][j + 1])
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["totalAttack"] = TotalAttack
            data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
            data[summonHeader]["criticalAttack"] = CriticalAttack
            data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
        }

        if(res.length > 1){
            data["まとめて比較"] = {}
            data["まとめて比較"]["totalAttack"] = AllTotalAttack
            data["まとめて比較"]["criticalAttack"] = AllCriticalAttack
            data["まとめて比較"]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
            data["まとめて比較"]["averageCriticalAttack"] = AllAverageCriticalAttack
            data["まとめて比較"]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k < 22; k++){
                    for(var j = 1; j <= res[0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    openSimulator: function() {
        var sortKey = this.props.sortKey
        if (!(sortKey in GlobalConst.supportedSimulationChartSortkeys)) {
            sortKey = "averageCyclePerTurn"
        }
        this.setState({openSimulator: true})
        this.setState({chartSortKey: sortKey})
    },
    switchDisplayRealHP: function(e) {
        this.setState({displayRealHP: !(this.state.displayRealHP)});
        this.openHPChart(!(this.state.displayRealHP));
    },
    resetStoredList: function(e) {
        this.setState({
            storedList: {"combinations": [], "armlist": []},
            openShowStoredList: false,
            openHPChart: false,
            openTurnChart: false,
            openSimulator: false,
            ChartButtonActive: false,
        });
    },
    openStoredList: function(e) {
        this.setState({openShowStoredList: true})
    },
    closeStoredList: function(e) {
        this.setState({openShowStoredList: false})
    },
    removeOneStoredList: function(e) {
        var targetIndex = parseInt(e.target.id)
        var newCombinations = this.state.storedList.combinations
        newCombinations.splice(targetIndex, 1)
        var newArmList = this.state.storedList.armlist
        newArmList.splice(targetIndex, 1)

        if(newArmList.length == 0){
            this.resetStoredList()
        } else {
            this.setState({
                storedList: {
                    "combinations": newCombinations,
                    "armlist": newArmList,
                },
            });
            if(this.state.openHPChart) {
                this.openHPChart();
            } else if(this.state.openTurnChart) {
                this.openTurnChart();
            } else if(this.state.openSimulator) {
                this.openSimulator();
            }
        }
    },
    forceResultUpdate: function() {
        this.setState({result: this.calculateResult(this.props)})
    },
    openDisplayTable: function() {
        this.setState({openDisplayElementTable: !this.state.openDisplayElementTable})
    },
    render: function() {
        var locale = this.props.locale

        res = this.state.result;
        var prof = this.props.profile
        var arm = this.props.armlist
        var chara = this.props.chara
        var summon = this.props.summon

        // テスカトリポカ計算用
        var races = checkNumberofRaces(chara)
        var tesukatoripoka = getTesukatoripokaAmount

        var result = res.result
        var onAddToHaisuiData = this.addHaisuiData

        switcher = this.state;
        var armnames = []
        for(var i = 0; i < arm.length; i++){
            if(arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if(armname == '') {
                    armname = intl.translate("武器", locale) + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = []
        if(switcher.switchTotalAttack) {
            tableheader.push(intl.translate("攻撃力(二手技巧無し)", locale))
        }
        if(switcher.switchATKandHP) {
            tableheader.push(intl.translate("戦力", locale))
        }
        if(switcher.switchExpectedAttack) {
            tableheader.push(intl.translate("期待攻撃回数", locale))
        }
        if(switcher.switchCriticalAttack) {
            tableheader.push(intl.translate("技巧期待攻撃力", locale))
        }
        if(switcher.switchCriticalRatio) {
            tableheader.push(intl.translate("技巧期待値", locale))
        }
        if(switcher.switchHP) {
            tableheader.push("HP\n(" + intl.translate("残HP", locale) + ")")
        }
        if(switcher.switchAverageAttack) {
            tableheader.push(intl.translate("パーティ平均攻撃力", locale))
        }
        if(switcher.switchAverageCriticalAttack) {
            tableheader.push(intl.translate("技巧平均攻撃力", locale))
        }
        if(switcher.switchTotalExpected) {
            tableheader.push(intl.translate("総合*回数*技巧", locale))
        }
        if(switcher.switchAverageTotalExpected) {
            tableheader.push(intl.translate("総回技の平均", locale))
        }
        if(switcher.switchPureDamage) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧連撃無)", locale))
        }
        if(switcher.switchDamageWithCritical) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧有)", locale))
        }
        if(switcher.switchDamageWithMultiple) {
            tableheader.push(intl.translate("単攻撃ダメージ(連撃有)", locale))
        }
        if(switcher.switchDamage) {
            tableheader.push(intl.translate("単攻撃ダメージ(技巧連撃有)", locale))
        }
        if(switcher.switchOugiGage) {
            tableheader.push(intl.translate("ターン毎の奥義ゲージ上昇量", locale))
        }
        if(switcher.switchOugiDamage) {
            tableheader.push(intl.translate("奥義ダメージ", locale))
        }
        if(switcher.switchCycleDamage) {
            tableheader.push(intl.translate("予想ターン毎ダメージ", locale))
        }
        if(switcher.switchAverageCycleDamage) {
            tableheader.push(intl.translate("パーティ平均予想ターン毎ダメージ", locale))
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name
        var charaInfoStr = intl.translate("ジータさん", locale) + "(" + intl.translate(job, locale) + ") HP";
        if(prof.remainHP != undefined) {
            charaInfoStr += (parseInt(prof.remainHP) < parseInt(prof.hp)) ? prof.remainHP : prof.hp
        } else {
            charaInfoStr += prof.hp
        }
        charaInfoStr += "% (" + intl.translate(getTypeBonusStr(prof.element, prof.enemyElement), locale) + ")"
        var charaInfo = [<span key={0}>{getElementColorLabel(prof.element, locale)}&nbsp;{charaInfoStr}</span>]
        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "" && chara[i].isConsideredInAverage) {
                charaInfoStr = chara[i].name + " HP"
                if(chara[i].remainHP != undefined) {
                    charaInfoStr += (parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? chara[i].remainHP : prof.hp
                } else {
                    charaInfoStr += prof.hp
                }
                charaInfoStr += "% (" + intl.translate(getTypeBonusStr(chara[i].element, prof.enemyElement), locale) + ")"
                charaInfo.push(<span key={i + 1}>&nbsp;/&nbsp;{getElementColorLabel(chara[i].element, locale)}&nbsp;{charaInfoStr}</span>);
            }
        }
        buffInfoStr =  intl.translate("通常バフ", locale) + prof.normalBuff + "%, "
        buffInfoStr += intl.translate("属性バフ", locale) + prof.elementBuff + "%, "
        buffInfoStr += intl.translate("その他バフ", locale) + prof.otherBuff + "%, "
        buffInfoStr += intl.translate("DAバフ", locale) + prof.daBuff + "%, "
        buffInfoStr += intl.translate("TAバフ", locale) + prof.taBuff + "%, "
        buffInfoStr += intl.translate("追加ダメージバフ", locale) + ((prof.additionalDamageBuff == undefined) ? "0" : prof.additionalDamageBuff) + "%, "
        buffInfoStr += intl.translate("敵防御固有値", locale) + prof.enemyDefense

        if(_ua.Mobile || _ua.Tablet) {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "250px", padding: "0"}} value={this.props.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <Button block onClick={this.openDisplayTable}>
                    表示項目切替
                    </Button>
                    <Collapse in={this.state.openDisplayElementTable}>
                    <table style={{"width": "100%", textAlign: "center", marginBottom: "2px"}} className="table table-bordered"><tbody>
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
                        <td onClick={this.handleEvent.bind(this, "switchCharaAttack")} className={(this.state.switchCharaAttack == 1) ? "display-checked" : "display-unchecked"}> キャラ攻撃力</td>
                        <td onClick={this.handleEvent.bind(this, "switchCharaHP")} className={(this.state.switchCharaHP == 1) ? "display-checked" : "display-unchecked"}> キャラHP</td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchCharaDA")} className={(this.state.switchCharaDA == 1) ? "display-checked" : "display-unchecked"}> キャラ連続攻撃率</td>
                        <td onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} className={(this.state.switchCharaTotalExpected == 1) ? "display-checked" : "display-unchecked"}> キャラ総回技値</td>
                        <td onClick={this.handleEvent.bind(this, "switchSkillTotal")} className={(this.state.switchSkillTotal == 1) ? "display-checked" : "display-unchecked"}> スキル合計値</td>
                    </tr>
                    <tr>
                        <td onClick={this.handleEvent.bind(this, "switchDebuffResistance")} className={(this.state.switchDebuffResistance == 1) ? "display-checked" : "display-unchecked"}> 弱体耐性率</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody></table>
                    </Collapse>
                    <ControlAutoUpdate mobile autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    <hr/>
                    <p>優先する値:{changeSortKey}</p>
                    <hr/>
                    <Button block bsStyle="success" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >{intl.translate("背水グラフ", locale)}</Button>
                    <hr/>
                    {summon.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <p> No.{summonindex + 1} </p>
                                <ElementColorLabel element={s.selfElement}>{selfSummonHeader}</ElementColorLabel>
                                <ElementColorLabel element="all">+</ElementColorLabel>
                                <ElementColorLabel element={s.friendElement}>{friendSummonHeader}</ElementColorLabel>
                                <hr style={{"margin": "10px 0px"}}/>
                                <div className="charainfo">
                                    <div>{charaInfo}</div>
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                </div>
                                <table className="table table-bordered">
                                <thead className="result">
                                <tr>
                                    <th>{intl.translate("順位", locale)}</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind} >{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind}>{m}</th>;
                                        } else {
                                            return <th key={ind}>{m}</th>;
                                        }})
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
                            <Modal.Title>HP Charts ({charaInfoStr})</Modal.Title>
                            <Button bsStyle="info" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="primary" onClick={this.openStoredList}>保存された編成を編集</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList} onHide={this.closeStoredList} storedList={this.state.storedList} removeOneStoredList={this.removeOneStoredList} locale={locale} />
                </div>
            );

        } else {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "350px"}} value={this.props.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <Advertisement locale={locale} />
                    <hr />

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
                        <MenuItem onClick={this.handleEvent.bind(this, "switchOugiGage")} active={(this.state.switchOugiGage == 1) ? true : false}> {intl.translate("ターン毎の奥義ゲージ上昇量", locale)} </MenuItem>
                    </DropdownButton>

                    <DropdownButton title={intl.translate("キャラ情報・スキル合計値", locale)} id="chara-and-skill-info">
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaAttack")} active={(this.state.switchCharaAttack == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("攻撃力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaHP")} active={(this.state.switchCharaHP == 1) ? true : false}>{intl.translate("キャラ", locale)}HP</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaDA")} active={(this.state.switchCharaDA == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("連撃率", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} active={(this.state.switchCharaTotalExpected == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("総回技", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchSkillTotal")} active={(this.state.switchSkillTotal == 1) ? true : false}>{intl.translate("スキル合計", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchDebuffResistance")} active={(this.state.switchDebuffResistance == 1) ? true : false}>{intl.translate("弱体耐性率", locale)}</MenuItem>
                    </DropdownButton>
                    <ControlAutoUpdate autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    </ButtonToolbar>

                    <hr />

                    <ButtonGroup style={{width: "100%"}}>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="success" bsSize="large" onClick={this.openHPChart.bind(this, this.state.displayRealHP)} disabled={!this.state.ChartButtonActive} >{intl.translate("背水グラフ", locale)}</Button>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="success" bsSize="large" onClick={this.openTurnChart} disabled={!this.state.ChartButtonActive} >{intl.translate("初期攻撃力推移グラフを開く", locale)}</Button>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="success" bsSize="large" onClick={this.openSimulator} disabled={!this.state.ChartButtonActive} >{intl.translate("ダメージシミュレータを開く", locale)}</Button>
                    </ButtonGroup>

                    {summon.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性攻", locale) + s.selfSummonAmount + intl.translate("キャラ攻", locale) + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate(summonTypes[s.selfSummonType], locale) + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性攻", locale) + s.friendSummonAmount + intl.translate("キャラ攻", locale) + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate(summonTypes[s.friendSummonType], locale) + s.friendSummonAmount
                        }

                        return(
                            <div style={{textAlign:"left"}} key={summonindex} className="result">
                                <h2> No.{summonindex + 1} </h2>
                                <ElementColorLabel element={s.selfElement}>{selfSummonHeader}</ElementColorLabel>
                                <ElementColorLabel element="all">+</ElementColorLabel>
                                <ElementColorLabel element={s.friendElement}>{friendSummonHeader}</ElementColorLabel>
                                <hr style={{"margin": "10px 0px 5px 0px"}}/>
                                <div className="charainfo" style={{"float": "left"}}>
                                    {charaInfo}
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                    <span>{buffInfoStr}</span>
                                </div>
                                <div style={{"textAlign":"right", "float": "right"}}>
                                <span>[{intl.translate("優先項目", locale)}: {changeSortKey}]</span>
                                </div>
                                <table className="table table-bordered">
                                <thead className="result">
                                <tr>
                                    <th>{intl.translate("順位", locale)}</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind}>{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind}>{m}</th>;
                                        } else {
                                            return <th key={ind}>{m}</th>;
                                        }})
                                    }
                                    <th>{intl.translate("グラフ", locale)}</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} locale={locale}/>
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("背水渾身グラフ", locale)}</Modal.Title>
                                <div className="charainfo" style={{"float": "left"}}>
                                    {charaInfo}
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                    <span>{buffInfoStr}</span>
                                </div>
                                <div style={{"float": "right"}}>
                                    <Button bsStyle="info" onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                                    <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                    <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                    {(this.state.displayRealHP) ?
                                        <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("HP割合で表示", locale)}</Button>:
                                        <Button bsStyle="default" onClick={this.switchDisplayRealHP}>{intl.translate("実際のHPで表示", locale)}</Button>
                                    }
                                </div>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} displayRealHP={this.state.displayRealHP} />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openTurnChart} onHide={this.closeTurnChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("初期攻撃力推移グラフ", locale)}</Modal.Title>
                                <div className="charainfo" style={{"float": "left"}}>
                                    {charaInfo}
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                    <span>{buffInfoStr}</span>
                                </div>
                                <div style={{"float": "right"}}>
                                    <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                                    <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                                </div>
                        </Modal.Header>
                        <Modal.Body>
                            <TurnChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openSimulator} onHide={this.closeSimulator}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("ダメージシミュレータ", locale)}</Modal.Title>
                                <div className="charainfo" style={{"float": "left"}}>
                                    {charaInfo}
                                    <div>{getElementColorLabel(prof.enemyElement, locale)} {intl.translate("敵の属性", locale)}</div>
                                    <span>{buffInfoStr}</span>
                                </div>
                                <div style={{"float": "right"}}>
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
                                dataForLoad={this.props.dataForLoadSimulator}
                                locale={locale}
                                onChange={this.props.onChangeSimulationData}
                                storedList={this.state.storedList}
                                sortKey={this.state.chartSortKey}
                            />
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList} onHide={this.closeStoredList} storedList={this.state.storedList} removeOneStoredList={this.removeOneStoredList} locale={locale} />
                </div>
            );
        }
    }
});

var Result = React.createClass({
    onClick: function(e) {
        this.props.onAddToHaisuiData(e.target.id, this.props.summonid)
    },
    render: function() {
        var sw = this.props.switcher;
        var arm = this.props.arm;
        var prof = this.props.prof;
        var onClick = this.onClick;
        var locale = this.props.locale;

        return (
            <tbody className="result">
                {this.props.data.map(function(m, rank) {
                    var colSize = 2;
                    var tablebody = []
                    var tablebody2 = {};
                    // initialize tablebody2
                    for(key in m.data){
                        tablebody2[key] = "";
                    }

                    if(sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                        ++colSize;
                    }
                    if(sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + "\n(" + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                        ++colSize;
                    }
                    if(sw.switchCharaAttack) {
                        for(key in m.data){
                            tablebody2[key] += intl.translate("攻撃力", locale) + m.data[key].totalAttack + ", "
                        }
                    }

                    if(sw.switchDATA) {
                        tablebody2["Djeeta"] += 'DA:' + (100.0 * m.data.Djeeta.totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data.Djeeta.totalTA).toFixed(1) + '%, '
                    }

                    if(sw.switchCharaDA) {
                        for(key in m.data){
                            // switchDATAが指定されていなかったら全員分
                            // 指定されていたらDjeetaじゃない場合だけ
                            if(!sw.switchDATA || (key != "Djeeta")) {
                                tablebody2[key] += 'DA:' + (100.0 * m.data[key].totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data[key].totalTA).toFixed(1) + '%, '
                            }
                        }
                    }

                    if(sw.switchDebuffResistance) {
                        for(key in m.data){
                            // 弱体耐性率は%表記のまま扱う
                            tablebody2[key] += "弱体耐性率 " + parseInt(m.data[key].debuffResistance) + "%, "
                        }
                    }

                    if(sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(4) + "\n(" + expectedAttack + ")")
                        ++colSize;
                    }
                    if(sw.switchCriticalAttack) {
                        tablebody.push(m.data.Djeeta.criticalAttack)
                        ++colSize;
                    }
                    if(sw.switchCriticalRatio) {
                        if( getTypeBonus(prof.element, prof.enemyElement) == 1.5) {
                            tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.effectiveCriticalRatio.toFixed(4) + ")")
                            ++colSize;
                        } else {
                            tablebody.push(intl.translate("非有利", locale))
                            ++colSize;
                        }
                    }
                    if(sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "\n(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                        ++colSize;
                    }
                    if(sw.switchCharaHP) {
                        for(key in m.data){
                            tablebody2[key] += "HP" + m.data[key].totalHP + "\n (" + intl.translate("残HP", locale) + " " + parseInt(m.data[key].totalHP * m.data[key].remainHP) + "), "
                        }
                    }
                    if(sw.switchAverageAttack) {
                        tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                        ++colSize;
                    }
                    if(sw.switchAverageCriticalAttack) {
                        tablebody.push(m.data.Djeeta.averageCriticalAttack)
                        ++colSize;
                    }
                    if(sw.switchTotalExpected) {
                        tablebody.push(m.data.Djeeta.totalExpected)
                        ++colSize;
                    }
                    if(sw.switchCharaTotalExpected) {
                        for(key in m.data){
                            tablebody2[key] += intl.translate("総回技", locale) + m.data[key].totalExpected + ", "
                        }
                    }
                    if(sw.switchAverageTotalExpected) {
                        tablebody.push(m.data.Djeeta.averageTotalExpected)
                        ++colSize;
                    }
                    if(sw.switchPureDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.pureDamage))
                        ++colSize;
                    }
                    if(sw.switchDamageWithCritical) {
                        tablebody.push(parseInt(m.data.Djeeta.damageWithCritical))
                        ++colSize;
                    }
                    if(sw.switchDamageWithMultiple) {
                        tablebody.push(parseInt(m.data.Djeeta.damageWithMultiple))
                        ++colSize;
                    }
                    if(sw.switchDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.damage))
                        ++colSize;
                    }
                    if(sw.switchOugiGage) {
                        tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn.toFixed(2) + "T)")
                        ++colSize;
                    }
                    if(sw.switchOugiDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.ougiDamage))
                        ++colSize;
                    }
                    if(sw.switchCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.expectedCycleDamagePerTurn))
                        ++colSize;
                    }
                    if(sw.switchAverageCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.averageCyclePerTurn))
                        ++colSize;
                    }

                    if(sw.switchSkillTotal) {
                        for(var key in m.data){
                            var skillstr = "";
                            var skilldata = m.data[key].skilldata

                            if(skilldata.normal != 1.0) {skillstr += intl.translate("通常攻刃", locale) + (100.0 * (skilldata.normal - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.normalHaisui != 1.0) {skillstr += intl.translate("通常背水", locale) + (100.0 * (skilldata.normalHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.normalKonshin != 1.0) {skillstr += intl.translate("通常渾身", locale) + (100.0 * (skilldata.normalKonshin - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.element != 1.0) {skillstr += intl.translate("属性", locale) + (100.0 * (skilldata.element - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.magna != 1.0) {skillstr += intl.translate("マグナ", locale) + (100.0 * (skilldata.magna - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.magnaHaisui != 1.0) {skillstr += intl.translate("マグナ背水", locale) + (100.0 * (skilldata.magnaHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.unknown != 1.0) {skillstr += intl.translate("アンノウン", locale) + (100.0 * (skilldata.unknown - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.unknownHaisui != 1.0) {skillstr += intl.translate("アンノウン背水", locale) + (100.0 * (skilldata.unknownHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.charaHaisui != 1.0) {skillstr += intl.translate("キャラ背水", locale) + (100.0 * (skilldata.charaHaisui - 1.0)).toFixed(1); skillstr += "% ";}

                            if(skilldata.normalDA != 0.0) {skillstr += intl.translate("DA上昇(通常)", locale) + skilldata.normalDA.toFixed(1); skillstr += "% ";}
                            if(skilldata.magnaDA != 0.0) {skillstr += intl.translate("DA上昇(マグナ)", locale) + skilldata.magnaDA.toFixed(1); skillstr += "% ";}
                            if(skilldata.exDA != 0.0) {skillstr += intl.translate("DA上昇(EX)", locale) + skilldata.exDA.toFixed(1); skillstr += "% ";}
                            if(skilldata.bahaDA != 0.0) {skillstr += intl.translate("DA上昇(バハ)", locale) + skilldata.bahaDA.toFixed(1); skillstr += "% ";}
                            if(skilldata.cosmosDA != 0.0) {skillstr += intl.translate("DA上昇(コスモス)", locale) + skilldata.cosmosDA.toFixed(1); skillstr += "% ";}
                            if(skilldata.otherDA != 0.0) {skillstr += intl.translate("DA上昇(その他)", locale) + skilldata.otherDA.toFixed(1); skillstr += "% ";}

                            if(skilldata.normalTA != 0.0) {skillstr += intl.translate("TA上昇(通常)", locale) + skilldata.normalTA.toFixed(1); skillstr += "% ";}
                            if(skilldata.magnaTA != 0.0) {skillstr += intl.translate("TA上昇(マグナ)", locale) + skilldata.magnaTA.toFixed(1); skillstr += "% ";}
                            if(skilldata.bahaTA != 0.0) {skillstr += intl.translate("TA上昇(バハ)", locale) + skilldata.bahaTA.toFixed(1); skillstr += "% ";}
                            if(skilldata.otherTA != 0.0) {skillstr += intl.translate("TA上昇(その他)", locale) + skilldata.otherTA.toFixed(1); skillstr += "% ";}

                            if(skilldata.additionalDamage != 0.0) {skillstr += intl.translate("追加ダメージ", locale) + (100.0 * skilldata.additionalDamage).toFixed(1); skillstr += "% ";}
                            if(skilldata.damageUP != 0.0) {skillstr += intl.translate("与ダメージ上昇", locale) + (100.0 * skilldata.damageUP).toFixed(1); skillstr += "% ";}
                            if(skilldata.hpRatio != 1.0) {skillstr += intl.translate("HP増加", locale) + (100.0 * (skilldata.hpRatio - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.other != 1.0) {skillstr += intl.translate("その他バフ", locale) + (100.0 * (skilldata.other - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.ougiDamageBuff != 0.0) {skillstr += intl.translate("奥義ダメージ", locale) + (100.0 * (1.0 + skilldata.ougiDamageBuff)).toFixed(0); skillstr += "% ";}

                            tablebody2[key] += skillstr;
                        }
                    }

                    var res = [
                        <tr className="result" title={skillstr} key={rank + 1}>
                            <td>{rank + 1}</td>
                            {tablebody.map(function(am, ind){
                                return (<td key={ind} >{am}</td>);
                            })}
                            {m.armNumbers.map(function(am, ind){
                                if(arm[ind].considerNumberMax != 0) {
                                    ++colSize;
                                    if(parseInt(am) > 0) {
                                        return (<td key={ind}><span className="text-info"><strong>{am} {intl.translate("本", locale)}</strong></span></td>);
                                    } else {
                                        return (<td key={ind}><span className="text-muted">{am} {intl.translate("本", locale)}</span></td>);
                                    }
                                }
                             })}
                            <td><Button id={rank} block bsStyle="primary" className="add-graph-button" onClick={onClick}>{intl.translate("追加", locale)}</Button></td>
                        </tr>,
                    ];

                    for(var key in tablebody2) {
                        if(tablebody2[key] != "") {
                            res.push(<tr>
                                <td colSpan="4">
                                    <span className="text-info">{key}</span>
                                </td>
                                <td style={{"textAlign": "left"}} colSpan={colSize - 4}>
                                    <span>{tablebody2[key]}</span>
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

var StoredListEditor = React.createClass({
    render: function() {
        var locale = this.props.locale
        var combinations = this.props.storedList.combinations
        var armlist = this.props.storedList.armlist
        var removeOneStoredList = this.props.removeOneStoredList
        return (
            <Modal className="hpChartTutotial" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.translate("保存済みの編成", locale)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>No.</th>
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

var ControlAutoUpdate = React.createClass({
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
