var React = require('react');
var ReactFire = require('reactfire');
var Firebase= require('firebase');
var Header = require('./header');
var List= require('./list');

var rootUrl="https://todo-c2006.firebaseio.com/";
var config = {
    apiKey: "AIzaSyAfy29d3qOTFy18rBJktIT92kyVBxAiOXg",
    // Only needed if using Firebase Realtime Database (which we will be in this example)
    databaseURL: "https://todo-c2006.firebaseio.com",
    // Only needed if using Firebase Authentication
    authDomain: "todo-c2006.firebaseapp.com",
    // Only needed if using Firebase Storage
    storageBucket: "todo-c2006.appspot.com"
};
Firebase.initializeApp(config);
var database = Firebase.database();

var App = React.createClass({
    mixins: [ReactFire],
    getInitialState:function() {
        return {
            items:{},
            loaded:false
        }
    },
  componentWillMount : function() {
      this.fireBaseDb = Firebase.database().ref("items");
      this.fireBaseDb.on('value',this.handleDataLoaded);
      this.bindAsObject(this.fireBaseDb, "items");
  },
  render: function() {
    console.log(this.state);
    alert('Hi Lakshitha');
    return <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                        <h2 className="text-center">
                            To Do List -Aruna  fdsfsfsf fwwewrw
                        </h2>
                    <Header itemsStore={this.firebaseRefs.items}/>
                    <hr/>
                    <div className={"content " + (this.state.loaded ? 'loaded':'')}>
                        <List items={this.state.items}/>
                        {this.deleteButton()}
                    </div>
                </div>
    </div>
  },
    handleDataLoaded : function() {
        this.setState({loaded:true});
    },
    deleteButton:function() {
        if(!this.state.loaded){
            return
        }
        else {
            return <div className="text-center clear-complete">
                <hr/>
                <button type="button"
                        onClick={this.oneDeleteDoneClick}
                        className="btn btn-default"
                >
                Clear Complete
                </button>
            </div>
        }
    },
    oneDeleteDoneClick : function(event) {
        for(var key in this.state.items){
            if(this.state.items[key].done){
                this.fireBaseDb.child(key).remove();
            }
        }
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
