import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactPage.scss';
import Footer from '../../components/footer/Footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // after making all req we can do this if not , but it is ok for now it works just need an api to converse with
        toast.success('Your message has been sent. We will get back to you soon!');
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <>
            <div className="contact-page" id='contact_page'>
                <div className="contact-info">
                    <h2>Contact Us</h2>
                    <div className="info-sections">
                        <div className="contact-section">
                            <FaEnvelope className="icon" />
                            <h3>Email</h3>
                            <p>wakai-megumi@example.com</p>
                        </div>
                        <div className="contact-section">
                            <FaPhone className="icon" />
                            <h3>Phone</h3>
                            <p>+91 151002-121999</p>
                        </div>
                        <div className="contact-section">
                            <FaMapMarkerAlt className="icon" />
                            <h3>Address</h3>
                            <p>84, Upper circuit, Hamirpur, India</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Get In Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder='please specify you queries here --- our support team will get back to you soon'
                            ></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default ContactPage;
