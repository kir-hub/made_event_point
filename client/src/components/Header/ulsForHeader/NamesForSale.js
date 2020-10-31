import React from 'react'
import CONSTANTS, {PHONE_NUMBER} from '../../../constants';
import styles from '../Header.module.sass';

export default function NamesForSale() {
    return (
        <li>
                                    <span>Names For Sale</span>
                                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu'/>
                                    <ul>
                                        <li className={styles.first}><a href="http://www.google.com">POPULAR NAMES</a></li>
                                        <li><a href="http://www.google.com">SHORT NAMES</a></li>
                                        <li><a href="http://www.google.com">INTRIGUING NAMES</a></li>
                                        <li><a href="http://www.google.com">NAMES BY CATEGORY</a></li>
                                        <li><a href="http://www.google.com">VISUAL NAME SEARCH</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">SELL YOUR
                                            DOMAINS</a></li>
                                    </ul>
                                </li>
    )
}
