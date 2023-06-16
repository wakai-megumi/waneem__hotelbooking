import React, { useState } from 'react';
import './TeamMembers.scss';

import noavatar from '../../../src/assets/noavatar.jpg'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const TeamMembers = () => {
    const teamMembers = [
        { name: 'ChatGpt', position: 'Stress Handler', photo: 'jane-smith.jpg', socialMedia: { facebook: 'https://www.facebook.com/CHATGPT', twitter: null, instagram: 'https://www.instagram.com/CHATGPT' } },
        { name: 'Tarun Sharma', position: 'CEO', photo: 'john-doe.jpg', socialMedia: { facebook: null, twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/' } },
        { name: 'Youtube', position: 'Project Manager', photo: 'mike-johnson.jpg', socialMedia: { facebook: 'https://www.facebook.com/YOUTUBE', twitter: 'https://www.twitter.com/YOUTUBE', instagram: null } },
    ];

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentCardIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div className="our-team">
            <h3>Our Team</h3>
            <div className="team-cards">
                {teamMembers.map((member, index) => (
                    <div className={`team-card ${index === currentCardIndex ? 'active' : ''}`} key={index}>
                        <img src={noavatar} alt={member.name} />
                        <h4>{member.name}</h4>
                        <p>{member.position}</p>
                        <div className="social-icons">
                            {member.socialMedia && (
                                <>
                                    {member.socialMedia.facebook && (
                                        <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                            <FaFacebook />
                                        </a>
                                    )}
                                    {member.socialMedia.twitter && (
                                        <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                            <FaTwitter />
                                        </a>
                                    )}
                                    {member.socialMedia.instagram && (
                                        <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                            <FaInstagram />
                                        </a>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="navigation-buttons">
                <button onClick={handlePrevCard} disabled={currentCardIndex === 0}>Previous</button>
                <button onClick={handleNextCard} disabled={currentCardIndex === teamMembers.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default TeamMembers;
