import React from "react";
import "./Propertylist.scss";
import useFetch from "../../customhooks/useFetch";
import resort from "./propertylist_images/Resort.jpeg";
import motel from "./propertylist_images/motel.jpeg";
import boutique from "./propertylist_images/boutique.jpeg";
import lodge from "./propertylist_images/Lodge.jpeg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Searchcontext } from "../../context/Searchcontext";
import { useContext } from "react";

const property_images = [resort, motel, boutique, lodge];

// Skeleton Component
const PropertyListSkeleton = () => {
  return (
    <div className="propertylist-container">
      {[1, 2, 3, 4].map((index) => (
        <div className="propertylist-card skeleton-card" key={index}>
          <div className="skeleton-img"></div>
          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-count"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PropertyList = () => {
  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_REACT_SERVER_URL}hotels/countbytype`
  );
  const navigate = useNavigate()
  const { dispatch } = useContext(Searchcontext);

  const handle_hotel_type_search = (e) => {
    const type = e.currentTarget.children[1].children[0].innerText
    const property_count = (e.currentTarget.children[1].children[1].innerText).split(" ")[0]

    if (parseInt(property_count) === 0) {
      toast.info("No hotels available at this property type")
    }
    else {
      const currentDate = new Date();
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      const date = [
        {
          startDate: currentDate,
          endDate: nextDay,
          key: 'selection'
        }
      ];

      dispatch({
        type: "NEW_SEARCH",
        payload: {

          date
        }
      });

      console.log(date, type)
      navigate('/hotels', {
        state: {
          type,
          startDate: currentDate,
          endDate: nextDay,
        }
      });
    }
  }

  return (
    <div className="propertylist-container">
      {isPending ? (
        <PropertyListSkeleton />
      ) : (
        data?.hotelTypes?.map((item, index) => (
          <div className="propertylist-card" key={item._id} onClick={handle_hotel_type_search}>
            <img
              src={property_images[index]}
              alt="propertylist"
              className="propertylist-img"
            />
            <div className="propertylist-info">
              <span className="propertylist-title">{item._id}</span>
              <div className="properties-count">
                {item.count} {item._id}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
