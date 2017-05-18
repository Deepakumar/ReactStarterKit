var React=require('react');
var Firebase= require('firebase');

module.exports= React.createClass({
    getInitialState:function() {
        return {
            text:this.props.item.text,
            done:this.props.item.done,
            textchnaged: false
        }
    },
    componentWillMount:function() {
        this.fireBaseDb = Firebase.database().ref('items/' + this.props.item.key);
    },
    render:function() {
        return <div className="input-group">
            <span className="input-group-addon">
                <input type="checkbox"
                       onChange={this.handleDoneChange}
                       checked={this.state.done}
                />
            </span>
            <input type="text"
                   className="form-control"
                   disabled={this.state.done}
                   value={this.state.text}
                   onChange={this.handleTextChanged}
            />
            <span className="input-group-btn">
                {this.changesButton()}
                <button
                    className="btn btn-default"
                onClick={this.handleDeleteclick}>
                    Delete
                </button>
            </span>
        </div>
    },
    handleDoneChange:function(event) {
        var update = {done: event.target.checked};
        this.setState(update);
        this.fireBaseDb.update(update);
    },
    handleDeleteclick:function(event){
        this.fireBaseDb.remove();
    },
    handleTextChanged: function(event) {
        this.setState({
            text:event.target.value,
            textchnaged:true
        });
    },
    changesButton:function() {
        if(!this.state.textchnaged){
            return null;
        }
        else {
            return  [
                <button
                    className="btn btn-default"
                    onClick={this.handleSaveClick}
                >Save</button>,
                <button
                    className="btn btn-default"
                    onClick={this.handleUndoClick}
                >Undo</button>
            ]
        }
    },
    handleUndoClick : function() {
        this.setState({
            text:this.props.item.text,
            textchnaged : false
        })
    },
    handleSaveClick : function() {
        this.fireBaseDb.update({
            text:this.state.text
        });
        this.setState({
            textchnaged: false
        });
    }
})