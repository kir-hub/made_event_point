import React , {useState, Component} from 'react'
import Timer from '../../components/TimerComponents/TimerHooks'
import TimerWrapper from '../../components/TimerComponents/TimerWrapper'









export default class Events extends Component {
    constructor(props){
        super(props)
        this.state = {
            input: '',
            submit: '',
            a: 'December 30 2020 00:00:00',
            items: [],
            
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event){
        this.setState({
            input: event.target.value
        })
    }
    handleSubmit(event){
        
        event.preventDefault()
        this.setState({
            submit: this.state.input,
            items: [...this.state.items, this.state.input]
        })
    }


    render() {
       
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.input} onChange={this.handleChange}/>
                    <button type='submit'> </button>
                </form>
                <input onChange={this.handleChange}/>
                
                <h5> {this.state.submit}</h5>

                <h3> {this.state.input} </h3>

                <ul>
                    {this.state.items.map((item, index) =><li> <Timer dataDate={this.state.submit} key={index}/></li> )}
                </ul>
                    
                <Timer dataDate={this.state.submit} />
            </div>
        )
    }
}

// (
//     <li key={index}> {item}</li>
// )





// const Events = (props) => {

//     const [date, setDate] = useState('null')



//     // const addEvent =(date) =>{
//     //     const result = <Timer dataDate={'December 30 2020 00:00:00'}/>
//     //     return console.log('1')
//     // }
// const clickHandler =()=>{
//     return setDate(()=> date + 4)
// }



//     return (
//         <div>
//             <input type='text' value={date}/>
//             <button onClick={clickHandler}> </button>




//             {/* <input Type='text' name='data' id={date}>

//             </input>
//             <button onClick={addEvent(data.value)}>
//             try
//             </button> */}
            
//             <Timer dataDate='December 30 2020 00:00:00'/>
//         </div>
//     )


// }

// export default Events
