import React, { Component } from 'react'

class TimerDisplay extends Component{
    render() {
        
            if (this.props.timeLeft == 0 || this.props.timeLeft ==null){
                return <div>        </div>
            }
        return(
             <h1> time left: {this.props.timeLeft}</h1>
        )
    }
}

export default TimerDisplay