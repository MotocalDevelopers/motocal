var React = require('react');
var intl = require('./translate.js');
var {Label, Checkbox, FormControl, InputGroup, FormGroup, Button, ButtonGroup, Panel, PanelGroup, Modal, Glyphicon} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var {RegisteredChara} = require('./template.js');
var GlobalConst = require('./global_const.js');
var {CriticalBuffList} = require('./components.js');

// inject GlobalConst...
var elementRelation = GlobalConst.elementRelation;
var bahamutRelation = GlobalConst.bahamutRelation;
var bahamutFURelation = GlobalConst.bahamutFURelation;
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
        var charas = this.state.charas;

        if (charas.length < num) {
            var maxvalue = Math.max.apply(null, charas);
            for (var i = 0; i < (num - charas.length); i++) {
                charas.push(i + maxvalue + 1)
            }
        } else {
            while (charas.length > num) {
                charas.pop();
            }
        }
        this.setState({charas: charas})
    },
    closePresets: function () {
        this.setState({openPresets: false})
    },
    openPresets: function () {
        this.setState({openPresets: true})
    },
    componentDidMount: function () {
        if (this.props.dataForLoad != undefined) {
            this.setState({charalist: this.props.dataForLoad})
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.dataName != this.props.dataName) {
            this.setState({charalist: nextProps.dataForLoad});
            this.updateCharaNum(nextProps.charaNum);
            return 0;
        }

        if (parseInt(nextProps.charaNum) < parseInt(this.props.charaNum)) {
            var newcharalist = this.state.charalist;
            while (newcharalist.length > nextProps.charaNum) {
                newcharalist.pop();
            }
            this.setState({charalist: newcharalist})
        }
        this.updateCharaNum(nextProps.charaNum)
    },
    handleOnChange: function (key, state, isSubtle) {
        var newcharalist = this.state.charalist;
        newcharalist[key] = state;
        this.setState({charalist: newcharalist});
        this.setState({addChara: null});
        this.props.onChange(newcharalist, isSubtle);
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        newState["addChara"] = null;
        this.setState(newState)
    },
    handleOnRemove: function (id, initialState) {
        // put initial state in arrayForCopy,
        // to be read by componentWillReceiveProps
        var newArrayForCopy = this.state.arrayForCopy;
        newArrayForCopy[id] = JSON.parse(JSON.stringify(initialState));
        this.setState({arrayForCopy: newArrayForCopy});

        var newcharalist = this.state.charalist;
        newcharalist[id] = initialState;
        this.setState({charalist: newcharalist});

        // Propagate changes to Root
        this.props.onChange(newcharalist, false);
    },
    copyCompleted: function (id) {
        var state = this.state;
        delete state["arrayForCopy"][id];
        this.setState(state);
    },
    handleMoveUp: function (id) {
        if (id > 0) {
            var newcharas = this.state.charas;

            // Characters Swap
            newcharas.splice(id - 1, 2, newcharas[id], newcharas[id - 1]);
            this.setState({charas: newcharas});

            // CharacterList Swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id - 1, 2, newcharalist[id], newcharalist[id - 1]);
            this.setState({charalist: newcharalist});
            // Propagate changes to Root
            this.props.onChange(newcharalist, false);
        }
    },
    handleMoveDown: function (id) {
        if (id < this.props.charaNum - 1) {
            var newcharas = this.state.charas;

            // Characters Swap
            newcharas.splice(id, 2, newcharas[id + 1], newcharas[id]);
            this.setState({charas: newcharas});

            // CharacterList Swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id, 2, newcharalist[id + 1], newcharalist[id]);
            this.setState({charalist: newcharalist});
            // Propagate changes to Root
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
            this.setState({addChara: templateChara});
            this.setState({addCharaID: minimumID});
            if (_ua.Mobile || _ua.Tablet) {
                alert(intl.translate("追加しました", this.props.locale))
            }
        } else {
            var newKey = this.props.pleaseAddCharaNum() - 1;

            if (newKey >= 0) {
                this.setState({addChara: templateChara});
                this.setState({addCharaID: newKey});
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
        var addChara = this.state.addChara;
        var addCharaID = this.state.addCharaID;
        var handleOnRemove = this.handleOnRemove;
        var handleMoveUp = this.handleMoveUp;
        var handleMoveDown = this.handleMoveDown;
        var openPresets = this.openPresets;
        var dataForLoad = this.props.dataForLoad;
        var arrayForCopy = this.state.arrayForCopy;
        var copyCompleted = this.copyCompleted;

        // for view
        var panel_style = {"textAlign": "left"};

        return (
            <div className="charaList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i
                    className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("キャラテンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement}
                             onChange={this.handleEvent.bind(this, "defaultElement")}> {selector[locale].elements} </FormControl>

                <PanelGroup defaultActiveKey={0} accordion id="charaListView">
                    {charas.map(function (c, ind) {
                        return (
                            <Panel key={c} bsStyle="default" style={panel_style} eventKey={c}>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        {(ind < 3) ? "Front " : "Sub "}
                                        {(ind + 1)}: {(charalist[ind] != null) ? charalist[ind].name : ""}
                                        &nbsp;<Glyphicon glyph="pencil"/>
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
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
                                </Panel.Body>
                            </Panel>
                        );
                    })}
                </PanelGroup>

                <Modal show={this.state.openPresets} onHide={this.closePresets}>
                    <Modal.Header closeButton>
                        <Modal.Title>Presets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisteredChara onClick={this.addTemplateChara} locale={locale}/>
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
            sex: "female",
            attack: 0,
            hp: 0,
            plusBonus: 0,
            support: "none",
            support2: "none",
            support3: "none",
            ougiRatio: 4.5,
            type: "attack",
            favArm: "dagger",
            favArm2: "none",
            remainHP: 100,
            DA: 6.5,
            TA: 3.0,
            isConsideredInAverage: true,
            openBufflist: false,
            openLBlist: false,
            openEXLBlist: false,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            otherBuff2: 0,
            additionalDamageBuff: 0,
            supplementalDamageBuff: 0,
            daBuff: 0,
            taBuff: 0,
            ougiGageBuff: 0,
            uplift: 0,
            ougiDamageBuff: 0,
            damageLimitBuff: 0,
            ougiDamageLimitBuff: 0,
            LBATK: 0,
            LBHP: 0,
            LBDA: 0,
            LBTA: 0,
            LBElement: 0,
            LBOugiDamage: 0,
            LBOugiDamageLimit: 0,
            LBOugiGageBuff: 0,
            LBCritical1: "none",
            LBCritical2: "none",
            LBCritical3: "none",
            LBCritical4: "none",
            EXLBWED: false,
            EXLBATK: 0,
            EXLBHP: 0,
            EXLBOugiDamage: 0,
            EXLBOugiDamageLimit: 0,
            EXLBCritical: 0,
            EXLBHaisui: 0,
            EXLBKonshin: 0,
            EXLBDA: 0,
            EXLBTA: 0,
            criticalBuffCount: 0,
            criticalBuff: [],
        };
    },
    componentDidMount: function () {
        var state = this.state;

        // Read if there is a key corresponding to you in dataForLoad
        // (for newly added components when loading data)
        var chara = this.props.dataForLoad;
        if (chara != undefined && this.props.id in chara) {
            state = chara[this.props.id];
            this.setState(state);
            return 0
        }

        // read if addCharaID is set and matches yourself
        if (this.props.addChara != null && this.props.id == this.props.addCharaID) {
            var newchara = this.props.addChara;
            state = this.setNewCharaState(state, newchara);
            this.setState(state);
        }
        // Pass state after initialization to upper layer
        // Since CharaList hands onChange without permission, it is not necessary
        this.props.onChange(this.props.id, state, false);
    },
    componentWillReceiveProps: function (nextProps) {
        // only fired on Data Load
        if (nextProps.dataName != this.props.dataName) {
            var chara = nextProps.dataForLoad;
            if (chara != undefined && this.props.id in chara) {
                var state = chara[this.props.id];
                this.setState(state);
                return 0;
            }
        }

        // If there is a key corresponding to you in arrayForCopy read
        // (In the case of Chara there is no copy, only deletion)
        if (nextProps.arrayForCopy != undefined) {
            state = nextProps.arrayForCopy;
            this.setState(state);
            this.props.copyCompleted(this.props.id);
            return 0;
        }

        if (nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state;
            newState["element"] = nextProps.defaultElement;
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if (nextProps.addChara != null && nextProps.addChara != this.props.addChara && this.props.id == nextProps.addCharaID) {
            var newchara = nextProps.addChara;
            var newState = this.setNewCharaState(this.state, newchara);
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    setNewCharaState: function (newState, newchara) {
        newState["name"] = newchara[this.props.locale];
        newState["attack"] = parseInt(newchara.attack);
        newState["hp"] = parseInt(newchara.hp);
        newState["type"] = newchara.type;
        newState["race"] = newchara.race;
        newState["sex"] = newchara.sex;
        newState["element"] = newchara.element;
        newState["favArm"] = newchara.fav1;
        newState["favArm2"] = newchara.fav2;
        newState["DA"] = parseFloat(newchara.baseDA);
        newState["TA"] = parseFloat(newchara.baseTA);
        newState["support"] = newchara.support;
        newState["support2"] = newchara.support2;
        newState["support3"] = newchara.support3;
        newState["ougiRatio"] = newchara.ougiRatio;

        return newState;
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;

        if (key == "criticalBuffCount") {
            if (newState.criticalBuff.length > newState.criticalBuffCount) {
                newState.criticalBuff = newState.criticalBuff.slice(0, newState.criticalBuffCount);
            }
            for (let i = 0; i < newState.criticalBuffCount; i++) {
                if (newState.criticalBuff[i] == undefined) {
                    newState.criticalBuff[i] = {"value": 0.0, "attackRatio": 0.0};
                }
            }
        }

        this.setState(newState)
    },
    handleSelectEvent: function (key, e) {
        var newState = this.state;

        if (e.target.type === "checkbox") {
            newState[key] = e.target.checked;
        } else {
            newState[key] = e.target.value;
        }

        this.setState(newState);
        this.props.onChange(this.props.id, newState, false);
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
            e.target.blur();
            this.setState({attack: 1});
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
        this.setState({openBufflist: !(this.state.openBufflist)})
    },
    switchLBlist: function (e) {
        this.setState({openLBlist: !(this.state.openLBlist)})
    },
    switchEXLBlist: function (e) {
        this.setState({openEXLBlist: !(this.state.openEXLBlist)})
    },
    render: function () {
        var locale = this.props.locale;

        return (
            <div className="chara-content">
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <th className="bg-primary">{intl.translate("キャラ名", locale)}</th>
                        <td>
                            <FormControl componentClass="textarea" value={this.state.name}
                                         onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets}
                                         onChange={this.handleEvent.bind(this, "name")}/>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("平均に", locale)}</th>
                        <td>
                            <Checkbox inline checked={this.state.isConsideredInAverage}
                                      onChange={this.handleSelectEvent.bind(this, "isConsideredInAverage")}>
                                <strong>{intl.translate("含める", locale)}</strong>
                            </Checkbox>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("属性", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.element}
                                         onChange={this.handleSelectEvent.bind(this, "element")}>{selector[locale].elements}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("種族", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.race}
                                         onChange={this.handleSelectEvent.bind(this, "race")}>{selector[locale].races}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("性別", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.sex}
                                         onChange={this.handleSelectEvent.bind(this, "sex")}>{selector[locale].sexes}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("タイプ", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.type}
                                         onChange={this.handleSelectEvent.bind(this, "type")}>{selector[locale].types}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("得意武器", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.favArm}
                                         onChange={this.handleSelectEvent.bind(this, "favArm")}>{selector[locale].armtypes}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("得意武器", locale)}2</th>
                        <td><FormControl componentClass="select" value={this.state.favArm2}
                                         onChange={this.handleSelectEvent.bind(this, "favArm2")}>{selector[locale].armtypes}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("素の攻撃力", locale)}</th>
                        <td><FormControl type="number" min="0" max="15000" value={this.state.attack}
                                         onBlur={this.handleOnBlur.bind(this, "attack")}
                                         onChange={this.handleEvent.bind(this, "attack")}/></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("素のHP", locale)}</th>
                        <td><FormControl type="number" min="0" max="5000" value={this.state.hp}
                                         onBlur={this.handleOnBlur.bind(this, "hp")}
                                         onChange={this.handleEvent.bind(this, "hp")}/></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("プラスボーナス", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.plusBonus}
                                         onChange={this.handleSelectEvent.bind(this, "plusBonus")}>{selector.charaPlusNumList}</FormControl></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("残HP割合", locale)}</th>
                        <td><InputGroup><FormControl componentClass="select" value={this.state.remainHP}
                                         onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("基礎DA率", locale)}</th>
                        <td><InputGroup><FormControl type="number" min="0" step="0.1" value={this.state.DA}
                                         onBlur={this.handleOnBlur.bind(this, "DA")}
                                         onChange={this.handleEvent.bind(this, "DA")}/><InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("基礎TA率", locale)}</th>
                        <td><InputGroup><FormControl type="number" min="0" step="0.1" value={this.state.TA}
                                         onBlur={this.handleOnBlur.bind(this, "TA")}
                                         onChange={this.handleEvent.bind(this, "TA")}/><InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("奥義倍率", locale)}</th>
                        <td><FormControl type="number" min="0" step="0.5" max="20" value={this.state.ougiRatio}
                                         onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "ougiRatio")}/>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("サポアビ", locale)}1</th>
                        <td><FormControl componentClass="select" value={this.state.support}
                                         onChange={this.handleSelectEvent.bind(this, "support")}>{selector[locale].supportAbilities}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("サポアビ", locale)}2</th>
                        <td><FormControl componentClass="select" value={this.state.support2}
                                         onChange={this.handleSelectEvent.bind(this, "support2")}>{selector[locale].supportAbilities}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("サポアビ", locale)}3</th>
                        <td><FormControl componentClass="select" value={this.state.support3}
                                         onChange={this.handleSelectEvent.bind(this, "support3")}>{selector[locale].supportAbilities}</FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary"><Button
                            onClick={this.switchBufflist}>{intl.translate("個別バフ", locale)}</Button></th>
                        <td></td>
                    </tr>
                    {this.state.openBufflist ?
                        [
                            <tr key="normalBuff">
                                <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.normalBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "normalBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="elementBuff">
                                <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.elementBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "elementBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="otherBuff">
                                <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.otherBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "otherBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="otherBuff2">
                                <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.otherBuff2}
                                                 onChange={this.handleSelectEvent.bind(this, "otherBuff2")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="criticalBuff">
                                <th className="bg-primary">{intl.translate("クリティカルバフ", locale)}</th>
                                <td>
                                    <CriticalBuffList locale={locale}
                                        onBlur={this.handleOnBlur.bind(this, null)}
                                        onCountChange={(count) => this.setState({criticalBuffCount: count})}
                                        label="criticalBuff"
                                        criticalArray={this.state.criticalBuff}
                                        initialCount={this.state.criticalBuffCount} />
                                </td>
                            </tr>,
                            <tr key="daBuff">
                                <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.daBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "daBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="taBuff">
                                <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.taBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "taBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="additionalDamageBuff">
                                <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.additionalDamageBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "additionalDamageBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="supplementalDamageBuff">
                                <th className="bg-primary">{intl.translate("supplementalDamageBuff", locale)}</th>
                                <td><FormControl type="number" value={this.state.supplementalDamageBuff}
                                                 onBlur={this.handleOnBlur} onChange={this.handleSelectEvent.bind(this, "supplementalDamageBuff")}></FormControl>
                                </td>
                            </tr>,
                            <tr key="ougiGageBuff">
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.ougiGageBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="uplift">
                                <th className="bg-primary">{intl.translate("高揚", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.uplift}
                                                 onChange={this.handleSelectEvent.bind(this, "uplift")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="ougiDamageBuff">
                                <th className="bg-primary">{intl.translate("奥義ダメージUP", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.ougiDamageBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "ougiDamageBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="damageLimit">
                                <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.damageLimitBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "damageLimitBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
                            </tr>,
                            <tr key="ougiDamageLimit">
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                <td><InputGroup><FormControl componentClass="select" value={this.state.ougiDamageLimitBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "ougiDamageLimitBuff")}>{selector.buffLevel}</FormControl><InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup></td>
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
                                    <FormControl componentClass="select" value={this.state.LBATK}
                                                 onChange={this.handleSelectEvent.bind(this, "LBATK")}>
                                        {selector.limitBonusAttackList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="LBHP">
                                <th className="bg-primary">HP</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.LBHP}
                                                 onChange={this.handleSelectEvent.bind(this, "LBHP")}>
                                        {selector.limitBonusHPList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="LBDA">
                                <th className="bg-primary">DA</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBDA}
                                                 onChange={this.handleSelectEvent.bind(this, "LBDA")}>
                                        {selector.limitBonusDAList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBTA">
                                <th className="bg-primary">TA</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBTA}
                                                 onChange={this.handleSelectEvent.bind(this, "LBTA")}>
                                        {selector.limitBonusTAList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBElement">
                                <th className="bg-primary">{intl.translate("属性攻撃力", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBElement}
                                                 onChange={this.handleSelectEvent.bind(this, "LBElement")}>
                                        {selector.limitBonusElementList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBOugiDamage">
                                <th className="bg-primary">{intl.translate("奥義ダメージUP", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBOugiDamage}
                                                 onChange={this.handleSelectEvent.bind(this, "LBOugiDamage")}>
                                        {selector.limitBonusOugiDamageList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBOugiDamageLimit">
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBOugiDamageLimit}
                                                 onChange={this.handleSelectEvent.bind(this, "LBOugiDamageLimit")}>
                                        {selector.limitBonusOugiDamageLimitList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBOugiGageBuff">
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.LBOugiGageBuff}
                                                 onChange={this.handleSelectEvent.bind(this, "LBOugiGageBuff")}>
                                        {selector.limitBonusOugiGageBuffList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="LBCritical1">
                                <th className="bg-primary">{intl.translate("クリティカル", locale)}1</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.LBCritical1}
                                                 onChange={this.handleSelectEvent.bind(this, "LBCritical1")}>
                                        {selector[locale].limitBonusCriticalList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="LBCritical2">
                                <th className="bg-primary">{intl.translate("クリティカル", locale)}2</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.LBCritical2}
                                                 onChange={this.handleSelectEvent.bind(this, "LBCritical2")}>
                                        {selector[locale].limitBonusCriticalList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="LBCritical3">
                                <th className="bg-primary">{intl.translate("クリティカル", locale)}3</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.LBCritical3}
                                                 onChange={this.handleSelectEvent.bind(this, "LBCritical3")}>
                                        {selector[locale].limitBonusCriticalList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="LBCritical4">
                                <th className="bg-primary">{intl.translate("クリティカル", locale)}4</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.LBCritical4}
                                                 onChange={this.handleSelectEvent.bind(this, "LBCritical4")}>
                                        {selector[locale].limitBonusCriticalList}
                                    </FormControl>
                                </td>
                            </tr>
                        ]
                        : null}

                    <tr>
                        <th className="bg-primary">
                            <Button onClick={this.switchEXLBlist}>{intl.translate("指輪", locale)}</Button>
                        </th>
                        <td></td>
                    </tr>
                    {this.state.openEXLBlist ?
                        [
                            <tr key="EXLBWED">
                                <th className="bg-primary">{intl.translate("LB 久遠の指輪", locale)}</th>
                                <td>
                                    <Checkbox inline checked={this.state.EXLBWED}
                                              onChange={this.handleSelectEvent.bind(this, "EXLBWED")}>
                                    </Checkbox>
                                </td>
                            </tr>,
                            <tr key="EXLBATK">
                                <th className="bg-primary">{intl.translate("攻撃力", locale)}</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.EXLBATK}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBATK")}>
                                        {selector.EXlimitBonusAttackList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="EXLBHP">
                                <th className="bg-primary">HP</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.EXLBHP}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBHP")}>
                                        {selector.EXlimitBonusHPList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="EXLBOugiDamage">
                                <th className="bg-primary">{intl.translate("奥義ダメージ", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.EXLBOugiDamage}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBOugiDamage")}>
                                        {selector.EXlimitBonusOugiDamageList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="EXLBOugiDamageLimit">
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.EXLBOugiDamageLimit}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBOugiDamageLimit")}>
                                        {selector.EXlimitBonusOugiDamageLimitList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="EXLBCritical">
                                <th className="bg-primary">{intl.translate("クリティカル確率", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.EXLBCritical}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBCritical")}>
                                        {selector.EXlimitBonusCriticalList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="EXLBHaisui">
                                <th className="bg-primary">{intl.translate("背水", locale)}</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.EXLBHaisui}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBHaisui")}>
                                        {selector.EXlimitBonusHaisuiList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="EXLBKonshin">
                                <th className="bg-primary">{intl.translate("渾身", locale)}</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.EXLBKonshin}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBKonshin")}>
                                        {selector.EXlimitBonusKonshinList}
                                    </FormControl>
                                </td>
                            </tr>,
                            <tr key="EXLBDA">
                                <th className="bg-primary">{intl.translate("DA", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.EXLBDA}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBDA")}>
                                        {selector.EXlimitBonusDAList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>,
                            <tr key="EXLBTA">
                                <th className="bg-primary">{intl.translate("TA", locale)}</th>
                                <td><InputGroup>
                                    <FormControl componentClass="select" value={this.state.EXLBTA}
                                                 onChange={this.handleSelectEvent.bind(this, "EXLBTA")}>
                                        {selector.EXlimitBonusTAList}
                                    </FormControl>
                                <InputGroup.Addon>%</InputGroup.Addon></InputGroup></td>
                            </tr>
                        ]
                        : null}

                    </tbody>
                </table>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0 2px 0"}} onClick={this.clickMoveUp}><i
                        className="fa fa-angle-double-up" aria-hidden="true"/>{intl.translate("前へ", locale)}</Button>
                    <Button bsStyle="danger" style={{"width": "50%", "margin": "2px 0 2px 0"}}
                            onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0 2px 0"}}
                            onClick={this.clickMoveDown}><i className="fa fa-angle-double-down"
                                                            aria-hidden="true"/>{intl.translate("後へ", locale)}
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
});

module.exports.CharaList = CharaList;
module.exports.Chara = Chara;
