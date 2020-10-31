import React from 'react'
import faq from '../../Articles/Steps.json';
import styles from './steps.module.sass'



export default function Steps(props) {
    const {header, body} = props
    const StepsElements = faq.map((paragraph, index) => (
        <div key={index} className={styles.mainCont}>
            <div className={styles.numContainer}> 
                
                 <h1>{index + 1}</h1>
                 
            </div>
            <div className={styles.headerFaq}><h3>{paragraph.header}</h3></div>
            <div className={styles.bodyFaq}>{paragraph.body}</div>
        </div>
    ));
    return (
        <>
        <div className={styles.titleCont}>
            <h1> 5 Simple Steps</h1>
        </div>


        <div className={styles.elementsCont}>         
           
            {StepsElements}
            
        </div>
        </>
    )
}
