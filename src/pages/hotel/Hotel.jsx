import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Hotel.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";
import { differenceInDays } from "date-fns";
import { Searchcontext } from "../../context/Searchcontext";
import Footer from "../../components/footer/Footer";
import { ReservationCard } from "../../components/reservationCard/ReservationCard";
import HotelSkeleton from "./hoteskelton/HotelSkelton";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const hoteldata_from_state = location.state?.hotel;
  const id = location.pathname.split("/")[2];
  const hoteldata = hoteldata_from_state

  const [openReservationCard, setOpenReservationCard] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { date, service_info } = useContext(Searchcontext);
  const datediff = differenceInDays(date[0]?.endDate, date[0]?.startDate);
  const openImageGallery = (index) => {
    setCurrentImage(index);
    setOpenGallery(true);
  };

  const closeImageGallery = () => {
    setOpenGallery(false);
  };

  const handleReserve = () => {
    if (isNaN(datediff) || datediff === 0 || isNaN(hoteldata?.cheapestprice) || isNaN(service_info.rooms)) {
      alert("Please select valid data again.");
      navigate(- 1);
    }
    else {
      localStorage.getItem("currentUser")
        ? setOpenReservationCard(true)
        : navigate("/login");
    }


  };
  useEffect(() => {
    if (hoteldata) {
      setShowContent(true);
    }
  }, [hoteldata]);



  return (
    <>
      <Header type="noshow" />

      {!showContent ? (
        <HotelSkeleton />
      ) : (

        <>
          <div className="hotel">
            <div className="hotel_container">
              <div className="hotel_info_section">
                <div className="hotel_info">
                  {hoteldata?.hotelLogo && (
                    <div className="hotel_logo">
                      <img src={hoteldata?.hotelLogo} alt="Hotel Logo" />
                    </div>
                  )}
                  <div className="hotel_location">
                    🌍{hoteldata?.city}, {hoteldata?.country}
                  </div>
                </div>
                <div className="details">
                  <h2 className="hotel_name">{hoteldata?.name}</h2>
                  <h3 className="hotel_distance">
                    {hoteldata?.distance} Km from the center location
                  </h3>
                  <h3 className="hotel_price">
                    Book a stay over{" "}
                    <span className="price">{hoteldata?.cheapestprice} Rs</span> and
                    get a free <span className="features">airport taxi</span>
                  </h3>
                </div>
              </div>

              {hoteldata?.photos && hoteldata?.photos.length !== 0 ? (
                <div className="hotel_gallery">
                  {hoteldata?.photos?.map((photo, index) => (
                    <div
                      key={index}
                      className="gallery_image"
                      onClick={() => openImageGallery(index)}
                    >
                      <img src={photo} alt={`Image ${index}`} />
                    </div>
                  ))}
                </div>
              ) :
                (
                  <div className="no photos">  No photos available for this hotel , feel free to go ahead you can check out the reviews</div>
                )}

              <div className="hotel_detail_section">
                <div className="hotel_detail">
                  <h3 className="hotel_title">  {hoteldata?.title}🌞</h3>
                  <p className="hotel_description">{hoteldata?.description}</p>
                </div>

                <div className="hotel_details_price">
                  {hoteldata?.shorttitle && (
                    <>
                      <h3 className="short_title">{hoteldata?.shorttitle}</h3>
                      <p className="short_desc">
                        {hoteldata?.shortdesc}
                      </p>
                    </>
                  )}

                  <div className="price_section">

                    <h3 className="full_price">
                      Rs {datediff * hoteldata?.cheapestprice * service_info.rooms} 💵
                    </h3>
                    <h2 className="stay_details">{datediff} nights</h2>
                  </div>

                  <button className="reserve-btn" onClick={handleReserve}>
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>

            {openGallery && (
              <div className="image_gallery">
                <div className="close_button" onClick={closeImageGallery}>
                  X
                </div>
                <div className="gallery_image_container">
                  <img
                    src={hoteldata?.photos[currentImage]}
                    alt={`Image ${currentImage}`}
                    className="gallery_image_full"
                  />
                  {currentImage > 0 && (
                    <div
                      className="previous_image"
                      onClick={() => setCurrentImage(currentImage - 1)}
                    >
                      &lt;
                    </div>
                  )}
                  {currentImage < hoteldata?.photos.length - 1 && (
                    <div
                      className="next_image"
                      onClick={() => setCurrentImage(currentImage + 1)}
                    >
                      &gt;
                    </div>
                  )}
                </div>
              </div>
            )}

            {openReservationCard && (
              <ReservationCard setopen={setOpenReservationCard} id={id} hotelname={hoteldata?.name} />
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Hotel;
