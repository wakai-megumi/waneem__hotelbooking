import React from "react";
import "./PrivacyPolicyPage.scss";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const PrivacyPolicy = () => {
    return (
        <>

            <div className="privacy-policy-page">
                <div className="container">
                    <h1 className="title">Privacy Policy</h1>

                    <div className="box">
                        <h2 className="section-title">Introduction</h2>
                        <p className="section-text">
                            At <span className="highlight">Your Company Name</span>, we value the privacy of our users. This Privacy Policy outlines the types of personal information we collect and how we use and protect that information.
                        </p>
                    </div>

                    <div className="box">
                        <h2 className="section-title">Information We Collect</h2>
                        <p className="section-text">
                            We may collect the following types of personal information when you interact with our website:
                        </p>
                        <ul className="list">
                            <li>Your name</li>
                            <li>Your email address</li>
                            <li>Your mailing address</li>
                        </ul>
                        <p className="section-text">
                            We use this information to provide you with a personalized experience and improve our services.
                        </p>
                    </div>

                    <div className="box">
                        <h2 className="section-title">Information Security</h2>
                        <p className="section-text">
                            We take the security of your personal information seriously. We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                        <p className="quote">
                            "Your security is our top priority."
                        </p>
                    </div>

                    <div className="box">
                        <h2 className="section-title">Third-Party Links</h2>
                        <p className="section-text">
                            Our website may contain links to third-party websites. Please note that we are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of those websites before providing any personal information.
                        </p>
                    </div>

                    <div className="box">
                        <h2 className="section-title">Contact Us</h2>
                        <p className="section-text">
                            If you have any questions or concerns regarding this Privacy Policy, please <Link className="link" to="/contact_page#contact_page">contact us</Link>.
                        </p>
                    </div>

                    <p className="important">
                        This Privacy Policy was last updated on June 12, 2023.
                    </p>
                </div>
            </div>

            <Footer />

        </>
    );
}

export default PrivacyPolicy;
