import React from 'react'
import faq from '../../Articles/Asks.json';
import styles from './Asks.module.sass'

export default function Asks(props) {
    const {header, body} = props
    const AsksElements = faq.map((paragraph, index) => {
        if( (index + 1) % 2 == 0){
            return <div key={index} className={styles.even}>
            <div className={styles.header}>{paragraph.header}</div>
            <div  className={styles.body}>{paragraph.body}</div>
        </div>
        }else{
            return (<>
            
            <div key={index} className={styles.odd}>
                    <div className={styles.header}>{paragraph.header}</div>
                    <div className={styles.body}>{paragraph.body}</div>
                </div>
                </>)
        
    }});

    
    return (
        <>
        <div className={styles.returnDiv}>
            <div className={styles.askDiv}><h1>?</h1> </div>  <h1>Frequently Asked Questions</h1>
            
            </div>
            <hr/>
            {AsksElements}
        
        </>
    )

    }

