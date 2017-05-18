"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports=React.createClass({
    render :function() {
        return (
            <div className="jumbotron">
                <h1>Plurslight Administration</h1>
                <p>React, Ract Router, and Flex for ultra responsive web apps.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
        );
    }
});