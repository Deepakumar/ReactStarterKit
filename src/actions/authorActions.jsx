"use strict";

var Dispatcher = require('../dispatcher/dispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionType');

var AuthorActions = {
    createAuthor: function(author){
        var newAuthor = AuthorApi.saveAuthor(author);

        //Hey dispatcher, go tell all stores that an author was just created
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    }
};

module.exports = AuthorActions;