var React = require('react');
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var _ua = GlobalConst._ua;
var selector = GlobalConst.selector
var intl = require('./translate.js')
var {githubAPItoken} = require('./secret_consts.js')

var SendRequest = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            message: "",
            yourname: "",
        }
    },
    sendRequestToGithub: function() {
        if(this.state.name != "") {
            var sendData = {"body": ""}
            if(this.yourname != "") {
                sendData["body"] += "投稿者: " + this.state.yourname + "\n"
            }

            sendData["body"] += "種別: " + this.props.type + "\n" + this.props.type + "名: " + this.state.name + "\n"

            if(this.message != "") {
                sendData["body"] += "メッセージ:" + this.state.message + "\n"
            }

            $.ajax({
                url: "https://api.github.com/repos/hoshimi/motocal/issues/" + this.props.issueNumber + "/comments",
                type: 'post',
                data: JSON.stringify(sendData),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "token " + githubAPItoken);
                    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
                },
                success: function(data) {
                    // console.log("[RESPONSE]")
                    // console.log(data)
                    alert(intl.translate("送信成功", this.props.locale));
                    this.props.closeSendRequest();
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error("[ERROR]: xhr: ", xhr)
                    // console.error("[ERROR]: ", status, err.toString())
                    this.props.closeSendRequest();
                }.bind(this)
            });
        } else {
            if(this.props.locale == "ja") {
                alert("要望した" + this.props.type + "名が空です");
            } else {
                alert(this.props.type + " name must not be empty.");
            }
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale

        return (
            <div className="sendRequestForm">
                <p> <a href="https://github.com/hoshimi/motocal"> github.com / motocal </a> </p>
                <p>{intl.translate("要望送信メッセージ", locale)}</p>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th className="bg-primary">{intl.translate("要望種別", locale)}</th>
                            <td>{this.props.type}</td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{this.props.type}{intl.translate("名", locale)}</th>
                            <td>
                                <FormControl type="text" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} style={{textAlign: "left"}} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("メッセージ", locale)}</th>
                            <td>
                                <FormControl componentClass="textarea" value={this.state.message} onChange={this.handleEvent.bind(this, "message")} style={{textAlign: "left", height: "200px"}} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("あなたのお名前", locale)}</th>
                            <td>
                                <FormControl type="text" value={this.state.yourname} onChange={this.handleEvent.bind(this, "yourname")} style={{textAlign: "left"}} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button bsStyle="primary" onClick={this.sendRequestToGithub}>{intl.translate("送信", locale)}</Button>
            </div>
        )
    },
});

var RegisteredChara = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            charaData: {},
            limit: 50,
            openSendRequest: false,
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: "./charaData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({charaData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: キャラデータの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.props.onClick(this.state.charaData[e.target.getAttribute("id")]);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    openSendRequest: function(e) {
        this.setState({openSendRequest: true})
    },
    closeSendRequest: function(e) {
        this.setState({openSendRequest: false})
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var charaData = this.state.charaData
        var limit = this.state.limit;
        var displayed_count = 0;
        var locale = this.props.locale

        if(_ua.Mobile || _ua.Tablet){
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder={intl.translate("キャラ名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onechara" key={key}>
                                                <p>{charaData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder={intl.translate("キャラ名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onechara" key={key}>
                                            <p>{charaData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}

                    </div>
                    <Button onClick={this.openSendRequest} bsStyle="danger">{intl.translate("追加要望を送る", locale)}</Button>

                    <Modal show={this.state.openSendRequest} onHide={this.closeSendRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("キャラ追加要望", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SendRequest locale={locale} type={intl.translate("キャラ", locale)} issueNumber={29} closeSendRequest={this.closeSendRequest} />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});

var RegisteredArm = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            armData: {},
            limit: 50,
            tempArm: {},
            openConsiderNumberModal: false,
            plusNum: 0,
            armLv: 1,
            armSLv: 1,
            additionalSelect: null,
            additionalSelectKey: "",
            additionalSelectClass: "hidden",
            old_element: "light",
            cosmos_skill: "cosmosAT",
            openSendRequest: false,
        };
    },
    openSendRequest: function(e) {
        this.setState({openSendRequest: true})
    },
    closeSendRequest: function(e) {
        this.setState({openSendRequest: false})
    },
    closeConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: false})
    },
    openConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: true})
    },
    componentDidMount: function() {
        $.ajax({
            url: "./armData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({armData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 武器データの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.setState({tempArm: this.state.armData[e.target.getAttribute("id")]});
        var arm = this.state.armData[e.target.getAttribute("id")]
        this.setState({armLv: parseInt(arm.maxlv)})
        this.setState({armSLv: parseInt(arm.slvmax)})
        if(arm.maxlv == "150") {
            this.setState({selectLevel: selector.levelNoLimit})
            this.setState({selectSkillLevel: selector.skilllevelNoLimit})
        } else {
            this.setState({selectLevel: selector.levelLimit})
            this.setState({selectSkillLevel: selector.skilllevelLimit})
        }
        if(arm.name.indexOf("・属性変更") > 0 || arm.name.indexOf("・覚醒") > 0){
            this.setState({additionalSelectKey: "old_element"})
            this.setState({additionalSelect: selector[this.props.locale].elements})
            this.setState({additionalSelectClass: "visible"})
        } else if (arm.name.indexOf("コスモス") > 0) {
            this.setState({additionalSelectKey: "cosmos_skill"})
            this.setState({additionalSelect: selector[this.props.locale].cosmosSkills})
            this.setState({additionalSelectClass: "visible"})
        } else {
            this.setState({additionalSelectKey: ""})
            this.setState({additionalSelect: null})
            this.setState({additionalSelectClass: "hidden"})
        }
        this.setState({openConsiderNumberModal: true})
    },
    clickedConsiderNumber: function(e) {
        var arm = this.state.tempArm
        arm["plus"] = this.state.plusNum
        arm["lv"] = this.state.armLv
        arm["slv"] = this.state.armSLv
        if(this.state.additionalSelectKey == "old_element") {
            arm["name"] += "[" + elementTypes[this.state.old_element] + "]"
            arm["element"] = this.state.old_element
            arm["element2"] = this.state.old_element
        } else if(this.state.additionalSelectKey == "cosmos_skill") {
            arm["skill2"] = this.state.cosmos_skill
        }
        this.props.onClick(arm, e.target.value);
        this.setState({openConsiderNumberModal: false})
        this.setState({plusNum: 0})
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale;
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var armData = this.state.armData
        var limit = this.state.limit;
        var displayed_count = 0;

        if(_ua.Mobile || _ua.Tablet){
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(filterElement != "all" || displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>{armData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>
                            <FormControl componentClass="select" value={this.state[this.state.additionalSelectKey]} className={this.state.additionalSelectClass} onChange={this.handleEvent.bind(this, this.state.additionalSelectKey)}>{this.state.additionalSelect}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onearm" key={key}>
                                            <p>{armData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}
                    </div>

                    <Button onClick={this.openSendRequest} bsStyle="danger">{intl.translate("追加要望を送る", locale)}</Button>

                    <Modal show={this.state.openSendRequest} onHide={this.closeSendRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("武器追加要望", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SendRequest locale={locale} type={intl.translate("武器", locale)} issueNumber={30} closeSendRequest={this.closeSendRequest} />
                        </Modal.Body>
                    </Modal>

                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>
                            <FormControl componentClass="select" value={this.state[this.state.additionalSelectKey]} className={this.state.additionalSelectClass} onChange={this.handleEvent.bind(this, this.state.additionalSelectKey)}>{this.state.additionalSelect}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});


module.exports.RegisteredChara = RegisteredChara
module.exports.RegisteredArm = RegisteredArm
