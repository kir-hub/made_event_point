import React from 'react'
import styles from '../Header.module.sass';
import CONSTANTS, {PHONE_NUMBER} from '../../../constants';

export default function NameIdeas() {
    return (
        
             <li>
                                    <span>NAME IDEAS</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                                alt='menu'/>
                                    <ul>
                                        <li className={styles.first}><a href="http://www.google.com">Beauty</a></li>
                                        <li><a href="http://www.google.com">Consulting</a></li>
                                        <li><a href="http://www.google.com">E-Commerce</a></li>
                                        <li><a href="http://www.google.com">Fashion & Clothing</a></li>
                                        <li><a href="http://www.google.com">Finance</a></li>
                                        <li><a href="http://www.google.com">Real Estate</a></li>
                                        <li><a href="http://www.google.com">Tech</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">More Categories</a>
                                        </li>
                                    </ul>
                                </li>
        
    )
}
