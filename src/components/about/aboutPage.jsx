"use strict";

var React=require('react');

module.exports = React.createClass({
    statics: {
        willTransitionTo : function(transition, params, query, callback){
            if(!confirm('Are you sure you read a page that\'s boring?')){
                transition.about();
            }
            else {
                callback();
            }
        },
        willTransitionFrom : function(transition, component){
            if(!confirm('Are you sure you read a page that\'s exciting?')){
                transition.about();
            }
        }
    },
   render: function() {
       return (
           <div>
               <h1>About</h1>
               <p>
                   This application uses the following technologies:
                   <ul>
                       <li>React</li>
                       <li>React Router</li>
                       <li>Flux</li>
                       <li>Node</li>
                       <li>Gulp</li>
                       <li>Browserify</li>
                       <li>Bootstrap</li>
                   </ul>
               </p>
           </div>
       );
   }
});