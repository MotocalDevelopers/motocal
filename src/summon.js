var React = require('react');
var intl = require('./translate.js')
var {FormControl, InputGroup, FormGroup, Col, Row, Grid, Label, Button, ButtonGroup} = require('react-bootstrap');
var {ColP} = require('./gridp.js')
var GlobalConst = require('./global_const.js')
var CreateClass = require('create-react-class');

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

var SummonList = CreateClass({
    getInitialState: function() {
        // summonsはkey管理のためだけの配列
        // summonsのindexが表示順 = Summonのprops.idになる
        var sm = []
        for(var i=0; i < this.props.summonNum; i++) { sm.push(i); }

        return {
            smlist: [],
            defaultElement: "fire",
            summons: sm,
            arrayForCopy: {},
        };
    },
    updateSummonNum: function(num) {
        var summons = this.state.summons

        if(summons.length < num) {
            var maxvalue = Math.max.apply(null, summons)
            for(var i = 0; i < (num - summons.length); i++){
                summons.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(summons.length > num){
                summons.pop();
            }
        }
        this.setState({summons: summons})
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.dataName != this.props.dataName) {
            this.setState({smlist: nextProps.dataForLoad});
            this.updateSummonNum(nextProps.summonNum)
            return 0;
        }

        if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
            var newsmlist = this.state.smlist;
            while(newsmlist.length > nextProps.summonNum) {
                newsmlist.pop();
            }
            this.setState({smlist: newsmlist})
        }
        this.updateSummonNum(nextProps.summonNum)
    },
    handleOnCopy: function(id, state) {
        if(id < this.props.summonNum - 1) {
            // arrayForCopyにコピー対象のstateを入れておいて、
            // componentWillReceivePropsで読み出されるようにする
            var newArrayForCopy = this.state.arrayForCopy;
            newArrayForCopy[id + 1] = JSON.parse(JSON.stringify(state));
            this.setState({arrayForCopy: newArrayForCopy});

            // smlist側の更新
            var newsmlist = this.state.smlist;
            newsmlist[id + 1] = JSON.parse(JSON.stringify(state))
            this.setState({smlist: newsmlist})

            // Root へ変化を伝搬
            this.props.onChange(newsmlist);
        }
    },
    handleOnRemove: function(id, initialState) {
        // arrayForCopyに初期stateを入れておいて、
        // componentWillReceivePropsで読み出されるようにする
        var newArrayForCopy = this.state.arrayForCopy;
        newArrayForCopy[id] = initialState;
        this.setState({arrayForCopy: newArrayForCopy});

        // smlist側の更新
        var newsmlist = this.state.smlist;
        newsmlist[id] = initialState;
        this.setState({smlist: newsmlist})

        // Root へ変化を伝搬
        this.props.onChange(newsmlist);
    },
    copyCompleted: function(id) {
        var state = this.state;
        delete state["arrayForCopy"][id];
        this.setState(state);
    },
    handleMoveUp: function(id){
        if(id > 0) {
            var newsummons = this.state.summons

            // charas swap
            newsummons.splice(id - 1, 2, newsummons[id], newsummons[id - 1])
            this.setState({summons: newsummons})

            // charalist swap
            var newsmlist = this.state.smlist;
            newsmlist.splice(id - 1, 2, newsmlist[id], newsmlist[id - 1])
            this.setState({smlist: newsmlist})

            // Root へ変化を伝搬
            this.props.onChange(newsmlist);
        }
    },
    handleMoveDown: function(id){
        if(id < this.props.summonNum - 1) {
            var newsummons = this.state.summons

            // charas swap
            newsummons.splice(id, 2, newsummons[id + 1], newsummons[id])
            this.setState({summons: newsummons})

            // charalist swap
            var newsmlist = this.state.smlist;
            newsmlist.splice(id, 2, newsmlist[id + 1], newsmlist[id])
            this.setState({smlist: newsmlist})
            // Root へ変化を伝搬
            this.props.onChange(newsmlist);
        }
    },
    handleOnChange: function(key, state){
        var newsmlist = this.state.smlist;
        newsmlist[key] = state;
        this.setState({smlist: newsmlist})
        this.props.onChange(newsmlist);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale;
        var summons = this.state.summons;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var hMoveUp = this.handleMoveUp;
        var hMoveDown = this.handleMoveDown;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        var dataForLoad = this.props.dataForLoad;
        var arrayForCopy = this.state.arrayForCopy;
        var copyCompleted = this.copyCompleted;

        return (
            <div className="summonList">
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")}> {selector[locale].summonElements} </FormControl>
                <h3 className="margin-top"> {intl.translate("召喚石", locale)} </h3>
                <Grid fluid>
                    <Row>
                    {summons.map(function(sm, ind) {
                        return <Summon key={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} onMoveUp={hMoveUp} onMoveDown={hMoveDown} id={ind} dataName={dataName} defaultElement={defaultElement} copyCompleted={copyCompleted} locale={locale} dataForLoad={dataForLoad} arrayForCopy={arrayForCopy[ind]}/>;
                    })}
                    </Row>
                </Grid>
            </div>
        );
    }
});

var Summon = CreateClass({
    getInitialState: function() {
        return {
            selfSummonType: "magna",
            selfSummonAmount: 100,
            selfSummonAmount2: 0,
            selfElement: "fire",
            friendSummonType: "element",
            friendSummonAmount: 80,
            friendSummonAmount2: 0,
            friendElement: "fire",
            attack: 0,
            hp: 0,
            hpBonus: 0,
            DA: 0,
            TA: 0,
            criticalRatio: 0.0,
        };
    },
    componentDidMount: function(){
       var state = this.state;

       // もし dataForLoad に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えた場合)
       if(this.props.dataForLoad != undefined) {
           var summon = this.props.dataForLoad;

           if(this.props.id in summon) {
               state = summon[this.props.id]
               this.setState(state)
               return 0;
           }
       }

       // 初期化後 state を 上の階層に渡しておく
       // summonList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state);
    },
    componentWillReceiveProps: function(nextProps){
        // データロード時のみ読み込み
        if(nextProps.dataName != this.props.dataName) {
            // 対応するIDが無い場合は undefined が飛んでくる
            if(nextProps.dataForLoad != undefined) {
               var summon = nextProps.dataForLoad;

               if(this.props.id in summon) {
                   this.setState(summon[this.props.id])
               }
            }
            return 0;
        }

        // もし arrayForCopy に自分に該当するキーがあるなら読み込む
        // コピー(またはリセット)後はSummonListに伝えて該当データを消す
        if(nextProps.arrayForCopy != undefined) {
            var state = nextProps.arrayForCopy;
            this.setState(state)
            this.props.copyCompleted(this.props.id);
            return 0;
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["selfElement"] = nextProps.defaultElement
            newState["friendElement"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    handleOnBlur: function(e) {
        this.props.onChange(this.props.id, this.state)
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
    handleSummonAmountChange(type, ind, e){
        var newState = this.state
        if(type == "self") {
            if(ind == 0){
                newState["selfSummonAmount"] = e.target.value
            } else {
                newState["selfSummonAmount2"] = e.target.value
            }
        } else {
            if(ind == 0){
                newState["friendSummonAmount"] = e.target.value
            } else {
                newState["friendSummonAmount2"] = e.target.value
            }
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    render: function() {
        var locale = this.props.locale

        var selfSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.selfSummonType == "odin"){
            selfSummon[1] = {"label": intl.translate("キャラ", locale)+ " ", "input": "select"}
            selfSummon[0].label = intl.translate("属性", locale) + " "
        }
        var friendSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.friendSummonType == "odin"){
            friendSummon[1] = {"label": intl.translate("キャラ", locale) + " ", "input": "select"}
            friendSummon[0].label = intl.translate("属性", locale) + " "
        }
        return (
            <ColP sxs={12} ssm={6} smd={4} className="col-no-bordered">
                <h3><Label bsStyle="primary">Summon No.{this.props.id+1}</Label></h3>

                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <th rowSpan={3} className="bg-primary">{intl.translate("自分の石", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleSelectEvent.bind(this, "selfElement")} >{selector[locale].summonElements}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl componentClass="select" value={this.state.selfSummonType} onChange={this.handleSelectEvent.bind(this, "selfSummonType")} >{selector[locale].summons}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {selfSummon[0].label}<FormControl componentClass="select" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)}>{selector.summonAmounts}</FormControl>
                                {selfSummon[1].label}<FormControl componentClass="select" className={selfSummon[1].input} value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)}>{selector.summonAmounts}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className="bg-primary">{intl.translate("フレの石", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleSelectEvent.bind(this, "friendElement")} >{selector[locale].summonElements}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl componentClass="select" value={this.state.friendSummonType} onChange={this.handleSelectEvent.bind(this, "friendSummonType")} >{selector[locale].summons}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {friendSummon[0].label}<FormControl componentClass="select" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)}>{selector.summonAmounts}</FormControl>
                                {friendSummon[1].label}<FormControl componentClass="select" className={friendSummon[1].input} value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)}>{selector.summonAmounts}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("合計攻撃力", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.attack} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "attack")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("合計HP", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.hp} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hp")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("HP加護", locale)}</th>
                            <td>
                    <FormControl type="number" min="0" value={this.state.hpBonus} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBonus")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("DA加護", locale)}</th>
                            <td>
                    <FormControl type="number" min="0" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("TA加護", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/>
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

module.exports.SummonList = SummonList;
module.exports.Summon = Summon;
