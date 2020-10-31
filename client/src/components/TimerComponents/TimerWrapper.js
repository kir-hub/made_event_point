import React, { Component } from 'react'
import Button from './TimerButton'
import TimerDisplay from './timerDisplay'



class TimerWrapper extends Component {
    constructor(props){
        super(props)
        this.startTimer = this.startTimer.bind(this)
        this.state ={
            timeLeft: null,
            timer: null
        }

    }

    startTimer(timeLeft){
        clearInterval(this.state.timer)
        let timer = setInterval(() =>{
            let timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0){
                clearInterval(timer)
            }
            this.setState({
                timeLeft: timeLeft
            })
        }, 1000 )
        return this.setState({
            timeLeft: timeLeft, 
            timer: timer
        })
    }

    render() {
        return (
            <div>
                <h2>Timer</h2>
                <div>
                    <Button time='5' startTimer={this.startTimer}/>
                    <Button time='15' startTimer={this.startTimer}/>
                    <Button time='25' startTimer={this.startTimer}/>
                </div>
                <TimerDisplay timeLeft={this.state.timeLeft}/>
                
            </div>
        )
    }
}

// class Button extends Component{
//     handleStartTimer(){
//         return this.props.startTimer(this.props.time)
//     }
//     render() {
//         return(
//              <button onClick={this.handleStartTimer.bind(this)}>{this.props.time} secs </button>
            


//         )
//     }
// }


// class TimerDisplay extends Component{
//     render() {
        
//             if (this.props.timeLeft == 0 || this.props.timeLeft ==null){
//                 return <div>        </div>
//             }
//         return(
//              <h1> time left: {this.props.timeLeft}</h1>
//         )
//     }
// }

export default TimerWrapper