import React, { useState } from 'react';
import './FAQ.scss';
import questions from '../../../static_Data/FAQ_questions.js';
import Footer from '../../../components/footer/Footer';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showQueryForm, setShowQueryForm] = useState(false);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handleQueryClick = () => {
        setShowQueryForm(!showQueryForm);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle query submission logic here
    };

    return (
        <>
            <div className='faqs'>
                <div className="faq-container">
                    <h1>Frequently Asked Questions</h1>

                    <div className="faq-categories">
                        {questions.map((category, categoryIndex) => (
                            <div className="category" key={categoryIndex}>
                                <h2>{category.category}</h2>
                                <ul className="question-list">
                                    {category.items.map((item, itemIndex) => {
                                        const index = `${categoryIndex}${itemIndex}`;

                                        return (
                                            <li key={index}>
                                                <div
                                                    className={`question-card ${activeIndex === index ? 'active' : ''}`}
                                                    onClick={() => handleClick(index)}
                                                >
                                                    <h3 className="question">{item.question}</h3>
                                                    {activeIndex === index && (
                                                        <div className="answer" style={activeIndex !== index ? { display: 'none' } : { display: 'block' }}>{item.answer}</div>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <button id="query-button" onClick={handleQueryClick}>
                        Still have a question? Send us a query.
                    </button>

                    {showQueryForm && (
                        <div className="query-form">
                            <h2>Send us a Query</h2>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />

                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />

                                <label htmlFor="query">Your Query:</label>
                                <textarea id="query" name="query" required></textarea>

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>

    );
};

export default FAQ;
