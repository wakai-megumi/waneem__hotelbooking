import React from "react";
import "./Featured.scss";
import useFetch from "../../customhooks/useFetch";
import { parse } from "date-fns";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Searchcontext } from "../../context/Searchcontext";
import { useContext } from "react";
import chandigarhImage from "./featured_images/chandigarh.jpeg"
import shahpur from "./featured_images/shahpur.jpeg"
import shimla from "./featured_images/shimla.jpeg"

// images data
const images = [chandigarhImage, shahpur, shimla]
const error_messages = ["Operation `hotels.countDocuments()` buffering timed out after 10000ms"]
// Skeleton Component
const FeaturedSkeleton = () => {
  return (
    <div className="featured-container">
      <div className="featured-container">
        <div className="featured-card skeleton-card"></div>
        <div className="featured-card skeleton-card"></div>
        <div className="featured-card skeleton-card"></div>
      </div>
    </div>
  );
};

const Featured = () => {
  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_REACT_SERVER_URL}hotels/countbycity?cities=shimla,chandigarh,shahpur`

  );


  console.log(data, error)
  const { dispatch } = useContext(Searchcontext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const destination = e.target.parentElement.children[1].children[0].innerText;
    const count = e.target.parentElement.children[1].children[1].innerText;
    const hotels_count_at_city = parseInt(count.split(" ")[0]);

    if (hotels_count_at_city === 0) {
      toast.info("No hotels available at this city");
    } else {
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
          destination,
          date
        }
      });

      navigate('/hotels', {
        state: {
          destination: destination,
          startDate: currentDate,
          endDate: nextDay,
        }
      });
    }
  };

  return (
    <div className="featured-container">
      {isPending ? (
        <FeaturedSkeleton />
      ) : (
        <div className="featured-container">
          {data?.list?.map((item, index) => {
            const cityname = Object.keys(item)[0];
            const count = item[cityname];
            return (
              <div
                className="featured-card"
                onClick={handleClick}
                key={cityname + count}
              >
                <img
                  src={images[index]}
                  alt="featured"
                  className="featured-img"
                />
                <div className="featured-info">
                  <span className="featured-title">{cityname}</span>
                  <div className="properties-count">{count} properties</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Featured;
