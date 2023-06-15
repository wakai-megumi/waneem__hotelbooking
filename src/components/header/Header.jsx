import React, { useContext, useEffect, useState } from "react"
// import "/Header.scss"
import { Link, useNavigate } from "react-router-dom"
import { GiRocketFlight } from "react-icons/gi"
import { FaHotel, FaSearchLocation } from "react-icons/fa"
import { AiFillCar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { MdAirportShuttle, MdOutlineAttractions } from "react-icons/md"
import { BsFillCalendarHeartFill } from "react-icons/bs"
import { SlPeople } from "react-icons/sl"
import "./Header.scss"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { format } from "date-fns"
import Person_info from "../person_info/Person_info"
import propsvalidation from "prop-types"
import { toast } from "react-hot-toast"
import useFetch from "../../customhooks/useFetch"
import { Searchcontext } from "../../context/Searchcontext"

const Header = ({ type }) => {
  //declaring states for using with date picker



  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ])
  const [show_picker, setshow_picker] = useState(false)
  const [show_person_picker, setshow_person_picker] = useState(false)
  const [destination, setDestination] = useState("")
  const navigate = useNavigate()

  /////////////////////////////////////////////////////--------------
  const [service_info, setService_info] = useState({
    adults: 1,
    child: 0,
    rooms: 1,
  })
  /////////////////////////////////////////////////////
  const showData_picker = (e) => {
    if (
      e.target.id === "date_picker" ||
      e.target.id === "date_picker_icon" ||
      e.target.id === "date_picker_span"
    ) {
      setshow_picker(!show_picker)
    }
  }
  ///////////////////////////////////////////////////
  //person info picker
  const showPerson_picker = (e) => {
    if (
      e.target.id === "person_picker_icon" ||
      e.target.id === "person_info_picker" ||
      e.target.id === "person_span_picker"
    ) {
      setshow_person_picker(!show_person_picker)
    }
  }

  /////////////////////////////////////////////////////////--callback function from person info to header parent
  const handle_Person_info = (statevalue, operation) => {
    if (operation === "add") {
      setService_info({
        ...service_info,
        [statevalue]: service_info[statevalue] + 1,
      })
    } else if (operation === "minus") {
      if (service_info[statevalue] > 0) {
        setService_info({
          ...service_info,
          [statevalue]: service_info[statevalue] - 1,
        })
      }
    }
  }
  //////////////////////////////////////////////////////////////---handleclick submit button for search
  const { dispatch } = useContext(Searchcontext)

  const handleclick = () => {
    if (destination == "") return toast.error("fill out the destination")
    else {
      const startDate = date[0].startDate
      const endDate = date[0].endDate

      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, date, service_info },
      })
      navigate("/hotels", {
        state: {
          destination,
          startDate,
          endDate,
          service_info,
        },
      })
    }
  }

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////
  return (
    <div className="header">
      <div className="header_container">
        {/* header link section  */}
        <div className="header_links">
          <Link to={"/available_soon"} className="header_link link">
            <FaHotel className="header_link_icon" />
            <h3> Stays</h3>
          </Link>

          <Link to={"/available_soon"} className="header_link link">
            <GiRocketFlight className="header_link_icon" />
            <h3> Flights</h3>
          </Link>

          <Link to={"/available_soon"} className="header_link link">
            <AiFillCar className="header_link_icon" />
            <h3> Car Rentals</h3>
          </Link>

          <Link to={"/available_soon"} className="header_link link">
            <MdOutlineAttractions className="header_link_icon" />
            <h3> Attractions</h3>
          </Link>

          <Link to={"/available_soon"} className="header_link link">
            <MdAirportShuttle className="header_link_icon" />
            <h3> Airport Taxis</h3>
          </Link>
        </div>

        {type === "show" && (
          <>
            {/* title and tagline of webiste */}
            <div className="header_title">
              <h1> A perfect place to book you leisure time</h1>
              <h5>
                Get instant access to major discount's ,
                <span className="header_title_span"> Join Now</span>
              </h5>
            </div>

            {/* ...............................header search box....................................... */}
            <div className="header_search_box">
              <div className="header_search_box_container">
                <div className="header_box">
                  <FaHotel className="search_icon" />
                  {/* need to changed after getting data or renderring */}
                  <input
                    className="header-input"
                    type="text"
                    placeholder=" Your Destination"
                    onChange={(e) => setDestination(e.target.value)}
                    value={destination}
                  />
                </div>
                <div
                  className="header_box  date_picker"
                  id="date_picker"
                  onClick={showData_picker}
                >
                  <BsFillCalendarHeartFill
                    id="date_picker_icon"
                    className="search_icon"
                  />
                  <span
                    type="text"
                    id="date_picker_span"
                    className="date_input"
                  >
                    {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                      date[0].endDate,
                      "dd/MM/yyyy"
                    )}`}
                  </span>
                  {show_picker && (
                    <DateRange //---------------------------------------using usestate to change its appearance
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      dateDisplayFormat="dd/MM/yyyy"
                      fixedHeight={true}
                    // minDate={new Date()}
                    />
                  )}
                </div>
                <div
                  className="header_box person_info_picker"
                  id="person_info_picker"
                  onClick={showPerson_picker}
                >
                  <SlPeople className="search_icon" id="person_picker_icon" />
                  {/* need to changed after or renderring */}
                  <span className="header-input" id="person_span_picker">
                    {`${service_info.adults} Adults ${service_info.child} Child ${service_info.rooms} Rooms`}
                  </span>
                  {show_person_picker && (
                    <div className="person">
                      <Person_info
                        person_info_handler={handle_Person_info}
                        adults={service_info.adults}
                        child={service_info.child}
                        rooms={service_info.rooms}
                        extraoptions={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {destination !== "" && !show_picker && !show_person_picker && (
              <button className="header_submit" onClick={handleclick}>
                <FaSearchLocation className="submit_icon" />
                <h3> Search</h3>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  type: propsvalidation.string,
}
