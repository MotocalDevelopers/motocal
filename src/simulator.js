var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var selector = GlobalConst.selector

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
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            daBuff: 0,
            taBuff: 0,
            remainHP: 100,
            enemyDefense: 10.0,
            ougiGageBuff: 0,
        };
    },
    handleEvent: function(key, e) {
        // input タイプの入力フォームはonBlurを利用する
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleOnBlur: function(e) {
        // フォーカスが外れた時だけ変更を親に送る
        this.props.onChange(this.state)
    },
    handleSelectEvent: function(key, e) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.props.onChange(newState)
    },
    render: function() {
        /* if(_ua.Mobile) {
            return (
                <div className="profile">
                    <h3> ジータちゃん情報 (*: 推奨入力項目)</h3>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="prof">Rank*</th>
                            <th className="prof">ゼニス攻撃力*</th>
                            <th className="prof">ゼニスHP</th>
                            <th className="prof">マスボ<br/>ATK(%)*</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="1" max="175" value={this.state.rank} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "rank")}/></td>
                            <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleSelectEvent.bind(this, "zenithAttackBonus")} > {select_zenithAttack} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithHPBonus")} > {select_zenithHP} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleSelectEvent.bind(this, "masterBonus")}>{select_masteratk}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">マスボ<br/>HP(%)*</th>
                            <th className="prof">ジョブ*</th>
                            <th className="prof">残HP(%)<br/>(ジータのみ)</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleSelectEvent.bind(this, "masterBonusHP")}>{select_masterhp}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleSelectEvent.bind(this, "job")} > {this.props.alljobs}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{select_hplist}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">ジータ属性*</th>
                            <th className="prof">敵の属性*</th>
                            <th className="prof">武器ゼニス1</th>
                            <th className="prof">武器ゼニス2</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {select_elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleSelectEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleSelectEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">基礎DA率</th>
                            <th className="prof">基礎TA率</th>
                            <th className="prof">敵防御固有値</th>
                            <th className="prof">奥義倍率</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {select_enemydeftypes} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {select_ougiRatio} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                    <span>
                    {Jobs[this.state.job].name}:
                    得意 [{armTypes[Jobs[this.state.job].favArm1]}, {armTypes[Jobs[this.state.job].favArm2]}],
                    {jobTypes[Jobs[this.state.job].type]}タイプ,
                    攻撃ボーナス {Jobs[this.state.job].atBonus},
                    HPボーナス {Jobs[this.state.job].hpBonus},
                    攻刃バフ {Jobs[this.state.job].kouzinBonus},
                    守護バフ {Jobs[this.state.job].shugoBonus},
                    基礎DA率 {Jobs[this.state.job].DaBonus}%,
                    基礎TA率 {Jobs[this.state.job].TaBonus}%
                    </span>

                    <h3> パーティ全体への効果 (%表記)</h3>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">HPバフ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.hpBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                        </tr><tr>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                            <th className="prof">奥義ゲージ上昇率アップ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{select_hplist}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {select_ougiGageBuff} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {*/
            return (
                <div className="simulatorInput">
                    <h3> パーティ全体への効果 (%表記)</h3>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                            <th className="buff">奥義ゲージ上昇率アップ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.ougiGageBuff} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        //}
    }
});

module.exports = SimulatorInput;
