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
        if(nextProps.dataName != this.props.dataName) {
            var newState = newData.simulator
            this.setState(newState);
            this.props.onChange(newState);
        }
    },
    getInitialState: function() {
        return {
            buffs: {},
            maxTurn: 5,
        };
    },
    handleSelectEvent: function(key, e) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.props.onChange(newState)
    },
    handleBuffDataChange: function(name, buffstate) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state.buffs
        newState[name] = buffstate
        this.setState({buffs: newState})
        console.log("root buff data:", newState)
        this.props.onChange(newState)
    },
    render: function() {
        var Turns = [];
        for(var i = 0; i < this.state.maxTurn; i++){
            Turns.push(i + 1)
        }
        var names = [];
        names.push("ジータ")
        for(key in this.props.chara){
            if(this.props.chara[key].name != "") {
                names.push(this.props.chara[key].name)
            }
        }
        var state = this.state
        var handleSelectEvent = this.handleSelectEvent
        var handleEvent = this.handleEvent
        var handleBuffDataChange = this.handleBuffDataChange

        return (
            <div className="simulatorInput">
                <h3> シミュレータ用入力 </h3>
                <FormControl componentClass="select" value={this.state.maxTurn} onChange={this.handleSelectEvent.bind(this, "maxTurn")}>{select_turnlist}</FormControl>
                <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th></th>
                        {Turns.map(function(x){return <th key={x}>{x}ターン目</th>})}
                        <th>操作</th>
                    </tr>
                    <SimulatorPersonal id="0" name={"全体バフ"} turns={Turns}onChange={handleBuffDataChange} />
                    {names.map(function(name, ind) {
                        return (<SimulatorPersonal key={ind + 1} id={ind + 1} name={name} turns={Turns} onChange={handleBuffDataChange} />);
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
});

var SimulatorPersonal = React.createClass({
    getInitialState: function() {
        state = {}
        for(var i = 0; i < this.props.turns.length; i++){
            state[i] = {}
        }
        return state;
    },
    onChangeOneTurnBuff: function(id, newbuff) {
        var newState = this.state
        newState[id] = newbuff
        this.setState(newState)
        this.props.onChange(this.props.name, newState)
    },
    render: function() {
        var buffchange = this.onChangeOneTurnBuff
        return (
            <tr>
                <td>{this.props.name}</td>
                {this.props.turns.map(function(x, ind){
                    return (
                      <OneTurnBuff key={ind} id={ind} onChange={buffchange} />
                    );
                })}
                <td>
                    <ButtonGroup vertical>
                        <Button bsStyle="primary">コピー</Button>
                        <Button bsStyle="primary">リセット</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    },
});

var OneTurnBuff = React.createClass({
    getInitialState: function() {
        return {
            remainHP: 100,
            enemyDefense: 10.0,
            buff: ["normal-0"],
            turnType: "normal",
        };
    },
    handleSelectEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.updateBuffAmount(newState)
    },
    componentDidMount: function() {
        this.updateBuffAmount(this.state)
    },
    updateBuffAmount: function(newstate){
        var buff = {normal: 0, element: 0, other: 0, DA: 0, TA: 0}

        for(var i = 0; i < newstate.buff.length; i++) {
            var onebuff = newstate.buff[i].split("-")
            buff[onebuff[0]] += parseInt(onebuff[1])
        }

        buff["remainHP"] = newstate.remainHP
        buff["turnType"] = newstate.turnType

        this.props.onChange(this.props.id, buff)
    },
    changeBuff: function(e) {
        var newState = this.state
        newState["buff"][e.target.id] = e.target.value
        this.setState(newState)
        this.updateBuffAmount(newState)
    },
    addBuffNum: function(e) {
        var newbuff = this.state.buff
        if(newbuff.length < 7) {
            newbuff.push("normal-0")
            this.setState({buff: newbuff})
        }
    },
    subBuffNum: function(e) {
        var newbuff = this.state.buff
        if(newbuff.length > 1) {
            newbuff.pop()
            this.setState({buff: newbuff})
        }
    },
    render: function() {
        var changeBuff = this.changeBuff
        var bufflist = this.state.buff
        return (
            <td>
            <FormControl componentClass="select" value={this.state.turnType} onChange={this.handleSelectEvent.bind(this, "turnType")}>{select_turntype}</FormControl>
            <FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{select_hplist}</FormControl>
            {this.state.buff.map(function(x, ind){
                return (
                    <FormControl componentClass="select" key={ind} id={ind.toString()} value={bufflist[ind]} onChange={changeBuff}>
                    {select_normalbuffAmount}
                    {select_elementbuffAmount}
                    {select_otherbuffAmount}
                    {select_dabuffAmount}
                    {select_tabuffAmount}
                    </FormControl>
                );
            })}
            <ButtonGroup>
                <Button bsStyle="primary" onClick={this.addBuffNum} >追加</Button>
                <Button bsStyle="primary" onClick={this.subBuffNum} >削除</Button>
            </ButtonGroup>
            </td>
        );
    },
});

module.exports = SimulatorInput;
