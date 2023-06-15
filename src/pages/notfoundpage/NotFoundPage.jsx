import React from 'react';
import Penguin from '../../../src/utils/lovely_penguin/Lovely_penguin'
import Footer from '../../components/footer/Footer';
import './NotFoundPage.scss';
const NotFoundPage = () => {
    return (

        <>

            <div className="not-found-page">
                <h1>404 Page Not Found</h1>

                <p>Oops! The page you're looking for does not exist.</p>

                < div className='container'>
                    <h3 style={{ fontSize: '14px', fontWeight: '400' }}>hey , wanna say hi , touch my hand</h3>
                    <Penguin />

                </div>

            </div>

            <Footer />
        </>

    )
};

export default NotFoundPage;
