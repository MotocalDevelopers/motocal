var React = require('react');
var {Button, FormControl, InputGroup, FormGroup} = require('react-bootstrap');
var Typeahead = require('react-bootstrap-typeahead').Typeahead;
var intl = require('./translate.js');
var GlobalConst = require('./global_const.js');
const Utilities = require('./utilities');
var TextWithTooltip = GlobalConst.TextWithTooltip;
var CreateClass = require('create-react-class');

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
var placeholder = "";
const TypeaheadInstanceList = {};

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
        };
    },
    switchBufflist: function (e) {
        this.setState({openBufflist: !(this.state.openBufflist)})
    },
    switchLBlist: function (e) {
        this.setState({openLBlist: !(this.state.openLBlist)})
    },
    handleAutoCompleteEvent: function (key, selected) {
        let newState = this.state;
        newState[key] = parseFloat(selected[0]);
        this.setState(newState)
    },
    handleEvent: function (key, e) {
        this.handleAutoCompleteEvent(key, [e.target.value])
    },
    completeBlurAction: function (ref, key) {
        let newState = this.state;
        let value = ref.state.text;
        if (ref.props.inputProps.targettype === "number") {
            value = Utilities.parseNumberInputField(value, ref.props.inputProps, placeholder);
        }
        ref.state.text = value.toString();
        newState[key] = value;
        this.props.onChange(newState);
    },
    handleAutoCompleteOnBlur: function (ref, key) {
        // Send change to parent only when focus is off
        ref = TypeaheadInstanceList[ref];
        this.completeBlurAction(ref, key);
    },
    handleOnBlur: function (key, e) {
        // Send change to parent only when focus is off
        let ref = {state: {}, props: {inputProps: {}}};
        ref.state.text = e.target.value;
        ref.props.inputProps.min = e.target.min;
        ref.props.inputProps.max = e.target.max;
        ref.props.inputProps.targettype = e.target.type;
        this.completeBlurAction(ref, key);
    },
    handleAutoCompleteOnFocus: function (ref, e) {
        ref = TypeaheadInstanceList[ref];
        if (e.target.value) {
            placeholder = e.target.value;
        }
        ref.state.text = "";
    },
    handleOnFocus: function(e) {
        if (e.target.value){
            placeholder = e.target.value;
        }
        e.target.value = "";
    },
    handleSelectEvent: function (key, e) {
        // A select type input form is good for onChange
        var newState = this.state;
        newState[key] = e.target.value;
        if (key == "job") {
            newState.DA = Jobs[e.target.value].DaBonus;
            newState.TA = Jobs[e.target.value].TaBonus
        }
        this.setState(newState);
        this.props.onChange(newState)
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
        var locale = this.props.locale;

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
                        <th className="bg-primary">{intl.translate("ジータさん属性", locale)}<span className="input-suggest">*</span></th>
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
                            <th className="bg-primary">{intl.translate("ジョブ", locale)}<span className="input-suggest">*</span>
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

                    {this.state.openBufflist ?
                        [
                            <TextWithTooltip tooltip={intl.translate("残HP割合説明(ジータのみ)", locale)}
                                             id={"tooltip-remain-hp-djeeta-detail"}>
                                <tr>
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
                            </TextWithTooltip>,
                            <tr key="personalNormalBuff">
                                <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalNormalBuffField"
                                            defaultInputValue={this.state.personalNormalBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalNormalBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalNormalBuffFieldTypeahead", "personalNormalBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalNormalBuffFieldTypeahead", "personalNormalBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalNormalBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalElementBuff">
                                <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalElementBuffField"
                                            defaultInputValue={this.state.personalNormalBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalElementBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalElementBuffFieldTypeahead", "personalElementBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalElementBuffFieldTypeahead", "personalElementBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalElementBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOtherBuff">
                                <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalOtherBuffField"
                                            defaultInputValue={this.state.personalOtherBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalOtherBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalOtherBuffFieldTypeahead", "personalOtherBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalOtherBuffFieldTypeahead", "personalOtherBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalOtherBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOtherBuff2">
                                <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalOtherBuff2Field"
                                            defaultInputValue={this.state.personalOtherBuff2.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalOtherBuff2FieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalOtherBuff2FieldTypeahead", "personalOtherBuff2")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalOtherBuff2FieldTypeahead", "personalOtherBuff2")}
                                            ref={(ref) => TypeaheadInstanceList["personalOtherBuff2FieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalDABuff">
                                <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalDABuffField"
                                            defaultInputValue={this.state.personalDABuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalDABuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalDABuffFieldTypeahead", "personalDABuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalDABuffFieldTypeahead", "personalDABuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalDABuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalTABuff">
                                <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalTABuffField"
                                            defaultInputValue={this.state.personalTABuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalTABuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalTABuffFieldTypeahead", "personalTABuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalTABuffFieldTypeahead", "personalTABuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalTABuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalAdditionalDamageBuff">
                                <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalAdditionalDamageBuffField"
                                            defaultInputValue={this.state.personalAdditionalDamageBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalAdditionalDamageBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalAdditionalDamageBuffFieldTypeahead", "personalAdditionalDamageBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalAdditionalDamageBuffFieldTypeahead", "personalAdditionalDamageBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalAdditionalDamageBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalSupplementalDamageBuff">
                                <th className="bg-primary">{intl.translate("supplementalDamageBuff", locale)}</th>
                                <td>
                                    <FormControl id="personalSupplementalDamageBuffField" type="number"
                                                 value={this.state.personalSupplementalDamageBuff}
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "personalSupplementalDamageBuff")}
                                                 onChange={this.handleEvent.bind(this, "personalSupplementalDamageBuff")}/>
                                </td>
                            </tr>,
                            <tr key="personalOugiDamageBuff">
                                <th className="bg-primary">{intl.translate("奥義ダメージUP", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalOugiDamageBuffField"
                                            defaultInputValue={this.state.personalOugiDamageBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalOugiDamageBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalOugiDamageBuffFieldTypeahead", "personalOugiDamageBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalOugiDamageBuffFieldTypeahead", "personalOugiDamageBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalOugiDamageBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOugiGageBuff">
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalOugiGageBuffField"
                                            defaultInputValue={this.state.personalOugiGageBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalOugiGageBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalOugiGageBuffFieldTypeahead", "personalOugiGageBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalOugiGageBuffFieldTypeahead", "personalOugiGageBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalOugiGageBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalUplift">
                                <th className="bg-primary">{intl.translate("高揚", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalUpliftField"
                                            defaultInputValue={this.state.personalUplift.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalUpliftFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalUpliftFieldTypeahead", "personalUplift")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalUpliftFieldTypeahead", "personalUplift")}
                                            ref={(ref) => TypeaheadInstanceList["personalUpliftFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalDamageLimitBuff">
                                <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalDamageLimitBuffField"
                                            defaultInputValue={this.state.personalDamageLimitBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalDamageLimitBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalDamageLimitBuffFieldTypeahead", "personalDamageLimitBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalDamageLimitBuffFieldTypeahead", "personalDamageLimitBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalDamageLimitBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOugiDamageLimitBuff">
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <Typeahead
                                            id="personalOugiDamageLimitBuffField"
                                            defaultInputValue={this.state.personalOugiDamageLimitBuff.toString()}
                                            inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                            onFocus={this.handleAutoCompleteOnFocus.bind(this,  "personalOugiDamageLimitBuffFieldTypeahead")}
                                            onBlur={this.handleAutoCompleteOnBlur.bind(this,  "personalOugiDamageLimitBuffFieldTypeahead", "personalOugiDamageLimitBuff")}
                                            onChange={this.handleAutoCompleteEvent.bind(this,  "personalOugiDamageLimitBuffFieldTypeahead", "personalOugiDamageLimitBuff")}
                                            ref={(ref) => TypeaheadInstanceList["personalOugiDamageLimitBuffFieldTypeahead"] = ref}
                                            options={selector.buffLevel} />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        ]
                        : null}

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
                                        defaultInputValue={this.state.masterBonus.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, "masterBonusFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, "masterBonusFieldTypeahead", "masterBonus")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, "masterBonusFieldTypeahead", "masterBonus")}
                                        ref={(ref) => TypeaheadInstanceList["masterBonusFieldTypeahead"] = ref}
                                        options={selector.masteratk}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
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
                                        defaultInputValue={this.state.masterBonusHP.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, "masterBonusHPFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, "masterBonusHPFieldTypeahead", "masterBonusHP")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,"masterBonusHPFieldTypeahead", "masterBonusHP")}
                                        ref={(ref) => TypeaheadInstanceList["masterBonusHPFieldTypeahead"] = ref}
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
                                        defaultInputValue={this.state.masterBonusDA.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, "masterBonusDAFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, "masterBonusDAFieldTypeahead", "masterBonusDA")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, "masterBonusDAFieldTypeahead", "masterBonusDA")}
                                        ref={(ref) => TypeaheadInstanceList["masterBonusDAFieldTypeahead"] = ref}
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
                                        defaultInputValue={this.state.masterBonusTA.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, "masterBonusTAFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, "masterBonusTAFieldTypeahead", "masterBonusTA")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, "masterBonusTAFieldTypeahead", "masterBonusTA")}
                                        ref={(ref) => TypeaheadInstanceList["masterBonusTAFieldTypeahead"] = ref}
                                        options={selector.masterTA}/>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボダメ上限説明", locale)} id={"tooltip-masterbonus-damagelimit-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("マスボダメ上限", locale)}
                            </th>
                            <td>
                                <InputGroup>
                                    <Typeahead
                                        id="masterBonusDamageLimitField"
                                        defaultInputValue={this.state.masterBonusDamageLimit.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '0', '30')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this, "masterBonusDamageLimitFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this, "masterBonusDamageLimitFieldTypeahead", "masterBonusDamageLimit")}
                                        onChange={this.handleAutoCompleteEvent.bind(this, "masterBonusDamageLimitFieldTypeahead", "masterBonusDamageLimit")}
                                        ref={(ref) => TypeaheadInstanceList["masterBonusDamageLimitFieldTypeahead"] = ref}
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
                                defaultInputValue={this.state.zenithAttackBonus.toString()}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this,  "zenithAttackBonusFieldTypeahead")}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this,  "zenithAttackBonusFieldTypeahead", "zenithAttackBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this,  "zenithAttackBonusFieldTypeahead", "zenithAttackBonus")}
                                ref={(ref) => TypeaheadInstanceList["zenithAttackBonusFieldTypeahead"] = ref}
                                options={selector.zenithAttack} />
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("LB HP", locale)}</th>
                        <td>
                            <Typeahead
                                id="zenithHPBonusField"
                                defaultInputValue={this.state.zenithHPBonus.toString()}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this,  "zenithHPBonusFieldTypeahead")}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this,  "zenithHPBonusFieldTypeahead", "zenithHPBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this,  "zenithHPBonusFieldTypeahead", "zenithHPBonus")}
                                ref={(ref) => TypeaheadInstanceList["zenithHPBonusFieldTypeahead"] = ref}
                                options={selector.zenithHP} />
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("味方全体のHP", locale)}</th>
                        <td>
                            <Typeahead
                                id="zenithPartyHPBonusField"
                                defaultInputValue={this.state.zenithPartyHPBonus.toString()}
                                inputProps={GlobalConst.generateTypeaheadData("number", '0', '10000')}
                                onFocus={this.handleAutoCompleteOnFocus.bind(this,  "zenithPartyHPBonusFieldTypeahead")}
                                onBlur={this.handleAutoCompleteOnBlur.bind(this,  "zenithPartyHPBonusFieldTypeahead", "zenithPartyHPBonus")}
                                onChange={this.handleAutoCompleteEvent.bind(this,  "zenithPartyHPBonusFieldTypeahead", "zenithPartyHPBonus")}
                                ref={(ref) => TypeaheadInstanceList["zenithPartyHPBonusFieldTypeahead"] = ref}
                                options={selector.zenithPartyHP} />
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

                    <TextWithTooltip tooltip={intl.translate("LB 奥義の説明", locale)} id={"tooltip-ougidamage-zenith-detail"}>
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
                    <TextWithTooltip tooltip={intl.translate("LB 属性攻撃の説明", locale)} id={"tooltip-critical-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB 属性攻撃", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithElementBonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithElementBonus")}> {this.props.zenithElementBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>,

                    <TextWithTooltip tooltip={intl.translate("LB チェンバの説明", locale)} id={"tooltip-chaindamage-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB チェンバ", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithChainDamageBonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithChainDamageBonus")}> {this.props.zenithChainDamageBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>,

                    <TextWithTooltip tooltip={intl.translate("LB チェンバ上限の説明", locale)} id={"tooltip-chaindamagelimit-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("LB チェンバ上限", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithChainDamageLimitBonus}
                                             onChange={this.handleSelectEvent.bind(this, "zenithChainDamageLimitBonus")}> {this.props.zenithChainDamageLimitBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>,

                    <TextWithTooltip tooltip={intl.translate("得意武器攻撃の説明", locale)} id={"tooltip-weapon-zenith-detail"}>
                        <tr>
                            <th className="bg-primary">
                                {intl.translate("得意武器攻撃1", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)})
                            </th>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1}
                                             onChange={this.handleSelectEvent.bind(this, "zenithBonus1")}> {this.props.zenithBonuses[locale]} </FormControl>
                            </td>
                        </tr>
                    </TextWithTooltip>,

                    <TextWithTooltip tooltip={intl.translate("得意武器攻撃の説明", locale)} id={"tooltip-weapon-zenith-detail"}>
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
                                        defaultInputValue={this.state.normalBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "normalBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "normalBuffFieldTypeahead", "normalBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "normalBuffFieldTypeahead", "normalBuff")}
                                        ref={(ref) => TypeaheadInstanceList["normalBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.elementBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "elementBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "elementBuffFieldTypeahead", "elementBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "elementBuffFieldTypeahead", "elementBuff")}
                                        ref={(ref) => TypeaheadInstanceList["elementBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.otherBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "otherBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "otherBuffFieldTypeahead", "otherBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "otherBuffFieldTypeahead", "otherBuff")}
                                        ref={(ref) => TypeaheadInstanceList["otherBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.otherBuff2.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "otherBuff2FieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "otherBuff2FieldTypeahead", "otherBuff2")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "otherBuff2FieldTypeahead", "otherBuff2")}
                                        ref={(ref) => TypeaheadInstanceList["otherBuff2FieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
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
                                        defaultInputValue={this.state.hpBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "hpBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "hpBuffFieldTypeahead", "hpBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "hpBuffFieldTypeahead", "hpBuff")}
                                        ref={(ref) => TypeaheadInstanceList["hpBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.daBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "daBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "daBuffFieldTypeahead", "daBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "daBuffFieldTypeahead", "daBuff")}
                                        ref={(ref) => TypeaheadInstanceList["daBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.taBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "taBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "taBuffFieldTypeahead", "taBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "taBuffFieldTypeahead", "taBuff")}
                                        ref={(ref) => TypeaheadInstanceList["taBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                        defaultInputValue={this.state.ougiDamageBuff.toString()}
                                        inputProps={GlobalConst.generateTypeaheadData("number", '-1000', '1000')}
                                        onFocus={this.handleAutoCompleteOnFocus.bind(this,  "ougiDamageBuffFieldTypeahead")}
                                        onBlur={this.handleAutoCompleteOnBlur.bind(this,  "ougiDamageBuffFieldTypeahead", "ougiDamageBuff")}
                                        onChange={this.handleAutoCompleteEvent.bind(this,  "ougiDamageBuffFieldTypeahead", "ougiDamageBuff")}
                                        ref={(ref) => TypeaheadInstanceList["ougiDamageBuffFieldTypeahead"] = ref}
                                        options={selector.buffLevel} />
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
                                    <FormControl id="additionalDamageBuff" type="number" min="-1000" max="1000"
                                                 value={this.state.additionalDamageBuff}
                                                 list="additionalDamageBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "additionalDamageBuff")}
                                                 onChange={this.handleEvent.bind(this, "additionalDamageBuff")}>
                                    </FormControl>
                                    <datalist id="additionalDamageBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl id="ougiGageBuffField" type="number" min="-1000" max="1000"
                                                 value={this.state.ougiGageBuff}
                                                 list="ougiGageBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "ougiGageBuff")}
                                                 onChange={this.handleEvent.bind(this, "ougiGageBuff")}>
                                    </FormControl>
                                    <datalist id="ougiGageBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl id="upliftField" type="number" min="-1000" max="1000"
                                                 value={this.state.uplift}
                                                 list="uplift"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "uplift")}
                                                 onChange={this.handleEvent.bind(this, "uplift")}>
                                    </FormControl>
                                    <datalist id="uplift">{selector.buffLevel}</datalist>
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
                                    <FormControl id="ougiGageUpOugiBuffField" type="number" min="-1000" max="1000"
                                                 value={this.state.ougiGageUpOugiBuff}
                                                 list="ougiGageUpOugiBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "ougiGageUpOugiBuff")}
                                                 onChange={this.handleEvent.bind(this, "ougiGageUpOugiBuff")}>
                                    </FormControl>
                                    <datalist id="ougiGageUpOugiBuff">{selector.ougiGageUpOugiBuffLevel}</datalist>
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
                                    <FormControl id="damageLimitBuffField" type="number" min="-1000" max="1000"
                                                 value={this.state.damageLimitBuff}
                                                 list="damageLimitBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "damageLimitBuff")}
                                                 onChange={this.handleEvent.bind(this, "damageLimitBuff")}>
                                    </FormControl>
                                    <datalist id="damageLimitBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl id="ougiDamageLimitBuff" type="number" min="-1000" max="1000"
                                                 value={this.state.ougiDamageLimitBuff}
                                                 list="ougiDamageLimitBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "ougiDamageLimitBuff")}
                                                 onChange={this.handleEvent.bind(this, "ougiDamageLimitBuff")}>
                                    </FormControl>
                                    <datalist id="ougiDamageLimitBuff">{selector.buffLevel}</datalist>
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
                                <FormControl id="enemyDefenseField" type="number" min="0" max="100"
                                             value={this.state.enemyDefense}
                                             list="enemyDefense"
                                             onFocus={this.handleOnFocus}
                                             onBlur={this.handleOnBlur.bind(this, "enemyDefense")}
                                             onChange={this.handleEvent.bind(this, "enemyDefense")}>
                                </FormControl>
                                <datalist id="enemyDefense">{selector[locale].enemydeftypes}</datalist>
                            </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("防御デバフ合計説明", locale)} id={"tooltip-defense-debuff-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("防御デバフ合計", locale)}<span className="input-suggest">*</span></th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="0" step="5" max="100" value={this.state.defenseDebuff}
                                            onBlur={this.handleOnBlur.bind(this, "defenseDebuff")}
                                            onChange={this.handleEvent.bind(this, "defenseDebuff")}/>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("敵非有利耐性説明", locale)} id={"tooltip-enemy-resistance-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("敵非有利耐性", locale)}</th>
                            <td><InputGroup><FormControl type="number" min="0" step="5" max="100" value={this.state.enemyResistance}
                                             onBlur={this.state.handleOnBlur} onChange={this.handleSelectEvent.bind(this, "enemyResistance")}/>
                                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジータさん基礎DA率説明", locale)}
                                     id={"tooltip-player-baseda-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("基礎DA率", locale)}
                            </th>
                            <td><InputGroup><FormControl type="number" min="0" step="0.1" value={this.state.DA}
                                             onBlur={this.handleOnBlur.bind(this, "DA")} onChange={this.handleEvent.bind(this, "DA")}/>
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
                                             onBlur={this.handleOnBlur.bind(this, "TA")} onChange={this.handleEvent.bind(this, "TA")}/>
                                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup></td>
                        </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("ジータさん奥義倍率説明", locale)} id={"tooltip-ougi-ratio-detail"}>
                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("奥義倍率", locale)}
                            </th>
                            <td>
                                <FormControl id="ougiRatio" type="number" min="0" max="20" step="0.5"
                                             value={this.state.ougiRatio}
                                             list="ougiRatio"
                                             onFocus={this.handleOnFocus}
                                             onBlur={this.handleOnBlur.bind(this, "ougiRatio")}
                                             onChange={this.handleEvent.bind(this, "ougiRatio")}>
                                </FormControl>
                                <datalist id="ougiRatio">{selector.ougiRatio}</datalist>
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
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Profile;
