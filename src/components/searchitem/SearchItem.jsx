import React, { useContext } from "react"
import "./SerachItem.scss"
import propsvalidation from "prop-types"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { Searchcontext } from "../../context/Searchcontext"
import { FaMapMarkerAlt } from "react-icons/fa";

export const SearchItem = ({ item, handlebooking }) => {
  const { dispatch } = useContext(Searchcontext)

  const handleBookNow = () => {
    handlebooking(item._id, item)

  }

  return (
    <div className="searchitem">
      <div className="si-container">
        <div className="si-img">
          {item?.hotelLogo &&

            <img
              src={item?.hotelLogo} //change after i  get image here
              alt="search-item"
            />
          }
        </div>
        <div className="si-info">
          <span className="si-title">{item?.name}</span>
          <span className="si-distance"> <FaMapMarkerAlt />{item?.city}</span>
          <span className="category">{item?.type}</span>
          <span className="si-amenities">{item?.title}</span>
          <span className="si-Features">
            {/* change the features value after uploading the  making the hotel model with feature array of only top 2 */}
            Studio Apartment with air conditioning
            <br />
            Parking
          </span>
        </div>
        <div className="si-details">
          <div className="si-details-top">
            <span className="si-grading">Excellent</span>{" "}
            {/* change the grading value after uploading the  making the selection component on vasis of ratingvalue -- not doing right now */}
            {item?.rating && <span className="si-rating">{item?.rating}</span>}
          </div>
          <div className="si-details-bottom">
            <span className="si-starting-price">
              only -- {item?.cheapestprice} Rs
            </span>
            <span className="si-taxes">Included taxes and fees</span>
            {/* <Link to={`/hotels/${item?._id}`} className="link">                  // using the buttons is better and cleaner and give u much control
                <span className="si-booking">Book now</span>
              </Link> */}
            <button className="si-booking" onClick={handleBookNow}>
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

SearchItem.propTypes = {
  item: propsvalidation.object.isRequired,
  handlebooking: propsvalidation.func.isRequired
}
