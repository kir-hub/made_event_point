import React from 'react'
import faq from '../../Articles/Articles.json';
import styles from './HowWorkFaq.module.sass'


export default function HowWorkFaq(props) {
    const {header, body} = props
    const HowWorkFaqElements = faq.map((paragraph, index) => (
        <div key={index}>
            <div className={styles.headerFaq}><h3>{paragraph.header}</h3></div>
            <div className={styles.bodyFaq}>{paragraph.body}</div>
        </div>
    ));
    return (
        <div>
            {HowWorkFaqElements}
        </div>
    )
}
