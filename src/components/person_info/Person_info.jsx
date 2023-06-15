import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import "./Person_info.scss";

const Person_info = ({
  person_info_handler,
  adults,
  child,
  rooms,
  maxprice,
  minprice,
  extraoptions,
}) => {
  const handle_change = (statevalue, operation) => {
    person_info_handler(statevalue, operation);
  };

  const handleInputChange = (e, stateValue) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      person_info_handler(stateValue, "input", value);
    }
  };

  return (
    <div className="persons_info">
      <div className="persons_info_container">
        <div className="_count">
          <h3> Adults</h3>
          <div className="_count_container">
            <AiOutlineMinus
              className="_count_icon"
              onClick={() => {
                return adults > 1 ? handle_change("adults", "minus") : null;
              }}
            />
            <input
              name="adults"
              className="persons_info_input"
              type="number"
              inputMode="numeric"
              pattern="[1-9][1-9]*"
              placeholder=" 2"
              onChange={(e) => handleInputChange(e, "adults")}
              value={adults}
            />
            <AiOutlinePlus
              className="_count_icon"
              onClick={() => handle_change("adults", "add")}
            />
          </div>
        </div>
        <div className="_count">
          <h3> Child</h3>
          <div className="_count_container">
            <AiOutlineMinus
              className="_count_icon"
              onClick={() => handle_change("child", "minus")}
            />

            <input
              name="child"
              className="persons_info_input"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder=" 0"
              value={child}
              onChange={(e) => handleInputChange(e, "child")}
            />
            <AiOutlinePlus
              className="_count_icon"
              onClick={() => handle_change("child", "add")}
            />
          </div>
        </div>
        <div className="_count">
          <h3> Rooms</h3>
          <div className="_count_container">
            <AiOutlineMinus
              className="_count_icon"
              onClick={() => {
                return rooms > 1 ? handle_change("rooms", "minus") : null;
              }}
            />
            <input
              name="rooms"
              className="persons_info_input"
              type="number"
              min={1}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder=" 1"
              value={rooms}
              onChange={(e) => handleInputChange(e, "rooms")}
            />
            <AiOutlinePlus
              className="_count_icon"
              onClick={() => handle_change("rooms", "add")}
            />
          </div>
        </div>
        {extraoptions && (
          <>
            <div className="_count">
              <h3> Min Price</h3>
              <div className="_count_container">
                <AiOutlineMinus
                  className="_count_icon"
                  onClick={() => {
                    return minprice > 1
                      ? handle_change("minprice", "minus")
                      : null;
                  }}
                />
                <input
                  name="minprice"
                  className="persons_info_input"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder=" 0"
                  value={minprice}
                  onChange={(e) => handleInputChange(e, "minprice")}
                />
                <AiOutlinePlus
                  className="_count_icon"
                  onClick={() => handle_change("minprice", "add")}
                />
              </div>
            </div>
            <div className="_count">
              <h3> Max Price</h3>
              <div className="_count_container">
                <AiOutlineMinus
                  className="_count_icon"
                  onClick={() => {
                    return maxprice > 1
                      ? handle_change("maxprice", "minus")
                      : null;
                  }}
                />
                <input
                  name="maxprice"
                  className="persons_info_input"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder=" 0"
                  value={maxprice}
                  onChange={(e) => handleInputChange(e, "maxprice")}
                />
                <AiOutlinePlus
                  className="_count_icon"
                  onClick={() => handle_change("maxprice", "add")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Person_info.propTypes = {
  person_info_handler: PropTypes.func.isRequired,
  adults: PropTypes.number.isRequired,
  child: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
  maxprice: PropTypes.number.isRequired,
  minprice: PropTypes.number.isRequired,
  extraoptions: PropTypes.bool.isRequired,
};

export default Person_info;
