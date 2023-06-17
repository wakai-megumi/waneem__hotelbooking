import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import "./Reviews.scss";
import propTypes from 'prop-types'
import useFetch from "../../customhooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Reviews = ({ hotelId, hotelName }) => {
    const [loading, setLoading] = useState(false);



    const { data, error } = useFetch(
        `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/reviews/${hotelId}`
    )
    console.log(data?.reviews)
    return (
        <div className="review-container">
            {loading ? (
                <div className="card-container">
                    {/* <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard /> */}
                </div>
            ) : data?.reviews.length === 0 || error ? (
                <p>No reviews available.</p>
            ) : (
                <Slider
                    slidesToShow={4}
                    slidesToScroll={3}
                    className="slider"
                    infinite={true}
                    dots={true}
                    arrows={false}
                    autoplay={true}
                    autoplaySpeed={3000}
                    responsive={[
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                    ]}
                >
                    {data?.reviews?.map((review) => (
                        <ReviewCard key={review._id} reviewinfo={review} />
                    ))}
                </Slider>

            )}
        </div>
    );
};

export default Reviews;

Reviews.propTypes = {
    hotelId: propTypes.string.isRequired,
    hotelName: propTypes.string.isRequired

}