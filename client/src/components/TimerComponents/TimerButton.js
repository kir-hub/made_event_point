import React, { Component } from 'react'


class Button extends Component{
    handleStartTimer(){
        return this.props.startTimer(this.props.time)
    }
    render() {
        return(
             <button onClick={this.handleStartTimer.bind(this)}>{this.props.time} secs </button>
            


        )
    }
}

export default Button