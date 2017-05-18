"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            authors: []
        };
    },
    componentWillMount: function() {
        if(this.isMounted()){
            console.log('con');
        }
        this.setState({authors:AuthorApi.getAllAuthors()});
    },
    render:function(){
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});