var React = require('react');
var {Button, FormControl, InputGroup, Checkbox} = require('react-bootstrap');
var intl = require('./translate.js');
const GlobalConst = require('./global_const.js');
const Utilities = require('./utilities');
var TextWithTooltip = GlobalConst.TextWithTooltip;
var Typeahead = GlobalConst.Typeahead;
var CustomTypeahead = require('./typeahead').Typeahead;
var CreateClass = require('create-react-class');
var {CriticalBuffList} = require('./components.js');
// const
var zenith = GlobalConst.zenith;
var zenithDA = GlobalConst.zenithDA;
var zenithTA = GlobalConst.zenithTA;
//var zenithCritical = GlobalConst.zenithCritical;
var zenithOugiDamage = GlobalConst.zenithOugiDamage;
var zenithChainDamage = GlobalConst.zenithChainDamage;
var zenithChainDamageLimit = GlobalConst.zenithChainDamageLimit;
var zenithElement = GlobalConst.zenithElement;
var zenithDamageLimit = GlobalConst.zenithDamageLimit;
var Jobs = GlobalConst.Jobs;
var jobTypes = GlobalConst.jobTypes;
var armTypes = GlobalConst.armTypes;
var selector = GlobalConst.selector;




var Profile = CreateClass({
    getDefaultProps() {
        var zenithBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithBonuses.ja = Object.keys(zenith).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithBonuses.en = Object.keys(zenith).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithBonuses.zh = Object.keys(zenith).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithDABonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithDABonuses.ja = Object.keys(zenithDA).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithDABonuses.en = Object.keys(zenithDA).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithDABonuses.zh = Object.keys(zenithDA).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithTABonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithTABonuses.ja = Object.keys(zenithTA).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithTABonuses.en = Object.keys(zenithTA).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithTABonuses.zh = Object.keys(zenithTA).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        //var zenithCriticalBonuses = {"ja": {}, "en": {}, "zh": {}};
        //zenithCriticalBonus.ja = Object.keys(zenithCritical).map(function (opt) {
        //    return <option value={opt} key={opt}>{opt}</option>
        //});
        //zenithCriticalBonuses.en = Object.keys(zenithCritical).map(function (opt) {
        //    return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        //});
        //zenithCriticalBonuses.zh = Object.keys(zenithCritical).map(function (opt) {
        //    return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        //});

        var zenithOugiDamageBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithOugiDamageBonuses.ja = Object.keys(zenithOugiDamage).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithOugiDamageBonuses.en = Object.keys(zenithOugiDamage).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithOugiDamageBonuses.zh = Object.keys(zenithOugiDamage).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithChainDamageBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithChainDamageBonuses.ja = Object.keys(zenithChainDamage).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithChainDamageBonuses.en = Object.keys(zenithChainDamage).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithChainDamageBonuses.zh = Object.keys(zenithChainDamage).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithChainDamageLimitBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithChainDamageLimitBonuses.ja = Object.keys(zenithChainDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithChainDamageLimitBonuses.en = Object.keys(zenithChainDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithChainDamageLimitBonuses.zh = Object.keys(zenithChainDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithElementBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithElementBonuses.ja = Object.keys(zenithElement).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithElementBonuses.en = Object.keys(zenithElement).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithElementBonuses.zh = Object.keys(zenithElement).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var zenithDamageLimitBonuses = {"ja": {}, "en": {}, "zh": {}};
        zenithDamageLimitBonuses.ja = Object.keys(zenithDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{opt}</option>
        });
        zenithDamageLimitBonuses.en = Object.keys(zenithDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option>
        });
        zenithDamageLimitBonuses.zh = Object.keys(zenithDamageLimit).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(opt, "zh")}</option>
        });

        var alljobs = {"ja": {}, "en": {}, "zh": {}};
        alljobs.ja = Object.keys(Jobs).map(function (opt) {
            return <option value={opt} key={opt}>{Jobs[opt].name}</option>
        });
        alljobs.en = Object.keys(Jobs).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(Jobs[opt].name, "en")}</option>
        });
        alljobs.zh = Object.keys(Jobs).map(function (opt) {
            return <option value={opt} key={opt}>{intl.translate(Jobs[opt].name, "zh")}</option>
        });

        return {
            zenithBonuses: zenithBonuses,
            zenithDABonuses: zenithDABonuses,
            zenithTABonuses: zenithTABonuses,
            //zenithCriticalBonuses: zenithCriticalBonuses,
            zenithOugiDamageBonuses: zenithOugiDamageBonuses,
            zenithChainDamageBonuses: zenithChainDamageBonuses,
            zenithChainDamageLimitBonuses: zenithChainDamageLimitBonuses,
            zenithElementBonuses: zenithElementBonuses,
            zenithDamageLimitBonuses: zenithDamageLimitBonuses,
            alljobs: alljobs,
        };
    },
    componentDidMount: function () {
        // Pass initialized state to the upper hierarchy
        this.props.onChange(this.state);
    },
    componentWillReceiveProps: function (nextProps) {
        // only fired on Data Load
        if (nextProps.dataName != this.props.dataName && (nextProps.dataForLoad != undefined)) {
            var newState = nextProps.dataForLoad;
            this.setState(newState);
            return 0;
        }
    },
    getInitialState: function () {
        return {
            rank: 1,
            zenithAttackBonus: 0,
            zenithHPBonus: 0,
            zenithPartyHPBonus: 0,
            zenithBonus1: "無し",
            zenithBonus2: "無し",
            zenithDABonus: "無し",
            zenithTABonus: "無し",
            //zenithCriticalBonus: 0,
            zenithOugiDamageBonus: "無し",
            zenithChainDamageBonus: "無し",
            zenithChainDamageLimitBonus: "無し",
            zenithElementBonus: "無し",
            zenithDamageLimitBonus: "無し",
            masterBonus: 0,
            masterBonusHP: 0,
            masterBonusDA: 0,
            masterBonusTA: 0,
            masterBonusDamageLimit: 0,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            otherBuff2: 0,
            ougiDamageBuff: 0,
            additionalDamageBuff: 0,
            supplementalDamageBuff: 0,
            damageLimitBuff: 0.0,
            ougiDamageLimitBuff: 0.0,
            ougiGageUpOugiBuff: 0.0,
            uplift: 0,
            hpBuff: 0,
            daBuff: 0,
            taBuff: 0,
            hp: 100,
            remainHP: 100,
            enemyElement: "wind",
            enemyDefense: 10.0,
            defenseDebuff: 0.0,
            enemyResistance: 0.0,
            job: "none",
            sex: "female",
            element: "fire",
            DA: 6.5,
            TA: 3.0,
            ougiGageBuff: 0,
            ougiRatio: 4.5,
            minimumHP: 0.0,
            chainNumber: 1,
            personalNormalBuff: 0.0,
            personalElementBuff: 0.0,
            personalOtherBuff: 0.0,
            personalOtherBuff2: 0.0,
            personalAdditionalDamageBuff: 0.0,
            personalSupplementalDamageBuff: 0,
            personalDABuff: 0.0,
            personalTABuff: 0.0,
            personalOugiDamageBuff: 0.0,
            personalOugiGageBuff: 0.0,
            personalUplift: 0,
            personalDamageLimitBuff: 0.0,
            personalOugiDamageLimitBuff: 0.0,
            ruleMaxSize: true,
            filterOptionsChanged: false,
            criticalBuff: [],
            criticalBuffCount: 0,
            personalCriticalBuff: [],
            personalCriticalBuffCount: 0,
            retsujitsuNoRakuen: false,
        };
    },
    switchBufflist: function (e) {
        this.setState({openBufflist: !(this.state.openBufflist)})
    },
    switchLBlist: function (e) {
        this.setState({openLBlist: !(this.state.openLBlist)})
    },
    handleAutoCompleteEvent: function (ref, key, selected) {
        let newState = this.state;
        if (selected[0] !== undefined) {
            if (selected[0].hasOwnProperty("id")) {
                newState[key] = selected[0].id;
            } else {
                newState[key] = selected[0];
            }
        } else {
            newState[key] = ref.state.text;
        }

        if (key == "criticalBuffCount") {
            if (newState.criticalBuff.length > newState.criticalBuffCount) {
                newState.criticalBuff = newState.criticalBuff.slice(0, newState.criticalBuffCount);
            }
            for (let i = 0; i < newState.criticalBuffCount; i++) {
                if (newState.criticalBuff[i] == undefined) {
                    newState.criticalBuff[i] = {"value": 0.0, "attackRatio": 0.0};
                }
            }
        } else if (key == "personalCriticalBuffCount") {
            if (newState.personalCriticalBuff.length > newState.personalCriticalBuffCount) {
                newState.personalCriticalBuff = newState.personalCriticalBuff.slice(0, newState.personalCriticalBuffCount);
            }
            for (let i = 0; i < newState.personalCriticalBuffCount; i++) {
                if (newState.personalCriticalBuff[i] == undefined) {
                    newState.personalCriticalBuff[i] = {"value": 0.0, "attackRatio": 0.0};
                }
            }
        }

        this.props.onChange(newState);
    },
    handleEvent: function (key, e) {
        this.handleAutoCompleteEvent(null, key, [e.target.value])
    },
    completeBlurAction: function (ref, key) {
        let newState = this.state;
        if (key) {
            let value;
            if (ref.state.text !== undefined) {
                value = ref.state.text;
            } else if (ref.state.hasOwnProperty("selected") && ref.state.selected.length > 0) {
                if (ref.state.selected[0]) {
                    if (ref.state.selected[0].hasOwnProperty("id")) {
                        value = ref.state.selected[0].id;
                    } else {
                        value = ref.state.selected[0];
                    }
                }
            } else {
                value = ref.props.value;
            }
            if (ref.props.inputProps) {
                if (ref.props.inputProps.targettype === "number") {
                    value = Utilities.parseNumberInputField(value, ref.props.inputProps, this.state.StatePlaceholder);
                }
            } else {
                if (ref.props.type === "number") {
                    value = Utilities.parseNumberInputField(value, ref.props, this.state.StatePlaceholder);
                }
            }
            newState[key] = value;
        }
        return newState;
    },
    handleAutoCompleteOnBlur: function (ref, key) {
        // Send change to parent only when focus is off
        let newState = this.completeBlurAction(ref, key);
        if (key) {
            if (ref instanceof Typeahead){
                ref.setState({text: newState[key].toString()});
            }
        }
        this.props.onChange(newState);
    },
    handleOnBlur: function (key, value) {
        // Send change to parent only when focus is off
        this.state[key] = value;
        this.props.onChange(this.state);
    },
    selectInputElement: function (input) {
        input.value = this.state.StatePlaceholder;
        input.select();
    },
    handleAutoCompleteOnFocus: function (ref, e, input = undefined) {
        let value = e.target.value;

        if (value) {
            this.state.StatePlaceholder = value;
        }

        if (ref instanceof Typeahead) {
            input = ref.getInput();
        } else if (ref instanceof FormControl) {
            input = e.target;
        }
        this.selectInputElement(input);
    },
    handleOnFocus: function (e) {
        if (e.target.value) {
            this.state.StatePlaceholder = e.target.value;
        }
        e.target.select();
    },
    handleSelectEvent: function (key, e) {
        // A select type input form is good for onChange
        var newState = this.state;
        if (e.target.type === "checkbox") {
            newState[key] = e.target.checked;
        } else {
            newState[key] = e.target.value;
        }

        if (key == "job") {
            newState.DA = Jobs[e.target.value].DaBonus;
            newState.TA = Jobs[e.target.value].TaBonus
        }
        if (e.target.type === "checkbox") {
            newState[key] = e.target.checked;
            if (key.toLowerCase().includes("rule")) {
                newState.filterOptionsChanged = true;
            }
        }
        this.setState(newState);
        this.props.onChange(newState);
    },
    renderTwitterLink: function () {
        if (process.env.TWITTER_ID) {
            return (
                <p className="text-success">運営者のTwitterはこちら <a href={`https://twitter.com/${process.env.TWITTER_ID}`}
                                                               target="_blank">{`@${process.env.TWITTER_ID}`}</a></p>
            );
        }
        return null;
    },
    render: function () {
        let locale = this.props.locale;
        let showInvul = this.state.openBufflist ? "" : "hidden";
        return (
            <div className="profile">
                {this.renderTwitterLink()}
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("プロフィールタイトル", locale)}</strong>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん属性", locale)}<span
                            className="input-suggest">*</span></th>
                        <td><FormControl componentClass="select" value={this.state.element}
                                         onChange={this.handleSelectEvent.bind(this, "element")}> {selector[locale].elements} </FormControl>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("敵の属性説明", locale)} id={"tooltip-enemy-element-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("敵の属性", locale)}<span className="input-suggest">*</span>
                            </th>
                            <td><FormControl componentClass="select" value={this.state.enemyElement}
                                             onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {selector[locale].enemyElements} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ランク説明", locale)} id={"tooltip-rank-detail"}>
                        <tr>
                            <th className="bg-primary">Rank<span className="input-suggest">*</span></th>
                            <td>
                                <FormControl type="number" min="1" max="250" value={this.state.rank}
                                             onBlur={this.handleOnBlur.bind(this, "rank")}
                                             onFocus={this.handleOnFocus}
                                             onChange={this.handleEvent.bind(this, "rank")}/>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジョブ説明", locale)} id={"tooltip-job-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジョブ", locale)}<span
                                className="input-suggest">*</span>
                                <span style={{display: "block"}}
                                      className="label label-default">{intl.translate("得意", locale)}</span>
                                <span style={{display: "block"}}
                                      className="label label-default">[{intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)}, {intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)}]</span>
                                <span style={{display: "block"}}
                                      className="label label-info">{intl.translate(jobTypes[Jobs[this.state.job].type], locale)}{intl.translate("タイプ", locale)}</span>
                                <span style={{display: "block"}}
                                      className="label label-danger">{intl.translate("攻撃ボーナス", locale)} {Jobs[this.state.job].atBonus}</span>
                                <span style={{display: "block"}}
                                      className="label label-success">{intl.translate("HPボーナス", locale)} {Jobs[this.state.job].hpBonus}</span>
                                <span style={{display: "block"}}
                                      className="label label-danger">{intl.translate("攻刃ボーナス", locale)} {Jobs[this.state.job].kouzinBonus}%</span>
                                <span style={{display: "block"}}
                                      className="label label-success">{intl.translate("守護ボーナス", locale)} {Jobs[this.state.job].shugoBonus}%</span>
                                <span style={{display: "block"}}
                                      className="label label-warning">{intl.translate("基礎DA率", locale)} {Jobs[this.state.job].DaBonus}%</span>
                                <span style={{display: "block"}}
                                      className="label label-warning">{intl.translate("基礎TA率", locale)} {Jobs[this.state.job].TaBonus}%</span>
                            </th>
                            <td><FormControl componentClass="select" value={this.state.job}
                                             onChange={this.handleSelectEvent.bind(this, "job")}> {this.props.alljobs[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん性別", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.sex}
                                         onChange={this.handleSelectEvent.bind(this, "sex")}> {selector[locale].sexes} </FormControl>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary"><Button
                            onClick={this.switchBufflist}>{intl.translate("個別バフ", locale)}</Button></th>
                        <td/>
                    </tr>

                    <TextWithTooltip className={showInvul} tooltip={intl.translate("残HP割合説明(ジータのみ)", locale)}
                                     id={"tooltip-remain-hp-djeeta-detail"}>
                        <tr className={showInvul}>
                            <th className="bg-primary">
                                {intl.translate("残HP割合", locale)}<br/>{intl.translate("ジータさんのみ", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <FormControl componentClass="select" value={this.state.remainHP}
                                                 onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}
                                    </FormControl>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <tr className={showInvul} key="personalNormalBuff">
                        <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalNormalBuffField"
                                    selected={[this.state.personalNormalBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.personalNormalBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.personalNormalBuffFieldTypeahead, "personalNormalBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.personalNormalBuffFieldTypeahead, "personalNormalBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalNormalBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalNormalBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.personalNormalBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalElementBuff">
                        <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalElementBuffField"
                                    selected={[this.state.personalNormalBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalElementBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalElementBuffFieldTypeahead, "personalElementBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalElementBuffFieldTypeahead, "personalElementBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalElementBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalElementBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalElementBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalOtherBuff">
                        <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalOtherBuffField"
                                    selected={[this.state.personalOtherBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalOtherBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalOtherBuffFieldTypeahead, "personalOtherBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalOtherBuffFieldTypeahead, "personalOtherBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalOtherBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalOtherBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalOtherBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalOtherBuff2">
                        <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalOtherBuff2Field"
                                    selected={[this.state.personalOtherBuff2.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalOtherBuff2FieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalOtherBuff2FieldTypeahead, "personalOtherBuff2")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalOtherBuff2FieldTypeahead, "personalOtherBuff2")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalOtherBuff2FieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalOtherBuff2FieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalOtherBuff2FieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalCriticalBuff">
                        <th className="bg-primary">{intl.translate("クリティカルバフ", locale)}</th>
                        <td>
                            <CriticalBuffList locale={locale}
                                              onBlur={this.handleAutoCompleteOnBlur}
                                              onFocus={this.handleAutoCompleteOnFocus}
                                              onCountChange={(count) => this.setState({personalCriticalBuffCount: count})}
                                              label="personalCriticalBuff"
                                              renderMenu={GlobalConst.renderMenu}
                                              filterBy={GlobalConst.filterBy}
                                              placeHolder={this.state.StatePlaceholder}
                                              criticalArray={this.state.personalCriticalBuff}
                                              initialCount={this.state.personalCriticalBuffCount}/>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalDABuff">
                        <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalDABuffField"
                                    selected={[this.state.personalDABuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalDABuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalDABuffFieldTypeahead, "personalDABuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalDABuffFieldTypeahead, "personalDABuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalDABuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalDABuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalDABuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalTABuff">
                        <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalTABuffField"
                                    selected={[this.state.personalTABuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalTABuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalTABuffFieldTypeahead, "personalTABuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalTABuffFieldTypeahead, "personalTABuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalTABuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalTABuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalTABuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalAdditionalDamageBuff">
                        <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalAdditionalDamageBuffField"
                                    selected={[this.state.personalAdditionalDamageBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalAdditionalDamageBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalAdditionalDamageBuffFieldTypeahead, "personalAdditionalDamageBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalAdditionalDamageBuffFieldTypeahead, "personalAdditionalDamageBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalAdditionalDamageBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalAdditionalDamageBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalAdditionalDamageBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalSupplementalDamageBuff">
                        <th className="bg-primary">{intl.translate("supplementalDamageBuff", locale)}</th>
                        <td>
                            <FormControl id="personalSupplementalDamageBuffField" type="number"
                                         value={this.state.personalSupplementalDamageBuff}
                                         onFocus={this.handleOnFocus}
                                         onBlur={this.handleOnBlur.bind(this, "personalSupplementalDamageBuff")}
                                         onChange={this.handleEvent.bind(this, "personalSupplementalDamageBuff")}/>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalOugiDamageBuff">
                        <th className="bg-primary">{intl.translate("奥義ダメージUP", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalOugiDamageBuffField"
                                    selected={[this.state.personalOugiDamageBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalOugiDamageBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalOugiDamageBuffFieldTypeahead, "personalOugiDamageBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalOugiDamageBuffFieldTypeahead, "personalOugiDamageBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalOugiDamageBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalOugiDamageBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalOugiDamageBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalOugiGageBuff">
                        <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalOugiGageBuffField"
                                    selected={[this.state.personalOugiGageBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalOugiGageBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalOugiGageBuffFieldTypeahead, "personalOugiGageBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalOugiGageBuffFieldTypeahead, "personalOugiGageBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalOugiGageBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalOugiGageBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalOugiGageBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalUplift">
                        <th className="bg-primary">{intl.translate("高揚", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalUpliftField"
                                    selected={[this.state.personalUplift.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalUpliftFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalUpliftFieldTypeahead, "personalUplift")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalUpliftFieldTypeahead, "personalUplift")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalUpliftFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalUpliftFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalUpliftFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalDamageLimitBuff">
                        <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalDamageLimitBuffField"
                                    selected={[this.state.personalDamageLimitBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalDamageLimitBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalDamageLimitBuffFieldTypeahead, "personalDamageLimitBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalDamageLimitBuffFieldTypeahead, "personalDamageLimitBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalDamageLimitBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalDamageLimitBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalDamageLimitBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr className={showInvul} key="personalOugiDamageLimitBuff">
                        <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                        <td>
                            <InputGroup>
                                <Typeahead
                                    id="personalOugiDamageLimitBuffField"
                                    selected={[this.state.personalOugiDamageLimitBuff.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.personalOugiDamageLimitBuffFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.personalOugiDamageLimitBuffFieldTypeahead, "personalOugiDamageLimitBuff")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.personalOugiDamageLimitBuffFieldTypeahead, "personalOugiDamageLimitBuff")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.personalOugiDamageLimitBuffFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.personalOugiDamageLimitBuffFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.personalOugiDamageLimitBuffFieldTypeahead = ref}
                                    options={selector.buffLevel}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("ジータさんマスターボーナス", locale)}</strong>
                            <p>{intl.translate("ジータさんマスターボーナス説明", locale)}</p>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("マスボATK説明", locale)} id={"tooltip-masterbonus-atk-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボATK", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusField"
                                        selected={[this.state.masterBonus.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.masterBonusFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.masterBonusFieldTypeahead, "masterBonus")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.masterBonusFieldTypeahead, "masterBonus")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.masterBonusFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.masterBonusFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.masterBonusFieldTypeahead = ref}
                                        options={selector.masteratk}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボATK説明", locale)} id={"tooltip-masterbonus-atk-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボATK", locale)}
                            </th>
                            <td>
                                <CustomTypeahead value={this.state.masterBonus.toString()}
                                                 options={selector.masteratk}
                                                 onBlur={this.handleOnBlur}
                                                 stat="masterBonus"
                                                 addon="%"
                                                 onChange={(value) => this.state.masterBonus = value}>
                                </CustomTypeahead>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボHP説明", locale)} id={"tooltip-masterbonus-hp-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボHP", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusHPField"
                                        selected={[this.state.masterBonusHP.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.masterBonusHPFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.masterBonusHPFieldTypeahead, "masterBonusHP")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.masterBonusHPFieldTypeahead, "masterBonusHP")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.masterBonusHPFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.masterBonusHPFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.masterBonusHPFieldTypeahead = ref}
                                        options={selector.masterhp}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボDA説明", locale)} id={"tooltip-masterbonus-da-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボDA", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusDAField"
                                        selected={[this.state.masterBonusDA.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.masterBonusDAFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.masterBonusDAFieldTypeahead, "masterBonusDA")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.masterBonusDAFieldTypeahead, "masterBonusDA")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.masterBonusDAFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.masterBonusDAFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.masterBonusDAFieldTypeahead = ref}
                                        options={selector.masterDA}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボTA説明", locale)} id={"tooltip-masterbonus-ta-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボTA", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusTAField"
                                        selected={[this.state.masterBonusTA.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.masterBonusTAFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.masterBonusTAFieldTypeahead, "masterBonusTA")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.masterBonusTAFieldTypeahead, "masterBonusTA")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.masterBonusTAFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.masterBonusTAFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.masterBonusTAFieldTypeahead = ref}
                                        options={selector.masterTA}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボダメ上限説明", locale)}
                                     id={"tooltip-masterbonus-damagelimit-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボダメ上限", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusDamageLimitField"
                                        selected={[this.state.masterBonusDamageLimit.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.masterBonusDamageLimitFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.masterBonusDamageLimitFieldTypeahead, "masterBonusDamageLimit")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.masterBonusDamageLimitFieldTypeahead, "masterBonusDamageLimit")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.masterBonusDamageLimitFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.masterBonusDamageLimitFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.masterBonusDamageLimitFieldTypeahead = ref}
                                        options={selector.masterDamageLimit}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("ジータさんリミットボーナス", locale)}</strong>
                            <p>{intl.translate("ジータさんリミットボーナス説明", locale)}</p>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("LB 攻撃力", locale)}
                            <span className="input-suggest">*</span>
                        </th>
                        <td>
                            <Typeahead
                                id="zenithAttackBonusField"
                                selected={[this.state.zenithAttackBonus.toString()]}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.zenithAttackBonusFieldTypeahead)}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.zenithAttackBonusFieldTypeahead, "zenithAttackBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this, this.state.zenithAttackBonusFieldTypeahead, "zenithAttackBonus")}
                                renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.zenithAttackBonusFieldTypeahead)}
                                onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.zenithAttackBonusFieldTypeahead)}
                                filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                ref={(ref) => this.state.zenithAttackBonusFieldTypeahead = ref}
                                options={selector.zenithAttack}/>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("LB HP", locale)}</th>
                        <td>
                            <Typeahead
                                id="zenithHPBonusField"
                                selected={[this.state.zenithHPBonus.toString()]}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.zenithHPBonusFieldTypeahead)}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.zenithHPBonusFieldTypeahead, "zenithHPBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this, this.state.zenithHPBonusFieldTypeahead, "zenithHPBonus")}
                                renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.zenithHPBonusFieldTypeahead)}
                                onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.zenithHPBonusFieldTypeahead)}
                                filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                ref={(ref) => this.state.zenithHPBonusFieldTypeahead = ref}
                                options={selector.zenithHP}/>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("味方全体のHP", locale)}</th>
                        <td>
                            <Typeahead
                                id="zenithPartyHPBonusField"
                                selected={[this.state.zenithPartyHPBonus.toString()]}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.zenithPartyHPBonusFieldTypeahead)}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.zenithPartyHPBonusFieldTypeahead, "zenithPartyHPBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this, this.state.zenithPartyHPBonusFieldTypeahead, "zenithPartyHPBonus")}
                                renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.zenithPartyHPBonusFieldTypeahead)}
                                onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.zenithPartyHPBonusFieldTypeahead)}
                                filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                ref={(ref) => this.state.zenithPartyHPBonusFieldTypeahead = ref}
                                options={selector.zenithPartyHP}/>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("LB DAの説明", locale)} id={"tooltip-da-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB DA", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithDABonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithDABonus")}> {this.props.zenithDABonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("LB TAの説明", locale)} id={"tooltip-ta-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB TA", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithTABonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithTABonus")}> {this.props.zenithTABonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("LB ダメージ上限UPの説明", locale)} id={"tooltip-ta-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB ダメージ上限UP", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithDamageLimitBonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithDamageLimitBonus")}> {this.props.zenithDamageLimitBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("LB 奥義の説明", locale)}
                                     id={"tooltip-ougidamage-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB 奥義", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithOugiDamageBonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithOugiDamageBonus")}> {this.props.zenithOugiDamageBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <tr>
                        <th className="bg-primary"><Button
                            onClick={this.switchLBlist}>{intl.translate("その他ジータさんLB", locale)}</Button></th>
                        <td/>
                    </tr>

                    {this.state.openLBlist ?
                        [
                            <TextWithTooltip tooltip={intl.translate("LB 属性攻撃の説明", locale)}
                                             id={"tooltip-critical-zenith-detail"}>
                                <tr>
                                    <th className="bg-primary">{intl.translate("LB 属性攻撃", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.zenithElementBonus}
                                                     onChange={this.handleSelectEvent.bind(this, "zenithElementBonus")}> {this.props.zenithElementBonuses[locale]} </FormControl>
                                    </td>
                                </tr>
                            </TextWithTooltip>,

                            <TextWithTooltip tooltip={intl.translate("LB チェンバの説明", locale)}
                                             id={"tooltip-chaindamage-zenith-detail"}>
                                <tr>
                                    <th className="bg-primary">{intl.translate("LB チェンバ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.zenithChainDamageBonus}
                                                     onChange={this.handleSelectEvent.bind(this, "zenithChainDamageBonus")}> {this.props.zenithChainDamageBonuses[locale]} </FormControl>
                                    </td>
                                </tr>
                            </TextWithTooltip>,

                            <TextWithTooltip tooltip={intl.translate("LB チェンバ上限の説明", locale)}
                                             id={"tooltip-chaindamagelimit-zenith-detail"}>
                                <tr>
                                    <th className="bg-primary">{intl.translate("LB チェンバ上限", locale)}</th>
                                    <td><FormControl componentClass="select"
                                                     value={this.state.zenithChainDamageLimitBonus}
                                                     onChange={this.handleSelectEvent.bind(this, "zenithChainDamageLimitBonus")}> {this.props.zenithChainDamageLimitBonuses[locale]} </FormControl>
                                    </td>
                                </tr>
                            </TextWithTooltip>,

                            <TextWithTooltip tooltip={intl.translate("得意武器攻撃の説明", locale)}
                                             id={"tooltip-weapon-zenith-detail"}>
                                <tr>
                                    <th className="bg-primary">
                                        {intl.translate("得意武器攻撃1", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)})
                                    </th>
                                    <td><FormControl componentClass="select" value={this.state.zenithBonus1}
                                                     onChange={this.handleSelectEvent.bind(this, "zenithBonus1")}> {this.props.zenithBonuses[locale]} </FormControl>
                                    </td>
                                </tr>
                            </TextWithTooltip>,

                            <TextWithTooltip tooltip={intl.translate("得意武器攻撃の説明", locale)}
                                             id={"tooltip-weapon-zenith-detail"}>
                                <tr>
                                    <th className="bg-primary">
                                        {intl.translate("得意武器攻撃2", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)})
                                    </th>
                                    <td><FormControl componentClass="select" value={this.state.zenithBonus2}
                                                     onChange={this.handleSelectEvent.bind(this, "zenithBonus2")}> {this.props.zenithBonuses[locale]} </FormControl>
                                    </td>
                                </tr>
                            </TextWithTooltip>
                        ]
                        : null}

                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("パーティバフタイトル", locale)}</strong>
                            <p>{intl.translate("パーティバフ説明", locale)}</p>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("通常バフ説明", locale)} id={"tooltip-normalbuff-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("通常バフ", locale)}
                            </th>
                            <td className="table-profile-td">
                                <InputGroup>
                                    <Typeahead
                                        id="normalBuffField"
                                        selected={[this.state.normalBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.normalBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.normalBuffFieldTypeahead, "normalBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.normalBuffFieldTypeahead, "normalBuff")}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.normalBuffFieldTypeahead)}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.normalBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.normalBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("属性バフ説明", locale)} id={"tooltip-elementbuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="elementBuffField"
                                        selected={[this.state.elementBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.elementBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.elementBuffFieldTypeahead, "elementBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.elementBuffFieldTypeahead, "elementBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.elementBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.elementBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.elementBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("その他バフ説明", locale)} id={"tooltip-otherbuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="otherBuffField"
                                        selected={[this.state.otherBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.otherBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.otherBuffFieldTypeahead, "otherBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.otherBuffFieldTypeahead, "otherBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.otherBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.otherBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.otherBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("その他バフ2説明", locale)} id={"tooltip-otherbuff2-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="otherBuff2Field"
                                        selected={[this.state.otherBuff2.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.otherBuff2FieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.otherBuff2FieldTypeahead, "otherBuff2")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.otherBuff2FieldTypeahead, "otherBuff2")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.otherBuff2FieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.otherBuff2FieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.otherBuff2FieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("クリティカルバフ説明", locale)} id={"tooltip-critical-buff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("クリティカルバフ", locale)}</th>
                            <td>
                                <CriticalBuffList locale={locale}
                                                  onBlur={this.handleAutoCompleteOnBlur}
                                                  onFocus={this.handleAutoCompleteOnFocus}
                                                  onCountChange={(count) => this.setState({criticalBuffCount: count})}
                                                  label="criticalBuff"
                                                  criticalArray={this.state.criticalBuff}
                                                  renderMenu={GlobalConst.renderMenu}
                                                  filterBy={GlobalConst.filterBy}
                                                  placeHolder={this.state.StatePlaceholder}
                                                  initialCount={this.state.criticalBuffCount}/>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("HPバフ説明", locale)} id={"tooltip-hpbuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("HPバフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="hpBuffField"
                                        selected={[this.state.hpBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.hpBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.hpBuffFieldTypeahead, "hpBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.hpBuffFieldTypeahead, "hpBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.hpBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.hpBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.hpBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("DAバフ説明", locale)} id={"tooltip-dabuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="daBuffField"
                                        selected={[this.state.daBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.daBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.daBuffFieldTypeahead, "daBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.daBuffFieldTypeahead, "daBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.daBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.daBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.daBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("TAバフ説明", locale)} id={"tooltip-tabuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="taBuffField"
                                        selected={[this.state.taBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.taBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.taBuffFieldTypeahead, "taBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.taBuffFieldTypeahead, "taBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.taBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.taBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.taBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("残HP割合", locale)} id={"tooltip-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("残HP割合", locale)}</th>
                            <td>
                                <InputGroup>
                                    <FormControl componentClass="select" value={this.state.hp}
                                                 onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("奥義ダメージ上限アップ説明", locale)}
                                     id={"tooltip-ougidamagebuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("奥義ダメージバフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="ougiDamageBuffField"
                                        selected={[this.state.ougiDamageBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.ougiDamageBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.ougiDamageBuffFieldTypeahead, "ougiDamageBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.ougiDamageBuffFieldTypeahead, "ougiDamageBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.ougiDamageBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.ougiDamageBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.ougiDamageBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("追加ダメージバフ説明", locale)}
                                     id={"tooltip-additionalbuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="additionalDamageBuffField"
                                        selected={[this.state.additionalDamageBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.additionalDamageBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.additionalDamageBuffFieldTypeahead, "additionalDamageBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.additionalDamageBuffFieldTypeahead, "additionalDamageBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.additionalDamageBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.additionalDamageBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.additionalDamageBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("supplementalDamageBuff-tooltip", locale)} //与ダメージ上昇効果バフ
                                     id={"tooltip-supplementalDamageBuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("supplementalDamageBuff", locale)}</th>
                            <td>
                                <FormControl id="supplementalDamageBuffField" type="number"
                                             value={this.state.supplementalDamageBuff}
                                             onFocus={this.handleOnFocus}
                                             onBlur={this.handleOnBlur.bind(this, "supplementalDamageBuff")}
                                             onChange={this.handleEvent.bind(this, "supplementalDamageBuff")}>
                                </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("奥義ゲージ上昇率アップ説明", locale)}
                                     id={"tooltip-ougigagebuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("奥義ゲージ上昇量バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="ougiGageBuffField"
                                        selected={[this.state.ougiGageBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.ougiGageBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.ougiGageBuffFieldTypeahead, "ougiGageBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.ougiGageBuffFieldTypeahead, "ougiGageBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.ougiGageBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.ougiGageBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.ougiGageBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("高揚説明", locale)}
                                     id={"tooltip-uplift-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("高揚", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="upliftField"
                                        selected={[this.state.uplift.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.upliftFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.upliftFieldTypeahead, "uplift")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.upliftFieldTypeahead, "uplift")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.upliftFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.upliftFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.upliftFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("奥義ゲージ上昇奥義説明", locale)}
                                     id={"tooltip-ougi-gage-up-ougi-buff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("奥義ゲージ上昇奥義", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="ougiGageUpOugiBuffField"
                                        selected={[this.state.ougiGageUpOugiBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '99')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.ougiGageUpOugiBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.ougiGageUpOugiBuffFieldTypeahead, "ougiGageUpOugiBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.ougiGageUpOugiBuffFieldTypeahead, "ougiGageUpOugiBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.ougiGageUpOugiBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.ougiGageUpOugiBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.ougiGageUpOugiBuffFieldTypeahead = ref}
                                        options={selector.ougiGageUpOugiBuffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ダメージ上限アップ説明", locale)}
                                     id={"tooltip-damage-limit-buff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ダメージ上限バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="damageLimitBuffField"
                                        selected={[this.state.damageLimitBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.damageLimitBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.damageLimitBuffFieldTypeahead, "damageLimitBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.damageLimitBuffFieldTypeahead, "damageLimitBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.damageLimitBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.damageLimitBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.damageLimitBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("奥義ダメージ上限アップ説明", locale)}
                                     id={"tooltip-ougi-damage-limit-buff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("奥義ダメージ上限バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="ougiDamageLimitBuffField"
                                        selected={[this.state.ougiDamageLimitBuff.toString()]}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.ougiDamageLimitBuffFieldTypeahead)}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.ougiDamageLimitBuffFieldTypeahead, "ougiDamageLimitBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, this.state.ougiDamageLimitBuffFieldTypeahead, "ougiDamageLimitBuff")}
                                        renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.ougiDamageLimitBuffFieldTypeahead)}
                                        onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.ougiDamageLimitBuffFieldTypeahead)}
                                        filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                        ref={(ref) => this.state.ougiDamageLimitBuffFieldTypeahead = ref}
                                        options={selector.buffLevel}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("Advanced", locale)}</strong>
                            <p>{intl.translate("Advanced 説明", locale)}</p>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("敵防御固有値説明", locale)} id={"tooltip-enemy-defense-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("敵防御固有値", locale)}</th>
                            <td>
                                <Typeahead
                                    id="enemyDefenseField"
                                    selected={[Utilities.getLabelFromId(selector[locale].enemydeftypes, this.state.enemyDefense)]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.enemyDefenseFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.enemyDefenseFieldTypeahead, "enemyDefense")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.enemyDefenseFieldTypeahead, "enemyDefense")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.enemyDefenseFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.enemyDefenseFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.enemyDefenseFieldTypeahead = ref}
                                    options={selector[locale].enemydeftypes}/>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("防御デバフ合計説明", locale)} id={"tooltip-defense-debuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("防御デバフ合計", locale)}<span
                                className="input-suggest">*</span></th>
                            <td>
                                <InputGroup>
                                    <FormControl type="number" min="0" step="5" max="100"
                                                 value={this.state.defenseDebuff}
                                                 onBlur={this.handleOnBlur.bind(this, "defenseDebuff")}
                                                 onChange={this.handleEvent.bind(this, "defenseDebuff")}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("敵非有利耐性説明", locale)}
                                     id={"tooltip-enemy-resistance-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("敵非有利耐性", locale)}</th>
                            <td><InputGroup><FormControl type="number" min="0" step="5" max="100"
                                                         value={this.state.enemyResistance}
                                                         onBlur={this.state.handleOnBlur}
                                                         onChange={this.handleEvent.bind(this, "enemyResistance")}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("烈日の楽園説明", locale)}
                                     id={"tooltip-sun-touched-paradise-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("特殊効果", locale)}</th>
                            <td>
                                <Checkbox inline checked={this.state.retsujitsuNoRakuen}
                                          onChange={this.handleSelectEvent.bind(this, "retsujitsuNoRakuen")}>
                                    <strong>{intl.translate("烈日の楽園", locale)}</strong>
                                </Checkbox>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジータさん基礎DA率説明", locale)}
                                     id={"tooltip-player-baseda-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("基礎DA率", locale)}
                            </th>
                            <td><InputGroup><FormControl type="number" min="0" step="0.1" value={this.state.DA}
                                                         onBlur={this.handleOnBlur.bind(this, "DA")}
                                                         onChange={this.handleEvent.bind(this, "DA")}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジータさん基礎TA率説明", locale)}
                                     id={"tooltip-player-baseta-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("基礎TA率", locale)}
                            </th>
                            <td><InputGroup><FormControl type="number" min="0" step="0.1" value={this.state.TA}
                                                         onBlur={this.handleOnBlur.bind(this, "TA")}
                                                         onChange={this.handleEvent.bind(this, "TA")}/>
                                <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジータさん奥義倍率説明", locale)} id={"tooltip-ougi-ratio-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("奥義倍率", locale)}
                            </th>
                            <td>
                                <Typeahead
                                    id="ougiRatioField"
                                    selected={[this.state.ougiRatio.toString()]}
                                    inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                    onFocus={this.handleAutoCompleteOnFocus.bind(this, this.state.ougiRatioFieldTypeahead)}
                                    onBlur={this.handleAutoCompleteOnBlur.bind(this, this.state.ougiRatioFieldTypeahead, "ougiRatio")}
                                    onChange={this.handleAutoCompleteEvent.bind(this, this.state.ougiRatioFieldTypeahead, "ougiRatio")}
                                    renderMenu={(results, props) => GlobalConst.renderMenu(results, props, this.state.ougiRatioFieldTypeahead)}
                                    onMenuToggle={(e) => GlobalConst.onMenuToggle(e, this.state.ougiRatioFieldTypeahead)}
                                    filterBy={(a, b) => GlobalConst.filterBy(a, b, this.state.StatePlaceholder)}
                                    ref={(ref) => this.state.ougiRatioFieldTypeahead = ref}
                                    options={selector.ougiRatio}/>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("確保HP説明", locale)} id={"tooltip-minimu-hp-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("確保HP", locale)}</th>
                            <td><FormControl type="number" min="0" value={this.state.minimumHP}
                                             onBlur={this.handleOnBlur.bind(this, "minimumHP")}
                                             onChange={this.handleEvent.bind(this, "minimumHP")}/></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("チェイン数説明", locale)} id={"tooltip-chain-number-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("チェイン数", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.chainNumber}
                                             onChange={this.handleSelectEvent.bind(this, "chainNumber")}> {selector.chainNumber} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("弱い編成を隠す", locale)} id={"tooltip-hide-grids"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("弱い編成を隠す", locale)}</th>
                            <td>
                                <Checkbox inline checked={this.state.ruleMaxSize}
                                          onChange={this.handleSelectEvent.bind(this, "ruleMaxSize")}>
                                </Checkbox>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    </tbody>
                </table>
            </div>
        );
    },
});

module.exports = Profile;
