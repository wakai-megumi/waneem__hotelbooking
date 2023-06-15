import React from "react"
import "./Top_Visited.scss"
import useFetch from "../../customhooks/useFetch"
import { useContext } from "react"
import { Searchcontext } from "../../context/Searchcontext"
import { useNavigate } from "react-router-dom"
const TopVisited = () => {
  const { dispatch } = useContext(Searchcontext)

  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/get?featured=true&limit=4`
  )
  const navigate = useNavigate()

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
    console.log(date)

    await dispatch({
      type: "NEW_SEARCH",
      payload: { date },
    })
    setTimeout(() => {
      console.log("navigate")
      navigate(`/hotels/${item._id}`, {
        state: { hotel: item }
      })

    }, 1000)

  }

  return (
    <div className="topvisited-container">
      {isPending ? (
        <div className="loading">Loading...</div>
      ) : (
        data?.hotels?.map((item) => {
          return (
            <div className={`topvisited-card ${isPending ? 'skeleton_card' : ''}`} key={item._id} onClick={() => handle_click_on_top_visited_hotel(item)}>
              <img
                src={item?.hotelLogo}//change the photos linkn after uploading the image url
                alt="topvisited"
                className={`topvisited-img ${isPending ? 'skeleton_img' : ''}`}
              />
              <div className={`topvisited-info ${isPending ? 'skeleton_info' : ''}`}>
                <span className={`topvisited-name ${isPending ? 'skeleton_name' : ''}`}>{item.name}</span>
                <span className={`topvisited-city ${isPending ? 'skeleton_city' : ''}`}>{item.city}</span>
                <span className={`topvisited-startig-price ${isPending ? 'skeleton_starting-price' : ''}`}>
                  only {item.cheapestprice}
                </span>
                <span className={`topvisited-title ${isPending ? 'skeleton_title' : ''}`}>
                  {item?.title}</span>
                {item.rating && (
                  <div className={`topvisited-rating ${isPending ? 'skeleton_raring' : ''}`}>
                    <span className={`topvisited-rating-value ${isPending ? 'skeleton_card' : ''}`}>
                      {item.rating}
                    </span>
                    <span className={`topvisited-rating-classification ${isPending ? 'skeleton_card' : ''}`}>
                      {" "}
                      {/* change the rating value after uploading the  making the selection component on vasis of ratingvalue */}
                      very good
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}
    </div >
  )
}
export default TopVisited
