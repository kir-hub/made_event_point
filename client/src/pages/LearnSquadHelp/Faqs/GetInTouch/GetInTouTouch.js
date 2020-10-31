import React from 'react'
import styles from "./GetInTouTouch.module.sass"
import { Link } from 'react-router-dom'

export default function GetInTouch() {


    return (


        <div className={styles.blueCont}>
            <div className={styles.postMark}>
                <i class="fa fa-paperclip" aria-hidden='tr ue'></i>
            </div>
            <div className={styles.afterPostMark}>
                <h1>Questions?</h1>
                <p>Check out our <a href='/'>FAQs</a> or send us a <a href='/'>message</a>. For assistance with launching a contest, you can also call us at (877) 355-3585 or schedule a <a href='/'>Branding Consultation</a></p>
            </div>
            <Link className={styles.buttonLink} to="/getInTouch">GET IN TOUCH</Link>
        </div>
    )
}
