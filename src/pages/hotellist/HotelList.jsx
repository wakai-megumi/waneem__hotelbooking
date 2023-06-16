import React, { useState } from "react"
import Header from "../../components/header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import "./HotelList.scss"
import { format, set } from "date-fns"
import { DateRange } from "react-date-range"
import Person_info from "../../components/person_info/Person_info"
import { SearchItem } from "../../components/searchitem/SearchItem"
import Footer from "../../components/footer/Footer"
import useFetch from "../../customhooks/useFetch"
import { useContext } from "react"
import { Searchcontext } from "../../context/Searchcontext"
import Spinner from "../../utils/spinner/Spinner"
import { useEffect } from "react"

const HotelList = () => {
  const location = useLocation()
  const [date, setDate] = useState([
    {
      startDate: location?.state?.startDate,
      endDate: location?.state?.endDate,
      key: "selection",
    },
  ])
  console.log(date)
  const { dispatch, service_info: contextService_info } = useContext(Searchcontext)
  const type = location?.state?.type
  console.log(type, "hotel list page 0")
  const [destination, setDestination] = useState(location?.state?.destination)
  const [service_info, setService_info] = useState({
    adults: location?.state?.service_info?.adults || contextService_info.adults,
    child: location?.state?.service_info?.child || contextService_info.child,
    rooms: location?.state?.service_info?.rooms || contextService_info.rooms,
    minprice: 1,
    maxprice: 9999, //default case for hotels like taking max limit of price approx 1 million
  })
  const [showData_picker, setShowDate_picker] = useState(false)
  const [showPerson_picker, setShowPerson_picker] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  ///////////////////////////////////////////////////////////
  console.log(destination, service_info, ", hotel list page 1")
  const { data, refetch } = useFetch(
    `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/hotels/get?destination=${destination}&min=${service_info?.minprice
    }&max=${service_info?.maxprice || 999999}
      &adults=${service_info?.adults}&child=${service_info?.child}&rooms=${service_info?.rooms}&type=${type}`
  )

  // opening window on top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  console.log(data, "hotel list page")

  console.log(service_info, date, destination, "hotel list page")

  //////////////////////// /////////////////////////--***************************
  const show_picker = () => {

    setShowDate_picker(!showData_picker)
  }
  ///////////////////////////////////
  const handleclick = () => {
    console.log("refetch")
    refetch()
  }
  //////////////////////////////////////////////////////

  const show_person_picker = () => {

    setShowPerson_picker(!showPerson_picker)

  }
  //////////////////////////////////////////////////////
  const handle_Person_info = (stateValue, operation, value) => {
    let updatedValue;

    if (operation === "add") {
      updatedValue = service_info[stateValue] + 1;
    } else if (operation === "minus") {
      if (service_info[stateValue] > 0) {
        updatedValue = service_info[stateValue] - 1;
      }
    } else if (operation === "input") {
      updatedValue = value;
    }

    setService_info((prevState) => ({
      ...prevState,
      [stateValue]: updatedValue,
    }));
  };
  /////////////////////////////////-----------------
  const handlebooking = (id, item) => {
    console.log(destination)
    console.log(date)
    try {
      setLoading(true)
      dispatch({
        type: "NEW_SEARCH",
        payload: {
          destination,
          date, service_info,

        }
      })
      setTimeout(() => {
        console.log("navigate")
        setLoading(false)
        navigate(`/hotels/${id}`, {
          state: {
            hotel: item
          }
        })

      }, 4000)
    }
    catch (err) {
      console.log(err, "hotellist page 9")


    }
  }

  ////////////////////////////////////////////////////////////
  return (
    <>
      <Header type="noshow" />
      <div className="hotellist">

        <div className="hotellist_container">
          <div className="search-form">
            <h2> Search</h2>
            <label htmlFor="destination">Destination</label>
            <input
              name="destination"
              placeholder="---DHARAMSHALA"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
            />
            {/* -------------------------- ----------------------- */}
            <div className="date_picker_wrapper">
              <div id="date-info" >
                <label htmlFor="stay-date" id="date-label" >
                  Booking Date
                </label>
                <button className="date-button" onClick={show_picker}>
                  {showPerson_picker ? "Hide Picker" : "Show Picker"}
                </button>
              </div>

              <span type="text" id="date_picker_span" className="date_input">
                {`${format(date[0]?.startDate, "dd/MM/yyyy")} to ${format(
                  date[0]?.endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>
              {showData_picker && (
                <DateRange //---------------------------------------using usestate to change its appearance
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                  dateDisplayFormat="dd/MM/yyyy"
                  fixedHeight={true}
                  minDate={new Date()}
                />
              )}
            </div>

            {/* ------------------------------person info---------------------- */}

            <div className="chart-info">
              <div id="person-info" >
                <h2 >
                  Service filters
                </h2>
                <button className="info-button" onClick={show_person_picker}>
                  {showPerson_picker ? "Hide Picker" : "Show Picker"}
                </button>
              </div>

              <span>
                Adults :
                <span className="info-input">
                  {service_info?.adults ? service_info.adults : 1}{" "}
                </span>
              </span>
              <span>
                Child :
                <span className="info-input">
                  {service_info?.child ? service_info.child : 0}{" "}
                </span>
              </span>
              <span>
                Rooms :
                <span className="info-input">
                  {service_info?.rooms ? service_info.rooms : 1}
                </span>
              </span>
              <span>
                Min price / Night :
                <span className="info-input">
                  {service_info.minprice ? service_info.minprice : 1}{" "}
                </span>
              </span>
              <span>
                Max price / Night :
                <span className="info-input">
                  {service_info.maxprice ? service_info.maxprice : 1}{" "}
                </span>
              </span>
              {showPerson_picker && (
                <div className="person-picker">
                  <Person_info
                    extraoptions={true}
                    person_info_handler={handle_Person_info}
                    adults={service_info.adults}
                    child={service_info.child}
                    rooms={service_info.rooms}
                    minprice={service_info.minprice}
                    maxprice={service_info.maxprice}
                  />
                </div>
              )}
            </div>
            <button className="search-btn" onClick={handleclick}>
              Search
            </button>
          </div>

          <div className={loading ? "searchlist_loading" : "searchlist"}  >
            {
              loading ? <Spinner /> :
                <>
                  {data?.hotels.length !== 0 &&
                    data?.hotels?.map((item) => (
                      <SearchItem item={item} key={item._id} handlebooking={handlebooking} />
                    ))}</>
            }

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default HotelList
