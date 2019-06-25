var React = require('react');
var {Button, FormControl, InputGroup, FormGroup} = require('react-bootstrap');
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
    handleEvent: function (key, e) {
        // input type input form uses onBlur
        let newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    handleOnBlur: function (key, e) {
        // Send change to parent only when focus is off
        let newState = this.state;
        let value = e.target.value;
        if (e.target.type === "number") {
            value = Utilities.parseNumberInputField(e.target, placeholder);
        }
        newState[key] = value;
        this.props.onChange(newState);
    },
    handleOnFocus: function(e) {
        placeholder = e.target.value;
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
                            <td><FormControl type="number" min="1" max="300" value={this.state.rank}
                                             onBlur={this.handleOnBlur.bind(this, "rank")} onChange={this.handleEvent.bind(this, "rank")}/>
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
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalNormalBuff}
                                                     list="personalNormalBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalNormalBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalNormalBuff")}>
                                        </FormControl>
                                        <datalist id="personalNormalBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalElementBuff">
                                <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalElementBuff}
                                                     list="personalElementBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalElementBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalElementBuff")}>
                                        </FormControl>
                                        <datalist id="personalElementBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOtherBuff">
                                <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalOtherBuff}
                                                     list="personalOtherBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalOtherBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalOtherBuff")}>
                                        </FormControl>
                                        <datalist id="personalOtherBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOtherBuff2">
                                <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalOtherBuff2}
                                                     list="personalOtherBuff2"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalOtherBuff2")}
                                                     onChange={this.handleEvent.bind(this, "personalOtherBuff2")}>
                                        </FormControl>
                                        <datalist id="personalOtherBuff2">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalDABuff">
                                <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalDABuff}
                                                     list="personalDABuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalDABuff")}
                                                     onChange={this.handleEvent.bind(this, "personalDABuff")}>
                                        </FormControl>
                                        <datalist id="personalDABuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalTABuff">
                                <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalTABuff}
                                                     list="personalTABuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalTABuff")}
                                                     onChange={this.handleEvent.bind(this, "personalTABuff")}>
                                        </FormControl>
                                        <datalist id="personalTABuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalAdditionalDamageBuff">
                                <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalAdditionalDamageBuff}
                                                     list="personalAdditionalDamageBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalAdditionalDamageBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalAdditionalDamageBuff")}>
                                        </FormControl>
                                        <datalist id="personalAdditionalDamageBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalSupplementalDamageBuff">
                                <th className="bg-primary">{intl.translate("supplementalDamageBuff", locale)}</th>
                                <td>
                                    <FormControl type="number"
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
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalOugiDamageBuff}
                                                     list="personalOugiDamageBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalOugiDamageBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalOugiDamageBuff")}>
                                        </FormControl>
                                        <datalist id="personalOugiDamageBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOugiGageBuff">
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalOugiGageBuff}
                                                     list="personalOugiGageBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalOugiGageBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalOugiGageBuff")}>
                                        </FormControl>
                                        <datalist id="personalOugiGageBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalUplift">
                                <th className="bg-primary">{intl.translate("高揚", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalUplift}
                                                     list="personalUplift"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalUplift")}
                                                     onChange={this.handleEvent.bind(this, "personalUplift")}>
                                        </FormControl>
                                        <datalist id="personalUplift">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalDamageLimitBuff">
                                <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalDamageLimitBuff}
                                                     list="personalDamageLimitBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalDamageLimitBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalDamageLimitBuff")}>
                                        </FormControl>
                                        <datalist id="personalDamageLimitBuff">{selector.buffLevel}</datalist>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>,
                            <tr key="personalOugiDamageLimitBuff">
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl type="number" min="-1000" max="1000"
                                                     value={this.state.personalOugiDamageLimitBuff}
                                                     list="personalOugiDamageLimitBuff"
                                                     onFocus={this.handleOnFocus}
                                                     onBlur={this.handleOnBlur.bind(this, "personalOugiDamageLimitBuff")}
                                                     onChange={this.handleEvent.bind(this, "personalOugiDamageLimitBuff")}>
                                        </FormControl>
                                        <datalist id="personalOugiDamageLimitBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="0" max="100"
                                                 value={this.state.masterBonus}
                                                 list="masterATK"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "masterBonus")}
                                                 onChange={this.handleEvent.bind(this, "masterBonus")}>
                                    </FormControl>
                                    <datalist id="masterATK">{selector.masteratk}</datalist>
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
                                    <FormControl type="number" min="0" max="100"
                                                 value={this.state.masterBonusHP}
                                                 list="masterBonusHP"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "masterBonusHP")}
                                                 onChange={this.handleEvent.bind(this, "masterBonusHP")}>
                                    </FormControl>
                                    <datalist id="masterBonusHP">{selector.masterhp}</datalist>
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
                                    <FormControl type="number" min="0" max="100"
                                                 value={this.state.masterBonusDA}
                                                 list="masterBonusDA"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "masterBonusDA")}
                                                 onChange={this.handleEvent.bind(this, "masterBonusDA")}>
                                    </FormControl>
                                    <datalist id="masterBonusDA">{selector.masterDA}</datalist>
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
                                    <FormControl type="number" min="0" max="100"
                                                 value={this.state.masterBonusTA}
                                                 list="masterBonusTA"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "masterBonusTA")}
                                                 onChange={this.handleEvent.bind(this, "masterBonusTA")}>
                                    </FormControl>
                                    <datalist id="masterBonusTA">{selector.masterTA}</datalist>
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
                                    <FormControl type="number" min="0" max="100"
                                                 value={this.state.masterBonusDamageLimit}
                                                 list="masterBonusDamageLimit"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "masterBonusDamageLimit")}
                                                 onChange={this.handleEvent.bind(this, "masterBonusDamageLimit")}>
                                    </FormControl>
                                    <datalist id="masterBonusDamageLimit">{selector.masterDamageLimit}</datalist>
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
                            <FormControl type="number" min="0" max="10000"
                                         value={this.state.zenithAttackBonus}
                                         list="zenithAttackBonus"
                                         onFocus={this.handleOnFocus}
                                         onBlur={this.handleOnBlur.bind(this, "zenithAttackBonus")}
                                         onChange={this.handleEvent.bind(this, "zenithAttackBonus")}>
                            </FormControl>
                            <datalist id="zenithAttackBonus">{selector.zenithAttack}</datalist>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("LB HP", locale)}</th>
                        <td>
                            <FormControl type="number" min="0" max="10000"
                                         value={this.state.zenithHPBonus}
                                         list="zenithHPBonus"
                                         onFocus={this.handleOnFocus}
                                         onBlur={this.handleOnBlur.bind(this, "zenithHPBonus")}
                                         onChange={this.handleEvent.bind(this, "zenithHPBonus")}>
                            </FormControl>
                            <datalist id="zenithHPBonus">{selector.zenithHP}</datalist>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("味方全体のHP", locale)}</th>
                        <td>
                            <FormControl type="number" min="0" max="10000"
                                         value={this.state.zenithPartyHPBonus}
                                         list="zenithPartyHPBonus"
                                         onFocus={this.handleOnFocus}
                                         onBlur={this.handleOnBlur.bind(this, "zenithPartyHPBonus")}
                                         onChange={this.handleEvent.bind(this, "zenithPartyHPBonus")}>
                            </FormControl>
                            <datalist id="zenithPartyHPBonus">{selector.zenithPartyHP}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.normalBuff}
                                                 list="normalBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "normalBuff")}
                                                 onChange={this.handleEvent.bind(this, "normalBuff")}>
                                    </FormControl>
                                    <datalist id="normalBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.elementBuff}
                                                 list="elementBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "elementBuff")}
                                                 onChange={this.handleEvent.bind(this, "elementBuff")}>
                                    </FormControl>
                                    <datalist id="elementBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.otherBuff}
                                                 list="otherBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "otherBuff")}
                                                 onChange={this.handleEvent.bind(this, "otherBuff")}>
                                    </FormControl>
                                    <datalist id="otherBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.otherBuff2}
                                                 list="otherBuff2"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "otherBuff2")}
                                                 onChange={this.handleEvent.bind(this, "otherBuff2")}>
                                    </FormControl>
                                    <datalist id="otherBuff2">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.hpBuff}
                                                 list="hpBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "hpBuff")}
                                                 onChange={this.handleEvent.bind(this, "hpBuff")}>
                                    </FormControl>
                                    <datalist id="hpBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.daBuff}
                                                 list="daBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "daBuff")}
                                                 onChange={this.handleEvent.bind(this, "daBuff")}>
                                    </FormControl>
                                    <datalist id="daBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.taBuff}
                                                 list="taBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "taBuff")}
                                                 onChange={this.handleEvent.bind(this, "taBuff")}>
                                    </FormControl>
                                    <datalist id="taBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
                                                 value={this.state.ougiDamageBuff}
                                                 list="ougiDamageBuff"
                                                 onFocus={this.handleOnFocus}
                                                 onBlur={this.handleOnBlur.bind(this, "ougiDamageBuff")}
                                                 onChange={this.handleEvent.bind(this, "ougiDamageBuff")}>
                                    </FormControl>
                                    <datalist id="ougiDamageBuff">{selector.buffLevel}</datalist>
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                <FormControl type="number"
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                    <FormControl type="number" min="-1000" max="1000"
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
                                <FormControl type="number" min="0" max="100"
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
                                <FormControl type="number" min="0" max="20" step="0.5"
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
