var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var selector = GlobalConst.selector
var turnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var turnTypeList = {"normal": "通常攻撃", "ougi": "奥義", "ougiNoDamage": "奥義(ダメージ無し)"};
var HPList = [ 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
var buffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150];
var daBuffAmountList = [0, 5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

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
        var newState = this.state

        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            newState = nextProps.dataForLoad
            this.setState(newState)
            this.props.onChange(newState);
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
        if(direction == "up") {
            if(id > 0) {
                newState.buffs[keys[id - 1]] = JSON.parse(JSON.stringify(newState.buffs[name]))
                newState.bufflists[keys[id - 1]] = JSON.parse(JSON.stringify(newState.bufflists[name]))
                // updateBuffAmount は必要ない（Buffsもコピーしているので）
                this.props.onChange(newState)
            }
        } else {
            if(id < keys.length - 1) {
                newState.buffs[keys[id + 1]] = JSON.parse(JSON.stringify(newState.buffs[name]))
                newState.bufflists[keys[id + 1]] = JSON.parse(JSON.stringify(newState.bufflists[name]))
                // updateBuffAmount は必要ない（Buffsもコピーしているので）
                this.props.onChange(newState)
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
        var chara = this.props.chara

        return (
            <div className="simulatorInput">
                <h3> シミュレータ用入力 </h3>
                <span>各ターンのバフやHP等を設定して下さい。</span> <FormControl componentClass="select" value={this.state.maxTurn} onChange={this.handleSelectEvent.bind(this, "maxTurn")}>{select_turnlist}</FormControl>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="simulator-left"></th>
                        {Turns.map(function(x){return <th className="simulator-th" key={x}>{x}ターン目</th>})}
                        <th className="simulator-th">操作</th>
                    </tr>
                    {Object.keys(this.state.buffs).map(function(key, ind){
                        var isDisplay = false
                        if(key == "Djeeta" || key == "全体バフ") {
                            isDisplay = true
                        } else {
                            for(var i = 0; i < chara.length; i++){
                                if(chara[i].name == key) {
                                    isDisplay = chara[i].isConsideredInAverage
                                }
                            }
                        }

                        if(isDisplay) {
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
            </div>
        );
    }
});

var HowTo = React.createClass({
    render: function(){
        return (
            <div className="howTo">
                <p>ダメージシミュレータは<strong>各ターン毎のバフ・残りHP等から予想されるダメージを計算する</strong>ツールです。</p>

                <h2>使い方</h2>
                <p>基本的には他のグラフ機能と同様に「グラフに加えた」編成を元に計算を行います。まずは他の欄を入力し、比較したい編成を選んでおいて下さい。</p>
                <p>編成をいくつかグラフに加えたら、各種グラフのボタンが有効化されます。
                ダメージシミュレータを使う場合は「シミュレータ入力」タブを開いて下さい。</p>
                <Thumbnail src="./otherImages/damage-simulator-howto-2.png" href="./otherImages/damage-simulator-howto-2.png"><h3>シミュレータ入力欄</h3></Thumbnail>

                <p>入力欄には大きく分けて「全体バフ」と「各キャラクター」のバフが存在します。
                簡単に使いたい方は、全体バフの欄のみ弄れば各キャラクターの情報を入力しなくても問題ありません。
                また、各キャラクターのバフは<strong>全体バフの量に加算</strong>されますのでご注意下さい。</p>
                <p>（例: あるターンの全体バフが通常攻刃+10%、ジータバフ欄が通常攻刃+30%となっている場合、ジータのバフは通常攻刃+40%として計算される。）</p>
                <p>バフを追加したい場合、<Button><i className="fa fa-plus-square"></i></Button> をクリックすることで欄が増えます。（現在は最大10個）
                増やしすぎた場合は、バフ量を0%にするか、<Button><i className="fa fa-minus-square"></i></Button> で削除して下さい。（現在は一番下にあるもののみしか削除できません。）
                また、<Button><i className="fa fa-arrow-left"></i></Button> や <Button><i className="fa fa-arrow-right"></i></Button> をクリックすることで、前（または次）のターンへコピーすることが可能です。</p>
                <p>全てのターンのバフ情報を他のキャラ欄にコピーしたい場合は、<Button><i className="fa fa-angle-double-up"></i></Button> または <Button><i className="fa fa-angle-double-up"></i></Button> を使用して下さい。</p>

                <h3>算出される値について</h3>
                <p>基本的には他のグラフと同様、技巧や二手三手の期待値から予想される攻撃力（総回技値）ですが、予想ダメージについては少し異なります。
                最適編成算出や、他のグラフで用いている「予想ターン毎ダメージ」は、
                "二手スキル込みの編成について"でも書いた通り、
                <strong>通常攻撃を数回行ったあと、奥義を1回打つまでの1サイクルを考えたダメージ</strong>です。
                これに対して、ダメージシミュレータで算出される「予想ダメージ」は、
                1サイクルを考えずに、単純にそのターンに与えることが期待されるダメージです。（勿論クリティカルやDA・TA率は考慮されています）
                これは、通常攻撃ターンと奥義ターンを設定するための変更です。
                内部的に使っている通常攻撃ダメージ算出・奥義ダメージ算出用の関数は同一であるため、
                単純に"1サイクルを考えるかどうか"が異なっていると考えて頂ければ結構です。</p>

                <h3>奥義ターンについて</h3>
                <p>欄の一番上を「通常攻撃」から「奥義」または「奥義（ダメージ無し）」に変えると、そのターンは奥義ダメージのみが与ダメージとなります。ダメージ無しの場合は0になります。</p>
                <p>「奥義」と「通常攻撃」では、「奥義」の設定のが優先されます。
                従って、<br/>
                全体バフが「奥義」の場合: キャラ個別の設定に関わらず、全員が奥義を打つ <br/>
                全体バフが「通常」の場合: 「奥義」に設定されているキャラのみが奥義を打つ <br/>
                となります。
                </p>
                <p className="text-danger">チェインバーストのダメージについてはまだサポートしておりません。そのうちやります。</p>

                <h3>現在未サポート</h3>
                <p>クリティカル系のバフ、追加ダメージ系のバフ、チェインバーストダメージ等</p>

                <h3>予想ダメージ平均の積分値について</h3>
                <p>予想ダメージを和していった値です。何ターン目でこっちの編成が……という比較のための機能です。将来的に、いくつかのバフ編成同士でも比較できたらいいな……と考えていますが、やらないかもしれません。</p>

                <h3>今後の予定</h3>
                <p>未サポートのバフに対応するのは勿論、なんかバフボタンを適当にドラッグ&ドロップしたら勝手に3ターン分設定されるとか、そういう感じのが欲しいですね。</p>

                <h3>注記</h3>
                <p>きっちりテストできていない機能ですので、不具合報告や改善点の提案などありましたらご連絡下さい。</p>
            </div>
        );
    },
});

module.exports = SimulatorInput;
module.exports.HowTo = HowTo;
