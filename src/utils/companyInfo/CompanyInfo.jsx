import React from 'react';
import './CompanyInfo.scss';

const CompanyInfo = () => {
    return (
        <div className="company-info">
            <h3>Company Information</h3>
            <div className="info-sections">
                <div className="awards-section">
                    <h4>Awards & Recognition</h4>
                    <ul>
                        <li> yet to be achieved</li>
                    </ul>
                </div>

                <div className="partnerships-section">
                    <h4>Partnerships</h4>
                    <ul>
                        <li> Parterned with Ineuron</li>
                        <li>Massive Supprot of CUHP</li>
                        ............................
                    </ul>
                </div>

                <div className="values-section">
                    <h4>Mission & Values</h4>
                    <ul>
                        <li> Customer Satisfaction </li>
                        <li> Information  Security </li>
                        <li>Growing as with the clock moves</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
