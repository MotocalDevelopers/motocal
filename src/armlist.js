var React = require('react');

var {Label, Button, ButtonGroup, FormControl, Modal, Panel, PanelGroup, Glyphicon} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var GlobalConst = require('./global_const.js');
var {RegisteredArm} = require('./template.js');
var TextWithTooltip = GlobalConst.TextWithTooltip;
var intl = require('./translate.js');

// inject GlobalConst...
var selector = GlobalConst.selector;
var _ua = GlobalConst._ua;

// ArmList has a number of Arm objects.
var ArmList = CreateClass({
    getInitialState: function () {
        var al = [];
        for (var i = 0; i < this.props.armNum; i++) al[i] = [];

        var arms = [];
        for (var i = 0; i < this.props.armNum; i++) {
            arms.push(i);
        }

        return {
            // Associative array to pass weapon list to Root
            alist: al,
            // Associative array for managing weapons list
            // Corresponds to stored data by index,
            // Delete the component etc. by using that value as key
            arms: arms,
            defaultElement: "fire",
            addArm: null,
            addArmID: -1,
            considerNum: 1,
            openPresets: false,
            arrayForCopy: {},
        };
    },
    closePresets: function () {
        this.setState({openPresets: false})
    },
    openPresets: function () {
        this.setState({openPresets: true})
    },
    updateArmNum: function (num) {
        var arms = this.state.arms;
        if (arms.length < num) {
            var maxvalue = Math.max.apply(null, arms);
            for (var i = 0; i < (num - arms.length); i++) {
                arms.push(i + maxvalue + 1)
            }
        } else {
            while (arms.length > num) {
                arms.pop();
            }
        }
        this.setState({arms: arms})
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.dataName != this.props.dataName && (Array.isArray(nextProps.dataForLoad))) {
            this.setState({alist: nextProps.dataForLoad});
            this.updateArmNum(nextProps.armNum);
            return 0;
        }

        // Once the number is erased on iPad etc, it becomes NaN
        if (!isNaN(parseInt(nextProps.armNum))) {
            // When armNum of this time becomes smaller, alist is also cut off (also when NaN last time)
            if (isNaN(parseInt(this.props.armNum)) || (parseInt(nextProps.armNum) < parseInt(this.props.armNum))) {
                var newalist = this.state.alist;
                while (newalist.length > nextProps.armNum) {
                    newalist.pop();
                }
                this.setState({alist: newalist})
            }
            this.updateArmNum(nextProps.armNum)
        }
    },
    handleOnCopy: function (id, state) {
        if (id < this.props.armNum - 1) {
            // Place the state to be copied in arrayForCopy,
            // Make it read by componentWillReceiveProps
            var newArrayForCopy = this.state.arrayForCopy;
            newArrayForCopy[id + 1] = JSON.parse(JSON.stringify(state));
            this.setState({arrayForCopy: newArrayForCopy});

            var newalist = this.state.alist;
            newalist[id + 1] = JSON.parse(JSON.stringify(state));
            this.setState({alist: newalist});

            // Propagate change to Root
            this.props.onChange(newalist, false);
        }
    },
    handleOnRemove: function (id, initialState) {
        var newarms = this.state.arms;
        var newalist = this.state.alist;
        if (this.state.alist.length > 1) {
            newarms.splice(id, 1);
            newalist.splice(id, 1);
        } else {
            // With initial state in arrayForCopy,
            // Make it read by componentWillReceiveProps
            var newArrayForCopy = this.state.arrayForCopy;
            newArrayForCopy[id] = initialState;
            this.setState({arrayForCopy: newArrayForCopy});
            newalist[id] = initialState;
        }
        this.setState({arms: newarms});
        this.setState({alist: newalist});

        // Propagate change to Root
        this.props.onChange(newalist, false);
    },
    handleMoveUp: function (id) {
        if (id > 0) {
            var newarms = this.state.arms;

            // Swap
            newarms.splice(id - 1, 2, newarms[id], newarms[id - 1]);
            this.setState({arms: newarms});

            var newalist = this.state.alist;
            newalist.splice(id - 1, 2, newalist[id], newalist[id - 1]);
            this.setState({alist: newalist});

            // Propagate change to Root
            this.props.onChange(newalist, false);
        }
    },
    handleMoveDown: function (id) {
        if (id < this.props.armNum - 1) {
            var newarms = this.state.arms;

            // Characters Swap
            newarms.splice(id, 2, newarms[id + 1], newarms[id]);
            this.setState({arms: newarms});

            // characterList Swap
            var newalist = this.state.alist;
            newalist.splice(id, 2, newalist[id + 1], newalist[id]);
            this.setState({alist: newalist});
            // Propagate change to Root
            this.props.onChange(newalist, false);
        }
    },
    copyCompleted: function (id) {
        var state = this.state;
        delete state["arrayForCopy"][id];
        this.setState(state);
    },
    handleOnChange: function (key, state, isSubtle) {
        var newalist = this.state.alist;
        newalist[key] = state;
        this.setState({alist: newalist});
        this.setState({addArm: null});
        this.props.onChange(newalist, isSubtle);
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        newState["addArm"] = null;
        this.setState(newState)
    },
    addTemplateArm: function (templateArm, considerNum) {
        var minimumID = -1;
        for (var key in this.state.alist) {
            if (this.state.alist[key].name == "") {
                minimumID = key;
                break;
            }
        }
        if (minimumID >= 0) {
            this.setState({addArm: templateArm});
            this.setState({addArmID: minimumID});
            this.setState({considerNum: considerNum});
            if (_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddArmNum() - 1;
            if (newKey >= 0) {
                this.setState({addArm: templateArm});
                this.setState({addArmID: newKey});
                this.setState({considerNum: considerNum});
                if (_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("武器がいっぱいです。")
            }
        }
    },
    render: function () {
        var locale = this.props.locale;
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var alist = this.state.alist;
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
        var dataForLoad = this.props.dataForLoad;
        var arrayForCopy = this.state.arrayForCopy;
        var copyCompleted = this.copyCompleted;

        // For view
        var panel_style = {"textAlign": "left"};

        return (
            <div className="armList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i
                    className="fa fa-folder-open" aria-hidden="true"/>{intl.translate("武器テンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement}
                             onChange={this.handleEvent.bind(this, "defaultElement")}> {selector[locale].elements} </FormControl>

                <PanelGroup defaultActiveKey={0} accordion id="armListView">
                    {arms.map(function (arm, ind) {
                        return (
                            <Panel key={arm} bsStyle="default" style={panel_style} eventKey={arm}>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        {(ind + 1)}: {(alist[ind] != null) ? alist[ind].name : ""}&nbsp;
                                        {(alist[ind] != null && alist[ind].name != "") ? alist[ind].considerNumberMax + intl.translate("本", locale) : ""}
                                        {(alist[ind] != null && alist[ind].name != "" && alist[ind].considerNumberMin) ? "(" + intl.translate("最小", locale) + alist[ind].considerNumberMin + intl.translate("本", locale) + ")" : "" }
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <Arm
                                        key={arm}
                                        onChange={hChange}
                                        onRemove={hRemove}
                                        onCopy={hCopy}
                                        onMoveUp={hMoveUp}
                                        onMoveDown={hMoveDown}
                                        addArm={addArm}
                                        addArmID={addArmID}
                                        considerNum={considerNum}
                                        id={ind}
                                        keyid={arm}
                                        dataName={dataName}
                                        defaultElement={defaultElement}
                                        locale={locale}
                                        openPresets={openPresets}
                                        dataForLoad={dataForLoad}
                                        arrayForCopy={arrayForCopy[ind]}
                                        copyCompleted={copyCompleted}/>
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
                        <RegisteredArm onClick={this.addTemplateArm} locale={locale}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
});

// Arm is a fundamental object corresponding one arm.
var Arm = CreateClass({
    getInitialState: function () {
        return {
            name: '',
            attack: 0,
            hp: 0,
            armType: 'sword',
            skill1: 'non',
            skill2: 'non',
            skill3: 'non',
            slv: 1,
            considerNumberMin: 0,
            considerNumberMax: 1,
            element: 'fire',
            element2: 'fire',
            element3: 'fire',
            skill1Detail: 0,
            skill2Detail: 0,
            skill3Detail: 0,
            series: "none",
        };
    },
    componentWillReceiveProps: function (nextProps) {
        // only fired on Data Load
        if (nextProps.dataName != this.props.dataName) {
            if ((nextProps.dataForLoad != undefined) && this.props.id in nextProps.dataForLoad) {
                var newState = nextProps.dataForLoad[this.props.id];
                this.setState(newState);
                return 0;
            }
        }

        // If arrayForCopy has a key applicable to you, read it
        // After copying (or resetting), tell it to ArmList and delete the corresponding data
        if (nextProps.arrayForCopy != undefined) {
            var state = nextProps.arrayForCopy;
            this.setState(state);
            this.props.copyCompleted(this.props.id);
            return 0;
        }

        if (nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state;
            newState["element"] = nextProps.defaultElement;
            newState["element2"] = nextProps.defaultElement;
            newState["element3"] = nextProps.defaultElement;
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if (nextProps.addArm != null && nextProps.addArm != this.props.addArm && this.props.id == nextProps.addArmID) {
            var newState = this.treatAddArmFromTemplate(this.state, nextProps.addArm, nextProps.considerNum);
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    componentDidMount: function () {
        var state = this.state;

        // Read if there is a key corresponding to you in dataForLoad
        // (for newly added components when loading data)
        var armlist = this.props.dataForLoad;
        if (this.props.dataForLoad != undefined && this.props.id in this.props.dataForLoad) {
            state = this.props.dataForLoad[this.props.id];
            this.setState(state);
            return 0
        }

        // If addArmID is the same as your ID, read template data
        if (this.props.addArm != null && this.props.id == this.props.addArmID) {
            state = this.treatAddArmFromTemplate(this.state, this.props.addArm, this.props.considerNum);
            this.setState(state);
        }

        // Pass state to the upper level after initialization (even if nothing is done)
        // In armList it is not necessary because onChange hands itself up without permission
        this.props.onChange(this.props.id, state, false);
    },
    treatAddArmFromTemplate: function (state, newarm, considerNum) {
        state["name"] = newarm.name;
        state["series"] = newarm.series;

        var attackCalcFunc = (lv, minlv, atk, minatk, plus, levelWidth) => {
            return Math.floor((lv - minlv) * (parseInt(atk) - parseInt(minatk)) / levelWidth + parseInt(minatk) + 5 * parseInt(plus))
        };
        var hpCalcFunc = (lv, minlv, hp, minhp, plus, levelWidth) => {
            return Math.floor((lv - minlv) * (parseInt(hp) - parseInt(minhp)) / levelWidth + parseInt(minhp) + parseInt(plus))
        };

        // separate processing by Lv
        if (newarm.lv == 1) {
            // special only in case of Lv 1 (status goes up by 2 levels when it becomes Lv 2)
            state["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus;
            state["hp"] = parseInt(newarm.minhp) + newarm.plus
        } else {
            var max_level = parseInt(newarm.maxlv);
            if (max_level === 75) {
                state["attack"] = attackCalcFunc(newarm.lv, 0, newarm.attack, newarm.minattack, newarm.plus, 75.0);
                state["hp"] = hpCalcFunc(newarm.lv, 0, newarm.hp, newarm.minhp, newarm.plus, 75.0)
            } else if (max_level === 100) {
                state["attack"] = attackCalcFunc(newarm.lv, 0, newarm.attack, newarm.minattack, newarm.plus, 100.0);
                state["hp"] = hpCalcFunc(newarm.lv, 0, newarm.hp, newarm.minhp, newarm.plus, 100.0)
            } else if (max_level === 120) {
                if (newarm.lv <= 75) {
                    // If Lv 75 or less is selected, process with one step lower value
                    state["attack"] = attackCalcFunc(newarm.lv, 0, newarm.attacklv75, newarm.minattack, newarm.plus, 75.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 0, newarm.hplv75, newarm.minhp, newarm.plus, 75.0)
                } else {
                    state["attack"] = attackCalcFunc(newarm.lv, 75, newarm.attack, newarm.attacklv75, newarm.plus, 45.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 75, newarm.hp, newarm.hplv75, newarm.plus, 45.0)
                }
            } else if (max_level === 150) {
                if (newarm.lv <= 100) {
                    // If Lv 100 or less is selected, process with one step lower value
                    state["attack"] = attackCalcFunc(newarm.lv, 0, newarm.attacklv100, newarm.minattack, newarm.plus, 100.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 0, newarm.hplv100, newarm.minhp, newarm.plus, 100.0)
                } else {
                    state["attack"] = attackCalcFunc(newarm.lv, 100, newarm.attack, newarm.attacklv100, newarm.plus, 50.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 100, newarm.hp, newarm.hplv100, newarm.plus, 50.0)
                }
            } else if (max_level === 200) {
                if (newarm.lv <= 100) {
                    // If Lv 100 or less is selected, process with two steps lower value
                    state["attack"] = attackCalcFunc(newarm.lv, 0, newarm.attacklv100, newarm.minattack, newarm.plus, 100.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 0, newarm.hplv100, newarm.minhp, newarm.plus, 100.0)
                } else if (newarm.lv <= 150) {
                    // If Lv 150 or less is selected, process with one step lower value
                    state["attack"] = attackCalcFunc(newarm.lv, 100, newarm.attacklv150, newarm.attacklv100, newarm.plus, 50.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 100, newarm.hplv150, newarm.hplv100, newarm.plus, 50.0)
                } else {
                    state["attack"] = attackCalcFunc(newarm.lv, 150, newarm.attack, newarm.attacklv150, newarm.plus, 50.0);
                    state["hp"] = hpCalcFunc(newarm.lv, 150, newarm.hp, newarm.hplv150, newarm.plus, 50.0)
                }
            }
        }

        if (newarm.lv != parseInt(newarm.maxlv)) state["name"] += "Lv." + newarm.lv;
		if (newarm.slv != newarm.slvmax) state["name"] += "SLv." + newarm.slv;
        if (newarm.plus != 0) state["name"] += "+" + newarm.plus;

        state["armType"] = newarm.type;
        state["element"] = newarm.element;
        state["skill1"] = newarm.skill1;
        state["element2"] = newarm.element2;
        state["skill2"] = newarm.skill2;
        state["element3"] = newarm.element3;
        state["skill3"] = newarm.skill3;
        state["slv"] = newarm.slv;
        state["considerNumberMax"] = parseInt(considerNum);

        state["skill1Detail"] = newarm.skill1Detail != undefined ? parseInt(newarm.skill1Detail) : 0;
        state["skill2Detail"] = newarm.skill2Detail != undefined ? parseInt(newarm.skill2Detail) : 0;
        state["skill3Detail"] = newarm.skill3Detail != undefined ? parseInt(newarm.skill3Detail) : 0;
        
        return state;
    },
    handleEvent: function (key, e) {
        // Do not send to parent when input
        var newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    handleSelectEvent: function (key, e) {
        // You can send it to your parent when you select it
        var newState = this.state;
        if (key == "considerNumberMin") {
            if (parseInt(e.target.value) > parseInt(this.state.considerNumberMax)) {
                newState["considerNumberMax"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if (key == "considerNumberMax") {
            if (parseInt(e.target.value) < parseInt(this.state.considerNumberMin)) {
                newState["considerNumberMin"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else {
            newState[key] = e.target.value;
        }

         if (key == "skill1" || key == "skill2" || key == "skill3") {
            newState[key] = e.target.value;
            newState[key + "Detail"] = 0;
         }

        this.setState(newState);
        this.props.onChange(this.props.id, newState, false)
    },
    handleOnBlur: function (key, e) {
        // Send change to parent only when focus is off
        if (key == "name") {
            this.props.onChange(this.props.id, this.state, true)
        } else {
            this.props.onChange(this.props.id, this.state, false)
        }
    },
    clickRemoveButton: function (e) {
        var initState = this.getInitialState();
        initState["considerNumberMax"] = 0;
        this.props.onRemove(this.props.id, initState)
    },
    clickCopyButton: function (e, state) {
        this.props.onCopy(this.props.id, this.state)
    },
    clickMoveUp: function (e) {
        this.props.onMoveUp(this.props.id)
    },
    clickMoveDown: function (e) {
        this.props.onMoveDown(this.props.id)
    },
    openPresets: function (e) {
        if (e.target.value == "" && this.state.attack == 0) {
            e.target.blur();
            this.setState({attack: 1});
            this.props.openPresets();
        }
    },
    render: function () {
        var locale = this.props.locale;

        return (
            <div className="chara-content">
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <th className="bg-primary">{intl.translate("武器名", locale)}</th>
                        <td>
                            <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.name}
                                         onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets}
                                         onChange={this.handleEvent.bind(this, "name")}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("カテゴリー", locale)}</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.series}
                                         onChange={this.handleSelectEvent.bind(this, "series")}> {selector[locale].series} </FormControl>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("攻撃力", locale)}</th>
                        <td>
                            <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack}
                                         onBlur={this.handleOnBlur.bind(this, "attack")}
                                         onChange={this.handleEvent.bind(this, "attack")}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">HP</th>
                        <td>
                            <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp}
                                         onBlur={this.handleOnBlur.bind(this, "hp")}
                                         onChange={this.handleEvent.bind(this, "hp")}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("種類", locale)}</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.armType}
                                         onChange={this.handleSelectEvent.bind(this, "armType")}> {selector[locale].armtypes} </FormControl>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("スキル", locale)}1</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.element}
                                         onChange={this.handleSelectEvent.bind(this, "element")}> {selector[locale].elements} </FormControl>
                            <FormControl componentClass="select" value={this.state.skill1}
                                         onChange={this.handleSelectEvent.bind(this, "skill1")}> {selector[locale].skills}</FormControl>
                            {GlobalConst.skillDetails[this.state.skill1] != undefined ?
                                 <div>
                                    <label>{intl.translate(GlobalConst.skillDetailsDescription[this.state.skill1], locale)}</label>
                                    <FormControl componentClass="select" value={this.state.skill1Detail}
                                                 onChange={this.handleSelectEvent.bind(this, "skill1Detail")}> {selector[locale][GlobalConst.skillDetails[this.state.skill1]]} </FormControl>
                                 </div>
                            : null}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("スキル", locale)}2</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.element2}
                                         onChange={this.handleSelectEvent.bind(this, "element2")}> {selector[locale].elements} </FormControl>
                            <FormControl componentClass="select" value={this.state.skill2}
                                         onChange={this.handleSelectEvent.bind(this, "skill2")}> {selector[locale].skills}</FormControl>
                            {GlobalConst.skillDetails[this.state.skill2] != undefined ?
                                 <div>
                                    <label>{intl.translate(GlobalConst.skillDetailsDescription[this.state.skill2], locale)}</label>
                                    <FormControl componentClass="select" value={this.state.skill2Detail}
                                                 onChange={this.handleSelectEvent.bind(this, "skill2Detail")}> {selector[locale][GlobalConst.skillDetails[this.state.skill2]]} </FormControl>
                                 </div>
                            : null}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("スキル", locale)}3</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.element3}
                                         onChange={this.handleSelectEvent.bind(this, "element3")}> {selector[locale].elements} </FormControl>
                            <FormControl componentClass="select" value={this.state.skill3}
                                         onChange={this.handleSelectEvent.bind(this, "skill3")}> {selector[locale].skills}</FormControl>
                            {GlobalConst.skillDetails[this.state.skill3] != undefined ?
                                 <div>
                                    <label>{intl.translate(GlobalConst.skillDetailsDescription[this.state.skill3], locale)}</label>
                                    <FormControl componentClass="select" value={this.state.skil3Detail}
                                                 onChange={this.handleSelectEvent.bind(this, "skill3Detail")}> {selector[locale][GlobalConst.skillDetails[this.state.skill3]]} </FormControl>
                                 </div>
                            : null}
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">SLv</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.slv}
                                         onChange={this.handleSelectEvent.bind(this, "slv")}> {selector.slv} </FormControl>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("最小本数", locale)}</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.considerNumberMin}
                                         onChange={this.handleSelectEvent.bind(this, "considerNumberMin")}> {selector.consider} </FormControl>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("最大本数", locale)}</th>
                        <td>
                            <FormControl componentClass="select" value={this.state.considerNumberMax}
                                         onChange={this.handleSelectEvent.bind(this, "considerNumberMax")}> {selector.consider} </FormControl>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="default" style={{"width": "25%", "margin": "2px 0px 2px 0px"}}
                            onClick={this.clickMoveUp}><i className="fa fa-angle-double-up"
                                                          aria-hidden="true"/>{intl.translate("前へ", locale)}</Button>
                    <Button bsStyle="danger" style={{"width": "25%", "margin": "2px 0px 2px 0px"}}
                            onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0px 2px 0px"}}
                            onClick={this.clickCopyButton}>{intl.translate("下にコピー", locale)}</Button>
                    <Button bsStyle="default" style={{"width": "25%", "margin": "2px 0px 2px 0px"}}
                            onClick={this.clickMoveDown}><i className="fa fa-angle-double-down"
                                                            aria-hidden="true"/>{intl.translate("後へ", locale)}
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
});

module.exports.ArmList = ArmList;
module.exports.Arm = Arm;
