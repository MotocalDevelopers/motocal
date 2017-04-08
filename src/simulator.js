var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var {SimulationChart} = require('./chart.js')
var GlobalConst = require('./global_const.js')
var selector = GlobalConst.selector
var turnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var turnTypeList = {"normal": "通常攻撃", "ougi": "奥義", "ougiNoDamage": "奥義(ダメージ無し)"};
var HPList = [ 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
var buffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150];
var daBuffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

var select_turnlist = turnList.map(function(opt){return <option value={opt} key={opt}>最大ターン数:{opt}</option>;});
var select_turntype = Object.keys(turnTypeList).map(function(opt){return <option value={opt} key={opt}>{turnTypeList[opt]}</option>;});
var select_normalbuffAmount = buffAmountList.map(function(opt){ return <option value={"normal-" + opt} key={opt}>通常バフ+{opt}%</option> });
var select_elementbuffAmount = buffAmountList.map(function(opt){ return <option value={"element-" + opt} key={opt}>属性バフ+{opt}%</option> });
var select_otherbuffAmount = buffAmountList.map(function(opt){ return <option value={"other-" + opt} key={opt}>その他バフ+{opt}%</option> });
var select_dabuffAmount = daBuffAmountList.map(function(opt){ return <option value={"DA-" + opt} key={opt}>DA率+{opt}%</option> });
var select_tabuffAmount = daBuffAmountList.map(function(opt){ return <option value={"TA-" + opt} key={opt}>TA率+{opt}%</option> });
var select_hplist = HPList.map(function(opt){return <option value={opt} key={opt}>残りHP:{opt}%</option>;});

// logic
function generateSimulationData(res, turnBuff, arml, summon, prof, buff, chara, storedCombinations) {
    var data = {}
    var minMaxArr = {
        "averageAttack": {"max": 0, "min": 0},
        "averageTotalExpected": {"max": 0, "min": 0},
        "expectedDamage": {"max": 0, "min": 0},
        "averageExpectedDamage": {"max": 0, "min": 0},
        "summedAverageExpectedDamage": {"max": 0, "min": 0},
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
        var AllAverageTotalAttack = [["ターン"]];
        var AllAverageTotalExpected = [["ターン"]];
        var AllExpectedDamage = [["ターン"]];
        var AllAverageExpectedDamage = [["ターン"]];
        var AllSummedAverageExpectedDamage = [["ターン"]];

        for(var m = 1; m <= turnBuff.maxTurn; m++){
            AllAverageTotalAttack.push([m])
            AllAverageTotalExpected.push([m])
            AllExpectedDamage.push([m])
            AllAverageExpectedDamage.push([m])
            AllSummedAverageExpectedDamage.push([m])
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
        var AverageTotalAttack = [["ターン"]];
        var AverageTotalExpected = [["ターン"]];
        var ExpectedDamage = [["ターン"]];
        var AverageExpectedDamage = [["ターン"]];
        var SummedAverageExpectedDamage = [["ターン"]];

        for(var m = 1; m <= turnBuff.maxTurn; m++){
            AverageTotalAttack.push([m])
            AverageTotalExpected.push([m])
            ExpectedDamage.push([m])
            AverageExpectedDamage.push([m])
            SummedAverageExpectedDamage.push([m])

            for(var j = 0; j < oneresult[0].length; j++) {
                AverageExpectedDamage[m].push(0)
                SummedAverageExpectedDamage[m].push(0)
            }
        }

        for(var t = 1; t <= turnBuff.maxTurn; t++){
            var turndata = oneresult[t - 1]
            for(var j = 0; j < turndata.length; j++){
                var onedata = turndata[j].data

                AverageTotalAttack[t].push( onedata["Djeeta"].averageAttack )
                AverageTotalExpected[t].push( onedata["Djeeta"].averageTotalExpected )

                for(key in onedata) {
                    if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougi" || turnBuff.buffs[key][t-1].turnType == "ougi") {
                        // 基本的に奥義の設定が優先
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * onedata[key].totalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff, onedata[key].skilldata.damageUP)

                        if(key == "Djeeta") {
                            ExpectedDamage[t].push( parseInt(newOugiDamage) )
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                        } else if(considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                        }

                    } else if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougiNoDamage" || turnBuff.buffs[key][t-1].turnType == "ougiNoDamage") {
                        // しコルワ
                        if(key == "Djeeta") {
                            ExpectedDamage[t].push(0)
                        }
                    } else {
                        // 通常攻撃
                        var newDamage = this.calculateDamage(onedata[key].criticalRatio * onedata[key].totalAttack, prof.enemyDefense, onedata[key].skilldata.additionalDamage, onedata[key].skilldata.damageUP)
                        if(key == "Djeeta") {
                            ExpectedDamage[t].push( parseInt(newDamage * onedata[key].expectedAttack) )
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                        } else if(considerAverageArray[key]) {
                            AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                        }
                    }
                }

                if(t == 1) {
                    var title = "No. " + (j+1).toString() + ":"
                    for(var i=0; i < arml.length; i++){
                        if(storedCombinations[j][i] > 0) {
                            var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                            title += name + storedCombinations[j][i] + "本\n"
                        }
                    }
                    AverageTotalAttack[0].push(title)
                    AverageTotalExpected[0].push(title)
                    ExpectedDamage[0].push(title)
                    AverageExpectedDamage[0].push(title)
                    SummedAverageExpectedDamage[0].push(title)

                    // 召喚石2組以上の場合
                    if(res.length > 1) {
                        AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                        AllAverageTotalExpected[0].push("(" + summonHeader + ")" + title)
                        AllExpectedDamage[0].push("(" + summonHeader + ")" + title)
                        AllAverageExpectedDamage[0].push("(" + summonHeader + ")" + title)
                        AllSummedAverageExpectedDamage[0].push("(" + summonHeader + ")" + title)
                    }
                    SummedAverageExpectedDamage[t][j + 1] = AverageExpectedDamage[t][j + 1]
                } else {
                    SummedAverageExpectedDamage[t][j + 1] = SummedAverageExpectedDamage[t - 1][j + 1] + AverageExpectedDamage[t][j + 1]
                }

                if(res.length > 1) {
                    AllAverageTotalAttack[t].push(AverageTotalAttack[t][j + 1])
                    AllAverageTotalExpected[t].push(AverageTotalExpected[t][j + 1])
                    AllExpectedDamage[t].push(ExpectedDamage[t][j + 1])
                    AllAverageExpectedDamage[t].push(AverageExpectedDamage[t][j + 1])
                    AllSummedAverageExpectedDamage[t].push(SummedAverageExpectedDamage[t][j + 1])
                }
            }
        }

        data[summonHeader] = {}
        data[summonHeader]["averageAttack"] = AverageTotalAttack
        data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
        data[summonHeader]["expectedDamage"] = ExpectedDamage
        data[summonHeader]["averageExpectedDamage"] = AverageExpectedDamage
        data[summonHeader]["summedAverageExpectedDamage"] = SummedAverageExpectedDamage
    }

    if(res.length > 1){
        data["まとめて比較"] = {}
        data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
        data["まとめて比較"]["averageTotalExpected"] = AllAverageTotalExpected
        data["まとめて比較"]["expectedDamage"] = AllExpectedDamage
        data["まとめて比較"]["averageExpectedDamage"] = AllAverageExpectedDamage
        data["まとめて比較"]["summedAverageExpectedDamage"] = AllSummedAverageExpectedDamage
    }

    // グラフ最大値最小値を抽出
    for(key in minMaxArr) {
        for(summonkey in data) {
            for(var k = 1; k <= turnBuff.maxTurn; k++){
                for(var j = 1; j <= res[0][0].length; j++){
                    // グラフ最大値最小値を保存
                    if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                    if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                }
            }
        }
    }

    data["minMaxArr"] = minMaxArr
    return data
}

var Simulator = React.createClass({
    componentDidMount: function(){
        // 初期化後 state を 上の階層に渡しておく
        this.props.onChange(this.state);
    },
    componentWillReceiveProps: function(nextProps){
        var newState = this.state

        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            newState = nextProps.dataForLoad
            this.setState(newState)
            return 0;
        }

        // 削除されてるかチェック
        for(key in newState.buffs) {
            if(key != "全体バフ" && key != "Djeeta"){
                var isCharaExist = false
                for(var i = 0; i < nextProps.chara.length; i++) {
                    if(key == nextProps.chara[i].name) isCharaExist = true
                }

                if(!isCharaExist) {
                    delete newState.buffs[key]
                    delete newState.bufflists[key]
                }
            }
        }

        // 追加
        for(var i = 0; i < this.props.chara.length; i++){
            if(nextProps.chara[i] != undefined) {
                var namekey = nextProps.chara[i].name
                if(namekey != "" && !(namekey in this.state.buffs)) {
                    newState.buffs[namekey] = {}
                    newState.bufflists[namekey] = {}

                    for(var j = 0; j < this.state.maxTurn; j++) {
                        newState.buffs[namekey][j] = {normal: 0, element: 0, other: 0, DA: 0, TA: 0, turnType: "normal", remainHP: 100}
                        newState.bufflists[namekey][j] = ["normal-0"]
                    }
                }
            }
        }
        this.setState(newState)
    },
    getInitialState: function() {
        var maxTurn = 4
        // 合計後のデータを入れる連想配列
        var buffs = {}
        // 各選択メニューに対応する連想配列
        var bufflists = {}
        buffs["全体バフ"] = {}
        buffs["Djeeta"] = {}
        bufflists["全体バフ"] = {}
        bufflists["Djeeta"] = {}

        for(var i = 0; i < this.props.chara.length; i++){
            if(this.props.chara[i].name != "") {
                buffs[i] = {}
                bufflists[i] = {}
            }
        }

        for(var i = 0; i < maxTurn; i++) {
            for(key in buffs) {
                buffs[key][i] = {normal: 0, element: 0, other: 0, DA: 0, TA: 0, turnType: "normal", remainHP: 100}
                bufflists[key][i] = ["normal-0"]
            }
        }
        return {
            buffs: buffs,
            bufflists: bufflists,
            maxTurn: maxTurn,
        };
    },
    updateBuffAmount: function(newState, name, ind){
        // 更新されたターンのところだけアップデートすればよい
        newState.buffs[name][ind].normal = 0
        newState.buffs[name][ind].element = 0
        newState.buffs[name][ind].other = 0
        newState.buffs[name][ind].DA = 0
        newState.buffs[name][ind].TA = 0

        for(var i = 0; i < newState.bufflists[name][ind].length; i++) {
            var onebuff = newState.bufflists[name][ind][i].split("-")
            newState.buffs[name][ind][onebuff[0]] += parseInt(onebuff[1])
        }

        this.setState(newState)
        this.props.onChange(newState)
    },
    updateBuffAmountAllTurn: function(newState, name){
        // 更新されたターンのところだけアップデートすればよい
        for(var j = 0; j < this.state.maxTurn; j++) {
            newState.buffs[name][j].normal = 0
            newState.buffs[name][j].element = 0
            newState.buffs[name][j].other = 0
            newState.buffs[name][j].DA = 0
            newState.buffs[name][j].TA = 0

            for(var i = 0; i < newState.bufflists[name][j].length; i++) {
                var onebuff = newState.bufflists[name][j][i].split("-")
                newState.buffs[name][j][onebuff[0]] += parseInt(onebuff[1])
            }
        }

        this.setState(newState)
        this.props.onChange(newState)
    },
    handleSelectEvent: function(key, e) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state
        if(key == "maxTurn") {
            if(parseInt(this.state.maxTurn) < parseInt(e.target.value)) {
                // ターン数が増えた場合
                for(var i = parseInt(this.state.maxTurn); i < parseInt(e.target.value); i++) {
                    for(buffkey in newState.buffs) {
                        newState.buffs[buffkey][i] = {normal: 0, element: 0, other: 0, DA: 0, TA: 0, turnType: "normal", remainHP: 100}
                        newState.bufflists[buffkey][i] = ["normal-0"]
                    }
                }
            } else {
                // ターン数が減った場合
                for(var i = parseInt(this.state.maxTurn) - 1; i >= parseInt(e.target.value); i--) {
                    for(buffkey in newState.buffs) {
                        delete newState.buffs[buffkey][i];
                        delete newState.bufflists[buffkey][i];
                    }
                }
            }
        }
        newState[key] = parseInt(e.target.value)
        this.setState(newState)
        this.props.onChange(newState)
    },
    isDisplay: function(key) {
        if(key == "Djeeta" || key == "全体バフ") {
            return true
        } else {
            for(var i = 0; i < this.props.chara.length; i++){
                if(this.props.chara[i].name == key) {
                    return this.props.chara[i].isConsideredInAverage
                }
            }
        }
    },
    handleChangeBuff: function(e) {
        var newState = this.state
        var id = e.target.getAttribute("id").split("-")
        var name = e.target.getAttribute("name")
        newState.bufflists[name][id[0]][id[1]] = e.target.value
        this.updateBuffAmount(newState, name, id[0])
    },
    handleRemainHPChange: function(e) {
        var newState = this.state
        var name = e.target.getAttribute("name")
        var id = e.target.getAttribute("id")
        newState.buffs[name][id]["remainHP"] = parseInt(e.target.value)
        this.updateBuffAmount(newState, name, id)
    },
    handleTurnTypeChange: function(e) {
        var newState = this.state
        var name = e.target.getAttribute("name")
        var id = e.target.getAttribute("id")
        newState.buffs[name][id]["turnType"] = e.target.value
        this.updateBuffAmount(newState, name, id)
    },
    addBuffNum: function(e) {
        var newbuff = this.state.bufflists
        var name = e.target.getAttribute("name")
        var id = e.target.getAttribute("id")
        if(newbuff[name][id].length < 7) {
            newbuff[name][id].push("normal-0")
            this.setState({bufflists: newbuff})
        }
    },
    subBuffNum: function(e) {
        var newbuff = this.state.bufflists
        var name = e.target.getAttribute("name")
        var id = e.target.getAttribute("id")
        if(newbuff[name][id].length > 1) {
            newbuff[name][id].pop()
            this.setState({bufflists: newbuff})
        }
    },
    copyBuffTo: function(e, direction) {
        var newState = this.state
        var keys = Object.keys(newState.bufflists)
        var name = e.target.getAttribute("name")
        var id = parseInt(e.target.getAttribute("id"))
        var index = 1
        if(direction == "up") {
            while(id - index >= 0) {
                if(this.isDisplay(keys[id - index])) {
                    newState.buffs[keys[id - index]] = JSON.parse(JSON.stringify(newState.buffs[name]))
                    newState.bufflists[keys[id - index]] = JSON.parse(JSON.stringify(newState.bufflists[name]))
                    // updateBuffAmount は必要ない（Buffsもコピーしているので）
                    this.props.onChange(newState)
                    break;
                } else {
                    index++;
                }
            }
        } else {
            while(id + index < keys.length) {
                if(this.isDisplay(keys[id + index])) {
                    newState.buffs[keys[id + index]] = JSON.parse(JSON.stringify(newState.buffs[name]))
                    newState.bufflists[keys[id + index]] = JSON.parse(JSON.stringify(newState.bufflists[name]))
                    // updateBuffAmount は必要ない（Buffsもコピーしているので）
                    this.props.onChange(newState)
                    break;
                } else {
                    index++;
                }
            }
        }
    },
    copyBuffToUP: function(e) {
        this.copyBuffTo(e, "up")
    },
    copyBuffToDown: function(e) {
        this.copyBuffTo(e, "down")
    },
    copyTo: function(e, direction) {
        var newState = this.state
        var name = e.target.getAttribute("name")
        var id = parseInt(e.target.getAttribute("id"))

        if(direction == "left") {
            if(id > 0) {
                newState.buffs[name][id - 1] = JSON.parse(JSON.stringify(newState.buffs[name][id]))
                newState.bufflists[name][id - 1] = JSON.parse(JSON.stringify(newState.bufflists[name][id]))
                // updateBuffAmount は必要ない（Buffsもコピーしているので）
                this.props.onChange(newState)
            }
        } else {
            if(id < this.state.maxTurn - 1) {
                newState.buffs[name][id + 1] = JSON.parse(JSON.stringify(newState.buffs[name][id]))
                newState.bufflists[name][id + 1] = JSON.parse(JSON.stringify(newState.bufflists[name][id]))
                this.props.onChange(newState)
            }
        }
    },
    copyToLeft: function(e) {
        this.copyTo(e, "left")
    },
    copyToRight: function(e) {
        this.copyTo(e, "right")
    },
    render: function() {
        var Turns = [];
        for(var i = 0; i < this.state.maxTurn; i++){
            Turns.push(i + 1)
        }
        var state = this.state
        var handleSelectEvent = this.handleSelectEvent
        var handleEvent = this.handleEvent
        var handleBuffDataChange = this.handleBuffDataChange
        var handleTurnTypeChange = this.handleTurnTypeChange
        var handleRemainHPChange = this.handleRemainHPChange
        var handleChangeBuff = this.handleChangeBuff
        var addBuffNum = this.addBuffNum
        var subBuffNum = this.subBuffNum
        var copyBuffToUP = this.copyBuffToUP
        var copyBuffToDown = this.copyBuffToDown
        var copyToLeft = this.copyToLeft
        var copyToRight = this.copyToRight
        var isDisplay = this.isDisplay
        var chartData = generateSimulationData(res, turnBuff, armlist, summon, prof, buff, chara, this.props.storedList.combinations)

        return (
            <div className="simulatorInput">
                <h3> シミュレータ用入力 </h3>
                <span>各ターンのバフやHP等を設定して下さい。</span>
                <FormControl
                    componentClass="select"
                    value={this.state.maxTurn}
                    style={{"width": "150px"}}
                    onChange={this.handleSelectEvent.bind(this, "maxTurn")}>
                    {select_turnlist}
                </FormControl>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="simulator-left"></th>
                        {Turns.map(function(x){return <th className="simulator-th" key={x}>{x}ターン目</th>})}
                        <th className="simulator-th">操作</th>
                    </tr>
                    {Object.keys(this.state.buffs).map(function(key, ind){
                        if(isDisplay(key)) {
                            return (
                            <tr key={key}>
                                <td className="simulator-left">{key}</td>
                                {Turns.map(function(x, ind2){
                                    return (
                                        <td key={ind2} className="simulator-td">
                                        <FormControl componentClass="select" name={key} id={ind2.toString()} value={state.buffs[key][ind2].turnType} onChange={handleTurnTypeChange}>{select_turntype}</FormControl>
                                        <FormControl componentClass="select" name={key} id={ind2.toString()} value={state.buffs[key][ind2].remainHP} onChange={handleRemainHPChange}>{select_hplist}</FormControl>

                                        {state.bufflists[key][ind2].map(function(v, ind3){
                                            return (
                                                <BuffListForm key={ind3} name={key} id={ind2.toString() + "-" + ind3.toString()} value={v} onChange={handleChangeBuff}/>
                                            );
                                        })}
                                        <ButtonGroup>
                                            <Button bsStyle="default" className="btn-nopadding" onClick={copyToLeft} name={key} id={ind2.toString()}><i name={key} id={ind2.toString()} className="fa fa-arrow-left" aria-hidden="true"></i></Button>
                                            <Button bsStyle="default" className="btn-nopadding" onClick={addBuffNum} name={key} id={ind2.toString()}><i name={key} id={ind2.toString()} className="fa fa-plus-square" aria-hidden="true"></i></Button>
                                            <Button bsStyle="default" className="btn-nopadding" onClick={subBuffNum} name={key} id={ind2.toString()}><i name={key} id={ind2.toString()} className="fa fa-minus-square" aria-hidden="true"></i></Button>
                                            <Button bsStyle="default" className="btn-nopadding" onClick={copyToRight} name={key} id={ind2.toString()}><i name={key} id={ind2.toString()} className="fa fa-arrow-right" aria-hidden="true"></i></Button>
                                        </ButtonGroup>
                                        </td>
                                    );
                                })}
                                <td className="simulator-td">
                                    <Button block bsStyle="primary" name={key} id={ind.toString()} onClick={copyBuffToUP} ><i name={key} id={ind.toString()} className="fa fa-angle-double-up" aria-hidden="true"></i> 上にコピー</Button>
                                    <Button block bsStyle="primary" name={key} id={ind.toString()} onClick={copyBuffToDown} ><i name={key} id={ind.toString()} className="fa fa-angle-double-down" aria-hidden="true"></i> 下にコピー</Button>
                                </td>
                            </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
                {/*<SimulationChart data={chartData} sortKey={this.state.chartSortKey} locale={this.props.locale} />*/}
            </div>
        );
    }
});

var BuffListForm = React.createClass({
    render: function() {
        return (
            <FormControl componentClass="select" name={this.props.name} id={this.props.id} value={this.props.value} onChange={this.props.onChange}>
                <optgroup label="通常バフ">{select_normalbuffAmount}</optgroup>
                <optgroup label="属性バフ">{select_elementbuffAmount}</optgroup>
                <optgroup label="その他バフ">{select_otherbuffAmount}</optgroup>
                <optgroup label="DA率">{select_dabuffAmount}</optgroup>
                <optgroup label="TA率">{select_tabuffAmount}</optgroup>
            </FormControl>
        );
    },
});

module.exports = Simulator;
module.exports.BuffListForm = BuffListForm;
