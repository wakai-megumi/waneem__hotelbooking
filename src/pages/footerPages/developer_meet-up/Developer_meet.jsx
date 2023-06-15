import React from 'react';
import Footer from '../../../components/footer/Footer';
import TeamMembers from '../../../utils/teamMembers/TeamMembers';
import { toast } from 'react-toastify';
import './Developer_meet.scss';
const Developer_meet = () => {
    const [query, setQuery] = React.useState({
        name: '',
        email: '',
        message: ''
    });

    const TechTeamRef = React.useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuery((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        toast.info('Thank you for contacting us. We will get back to you as soon as possible.');

        setQuery({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <div className="developer-team">
                <TeamMembers />
            </div>

            <div className="contact-developer">
                <h1>
                    Contact our Technical Team{' '}
                    <span style={{ fontStyle: 'italic', fontSize: '15px', fontWeight: '400' }}>
                        -- for any queries or suggestions
                    </span>
                </h1>
                <p>
                    If you have any questions, feedback, or issues related to our website, please feel free to contact the developer.
                    Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} ref={TechTeamRef}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" required onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            required
                            placeholder="Your queries, bugs, suggestions here -- ( adding screenshot of bugs or issues will be allowed soon)"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit">Send Message</button>
                </form>
            </div>

            <Footer TechTeamRef={TechTeamRef} />
        </>
    );
};

export default Developer_meet;
