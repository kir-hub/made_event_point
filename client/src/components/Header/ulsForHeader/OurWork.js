import React from 'react'
import CONSTANTS, {PHONE_NUMBER} from '../../../constants';
import styles from '../Header.module.sass';

export default function OurWork() {
    return (
        <li>
                                    <span>Our Work</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                              alt='menu'/>
                                    <ul>
                                        <li className={styles.first}><a href="http://www.google.com">NAMES</a></li>
                                        <li><a href="http://www.google.com">TAGLINES</a></li>
                                        <li><a href="http://www.google.com">LOGOS</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">TESTIMONIALS</a>
                                        </li>
                                    </ul>
                                </li>
    )
}
