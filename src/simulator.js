var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var selector = GlobalConst.selector
var turnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var turnTypeList = {"normal": "通常攻撃", "ougi": "奥義", "ougiNoDamage": "奥義(ダメージ無し)"};
var HPList = [ 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
var buffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150];
var daBuffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
var turnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var select_turnlist = turnList.map(function(opt){return <option value={opt} key={opt}>最大ターン数:{opt}</option>;});
var select_turntype = Object.keys(turnTypeList).map(function(opt){return <option value={opt} key={opt}>{turnTypeList[opt]}</option>;});
var select_normalbuffAmount = buffAmountList.map(function(opt){ return <option value={"normal-" + opt} key={opt}>通常バフ+{opt}%</option> });
var select_elementbuffAmount = buffAmountList.map(function(opt){ return <option value={"element-" + opt} key={opt}>属性バフ+{opt}%</option> });
var select_otherbuffAmount = buffAmountList.map(function(opt){ return <option value={"other-" + opt} key={opt}>その他バフ+{opt}%</option> });
var select_dabuffAmount = daBuffAmountList.map(function(opt){ return <option value={"DA-" + opt} key={opt}>DA率+{opt}%</option> });
var select_tabuffAmount = daBuffAmountList.map(function(opt){ return <option value={"TA-" + opt} key={opt}>TA率+{opt}%</option> });
var select_hplist = HPList.map(function(opt){return <option value={opt} key={opt}>残りHP:{opt}%</option>;});

var SimulatorInput = React.createClass({
    componentDidMount: function(){
        // 初期化後 state を 上の階層に渡しておく
        this.props.onChange(this.state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        // if(nextProps.dataName != this.props.dataName) {
        //     var newState = newData.simulator
        //     this.setState(newState);
        //     this.props.onChange(newState);
        // }

        var newState = this.state

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
    handleChangeBuff: function(e) {
        var newState = this.state
        var id = e.target.id.split("-")
        newState.bufflists[e.target.name][id[0]][id[1]] = e.target.value
        this.updateBuffAmount(newState, e.target.name, id[0])
    },
    handleRemainHPChange: function(e) {
        var newState = this.state
        newState.buffs[e.target.name][e.target.id]["remainHP"] = parseInt(e.target.value)
        this.updateBuffAmount(newState, e.target.name, e.target.id)
    },
    handleTurnTypeChange: function(e) {
        var newState = this.state
        newState.buffs[e.target.name][e.target.id]["turnType"] = e.target.value
        this.updateBuffAmount(newState, e.target.name, e.target.id)
    },
    addBuffNum: function(e) {
        var newbuff = this.state.bufflists
        if(newbuff[e.target.name][e.target.id].length < 7) {
            newbuff[e.target.name][e.target.id].push("normal-0")
            this.setState({bufflists: newbuff})
        }
    },
    subBuffNum: function(e) {
        var newbuff = this.state.bufflists
        if(newbuff[e.target.name][e.target.id].length > 1) {
            newbuff[e.target.name][e.target.id].pop()
            this.setState({bufflists: newbuff})
        }
    },
    copyBuff: function(e) {
        var newState = this.state
        var keys = Object.keys(newState.bufflists)
        if(parseInt(e.target.id) < keys.length - 1) {
            newState.buffs[keys[parseInt(e.target.id) + 1]] = JSON.parse(JSON.stringify(newState.buffs[e.target.name]))
            newState.bufflists[keys[parseInt(e.target.id) + 1]] = JSON.parse(JSON.stringify(newState.bufflists[e.target.name]))
            this.updateBuffAmountAllTurn(newState, keys[parseInt(e.target.id) + 1])
        }
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
        var copyBuff = this.copyBuff

        return (
            <div className="simulatorInput">
                <h3> シミュレータ用入力 </h3>
                <span>各ターンのバフやHP等を設定して下さい。</span> <FormControl componentClass="select" value={this.state.maxTurn} onChange={this.handleSelectEvent.bind(this, "maxTurn")}>{select_turnlist}</FormControl>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="simulator-td"></th>
                        {Turns.map(function(x){return <th className="simulator-th" key={x}>{x}ターン目</th>})}
                        <th className="simulator-th">操作</th>
                    </tr>
                    {Object.keys(this.state.buffs).map(function(key, ind){
                        return (
                        <tr key={key}>
                            <td className="simulator-td">{key}</td>
                            {Turns.map(function(x, ind2){
                                return (
                                    <td key={ind2} className="simulator-td">
                                    <FormControl componentClass="select" name={key} id={ind2.toString()} value={state.buffs[key][ind2].turnType} onChange={handleTurnTypeChange}>{select_turntype}</FormControl>
                                    <FormControl componentClass="select" name={key} id={ind2.toString()} value={state.buffs[key][ind2].remainHP} onChange={handleRemainHPChange}>{select_hplist}</FormControl>

                                    {state.bufflists[key][ind2].map(function(v, ind3){
                                        return (
                                            <FormControl componentClass="select" key={ind3} name={key} id={ind2.toString() + "-" + ind3.toString()} value={v} onChange={handleChangeBuff}>
                                            <optgroup label="通常バフ">{select_normalbuffAmount}</optgroup>
                                            <optgroup label="属性バフ">{select_elementbuffAmount}</optgroup>
                                            <optgroup label="その他バフ">{select_otherbuffAmount}</optgroup>
                                            <optgroup label="DA率">{select_dabuffAmount}</optgroup>
                                            <optgroup label="TA率">{select_tabuffAmount}</optgroup>
                                            </FormControl>
                                        );
                                    })}
                                    <ButtonGroup>
                                        <Button bsStyle="primary" onClick={addBuffNum} name={key} id={ind2.toString()}>追加</Button>
                                        <Button bsStyle="primary" onClick={subBuffNum} name={key} id={ind2.toString()}>削除</Button>
                                    </ButtonGroup>
                                    </td>
                                );
                            })}
                            <td className="simulator-td">
                                <ButtonGroup vertical>
                                    <Button bsStyle="primary" name={key} id={ind.toString()} onClick={copyBuff} >コピー</Button>
                                    <Button bsStyle="primary">リセット</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = SimulatorInput;
