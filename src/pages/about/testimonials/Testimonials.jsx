

import React, { useState, useEffect } from 'react';
import './Testimonials.scss';


const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const testimonials = [
        {
            id: 1,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod.",
            name: "John Doe",
            designation: "CEO, Company A"
        },
        {
            id: 2,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sapien ac magna condimentum vestibulum vitae id magna.",
            name: "Jane Smith",
            designation: "CTO, Company sfssgae"
        }, {
            id: 2,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sapien ac magna condimentum vestibulum vitae id magna.",
            name: "Jane Smith",
            designation: "CTO, Company sdf"
        }, {
            id: 2,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at sapien ac magna condimentum vestibulum vitae id magna.",
            name: "Jane Smith",
            designation: "CTO, Company v"
        },
        // use my own data after i will create the review section

    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [testimonials.length]);

    return (
        <div className="testimonials">
            <h3>Testimonials</h3>
            <div className="testimonial-slider">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                    >
                        <div className="testimonial-content">
                            <p className="comment">{testimonial.comment}</p>
                            <p className="name">{testimonial.name}</p>
                            <p className="designation">{testimonial.designation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
