var React = require('react');

var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Label, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var {ColP} = require('./gridp.js')
var {RegisteredArm} = require('./template.js')
var TextWithTooltip = GlobalConst.TextWithTooltip
var ElementColorLabel = GlobalConst.ElementColorLabel
var intl = require('./translate.js')

// inject GlobalConst...
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

// ArmList has a number of Arm objects.
var ArmList = React.createClass({
    getInitialState: function() {
        var al = []
        for(var i = 0; i < this.props.armNum; i++) al[i] = []

        var arms = []
        for(var i=0; i < this.props.armNum; i++) { arms.push(i); }

        return {
            // 武器リストをRootに渡すための連想配列
            alist: al,
            // 武器リストを管理するための連想配列
            // indexによって保存データとの対応を取り、
            // その値をkeyとして使うことでコンポーネントの削除などを行う
            arms: arms,
            defaultElement: "fire",
            addArm: null,
            addArmID: -1,
            considerNum: 1,
            openPresets: false,
            arrayForCopy: {},
        };
    },
    closePresets: function() {
        this.setState({openPresets: false})
    },
    openPresets: function() {
        this.setState({openPresets: true})
    },
    updateArmNum: function(num) {
        var arms = this.state.arms
        if(arms.length < num) {
            var maxvalue = Math.max.apply(null, arms)
            for(var i = 0; i < (num - arms.length); i++){
                arms.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(arms.length > num){
                arms.pop();
            }
        }
        this.setState({arms: arms})
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.dataName != this.props.dataName && (nextProps.dataForLoad =! undefined) ) {
            this.setState({alist: nextProps.dataForLoad});
            this.updateArmNum(nextProps.armNum)
            return 0;
        }

        // iPadなどで一度数字が消された場合NaNになる
        if(!isNaN(parseInt(nextProps.armNum))) {
            // 今回のarmNumが小さくなったらalistも切り落とす (前回がNaNの場合も行う)
            if (isNaN(parseInt(this.props.armNum)) || (parseInt(nextProps.armNum) < parseInt(this.props.armNum))) {
                var newalist = this.state.alist;
                while(newalist.length > nextProps.armNum) {
                    newalist.pop();
                }
                this.setState({alist: newalist})
            }
            this.updateArmNum(nextProps.armNum)
        }
    },
    handleOnCopy: function(id, state) {
        if(id < this.props.armNum - 1) {
            // arrayForCopyにコピー対象のstateを入れておいて、
            // componentWillReceivePropsで読み出されるようにする
            var newArrayForCopy = this.state.arrayForCopy;
            newArrayForCopy[id + 1] = JSON.parse(JSON.stringify(state));
            this.setState({arrayForCopy: newArrayForCopy});

            var newalist = this.state.alist;
            newalist[id + 1] = JSON.parse(JSON.stringify(state))
            this.setState({alist: newalist})

            // Root へ変化を伝搬
            this.props.onChange(newalist, false);
        }
    },
    handleOnRemove: function(id, initialState) {
        // arrayForCopyに初期stateを入れておいて、
        // componentWillReceivePropsで読み出されるようにする
        var newArrayForCopy = this.state.arrayForCopy;
        newArrayForCopy[id] = initialState;
        this.setState({arrayForCopy: newArrayForCopy});

        var newalist = this.state.alist;
        newalist[id] = initialState;
        this.setState({alist: newalist})

        // Root へ変化を伝搬
        this.props.onChange(newalist, false);
    },
    handleMoveUp: function(id){
        if(id > 0) {
            var newarms = this.state.arms

            // swap
            newarms.splice(id - 1, 2, newarms[id], newarms[id - 1])
            this.setState({arms: newarms})

            var newalist = this.state.alist;
            newalist.splice(id - 1, 2, newalist[id], newalist[id - 1])
            this.setState({alist: newalist})

            // Root へ変化を伝搬
            this.props.onChange(newalist, false);
        }
    },
    handleMoveDown: function(id){
        if(id < this.props.armNum - 1) {
            var newarms = this.state.arms

            // charas swap
            newarms.splice(id, 2, newarms[id + 1], newarms[id])
            this.setState({arms: newarms})

            // charalist swap
            var newalist = this.state.alist;
            newalist.splice(id, 2, newalist[id + 1], newalist[id])
            this.setState({alist: newalist})
            // Root へ変化を伝搬
            this.props.onChange(newalist, false);
        }
    },
    copyCompleted: function(id) {
        var state = this.state;
        delete state["arrayForCopy"][id];
        this.setState(state);
    },
    handleOnChange: function(key, state, isSubtle){
        var newalist = this.state.alist;
        newalist[key] = state;
        this.setState({alist: newalist})
        this.setState({addArm: null})
        this.props.onChange(newalist, isSubtle);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addArm"] = null
        this.setState(newState)
    },
    addTemplateArm: function(templateArm, considerNum) {
        var minimumID = -1;
        for(var key in this.state.alist) {
            if(this.state.alist[key].name == ""){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addArm: templateArm})
            this.setState({addArmID: minimumID})
            this.setState({considerNum: considerNum})
            if(_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddArmNum() - 1;
            if(newKey >= 0) {
                this.setState({addArm: templateArm})
                this.setState({addArmID: newKey})
                this.setState({considerNum: considerNum})
                if(_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("武器がいっぱいです。")
            }
        }
    },
    render: function(){
        var locale = this.props.locale
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var hMoveUp = this.handleMoveUp;
        var hMoveDown = this.handleMoveDown;
        var defaultElement = this.state.defaultElement;
        var addArm = this.state.addArm;
        var addArmID = this.state.addArmID;
        var considerNum = this.state.considerNum;
        var openPresets = this.openPresets;
        var dataForLoad = this.props.dataForLoad
        var arrayForCopy = this.state.arrayForCopy;
        var copyCompleted = this.copyCompleted;

        return (
            <div className="armList">
                <p className="text-danger">{intl.translate("notice-20170329-2", locale)}</p>
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("武器テンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>
                <Grid fluid>
                    <Row>
                        {arms.map(function(arm, ind) {
                            return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} onMoveUp={hMoveUp} onMoveDown={hMoveDown} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} locale={locale} openPresets={openPresets} dataForLoad={dataForLoad} arrayForCopy={arrayForCopy[ind]} copyCompleted={copyCompleted} />;
                        })}
                    </Row>
                </Grid>

                <Modal show={this.state.openPresets} onHide={this.closePresets}>
                    <Modal.Header closeButton>
                        <Modal.Title>Presets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisteredArm onClick={this.addTemplateArm} locale={locale} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
});

// Arm is a fundamental object corresponding one arm.
var Arm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            attack: 0,
            hp: 0,
            armType: 'sword',
            skill1: 'non',
            skill2: 'non',
            slv: 1,
            considerNumberMin: 0,
            considerNumberMax: 1,
            element: 'fire',
            element2: 'fire',
        };
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            if( (nextProps.dataForLoad != undefined) && this.props.id in nextProps.dataForLoad) {
                var newState = nextProps.dataForLoad[this.props.id]
                this.setState(newState);
                return 0;
            }
        }

        // もし arrayForCopy に自分に該当するキーがあるなら読み込む
        // コピー(またはリセット)後は ArmList に伝えて該当データを消す
        if(nextProps.arrayForCopy != undefined) {
            var state = nextProps.arrayForCopy;
            this.setState(state)
            this.props.copyCompleted(this.props.id);
            return 0;
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            newState["element2"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addArm != null && nextProps.addArm != this.props.addArm && this.props.id == nextProps.addArmID ) {
            var newState = this.state
            var newarm = nextProps.addArm

            newState["name"] = newarm.name

            // Lv別処理
            if(newarm.lv == 1) {
                newState["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
                newState["hp"] = parseInt(newarm.minhp) + newarm.plus
            } else if(newarm.lv <= 100) {
                if(newarm.maxlv == "100" || newarm.maxlv == "75") {
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/newarm.maxlv + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
                } else {
                    // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
                }
            } else {
                // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
                newState["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * parseInt(newarm.plus))
                newState["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + parseInt(newarm.plus))
            }

            if(newarm.lv != parseInt(newarm.maxlv)) newState["name"] += "Lv." + newarm.lv
            if(newarm.plus != 0) newState["name"] += "+" + newarm.plus

            newState["armType"] = newarm.type
            newState["element"] = newarm.element
            newState["skill1"] = newarm.skill1
            newState["element2"] = newarm.element2
            newState["skill2"] = newarm.skill2
            newState["slv"] = newarm.slv
            newState["considerNumberMax"] = parseInt(nextProps.considerNum)

            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    componentDidMount: function(){
       var state = this.state;

       // もし dataForLoad に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var armlist = this.props.dataForLoad
       if( this.props.dataForLoad != undefined && this.props.id in this.props.dataForLoad ){
           state = this.props.dataForLoad[this.props.id]
           this.setState(state)
           return 0
       }

       // もし addArmID が自分のIDと同じなら、templateデータを読み込む
       if(this.props.addArm != null && this.props.id == this.props.addArmID ) {
           var newarm = this.props.addArm

           state["name"] = newarm.name

           // Lv別処理
           if(newarm.lv == 1) {
               state["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
               state["hp"] = parseInt(newarm.minhp) + newarm.plus
           } else if(newarm.lv <= 100) {
               if(newarm.maxlv == "100" || newarm.maxlv == "75") {
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
               } else {
                   // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
               }
           } else {
               // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
               state["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * parseInt(newarm.plus))
               state["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + parseInt(newarm.plus))
           }
           if(newarm.lv != parseInt(newarm.maxlv)) state["name"] += "Lv." + newarm.lv
           if(newarm.plus != 0) state["name"] += "+" + newarm.plus

           state["armType"] = newarm.type
           state["element"] = newarm.element
           state["skill1"] = newarm.skill1
           state["element2"] = newarm.element2
           state["skill2"] = newarm.skill2
           state["slv"] = newarm.slv
           state["considerNumberMax"] = parseInt(this.props.considerNum)

           this.setState(state);
       }
       // 初期化後 state を 上の階層に渡しておく
       // armList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state, false);
    },
    handleEvent: function(key, e) {
        // input の時は親に送らない
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function(key, e) {
        // Selectの時は親に送ってしまっていい
        var newState = this.state
        if(key == "considerNumberMin"){
            if (parseInt(e.target.value) > parseInt(this.state.considerNumberMax)) {
                newState["considerNumberMax"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if(key == "considerNumberMax") {
            if (parseInt(e.target.value) < parseInt(this.state.considerNumberMin)) {
                newState["considerNumberMin"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else {
            newState[key] = e.target.value
        }

        this.setState(newState)
        this.props.onChange(this.props.id, newState, false)
    },
    handleOnBlur: function(key, e) {
        // フォーカスが外れた時だけ変更を親に送る
        if(key == "name") {
            this.props.onChange(this.props.id, this.state, true)
        } else {
            this.props.onChange(this.props.id, this.state, false)
        }
    },
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.getInitialState())
    },
    clickCopyButton: function(e, state) {
        this.props.onCopy(this.props.id, this.state)
    },
    clickMoveUp: function(e) {
        this.props.onMoveUp(this.props.id)
    },
    clickMoveDown: function(e) {
        this.props.onMoveDown(this.props.id)
    },
    openPresets: function(e) {
        if(e.target.value == "" && this.state.attack == 0) {
            e.target.blur();
            this.setState({attack: 1})
            this.props.openPresets();
        }
    },
    render: function(){
        var locale = this.props.locale;

        return (
            <ColP sxs={12} ssm={6} smd={4} className="col-no-bordered">
                <h3><Label bsStyle="primary">No.{this.props.id+1}</Label></h3>
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <th className="bg-primary">{intl.translate("武器名", locale)}</th>
                            <td>
                                <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets} onChange={this.handleEvent.bind(this, "name")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("攻撃力", locale)}</th>
                            <td>
                                <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">HP</th>
                            <td>
                                <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("種類", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.armType} onChange={this.handleSelectEvent.bind(this, "armType")} > {selector[locale].armtypes} </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("スキル", locale)}1</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} > {selector[locale].elements} </FormControl>
                            <FormControl componentClass="select" value={this.state.skill1} onChange={this.handleSelectEvent.bind(this, "skill1")} > {selector[locale].skills}</FormControl><br/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("スキル", locale)}2</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.element2} onChange={this.handleSelectEvent.bind(this, "element2")} > {selector[locale].elements} </FormControl>
                            <FormControl componentClass="select" value={this.state.skill2} onChange={this.handleSelectEvent.bind(this, "skill2")} > {selector[locale].skills}</FormControl><br/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">SLv</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.slv} onChange={this.handleSelectEvent.bind(this, "slv")} > {selector.slv} </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("最小本数", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.considerNumberMin} onChange={this.handleSelectEvent.bind(this, "considerNumberMin")} > {selector.consider} </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("最大本数", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.considerNumberMax} onChange={this.handleSelectEvent.bind(this, "considerNumberMax")} > {selector.consider} </FormControl>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="default" style={{"width": "25%", "margin": "2px 0px 2px 0px"}} onClick={this.clickMoveUp}><i className="fa fa-angle-double-up" aria-hidden="true"></i>{intl.translate("前へ", locale)}</Button>
                    <Button bsStyle="danger" style={{"width": "25%", "margin": "2px 0px 2px 0px"}} onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0px 2px 0px"}} onClick={this.clickCopyButton}>{intl.translate("下にコピー", locale)}</Button>
                    <Button bsStyle="default" style={{"width": "25%", "margin": "2px 0px 2px 0px"}} onClick={this.clickMoveDown}><i className="fa fa-angle-double-down" aria-hidden="true"></i>{intl.translate("後へ", locale)}</Button>
                </ButtonGroup>
            </ColP>
        );
    }
});

module.exports.ArmList = ArmList
module.exports.Arm = Arm
