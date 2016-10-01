var React = require('react');
var ReactDOM = require('react-dom');
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');

var StoredListEditor = React.createClass({
    render: function() {
        var combinations = this.props.storedList.combinations
        var armlist = this.props.storedList.armlist
        return (
            <Modal className="hpChartTutotial" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>保存済みの編成</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table>
                            <thead>
                            <tr>
                                <th>No.</th>
                                {armlist[0].map(function(arm, ind){
                                    if(arm.name != "") {
                                        return (<th>{arm.name}</th>);
                                    } else {
                                        return (<th>武器{ind}</th>);
                                    }
                                })}
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {combinations.map(function(v, ind){
                                return (
                                    <tr>
                                        <td>{ind}</td>
                                        {v.map(function(num){
                                            return (<td>{num}本</td>)
                                        })}
                                        <td>Button</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        )
    },
});

module.exports.StoredListEditor = StoredListEditor;
