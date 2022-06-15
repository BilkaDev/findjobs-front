import React from 'react';

import './LoadingSpinner.css';

interface Props {
    asOverlay: boolean;
}

export const LoadingSpinner = (props: Props) => {
    return (
        <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
            <div className="lds-dual-ring"></div>
        </div>
    );
};


