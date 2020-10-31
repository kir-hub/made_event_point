import React , {useState, useRef, useEffect} from 'react'
import styles from './timer.module.sass'

const Timer =(props)=>{
    const [timerDays, setTimerDays] = useState('00')
    const [timerHours, setTimerHours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00')

    let interval = useRef();

    const startsTimer = () =>{
        const {dataDate} = props;
        const countDownDate = new Date(dataDate).getTime();

        interval= setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000*60*60*24));
            const hours = Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
            const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((distance % (1000*60)) / 1000);

            if(distance < 0){
                //stop
                clearInterval(interval.current)
            }else{
                //update
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    }

    useEffect(() => { 
        startsTimer();
        return ()=>{
            clearInterval(interval.current)
        }
    })

    return (
        <div className={styles.parentCont}>
            <div className={styles.timerContainer}>
                <div>
                    
                    <h2> TITLE</h2>
                    <p>Description</p>
                </div>
                <div className={styles.timer}>
                    <div className={styles.timeSection}>
                        <p>
                            Days
                        </p>
                        <p> <small>{timerDays} </small></p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>
                            Hours
                        </p>
                        <p> <small>{timerHours} </small></p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>
                            Minutes
                        </p>
                        <p> <small>{timerMinutes} </small></p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>
                            Seconds
                        </p>
                        <p> <small>{timerSeconds} </small></p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Timer
