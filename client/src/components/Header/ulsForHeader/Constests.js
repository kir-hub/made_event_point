import React from 'react'
import CONSTANTS, {PHONE_NUMBER} from '../../../constants';
import styles from '../Header.module.sass';

export default function Constests() {
    return (
        <li>
                                    <span>Contests</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                              alt='menu'/>
                                    <ul>
                                        <li className={styles.first}><a href="http://www.google.com">How it works</a></li>
                                        <li><a href="http://www.google.com">Pricing</a></li>
                                        <li><a href="http://www.google.com">Agency service</a></li>
                                        <li><a href="http://www.google.com">Active contests</a></li>
                                        <li><a href="http://www.google.com">Winners</a></li>
                                        <li><a href="http://www.google.com">Leaderboard</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">BECOME A
                                            CREATIVE</a></li>
                                    </ul>
                                </li>
    )
}
