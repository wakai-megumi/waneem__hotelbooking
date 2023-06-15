import React from 'react';
import Cutie from '../../utils/cutie/Cutie';
import './AvailableSoon.scss';
import Footer from '../../components/footer/Footer';


const AvailableSoon = () => {

    return (
        <>
            <div className="available_soon">
                <div className='cutie-contianer'>

                    <Cutie />
                    <Cutie />
                </div>
                <h1>Under Construction</h1>
                <p>We are currently working on bringing you more exciting features!</p>
                <p>This feature will be available soon. Stay tuned!</p>
                <div className='cutie-contianer'>

                    <Cutie />
                    <Cutie />
                </div>

            </div>
            <Footer />
        </>

    );
};

export default AvailableSoon;
