"use strict";

var React = require('react');
var Input = require('../common/textinput');

module.exports= React.createClass({
    propTypes: {
        author:React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
    render:function(){
        return (
            <form>
                <h1>Manage Author</h1>
                <label htmlFor="firstName">First Name</label>
                <Input name="firstName"
                       label="First Name"
                       value={this.props.author.firstName}
                       ref="firstName"
                       onChange={this.props.onChange}
                       error={this.props.errors.firstName}
                />
                <br/>
                <label htmlFor="lastName">LastName</label>
                <Input name="lastName"
                       label="Last Name"
                       value={this.props.author.lastName}
                       ref="firstName"
                       onChange={this.props.onChange}
                       error={this.props.errors.firstName}
                />
                <br/>
                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});