var React = require('react');

module.exports=React.createClass({
    getInitialState:function() {
        return {
            text: ''
        }
    },
    render:function() {
        return <div class="input-group">
                    <input
                        value={this.state.text}
                        onChange={this.onInputChange}
                        type="text"
                        class="form-control" />
                    <span class="input-group-btn">
                        <button class="btn btn-default"
                                type="button"
                        onClick={this.handleClick}>Add</button>
                    </span>
            {this.state.text}
                </div>
    },
    handleClick:function() {
        console.log("Add button clicked");
        this.props.itemsStore.push({
            text:this.state.text,
            done:false
        });

        this.setState({text:''});
    },
    onInputChange:function(event) {
        console.log(event.target.value);
        this.setState({text:event.target.value});
    }
});