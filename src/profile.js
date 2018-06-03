var React = require('react');
var { Button, FormControl, InputGroup, FormGroup } = require('react-bootstrap');
var intl = require('./translate.js')
var GlobalConst = require('./global_const.js')
var TextWithTooltip = GlobalConst.TextWithTooltip
var CreateClass = require('create-react-class');

// const
var zenith = GlobalConst.zenith
var Jobs = GlobalConst.Jobs
var jobTypes = GlobalConst.jobTypes
var armTypes = GlobalConst.armTypes
var selector = GlobalConst.selector

var Profile = CreateClass({
    getDefaultProps() {
        var zenithBonuses = { "ja": {}, "en": {} }
        zenithBonuses.ja = Object.keys(zenith).map(function (opt) { return <option value={opt} key={opt}>{opt}</option> });
        zenithBonuses.en = Object.keys(zenith).map(function (opt) { return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option> });

        var alljobs = { "ja": {}, "en": {} }
        alljobs.ja = Object.keys(Jobs).map(function (opt) { return <option value={opt} key={opt}>{Jobs[opt].name}</option> });
        alljobs.en = Object.keys(Jobs).map(function (opt) { return <option value={opt} key={opt}>{intl.translate(Jobs[opt].name, "en")}</option> });

        return {
            zenithBonuses: zenithBonuses,
            alljobs: alljobs,
        };
    },
    componentDidMount: function () {
        // 初期化後 state を 上の階層に渡しておく
        this.props.onChange(this.state);
    },
    componentWillReceiveProps: function (nextProps) {
        // only fired on Data Load
        if (nextProps.dataName != this.props.dataName && (nextProps.dataForLoad != undefined)) {
            var newState = nextProps.dataForLoad
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
            masterBonus: 0,
            masterBonusHP: 0,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            otherBuff2: 0,
            additionalDamageBuff: 0,
            damageLimitBuff: 0.0,
            ougiDamageLimitBuff: 0.0,
            hpBuff: 0,
            daBuff: 0,
            taBuff: 0,
            hp: 100,
            remainHP: 100,
            zenithBonus1: "無し",
            zenithBonus2: "無し",
            enemyElement: "wind",
            enemyDefense: 10.0,
            job: "none",
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
            personalDABuff: 0.0,
            personalTABuff: 0.0,
            personalOugiGageBuff: 0.0,
            personalDamageLimitBuff: 0.0,
            personalOugiDamageLimitBuff: 0.0,
        };
    },
    switchBufflist: function (e) {
        this.setState({ openBufflist: !(this.state.openBufflist) })
    },
    handleEvent: function (key, e) {
        // input タイプの入力フォームはonBlurを利用する
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleOnBlur: function (e) {
        // フォーカスが外れた時だけ変更を親に送る
        this.props.onChange(this.state)
    },
    handleSelectEvent: function (key, e) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state
        newState[key] = e.target.value
        if (key == "job") {
            newState.DA = Jobs[e.target.value].DaBonus
            newState.TA = Jobs[e.target.value].TaBonus
        }
        this.setState(newState)
        this.props.onChange(newState)
    },
    render: function () {
        var locale = this.props.locale

        return (
            <div className="profile">
                <p className="text-success">最新のアップデート情報は <a href="http://dev-hsimyu.hatenablog.com" target="_blank"> こちら </a> </p>
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <strong>{intl.translate("プロフィールタイトル", locale)}</strong>
                            </td>
                        </tr>
                        <TextWithTooltip tooltip={intl.translate("ランク説明", locale)} id={"tooltip-rank-detail"}>
                            <tr>
                                <th className="bg-primary">Rank*</th>
                                <td><FormControl type="number" min="1" max="225" value={this.state.rank} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "rank")} /></td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("ジョブ説明", locale)} id={"tooltip-job-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("ジョブ", locale)}*
                        <span style={{ display: "block" }} className="label label-default">{intl.translate("得意", locale)} [{intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)}, {intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)}]</span>
                                    <span style={{ display: "block" }} className="label label-primary">{intl.translate(jobTypes[Jobs[this.state.job].type], locale)}{intl.translate("タイプ", locale)}</span>
                                    <span style={{ display: "block" }} className="label label-success">{intl.translate("攻撃ボーナス", locale)} {Jobs[this.state.job].atBonus}</span>
                                    <span style={{ display: "block" }} className="label label-danger">{intl.translate("HPボーナス", locale)} {Jobs[this.state.job].hpBonus}</span>
                                    <span style={{ display: "block" }} className="label label-success">{intl.translate("攻刃ボーナス", locale)} {Jobs[this.state.job].kouzinBonus}</span>
                                    <span style={{ display: "block" }} className="label label-primary">{intl.translate("守護ボーナス", locale)} {Jobs[this.state.job].shugoBonus}</span>
                                    <span style={{ display: "block" }} className="label label-danger">{intl.translate("基礎DA率", locale)} {Jobs[this.state.job].DaBonus}%</span>
                                    <span style={{ display: "block" }} className="label label-default">{intl.translate("基礎TA率", locale)} {Jobs[this.state.job].TaBonus}%</span>
                                </th>
                                <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleSelectEvent.bind(this, "job")} > {this.props.alljobs[locale]} </FormControl></td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("マスボATK説明", locale)} id={"tooltip-masterbonus-atk-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("マスボATK", locale)}*
                        </th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleSelectEvent.bind(this, "masterBonus")}>{selector.masteratk}</FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr></TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("マスボHP説明", locale)} id={"tooltip-masterbonus-hp-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("マスボHP", locale)}
                                </th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleSelectEvent.bind(this, "masterBonusHP")}>{selector.masterhp}</FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr></TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("残HP割合説明(ジータのみ)", locale)} id={"tooltip-remain-hp-djeeta-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("残HP割合", locale)}<br />{intl.translate("ジータさんのみ", locale)}
                                </th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr></TextWithTooltip>

                        <tr>
                            <th className="bg-primary">{intl.translate("ジータさん属性", locale)}*</th>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")}> {selector[locale].elements} </FormControl></td>
                        </tr>

                        <TextWithTooltip tooltip={intl.translate("敵の属性説明", locale)} id={"tooltip-enemy-element-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("敵の属性", locale)}*
                        </th>
                                <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {selector[locale].enemyElements} </FormControl></td>
                            </tr></TextWithTooltip>

                        <tr>
                            <th className="bg-primary"><Button onClick={this.switchBufflist}>{intl.translate("個別バフ", locale)}</Button></th>
                            <td></td>
                        </tr>

                        {this.state.openBufflist ?
                            [
                                <tr key="personalNormalBuff">
                                    <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalNormalBuff} onChange={this.handleSelectEvent.bind(this, "personalNormalBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalElementBuff">
                                    <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalElementBuff} onChange={this.handleSelectEvent.bind(this, "personalElementBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalOtherBuff">
                                    <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalOtherBuff} onChange={this.handleSelectEvent.bind(this, "personalOtherBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalOtherBuff2">
                                    <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalOtherBuff2} onChange={this.handleSelectEvent.bind(this, "personalOtherBuff2")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalDaBuff">
                                    <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalDABuff} onChange={this.handleSelectEvent.bind(this, "personalDABuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalTaBuff">
                                    <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalTABuff} onChange={this.handleSelectEvent.bind(this, "personalTABuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalAdditionalDamageBuff">
                                    <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalAdditionalDamageBuff} onChange={this.handleSelectEvent.bind(this, "personalAdditionalDamageBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalOugiGageBuff">
                                    <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalOugiGageBuff} onChange={this.handleSelectEvent.bind(this, "personalOugiGageBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalDamageLimit">
                                    <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalDamageLimitBuff} onChange={this.handleSelectEvent.bind(this, "personalDamageLimitBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>,
                                <tr key="personalOugiDamageLimit">
                                    <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                    <td><FormControl componentClass="select" value={this.state.personalOugiDamageLimitBuff} onChange={this.handleSelectEvent.bind(this, "personalOugiDamageLimitBuff")}>{selector.buffLevel}</FormControl></td>
                                </tr>
                            ]
                            : null}

                        <tr>
                            <td colSpan="2">
                                <strong>{intl.translate("ゼニスパーク", locale)}</strong>
                            </td>
                        </tr>

                        <tr>
                            <th className="bg-primary">{intl.translate("ゼニス攻撃力", locale)}*</th>
                            <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleSelectEvent.bind(this, "zenithAttackBonus")}>{selector.zenithAttack} </FormControl></td>
                        </tr>

                        <tr>
                            <th className="bg-primary">{intl.translate("ゼニスHP", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithHPBonus")} > {selector.zenithHP} </FormControl></td>
                        </tr>

                        <TextWithTooltip tooltip={intl.translate("武器ゼニス説明", locale)} id={"tooltip-weapon-zenith-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("武器ゼニス1", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)})</th>
                                <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleSelectEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses[locale]} </FormControl></td>
                            </tr></TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("武器ゼニス説明", locale)} id={"tooltip-weapon-zenith-detail"}>
                            <tr>
                                <th className="bg-primary">
                                    {intl.translate("武器ゼニス2", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)})</th>
                                <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleSelectEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses[locale]} </FormControl></td>
                            </tr></TextWithTooltip>

                        <tr>
                            <th className="bg-primary">{intl.translate("味方全体のHP", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.zenithPartyHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithPartyHPBonus")} > {selector.zenithPartyHP} </FormControl></td>
                        </tr>

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
                                        <FormControl componentClass="select" value={this.state.normalBuff} onChange={this.handleSelectEvent.bind(this, "normalBuff")}> {selector.buffLevel} </FormControl>
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
                                        <FormControl componentClass="select" value={this.state.elementBuff} onChange={this.handleSelectEvent.bind(this, "elementBuff")}> {selector.buffLevel} </FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("その他バフ説明", locale)} id={"tooltip-otherbuff-detail"}><tr>
                            <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                            <td>
                                <InputGroup>
                                    <FormControl componentClass="select" value={this.state.otherBuff} onChange={this.handleSelectEvent.bind(this, "otherBuff")}> {selector.buffLevel} </FormControl>
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </td>
                        </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("その他バフ2説明", locale)} id={"tooltip-otherbuff2-detail"}><tr>
                            <th className="bg-primary">{intl.translate("その他バフ2", locale)}</th>
                            <td>
                                <InputGroup>
                                    <FormControl componentClass="select" value={this.state.otherBuff2} onChange={this.handleSelectEvent.bind(this, "otherBuff2")}> {selector.buffLevel} </FormControl>
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
                                        <FormControl componentClass="select" value={this.state.hpBuff} onChange={this.handleSelectEvent.bind(this, "hpBuff")}> {selector.buffLevel} </FormControl>
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
                                        <FormControl componentClass="select" value={this.state.daBuff} onChange={this.handleSelectEvent.bind(this, "daBuff")}> {selector.buffLevel} </FormControl>
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
                                        <FormControl componentClass="select" value={this.state.taBuff} onChange={this.handleSelectEvent.bind(this, "taBuff")}> {selector.buffLevel} </FormControl>
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
                                        <FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("追加ダメージバフ説明", locale)} id={"tooltip-additionalbuff-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.additionalDamageBuff} onChange={this.handleSelectEvent.bind(this, "additionalDamageBuff")}> {selector.buffLevel} </FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("奥義ゲージ上昇率アップ説明", locale)} id={"tooltip-ougigagebuff-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.buffLevel} </FormControl>
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
                                <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {selector[locale].enemydeftypes} </FormControl></td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("ジータさん基礎DA率説明", locale)} id={"tooltip-player-baseda-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("ジータさん", locale)}<br />{intl.translate("基礎DA率", locale)}</th>
                                <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")} /></td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("ジータさん基礎TA率説明", locale)} id={"tooltip-player-baseta-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("ジータさん", locale)}<br />{intl.translate("基礎TA率", locale)}</th>
                                <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")} /></td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("ジータさん奥義倍率説明", locale)} id={"tooltip-ougi-ratio-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("ジータさん", locale)}<br />{intl.translate("奥義倍率", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {selector.ougiRatio} </FormControl></td>
                            </tr>
                        </TextWithTooltip>
                        <TextWithTooltip tooltip={intl.translate("確保HP説明", locale)} id={"tooltip-minimu-hp-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("確保HP", locale)}</th>
                                <td><FormControl type="number" min="0" value={this.state.minimumHP} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "minimumHP")} /></td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("ダメージ上限アップ説明", locale)} id={"tooltip-damage-limit-buff-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.damageLimitBuff} onChange={this.handleSelectEvent.bind(this, "damageLimitBuff")}> {selector.buffLevel} </FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("奥義ダメージ上限アップ説明", locale)} id={"tooltip-ougi-damage-limit-buff-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("奥義ダメージ上限アップ", locale)}</th>
                                <td>
                                    <InputGroup>
                                        <FormControl componentClass="select" value={this.state.ougiDamageLimitBuff} onChange={this.handleSelectEvent.bind(this, "ougiDamageLimitBuff")}> {selector.buffLevel} </FormControl>
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </td>
                            </tr>
                        </TextWithTooltip>

                        <TextWithTooltip tooltip={intl.translate("チェイン数説明", locale)} id={"tooltip-chain-number-detail"}>
                            <tr>
                                <th className="bg-primary">{intl.translate("チェイン数", locale)}</th>
                                <td>
                                    <FormControl componentClass="select" value={this.state.chainNumber} onChange={this.handleSelectEvent.bind(this, "chainNumber")}> {selector.chainNumber} </FormControl>
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
