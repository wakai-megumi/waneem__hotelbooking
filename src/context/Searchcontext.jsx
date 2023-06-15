import { createContext, useReducer } from "react"
import PropTypes from "prop-types";


const Initial_state = {
  destination: "",
  date: [
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    }
  ],
  service_info: {
    adults: 1,
    child: 0,
    rooms: 1,
  },
}

export const Searchcontext = createContext(Initial_state)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload
    case "RESET_SEARCH":
      return Initial_state
    default:
      return state
  }
}

export const SearchcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, Initial_state)
  console.log(state?.destination) // Using optional chaining (?.) to prevent error if state is undefined
  console.log(state?.date, state?.service_info, 'now')
  return (
    <Searchcontext.Provider
      value={{
        destination: state?.destination || "", // Providing a default value if destination is undefined
        date: state?.date || [],
        service_info: state?.service_info || Initial_state.service_info,
        dispatch,
      }}
    >
      {children}
    </Searchcontext.Provider>
  )
}


SearchcontextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
