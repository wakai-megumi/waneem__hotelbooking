import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './About.scss';
import CompanyInfo from '../../utils/companyInfo/CompanyInfo';
import TeamMembers from '../../utils/teamMembers/TeamMembers';
import Testimonials from './testimonials/Testimonials';
import Footer from '../../components/footer/Footer';

const AboutPage = () => {
    const socialMediaLinks = [
        { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/yourwebsite' },               // websites social media outreach links

        { name: 'Twitter', icon: <FaTwitter />, url: null },
        { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/yourwebsite' },
    ];

    const handleSocialMediaClick = (url) => {
        if (url === null) {
            toast.info('Social media links will be available soon.');
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <div className="about-page">
                <div className="about-content">
                    <h2>About Our Website</h2>
                    <p>Welcome to our website, where you can book hotels from around the world with ease. We strive to provide the best user experience and ensure that your stay is memorable.</p>
                    <p>Our team works tirelessly to curate a collection of top-notch hotels, ensuring that you have a wide range of options to choose from. Whether you're planning a business trip, family vacation, or romantic getaway, we have the perfect accommodation for you.</p>
                    <p>At our website, we value your comfort and convenience. Our user-friendly interface allows you to search and book hotels seamlessly. We provide detailed information about each hotel, including amenities, photos, and customer reviews, to help you make an informed decision.</p>
                    <p>Here are some key features of our website:</p>
                    <ul>
                        <li>Extensive Hotel Selection: We have partnered with hotels worldwide to offer you a diverse range of options.</li>
                        <li>Easy Booking Process: Our streamlined booking process ensures a hassle-free experience.</li>
                        <li>Secure Payments: We prioritize the security of your payment information to provide a safe transaction environment.</li>
                        <li>Customer Support: Our dedicated support team is available 24/7 to assist you with any queries or concerns.</li>
                        <li>Best Price Guarantee: We strive to offer competitive prices and special deals to make your stay affordable.</li>
                    </ul>
                    <p>If you have any questions or need assistance, feel free to reach out to our dedicated support team. We're here to make your booking experience as smooth as possible.</p>
                </div>

                <div className="social-media-links">
                    <h3>Connect with Us</h3>
                    <ul>
                        {socialMediaLinks.map((link, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleSocialMediaClick(link.url)}
                                    // disabled={link.url === null}
                                    className={link.url === null ? 'disabled' : ''}
                                >
                                    {link.icon}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <TeamMembers />
                <Testimonials />
                <CompanyInfo />
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
