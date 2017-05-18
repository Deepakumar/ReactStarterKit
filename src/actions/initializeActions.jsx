"use strict";

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/actionType');
var AuthorApi = require('../api/authorApi');

var InitalizeActions = {
    initApp: function(){
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initalData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitalizeActions;