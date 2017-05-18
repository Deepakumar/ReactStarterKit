"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

module.exports = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        wllTransitionFrom: function (transition, component) {
            if(component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function(){
        return {
            author: { id:'', firstName: '', lastName :''},
            errors: {}
        };
    },
    componentWillMount:function(){
        var authorId = this.props.params.id;

        if(authorId){
            this.setState({author: AuthorStore.getauthorById(authorId)});
        }
    },
    setAuthorState: function(event){
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author:this.state.author});
    },
    authorformValid: function() {
        var formIsValid=true;
        this.state.errors = {};

        if(!this.state.author.firstName.length > 0 ){
            this.state.errors.firstName ='first Name must be at least c characters';
            formIsValid = false;
        }

        if(!this.state.author.lastName.length > 0){
            this.state.errors.lastName ="Last name must be at least 3 characters";
            formIsValid = false;
        }

        this.setState({errors:this.state.errors});
        return formIsValid;
    },
    saveAuthor : function(event){
        event.preventDefault();
        if(!this.authorformValid()){
            return;
        }
        AuthorActions.createAuthor(this.state.author);
        this.setState({dirty:false});
        toastr.success("Author Saved.");
        this.transitionTo('authors');
    },
    render:function() {
        return (
            <AuthorForm author={this.state.author}
                        onChange={this.setAuthorState}
                        onSave={this.saveAuthor}
                        errors={this.state.errors}
            />
        );
    }
});