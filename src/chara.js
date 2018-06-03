var React = require('react');
var intl = require('./translate.js')
var { Label, Checkbox, FormControl, InputGroup, FormGroup, Button, ButtonGroup, Panel, PanelGroup, Modal, Glyphicon } = require('react-bootstrap');
var CreateClass = require('create-react-class');
var { RegisteredChara } = require('./template.js')
var GlobalConst = require('./global_const.js')

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

var CharaList = CreateClass({
    getInitialState: function () {
        var charas = [];
        for (var i = 0; i < this.props.charaNum; i++) {
            charas.push(i);
        }

        return {
            charalist: [],
            charas: charas,
            defaultElement: "fire",
            addChara: null,
            addCharaID: -1,
            openPresets: false,
            arrayForCopy: {},
        };
    },
    updateCharaNum: function (num) {
        var charas = this.state.charas

        if (charas.length < num) {
            var maxvalue = Math.max.apply(null, charas)
            for (var i = 0; i < (num - charas.length); i++) {
                charas.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while (charas.length > num) {
                charas.pop();
            }
        }
        this.setState({ charas: charas })
    },
    closePresets: function () {
        this.setState({ openPresets: false })
    },
    openPresets: function () {
        this.setState({ openPresets: true })
    },
    componentDidMount: function () {
        if (this.props.dataForLoad != undefined) {
            this.setState({ charalist: this.props.dataForLoad })
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.dataName != this.props.dataName) {
            this.setState({ charalist: nextProps.dataForLoad });
            this.updateCharaNum(nextProps.charaNum)
            return 0;
        }

        if (parseInt(nextProps.charaNum) < parseInt(this.props.charaNum)) {
            var newcharalist = this.state.charalist;
            while (newcharalist.length > nextProps.charaNum) {
                newcharalist.pop();
            }
            this.setState({ charalist: newcharalist })
        }
        this.updateCharaNum(nextProps.charaNum)
    },
    handleOnChange: function (key, state, isSubtle) {
        var newcharalist = this.state.charalist;
        newcharalist[key] = state;
        this.setState({ charalist: newcharalist })
        this.setState({ addChara: null })
        this.props.onChange(newcharalist, isSubtle);
    },
    handleEvent: function (key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addChara"] = null
        this.setState(newState)
    },
    handleOnRemove: function (id, initialState) {
        // arrayForCopy に initial state を入れておいて、
        // componentWillReceivePropsで読み出されるようにする
        var newArrayForCopy = this.state.arrayForCopy;
        newArrayForCopy[id] = JSON.parse(JSON.stringify(initialState));
        this.setState({ arrayForCopy: newArrayForCopy });

        var newcharalist = this.state.charalist;
        newcharalist[id] = initialState
        this.setState({ charalist: newcharalist })

        // Root へ変化を伝搬
        this.props.onChange(newcharalist, false);
    },
    copyCompleted: function (id) {
        var state = this.state;
        delete state["arrayForCopy"][id];
        this.setState(state);
    },
    handleMoveUp: function (id) {
        if (id > 0) {
            var newcharas = this.state.charas

            // charas swap
            newcharas.splice(id - 1, 2, newcharas[id], newcharas[id - 1])
            this.setState({ charas: newcharas })

            // charalist swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id - 1, 2, newcharalist[id], newcharalist[id - 1])
            this.setState({ charalist: newcharalist })
            // Root へ変化を伝搬
            this.props.onChange(newcharalist, false);
        }
    },
    handleMoveDown: function (id) {
        if (id < this.props.charaNum - 1) {
            var newcharas = this.state.charas

            // charas swap
            newcharas.splice(id, 2, newcharas[id + 1], newcharas[id])
            this.setState({ charas: newcharas })

            // charalist swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id, 2, newcharalist[id + 1], newcharalist[id])
            this.setState({ charalist: newcharalist })
            // Root へ変化を伝搬
            this.props.onChange(newcharalist, false);
        }
    },
    addTemplateChara: function (templateChara) {
        var minimumID = -1;
        for (var key in this.state.charalist) {
            if (this.state.charalist[key].name == "") {
                minimumID = key;
                break;
            }
        }
        if (minimumID >= 0) {
            this.setState({ addChara: templateChara })
            this.setState({ addCharaID: minimumID })
            if (_ua.Mobile || _ua.Tablet) {
                alert(intl.translate("追加しました", this.props.locale))
            }
        } else {
            var newKey = this.props.pleaseAddCharaNum() - 1;

            if (newKey >= 0) {
                this.setState({ addChara: templateChara })
                this.setState({ addCharaID: newKey })
                if (_ua.Mobile || _ua.Tablet) {
                    alert(intl.translate("追加しました", this.props.locale))
                }
            } else {
                alert(intl.translate("キャラがいっぱい", this.props.locale))
            }
        }
    },
    render: function () {
        var locale = this.props.locale;
        var charas = this.state.charas;
        var charalist = this.state.charalist;
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        var addChara = this.state.addChara
        var addCharaID = this.state.addCharaID
        var handleOnRemove = this.handleOnRemove
        var handleMoveUp = this.handleMoveUp
        var handleMoveDown = this.handleMoveDown
        var openPresets = this.openPresets
        var dataForLoad = this.props.dataForLoad
        var arrayForCopy = this.state.arrayForCopy;
        var copyCompleted = this.copyCompleted;

        // view 用
        var panel_style = {"textAlign": "left"};

        return (
            <div className="charaList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("キャラテンプレート", locale)}</Button>
                <br />
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>

                <PanelGroup defaultActiveKey={0} accordion id="charaListView">
                {charas.map(function (c, ind) {
                    return (
                        <Panel key={c} bsStyle="default" style={panel_style} eventKey={c} header={
                                <span>
                                    {(ind < 3) ? "Front " : "Sub "}
                                    {(ind + 1)}: { (charalist[ind] != null) ? charalist[ind].name : "" }
                                    &nbsp;<Glyphicon glyph="pencil"/>
                                </span>
                            }>

                            <Chara
                                key={c}
                                onChange={hChange}
                                onRemove={handleOnRemove}
                                onMoveUp={handleMoveUp}
                                onMoveDown={handleMoveDown}
                                id={ind}
                                dataName={dataName}
                                defaultElement={defaultElement}
                                addChara={addChara}
                                addCharaID={addCharaID}
                                locale={locale}
                                openPresets={openPresets}
                                dataForLoad={dataForLoad}
                                copyCompleted={copyCompleted}
                                arrayForCopy={arrayForCopy[ind]}
                            />
                        </Panel>
                    );
                })}
                </PanelGroup>

                <Modal show={this.state.openPresets} onHide={this.closePresets}>
                    <Modal.Header closeButton>
                        <Modal.Title>Presets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisteredChara onClick={this.addTemplateChara} locale={locale} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
});

var Chara = CreateClass({
    getInitialState: function () {
        return {
            name: "",
            element: "fire",
            race: "human",
            attack: 0,
            hp: 0,
            support: "none",
            support2: "none",
            type: "attack",
            favArm: "dagger",
            favArm2: "none",
            remainHP: 100,
            DA: 6.5,
            TA: 3.0,
            isConsideredInAverage: true,
            openBufflist: false,
            openLBlist: false,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            otherBuff2: 0,
            additionalDamageBuff: 0,
            daBuff: 0,
            taBuff: 0,
            ougiGageBuff: 0,
            damageLimitBuff: 0,
            ougiDamageLimitBuff: 0,
            LBATK: 0,
            LBHP: 0,
            LBDA: 0,
            LBTA: 0,
            LBElement: 0,
            LBCritical1: "none",
            LBCritical2: "none",
            LBCritical3: "none",
            LBCritical4: "none",
        };
    },
    componentDidMount: function () {
        var state = this.state;

        // もし dataForLoad に自分に該当するキーがあるなら読み込む
        // (データロード時に新しく増えたコンポーネント用)
        var chara = this.props.dataForLoad
        if (chara != undefined && this.props.id in chara) {
            state = chara[this.props.id]
            this.setState(state)
            return 0
        }

        // もし addCharaIDが設定されていて、自分と一致しているなら読み込む
        if (this.props.addChara != null && this.props.id == this.props.addCharaID) {
            var newchara = this.props.addChara
            state = this.setNewCharaState(state, newchara)
            this.setState(state);
        }
        // 初期化後 state を 上の階層に渡しておく
        // CharaList では onChange が勝手に上に渡してくれるので必要なし
        this.props.onChange(this.props.id, state, false);
    },
    componentWillReceiveProps: function (nextProps) {
        // only fired on Data Load
        if (nextProps.dataName != this.props.dataName) {
            var chara = nextProps.dataForLoad
            if (chara != undefined && this.props.id in chara) {
                var state = chara[this.props.id]
                this.setState(state)
                return 0;
            }
        }

        // もし arrayForCopy に自分に該当するキーがあるなら読み込む
        // (Charaの場合はコピーはなく、削除のみ)
        if (nextProps.arrayForCopy != undefined) {
            state = nextProps.arrayForCopy;
            this.setState(state)
            this.props.copyCompleted(this.props.id);
            return 0;
        }

        if (nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if (nextProps.addChara != null && nextProps.addChara != this.props.addChara && this.props.id == nextProps.addCharaID) {
            var newchara = nextProps.addChara
            var newState = this.setNewCharaState(this.state, newchara)
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    setNewCharaState: function (newState, newchara) {
        newState["name"] = newchara[this.props.locale]
        newState["attack"] = parseInt(newchara.attack)
        newState["hp"] = parseInt(newchara.hp)
        newState["type"] = newchara.type
        newState["race"] = newchara.race
        newState["element"] = newchara.element
        newState["favArm"] = newchara.fav1
        newState["favArm2"] = newchara.fav2
        newState["DA"] = parseFloat(newchara.baseDA)
        newState["TA"] = parseFloat(newchara.baseTA)
        newState["support"] = newchara.support
        newState["support2"] = newchara.support2

        return newState;
    },
    handleEvent: function (key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function (key, e) {
        var newState = this.state

        if (key == "isConsideredInAverage") {
            newState[key] = (newState[key] == false) ? true : false
        } else {
            newState[key] = e.target.value
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState, false)
    },
    handleOnBlur: function (key, e) {
        if (key == "name" && this.state.name != "" && e.target.value != "") {
            this.props.onChange(this.props.id, this.state, true)
        } else {
            this.props.onChange(this.props.id, this.state, false)
        }
    },
    openPresets: function (e) {
        if (e.target.value == "" && this.state.attack == 0) {
            e.target.blur()
            this.setState({ attack: 1 })
            this.props.openPresets()
        }
    },
    clickRemoveButton: function (e) {
        this.props.onRemove(this.props.id, this.getInitialState())
    },
    clickMoveUp: function (e) {
        this.props.onMoveUp(this.props.id)
    },
    clickMoveDown: function (e) {
        this.props.onMoveDown(this.props.id)
    },
    switchBufflist: function (e) {
        this.setState({ openBufflist: !(this.state.openBufflist) })
    },
    switchLBlist: function (e) {
        this.setState({ openLBlist: !(this.state.openLBlist) })
    },
    render: function () {
        var locale = this.props.locale

        return (
            <div className="chara-content">
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <th className="bg-primary">{intl.translate("キャラ名", locale)}</th>
                            <td>
                                <FormControl componentClass="textarea" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets} onChange={this.handleEvent.bind(this, "name")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("平均に", locale)}</th>
                            <td>
                                <Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleSelectEvent.bind(this, "isConsideredInAverage")}>
                                    <strong>{intl.translate("含める", locale)}</strong>
                                </Checkbox>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("属性", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} >{selector[locale].elements}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("種族", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.race} onChange={this.handleSelectEvent.bind(this, "race")} >{selector[locale].races}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("タイプ", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.type} onChange={this.handleSelectEvent.bind(this, "type")} >{selector[locale].types}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("得意武器", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.favArm} onChange={this.handleSelectEvent.bind(this, "favArm")} >{selector[locale].armtypes}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("得意武器", locale)}2</th>
                            <td><FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleSelectEvent.bind(this, "favArm2")} >{selector[locale].armtypes}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("素の攻撃力", locale)}</th>
                            <td><FormControl type="number" min="0" max="15000" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")} /></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("素のHP", locale)}</th>
                            <td><FormControl type="number" min="0" max="5000" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")} /></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("残HP割合", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("基礎DA率", locale)}</th>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur.bind(this, "DA")} onChange={this.handleEvent.bind(this, "DA")} /></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("基礎TA率", locale)}</th>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur.bind(this, "TA")} onChange={this.handleEvent.bind(this, "TA")} /></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("サポアビ", locale)}1</th>
                            <td><FormControl componentClass="select" value={this.state.support} onChange={this.handleSelectEvent.bind(this, "support")}>{selector.supportAbilities}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("サポアビ", locale)}2</th>
                            <td><FormControl componentClass="select" value={this.state.support2} onChange={this.handleSelectEvent.bind(this, "support2")}>{selector.supportAbilities}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary"><Button onClick={this.switchBufflist}>{intl.translate("個別バフ", locale)}</Button></th>
                            <td></td>
                        </tr>
                        {this.state.openBufflist ?
                            [
                                <tr key="normalBuff">
                                    <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.normalBuff} onChange={this.handleSelectEvent.bind(this, "normalBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="elementBuff">
                                    <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.elementBuff} onChange={this.handleSelectEvent.bind(this, "elementBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="otherBuff">
                                    <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.otherBuff} onChange={this.handleSelectEvent.bind(this, "otherBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="otherBuff2">
                                    <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.otherBuff2} onChange={this.handleSelectEvent.bind(this, "otherBuff2")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="daBuff">
                                    <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.daBuff} onChange={this.handleSelectEvent.bind(this, "daBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="taBuff">
                                    <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.taBuff} onChange={this.handleSelectEvent.bind(this, "taBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="additionalDamageBuff">
                                    <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.additionalDamageBuff} onChange={this.handleSelectEvent.bind(this, "additionalDamageBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="ougiGageBuff">
                                    <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="damageLimit">
                                    <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.damageLimitBuff} onChange={this.handleSelectEvent.bind(this, "damageLimitBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="ougiDamageLimit">
                                    <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.ougiDamageLimitBuff} onChange={this.handleSelectEvent.bind(this, "ougiDamageLimitBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>
                            ]
                            : null}
                            <tr>
                                <th className="bg-primary">
                                    <Button onClick={this.switchLBlist}>{"LimitBonus"}</Button>
                                </th>
                                <td></td>
                            </tr>
                            {this.state.openLBlist ?
                                [
                                    <tr key="LBATK">
                                        <th className="bg-primary">{intl.translate("攻撃力", locale)}</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBATK} onChange={this.handleSelectEvent.bind(this, "LBATK")}>
                                                {selector.limitBonusAttackList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBHP">
                                        <th className="bg-primary">HP</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBHP} onChange={this.handleSelectEvent.bind(this, "LBHP")}>
                                                {selector.limitBonusHPList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBDA">
                                        <th className="bg-primary">DA</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBDA} onChange={this.handleSelectEvent.bind(this, "LBDA")}>
                                                {selector.limitBonusDAList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBTA">
                                        <th className="bg-primary">TA</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBTA} onChange={this.handleSelectEvent.bind(this, "LBTA")}>
                                                {selector.limitBonusTAList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBElement">
                                        <th className="bg-primary">{intl.translate("属性攻撃力", locale)}</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBElement} onChange={this.handleSelectEvent.bind(this, "LBElement")}>
                                                {selector.limitBonusElementList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBCritical1">
                                        <th className="bg-primary">{intl.translate("クリティカル", locale)}1</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBCritical1} onChange={this.handleSelectEvent.bind(this, "LBCritical1")}>
                                                {selector.limitBonusCriticalList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBCritical2">
                                        <th className="bg-primary">{intl.translate("クリティカル", locale)}2</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBCritical2} onChange={this.handleSelectEvent.bind(this, "LBCritical2")}>
                                                {selector.limitBonusCriticalList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBCritical3">
                                        <th className="bg-primary">{intl.translate("クリティカル", locale)}3</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBCritical3} onChange={this.handleSelectEvent.bind(this, "LBCritical3")}>
                                                {selector.limitBonusCriticalList}
                                            </FormControl>
                                        </td>
                                    </tr>,
                                    <tr key="LBCritical4">
                                        <th className="bg-primary">{intl.translate("クリティカル", locale)}4</th>
                                        <td>
                                            <FormControl componentClass="select" value={this.state.LBCritical4} onChange={this.handleSelectEvent.bind(this, "LBCritical4")}>
                                                {selector.limitBonusCriticalList}
                                            </FormControl>
                                        </td>
                                    </tr>
                                ]
                            : null}
                    </tbody>
                </table>
                <ButtonGroup style={{ "width": "100%" }}>
                    <Button bsStyle="info" style={{ "width": "25%", "margin": "2px 0 2px 0" }} onClick={this.clickMoveUp}><i className="fa fa-angle-double-up" aria-hidden="true"></i>{intl.translate("前へ", locale)}</Button>
                    <Button bsStyle="danger" style={{ "width": "50%", "margin": "2px 0 2px 0" }} onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="info" style={{ "width": "25%", "margin": "2px 0 2px 0" }} onClick={this.clickMoveDown}><i className="fa fa-angle-double-down" aria-hidden="true"></i>{intl.translate("後へ", locale)}</Button>
                </ButtonGroup>
            </div>
        );
    }
});

module.exports.CharaList = CharaList
module.exports.Chara = Chara
