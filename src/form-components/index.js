"use strict";
/**
 * This component is currently uncompleted demo for #273
 */

// XXX: no error check in this sample.


const React = require('react');
const fix = require('./fix-options');
const {Component:DefaultComponent} = require('./backend/bootstrap');


function SwitchComponent(props, backend="bootstrap") {
    // Swtich component class for componentClass="select" type="number" only
    if (props.componentClass && props.componentClass === "select")
    {
        let {Component} = require("./backend/" + (props.backend || backend));
        const children = fix(props.children);

        // Detect text options
        if (children.map(item => item.props.value).some(isNaN)) {
            Component = DefaultComponent;
        }

        // Avoid duplicate props.children
        const newProps = Object.assign({}, props);
        delete newProps.children;

        return <>
            {props.debug ? <p>backend: {props.backend || "bootstrap"}</p> : ""}
            <Component {...newProps}>{children}</Component>
            </>;
    }

    return <DefaultComponent {...props} />;
}


module.exports.SwitchComponent = SwitchComponent;

// for Bind 2nd "backend" parameter
module.exports.getFormControlClass = (backend) => (props) => SwitchComponent(props, backend);
