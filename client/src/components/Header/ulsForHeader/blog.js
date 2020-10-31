import React from 'react'
import CONSTANTS, {PHONE_NUMBER} from '../../../constants';
import styles from '../Header.module.sass';

export default function Blog() {
    return (
        <li>
                                    <span>Blog</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                          alt='menu'/>
                                    <ul>
                                        <li className={styles.first}><a href="http://www.google.com">Ultimate naming guide</a></li>
                                        <li><a href="http://www.google.com">POETIC DEVICES IN BUSINESS NAMING</a></li>
                                        <li><a href="http://www.google.com">CROWDED BAR THEORY</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">ALL ARTICLES</a>
                                        </li>
                                    </ul>
                                </li>
    )
}
