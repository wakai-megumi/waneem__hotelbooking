import React from "react";
import "./Top_Visited.scss";
import useFetch from "../../customhooks/useFetch";
import { useContext } from "react";
import { Searchcontext } from "../../context/Searchcontext";
import { useNavigate } from "react-router-dom";

const TopVisited = () => {
  const { dispatch } = useContext(Searchcontext);
  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/get?featured=true&limit=4`
  );
  const navigate = useNavigate();

  const handle_click_on_top_visited_hotel = async (item) => {
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

    await dispatch({
      type: "NEW_SEARCH",
      payload: { date },
    });

    setTimeout(() => {
      navigate(`/hotels/${item._id}`, {
        state: { hotel: item }
      });
    }, 1000);
  };

  const renderTopVisitedCards = () => {
    if (isPending || data?.hotels?.length === 0 || data === null) {
      return [...Array(4)].map((_, index) => (
        <div className="topvisited-card skeleton-card" key={index}></div>
      ));
    }

    return data?.hotels?.map((item) => (
      <div className="topvisited-card" key={item._id} onClick={() => handle_click_on_top_visited_hotel(item)}>
        <img
          src={item?.hotelLogo}
          alt="topvisited"
          className="topvisited-img"
        />
        <div className="topvisited-info">
          <span className="topvisited-name">{item.name}</span>
          <span className="topvisited-city">{item.city}</span>
          <span className="topvisited-starting-price">only {item.cheapestprice}</span>
          <span className="topvisited-title">{item?.title}</span>
          {item.rating && (
            <div className="topvisited-rating">
              <span className="topvisited-rating-value">{item.rating}</span>
              <span className="topvisited-rating-classification">very good</span>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="topvisited-container">
      {renderTopVisitedCards()}
    </div>
  );
};

export default TopVisited;
