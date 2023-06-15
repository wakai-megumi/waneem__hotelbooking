import React from 'react';
import './Cutie.scss';
const Cutie = () => {
    return (
        <div className="cute-creature">
            <div className="head">
                <div className="eye right"></div>
                <div className="eye left"></div>

                <div className="mouth"></div>
            </div>
            <div className="body"></div>
            <div className="leg"></div>
            <div className="tail"></div>
        </div>
    );
};

export default Cutie;
