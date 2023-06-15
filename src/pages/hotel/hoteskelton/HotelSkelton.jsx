import React from "react";
import "./HotelSkelton.scss";

const HotelSkeleton = () => {
    return (
        <div className="hotel-skeleton">
            <div className="hotel-skeleton-container">
                <div className="hotel-info-section">
                    <div className="hotel-info">
                        <div className="hotel-logo-skeleton"></div>
                        <div className="hotel-location-skeleton"></div>
                    </div>
                    <div className="details">
                        <div className="hotel-name-skeleton"></div>
                        <div className="hotel-distance-skeleton"></div>
                        <div className="hotel-price-skeleton"></div>
                    </div>
                </div>
                <div className="hotel-gallery-skeleton">
                    <div className="gallery-image-skeleton"></div>
                    <div className="gallery-image-skeleton"></div>
                    <div className="gallery-image-skeleton"></div>
                </div>
                <div className="hotel-detail-section">
                    <div className="hotel-detail">
                        <div className="hotel-title-skeleton"></div>
                        <div className="hotel-description-skeleton"></div>
                    </div>
                    <div className="hotel-details-price">
                        <div className="short-title-skeleton"></div>
                        <div className="short-desc-skeleton"></div>
                        <div className="price-section-skeleton">
                            <div className="full-price-skeleton"></div>
                            <div className="stay-details-skeleton"></div>
                        </div>
                        <div className="reserve-btn-skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSkeleton;
