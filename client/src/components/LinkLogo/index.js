import {Link} from 'react-router-dom';
import CONSTANTS from '../../constants.js';
import PropTypes from 'prop-types';
import React from 'react';

const LinkLogo = ({to, ...props}) => {
    return (
        <Link to={to}>
        <img {...props}/>
    </Link>
    );
};

LinkLogo.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};

LinkLogo.defaultProps = {
    to: '/',
    src: `${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`,
    alt: 'logo',
};
export default LinkLogo;
